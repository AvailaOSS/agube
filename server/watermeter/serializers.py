from django.core.exceptions import ObjectDoesNotExist
from rest_framework.fields import ReadOnlyField
from rest_framework.serializers import (ModelSerializer, Serializer,
                                        SerializerMethodField)

from dwelling.models import DwellingWaterMeter
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
        fields = (
            'id',
            'code',
            'release_date',
            'discharge_date',
        )


class WaterMeterMeasurementSerializer(ModelSerializer):
    """
    WaterMeter ModelSerializer
    """
    max_daily_consumption = SerializerMethodField()

    class Meta:
        ref_name = 'WaterMeterMeasurement'
        model = WaterMeterMeasurement
        fields = (
            'id',
            'measurement',
            'date',
            'average_daily_flow',
            'max_daily_consumption',
        )
        read_only_fields = ['average_daily_flow']
        extra_kwargs = {'date': {'required': False}}

    def create(self, watermeter: WaterMeter, validated_data):
        from django.utils import timezone

        measurement = validated_data.pop('measurement')
        measurement_date = validated_data.pop('date') if 'date' in validated_data else timezone.now()
        # Add Water Meter
        return watermeter.add_measurement(measurement, measurement_date=measurement_date)

    def self_create(self, watermeter):
        if self.is_valid(True):
            return self.create(watermeter, self.validated_data)

    def get_max_daily_consumption(self, obj):
        # the serializer can return model or dict
        if type(obj) is dict:
            measurement = WaterMeterMeasurement.objects.get(
                id=obj.get('id'))
        elif type(obj) is WaterMeterMeasurement:
            measurement = obj
        else:
            # if the serializer does not return nothing, ignore...
            return 0.0

        try:
            dwelling_water_meter = DwellingWaterMeter.objects.get(
                water_meter=measurement.water_meter)
        except ObjectDoesNotExist:
            return 0.0

        return dwelling_water_meter.dwelling.get_max_daily_consumption(measurement.date)


class WaterMeterDetailSerializer(Serializer):
    """
    WaterMeter Detail ModelSerializer
    """
    id = ReadOnlyField()
    code = ReadOnlyField()
    release_date = ReadOnlyField()
    discharge_date = ReadOnlyField()
    measures = WaterMeterMeasurementSerializer(many=True, read_only=False)

    class Meta:
        ref_name = 'WaterMeterWithMeasurements'
