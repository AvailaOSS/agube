from django.utils import timezone
from drf_yasg.utils import swagger_auto_schema
from manager.permissions import IsManagerAuthenticated
from rest_framework.response import Response
from rest_framework.status import HTTP_404_NOT_FOUND
from rest_framework.generics import GenericAPIView
from agube.pagination import CustomPagination

from watermeter.exceptions import (WaterMeterDisabledError,
                                   WaterMeterMeasurementInFutureError)
from watermeter.models import WaterMeter
from watermeter.serializers import WaterMeterMeasurementSerializer

TAG = 'water-meter'


class WaterMeterMeasurementView(GenericAPIView):
    permission_classes = [IsManagerAuthenticated]
    serializer_class = WaterMeterMeasurementSerializer
    queryset = WaterMeter.objects.all()
    pagination_class = CustomPagination

    @swagger_auto_schema(
        operation_id="getWaterMeterMeasurements",
        tags=[TAG],
    )
    def get(self, request, pk):
        """
        Return a pagination of water meter measurements.
        """
        watermeter: WaterMeter = WaterMeter.objects.get(id=pk)
        queryset = watermeter.get_measurements()

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
        tags=[TAG],
    )
    def post(self, request, pk):
        """
        Create a new measurement for this water meter
        """
        # Get Water Meter
        water_meter: WaterMeter = WaterMeter.objects.get(id=pk)
        # Extract data
        measurement = request.data.pop('measurement')
        date = None
        if 'date' in request.data:
            date = request.data.pop('date')
        else:
            date = timezone.now()
        # Add Water Meter
        try:
            water_meter_measurement = water_meter.add_measurement(measurement,
                                                                  date=date)
            return Response(
                (WaterMeterMeasurementSerializer(water_meter_measurement,
                                                 many=False).data))
        except (WaterMeterDisabledError,
                WaterMeterMeasurementInFutureError) as e:
            return Response({'status': e.message}, status=HTTP_404_NOT_FOUND)
