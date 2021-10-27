from django.utils import timezone
from drf_yasg.utils import swagger_auto_schema
from manager.permissions import IsManagerAuthenticated
from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.status import HTTP_404_NOT_FOUND
from rest_framework.views import APIView

from watermeter.exceptions import WaterMeterDisabledError, WaterMeterMeasureInFutureError
from watermeter.models import WaterMeter, WaterMeterMeasurement
from watermeter.serializers import WaterMeterMeasurementSerializer

TAG = 'water-meter'


class WaterMeterMeasurementView(APIView):
    permission_classes = [IsManagerAuthenticated]

    @swagger_auto_schema(
        operation_id="getWaterMeterMeasures",
        responses={200: WaterMeterMeasurementSerializer(many=True)},
        tags=[TAG],
    )
    def get(self, request, pk):
        """
        Return a list of water meter measures.
        """
        # Get Dwelling
        water_meter: WaterMeter = WaterMeter.objects.get(id=pk)
        measurements = water_meter.get_measurements()
        return Response((WaterMeterMeasurementSerializer(measurements,
                                                         many=True).data))

    @swagger_auto_schema(
        operation_id="addWaterMeterMeasure",
        request_body=WaterMeterMeasurementSerializer,
        responses={200: WaterMeterMeasurementSerializer(many=False)},
        tags=[TAG],
    )
    def post(self, request, pk):
        """
        Create a new Measurement for this Water Meter
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
        except (WaterMeterDisabledError, WaterMeterMeasureInFutureError) as e:
            return Response({'status': e.message}, status=HTTP_404_NOT_FOUND)
