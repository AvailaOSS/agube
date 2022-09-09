from django.utils import timezone
from django.core.exceptions import ObjectDoesNotExist
from drf_yasg.utils import swagger_auto_schema
from rest_framework.response import Response
from rest_framework.status import HTTP_404_NOT_FOUND, HTTP_400_BAD_REQUEST
from rest_framework.generics import GenericAPIView, UpdateAPIView

from drf_yasg import openapi
from agube.exceptions import DateFilterBadFormatError, DateFilterNoEndDateError, DateFilterStartGtEnd
from agube.utils import validate_query_date_filters

from manager.permissions import IsManagerAuthenticated
from watermeter.exceptions import (WaterMeterDisabledError, WaterMeterMeasurementAlreadyExpiredToUpdateError,
                                   WaterMeterMeasurementInFutureError)
from watermeter.models import WaterMeter, WaterMeterMeasurement
from watermeter.serializers import WaterMeterMeasurementSerializer
from agube.pagination import CustomPagination, CustomPaginationInspector

TAG_WATER_METER = 'water-meter'
TAG_MEASUREMENT = 'measurement'


class WaterMeterMeasurementView(GenericAPIView):
    permission_classes = [IsManagerAuthenticated]
    serializer_class = WaterMeterMeasurementSerializer
    queryset = WaterMeter.objects.all()
    pagination_class = CustomPagination

    @swagger_auto_schema(
        operation_id="getWaterMeterMeasurements",
        paginator_inspectors=[CustomPaginationInspector],
        manual_parameters=[
            openapi.Parameter('start_date',
                              openapi.IN_QUERY,
                              description="Filter start date",
                              type=openapi.TYPE_STRING,
                              format=openapi.FORMAT_DATE),
            openapi.Parameter('end_date',
                              openapi.IN_QUERY,
                              description="Filter end date",
                              type=openapi.TYPE_STRING,
                              format=openapi.FORMAT_DATE)
        ],
        tags=[TAG_WATER_METER],
    )
    def get(self, request, pk):
        """
        Return a pagination of water meter measurements between dates.
        """
        # Validate date filters
        try:
            datetime_filters = validate_query_date_filters(
                request.query_params.get('start_date'),
                request.query_params.get('end_date'))
        except (DateFilterBadFormatError, DateFilterNoEndDateError,
                DateFilterStartGtEnd) as e:
            return Response({'status': e.message}, status=HTTP_400_BAD_REQUEST)
            
        # Get Water Meter
        try:
            watermeter: WaterMeter = WaterMeter.objects.get(id=pk)
        except ObjectDoesNotExist:
            return Response({'status': 'cannot find watermeter'},
                            status=HTTP_404_NOT_FOUND)

        # Get measurements
        if datetime_filters is None:
            measurement_list = watermeter.get_measurements()
        else:
            # Get measurements filtered between dates
            start_datetime, end_datetime = datetime_filters
            measurement_list = watermeter.get_measurements_between_dates(
                start_date=start_datetime,
                end_date=end_datetime)

        # Create result pagination
        queryset = measurement_list
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            result = self.get_paginated_response(serializer.data)
            data = result.data
        else:
            serializer = self.get_serializer(queryset, many=True)
            data = serializer.data
        return Response(data)

    @swagger_auto_schema(
        operation_id="addWaterMeterMeasurement",
        tags=[TAG_WATER_METER],
    )
    def post(self, request, pk):
        """
        Create a new measurement for this water meter
        """
        # Get Water Meter
        try:
            watermeter: WaterMeter = WaterMeter.objects.get(id=pk)
        except ObjectDoesNotExist:
            return Response({'status': 'cannot find watermeter'},
                            status=HTTP_404_NOT_FOUND)

        # Extract data
        measurement = request.data.pop('measurement')
        date = None
        if 'date' in request.data:
            date = request.data.pop('date')
        else:
            date = timezone.now()

        # Add Water Meter
        try:
            watermeter_measurement = watermeter.add_measurement(measurement,
                                                                date=date)
            return Response(
                (WaterMeterMeasurementSerializer(watermeter_measurement,
                                                 many=False).data))
        except (WaterMeterDisabledError,
                WaterMeterMeasurementInFutureError) as e:
            return Response({'status': e.message}, status=HTTP_404_NOT_FOUND)


class MeasurementView(UpdateAPIView):
    # FIXME: check that Manager Has Permission about this Measure
    permission_classes = [IsManagerAuthenticated]
    queryset = WaterMeterMeasurement.objects.all()
    serializer_class = WaterMeterMeasurementSerializer
    lookup_field = 'pk'
    http_method_names = ["put"] # it ignore PATCH method

    @swagger_auto_schema(
        operation_id="updateMeasurement",
        tags=[TAG_MEASUREMENT],
    )
    def put(self, request, *args, **kwargs):
        """
        Return the measurement updated with new changes
        """
        try:
            return super().put(request, *args, **kwargs)
        except (WaterMeterMeasurementAlreadyExpiredToUpdateError,
                WaterMeterMeasurementInFutureError) as e:
            return Response({'status': e.message}, status=HTTP_404_NOT_FOUND)
