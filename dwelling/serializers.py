from geolocation.models import Geolocation
from geolocation.serializers import GeolocationSerializer
from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist
from manager.models import Manager
from rest_framework.fields import CharField, ReadOnlyField
from rest_framework.serializers import ModelSerializer, Serializer
from watermeter.serializers import WaterMeterSerializer

from dwelling.exceptions import UserManagerRequiredError
from dwelling.models import Dwelling

from address.assembler import create_geolocation


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
    water_meter = WaterMeterSerializer(many=False,
                                       read_only=False,
                                       write_only=True)

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
        # Create geolocation
        validated_data['geolocation'] = self.create_dwelling_geolocation(
            validated_data.pop('geolocation'))
        # Extract water_meter_code
        water_meter_code: WaterMeterSerializer = validated_data.pop(
            'water_meter')['code']
        # Create dwelling
        dwelling: Dwelling = Dwelling.objects.create(manager=manager,
                                                     **validated_data)
        # Create water meter
        dwelling.change_current_water_meter(water_meter_code)
        return dwelling

    @classmethod
    def create_dwelling_geolocation(cls, validated_data) -> Geolocation:
        return create_geolocation(validated_data)


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
                                 allow_blank=False,
                                 trim_whitespace=True)
    resident_first_name = CharField(max_length=None,
                                    min_length=None,
                                    allow_blank=False,
                                    trim_whitespace=True)
    resident_phone = CharField(max_length=None,
                               min_length=None,
                               allow_blank=False,
                               trim_whitespace=True)

    class Meta:
        ref_name = 'DwellingDetail'
