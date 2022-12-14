from django.core.exceptions import ObjectDoesNotExist
from django.utils import timezone
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework.generics import GenericAPIView, UpdateAPIView
from rest_framework.response import Response
from rest_framework.status import HTTP_404_NOT_FOUND, HTTP_400_BAD_REQUEST

from agube.exceptions import DateFilterBadFormatError, DateFilterNoEndDateError, DateFilterStartGtEnd
from agube.pagination import CustomPagination, CustomPaginationInspector
from agube.utils import validate_query_date_filters
from manager.permissions import IsManagerAuthenticated
from watermeter.exceptions import (
    WaterMeterDisabledError, WaterMeterMeasurementAlreadyExpiredToUpdateError,
    WaterMeterMeasurementInFutureError)
from watermeter.models import WaterMeter, WaterMeterMeasurement
from watermeter.serializers import WaterMeterMeasurementSerializer

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
            from_datetime, until_datetime = datetime_filters
            measurement_list = watermeter.get_measurements_between_dates(
                from_date=from_datetime, until_date=until_datetime)

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

        try:
            watermeter_measurement = WaterMeterMeasurementSerializer(
                data=request.data).self_create(watermeter)
            return Response(
                (WaterMeterMeasurementSerializer(watermeter_measurement).data))
        except (WaterMeterDisabledError,
                WaterMeterMeasurementInFutureError) as e:
            if isinstance(e, WaterMeterDisabledError):
                return Response({'status': e.message},
                                status=HTTP_404_NOT_FOUND)
            if isinstance(e, WaterMeterMeasurementInFutureError):
                return Response({'status': e.message},
                                status=HTTP_400_BAD_REQUEST)


class MeasurementView(UpdateAPIView):
    # FIXME: check that Manager Has Permission about this Measure
    permission_classes = [IsManagerAuthenticated]
    queryset = WaterMeterMeasurement.objects.all()
    serializer_class = WaterMeterMeasurementSerializer
    lookup_field = 'pk'
    http_method_names = ["put"]  # it ignore PATCH method

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
