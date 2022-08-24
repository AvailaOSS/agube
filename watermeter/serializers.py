from django.core.exceptions import ObjectDoesNotExist
from dwelling.models import DwellingWaterMeter
from rest_framework.fields import DateTimeField, ReadOnlyField
from rest_framework.serializers import (ModelSerializer, Serializer,
                                        SerializerMethodField)

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
    id = ReadOnlyField()
    date = DateTimeField(required=False)
    measurement_diff = ReadOnlyField()
    max_daily_consumption = SerializerMethodField()

    def get_max_daily_consumption(self, obj):
        # the serializer can return model or dict
        if type(obj) is dict:
            current_measure = WaterMeterMeasurement.objects.get(id=obj.get('id'))
        elif type(obj) is WaterMeterMeasurement:
            current_measure = obj
        else:
            # if the serializer does not return nothing, ignore...
            return 0.0

        try:
            dwelling_water_meter = DwellingWaterMeter.objects.get(water_meter = current_measure.water_meter)
        except ObjectDoesNotExist:
            return 0.0

        return dwelling_water_meter.dwelling.manager.get_closest_config(current_measure.date).max_daily_consumption

    class Meta:
        ref_name = 'WaterMeterMeasurement'
        model = WaterMeterMeasurement
        fields = (
            'id',
            'measurement',
            'measurement_diff',
            'max_daily_consumption',
            'date',
        )


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
