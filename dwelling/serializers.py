from geolocation.serializers import GeolocationSerializer
from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist
from manager.exceptions import ManagerLimitExceeded
from manager.models import Manager
from rest_framework.fields import CharField, ReadOnlyField, DecimalField, DateField, IntegerField
from rest_framework.serializers import ModelSerializer, Serializer
from watermeter.serializers import WaterMeterSerializer

from dwelling.exceptions import UserManagerRequiredError
from dwelling.models import Dwelling


class DwellingResumeSerializer(Serializer):
    """
    Dwelling Resume ModelSerializer
    """
    total_dwellings = ReadOnlyField()
    total_residents = ReadOnlyField()
    total_owners = ReadOnlyField()

    class Meta:
        ref_name = 'DwellingResume'


class DwellingSerializer(ModelSerializer):
    """
    Dwelling ModelSerializer
    """
    id = ReadOnlyField()
    release_date = ReadOnlyField()
    discharge_date = ReadOnlyField()
    geolocation = GeolocationSerializer(many=False, read_only=False)

    class Meta:
        ref_name = 'Dwelling'
        model = Dwelling
        fields = (
            'id',
            'geolocation',
            'release_date',
            'discharge_date',
        )


class DwellingCreateSerializer(ModelSerializer):
    """
    Dwelling Create ModelSerializer
    """
    id = ReadOnlyField()
    geolocation = GeolocationSerializer(many=False, read_only=False)
    water_meter = WaterMeterSerializer(
        required=False,
        many=False,
        read_only=False,
        write_only=True,
    )

    class Meta:
        ref_name = 'DwellingCreate'
        model = Dwelling
        fields = (
            'id',
            'geolocation',
            'water_meter',
        )

    def create(self, validated_data):
        user: User = self.context.get("request").user
        try:
            manager: Manager = Manager.objects.get(user_id=user.id)
        except ObjectDoesNotExist:
            raise UserManagerRequiredError()

        if manager.has_exceeded_limit():
            raise ManagerLimitExceeded()

        # Create geolocation
        validated_data['geolocation'] = GeolocationSerializer(
            data=validated_data.pop('geolocation')).self_create()
        water_meter_exist = False
        if 'water_meter' in validated_data:
            # Extract water_meter_code
            water_meter_code: WaterMeterSerializer = validated_data.pop(
                'water_meter')['code']
            water_meter_exist = True
        # Create dwelling
        dwelling: Dwelling = Dwelling.objects.create(manager=manager,
                                                     **validated_data)
        if water_meter_exist:
            # Create water meter
            dwelling.change_current_water_meter(water_meter_code)

        return dwelling


class DwellingDetailSerializer(Serializer):
    """
    Dwelling Detail ModelSerializer
    """
    id = ReadOnlyField()
    city = CharField(max_length=None,
                     min_length=None,
                     allow_blank=False,
                     trim_whitespace=True)
    road = CharField(max_length=None,
                     min_length=None,
                     allow_blank=False,
                     trim_whitespace=True)
    number = CharField(max_length=None,
                       min_length=None,
                       allow_blank=False,
                       trim_whitespace=True)
    water_meter_code = CharField(max_length=None,
                                 min_length=None,
                                 allow_blank=True,
                                 trim_whitespace=True)
    resident_first_name = CharField(max_length=None,
                                    min_length=None,
                                    allow_blank=False,
                                    trim_whitespace=True)
    resident_phone = CharField(max_length=None,
                               min_length=None,
                               allow_blank=False,
                               trim_whitespace=True)
    latitude = DecimalField(max_digits=18, decimal_places=15)
    longitude = DecimalField(max_digits=18, decimal_places=15)

    class Meta:
        ref_name = 'DwellingDetail'


class DwellingWaterMeterMonthConsumptionSerializer(Serializer):
    """
    Dwelling Month Water Consumption Serializer
    """
    id = IntegerField()
    date = DateField()
    month_consumption = IntegerField()

    class Meta:
        ref_name = 'DwellingWaterMonthConsumption'
