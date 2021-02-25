from rest_framework.fields import DateTimeField, ReadOnlyField
from rest_framework.serializers import ModelSerializer, Serializer

from watermeter.models import WaterMeter, WaterMeterMeasurement


class WaterMeterSerializer(ModelSerializer):
    """
    WaterMeter ModelSerializer
    """
    id = ReadOnlyField()
    release_date = ReadOnlyField()
    discharge_date = ReadOnlyField()

    class Meta:
        ref_name = 'WaterMeter'
        model = WaterMeter
        fields = ('id', 'code', 'release_date', 'discharge_date',)


class WaterMeterMeasurementSerializer(ModelSerializer):
    """
    WaterMeter ModelSerializer
    """
    id = ReadOnlyField()
    date = DateTimeField(required=False)

    class Meta:
        ref_name = 'WaterMeterMeasurement'
        model = WaterMeterMeasurement
        fields = ('id', 'measurement', 'date',)


class WaterMeterDetailSerializer(Serializer):
    """
    WaterMeter Detail ModelSerializer
    """
    id = ReadOnlyField()
    code = ReadOnlyField()
    release_date = ReadOnlyField()
    discharge_date = ReadOnlyField()
    water_meter = WaterMeterMeasurementSerializer(many=True, read_only=False)

    class Meta:
        ref_name = 'WaterMeterWithMeasurements'