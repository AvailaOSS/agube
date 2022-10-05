from django.contrib.auth.models import User
from rest_framework.fields import CharField, ReadOnlyField, DecimalField
from rest_framework.relations import PrimaryKeyRelatedField
from rest_framework.serializers import ModelSerializer, Serializer

from dwelling.assemblers import (get_all_user_geolocation_serialized,
                                 get_user_phones_serialized)
from geolocation.serializers import GeolocationSerializer
from reservoir.models import Reservoir, ReservoirOwner
from user.serializers import UserCreateSerializer
from watermeter.serializers import WaterMeterSerializer


class ReservoirResumeSerializer(Serializer):
    """
    Reservoir Resume ModelSerializer
    """
    # FIXME: do it like -> SpringSourceResumeSerializer
    total_reservoirs = ReadOnlyField()

    class Meta:
        ref_name = 'ReservoirResume'


class ReservoirSerializer(ModelSerializer):
    """
    Reservoir ModelSerializer
    """
    id = ReadOnlyField()
    release_date = ReadOnlyField()
    discharge_date = ReadOnlyField()
    geolocation = GeolocationSerializer(many=False, read_only=False)

    class Meta:
        ref_name = 'Reservoir'
        model = Reservoir
        fields = (
            'id',
            'geolocation',
            'release_date',
            'discharge_date',
            'capacity',
            'inlet_flow',
            'outlet_flow',
        )


class ReservoirCreateSerializer(ModelSerializer):
    """
    Reservoir Create ModelSerializer
    """
    id = ReadOnlyField()
    geolocation = GeolocationSerializer(many=False, read_only=False)
    user_id = PrimaryKeyRelatedField(many=False,
                                     read_only=False,
                                     write_only=True,
                                     required=False,
                                     allow_null=True,
                                     queryset=User.objects.all())
    water_meter = WaterMeterSerializer(
        required=False,
        many=False,
        read_only=False,
        write_only=True)

    class Meta:
        ref_name = 'ReservoirCreate'
        model = Reservoir
        fields = (
            'id',
            'geolocation',
            'user_id',
            'water_meter',
            'capacity',
            'inlet_flow',
            'outlet_flow',
        )

    def create(self, validated_data):
        # Create geolocation
        new_geolocation = GeolocationSerializer(
            data=validated_data.pop('geolocation')).self_create()
        # Extract user_id
        user = validated_data.pop('user_id')
        water_meter_exist = False
        if 'water_meter' in validated_data:
            # Extract water_meter_code
            water_meter_code = validated_data.pop('water_meter')['code']
            water_meter_exist = True
        # Create reservoir
        reservoir: Reservoir = Reservoir.objects.create(geolocation=new_geolocation, **validated_data)
        # Add user to Reservoir
        if (user):
            reservoir.change_current_owner(user)
        if water_meter_exist:
            # Create water meter
            reservoir.change_current_water_meter(water_meter_code)
        return reservoir


class ReservoirOwnerSerializer(ModelSerializer):
    """
    Reservoir User Owner ModelSerializer
    """
    id = ReadOnlyField()
    reservoir_id = PrimaryKeyRelatedField(many=False, read_only=True)
    user = UserCreateSerializer(many=False)
    release_date = ReadOnlyField()
    discharge_date = ReadOnlyField()

    class Meta:
        ref_name = 'Owner'
        model = ReservoirOwner
        fields = (
            'id',
            'reservoir_id',
            'user',
            'release_date',
            'discharge_date',
        )

    def to_representation(self, instance: ReservoirOwner):
        reservoir_owner_serialized = {
            "id": instance.id,
            "reservoir_id": instance.reservoir.id,
            "user": {
                "id": instance.user.id,
                "username": instance.user.username,
                "first_name": instance.user.first_name,
                "last_name": instance.user.last_name,
                "email": instance.user.email,
                "phones": get_user_phones_serialized(instance.user),
                "geolocation":
                    get_all_user_geolocation_serialized(instance.user)
            },
            "release_date": instance.release_date,
            "discharge_date": instance.discharge_date
        }
        return reservoir_owner_serialized


class ReservoirDetailSerializer(Serializer):
    """
    Reservoir Detail ModelSerializer
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
    capacity = CharField(max_length=None,
                         min_length=None,
                         allow_blank=False,
                         trim_whitespace=True)
    inlet_flow = CharField(max_length=None,
                           min_length=None,
                           allow_blank=False,
                           trim_whitespace=True)
    outlet_flow = CharField(max_length=None,
                            min_length=None,
                            allow_blank=False,
                            trim_whitespace=True)
    latitude = DecimalField(max_digits=18, decimal_places=15)
    longitude = DecimalField(max_digits=18, decimal_places=15)

    class Meta:
        ref_name = 'ReservoirDetail'


def get_reservoir_owner_serialized(
        owner: ReservoirOwner) -> ReservoirOwnerSerializer:
    return ReservoirOwnerSerializer(owner, many=False).data
