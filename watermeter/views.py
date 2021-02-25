from datetime import datetime, timezone

from drf_yasg.utils import swagger_auto_schema
from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from watermeter.models import WaterMeter, WaterMeterMeasurement
from watermeter.serializers import WaterMeterMeasurementSerializer

TAG = 'water-meter'


class WaterMeterMeasurementView(generics.ListAPIView):
    queryset = WaterMeterMeasurement.objects.all()
    serializer_class = WaterMeterMeasurementSerializer
    permission_classes = [AllowAny]


class WaterMeterMeasurementChunkView(APIView):
    permission_classes = [AllowAny]

    @swagger_auto_schema(
        responses={200: WaterMeterMeasurementSerializer(many=True)},
        tags=[TAG],
    )
    def get(self, request, pk, chunk):
        """
        Return a list of chunk water meter measures.
        """
        # Get Dwelling
        water_meter = WaterMeter.objects.get(id=pk)
        measurements = water_meter.get_measurements_chunk(chunk)
        return Response((WaterMeterMeasurementSerializer(measurements, many=True).data))


class WaterMeterCreateMeasurementView(APIView):
    permission_classes = [AllowAny]

    @swagger_auto_schema(
        request_body=WaterMeterMeasurementSerializer,
        responses={200: WaterMeterMeasurementSerializer(many=False)},
        tags=[TAG],
    )
    def post(self, request, pk):
        """
        Create a new Measurement for this Water Meter
        """
        # Get Water Meter
        water_meter = WaterMeter.objects.get(id=pk)
        # Extract data
        measurement = request.data.pop('measurement')
        date = None
        if 'date' in request.data:
            date = request.data.pop('date')
        else:
            date = datetime.now().replace(tzinfo=timezone.utc)
        # Add Water Meter
        water_meter_measurement = water_meter.add_measurement(
            measurement, date=date)
        return Response((WaterMeterMeasurementSerializer(water_meter_measurement, many=False).data))
