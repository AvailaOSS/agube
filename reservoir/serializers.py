from address.models import Address
from address.serializers import AddressSerializer
from django.contrib.auth.models import User
from dwelling.assemblers import (get_all_user_address_serialized,
                                 get_user_phones_serialized)
from login.serializers import UserCreateSerializer
from rest_framework.fields import CharField, ReadOnlyField
from rest_framework.relations import PrimaryKeyRelatedField
from rest_framework.serializers import ModelSerializer, Serializer
from watermeter.serializers import WaterMeterSerializer

from reservoir.models import Reservoir, ReservoirOwner
from geolocation.models import Geolocation

class ReservoirSerializer(ModelSerializer):
    """
    Reservoir ModelSerializer
    """
    id = ReadOnlyField()
    release_date = ReadOnlyField()
    discharge_date = ReadOnlyField()
    address = AddressSerializer(many=False, read_only=False)

    class Meta:
        ref_name = 'Reservoir'
        model = Reservoir
        fields = (
            'id',
            'address',
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
    address = AddressSerializer(many=False, read_only=False)
    user_id = PrimaryKeyRelatedField(many=False,
                                     read_only=False,
                                     write_only=True,
                                     queryset=User.objects.all())
    water_meter = WaterMeterSerializer(many=False,
                                       read_only=False,
                                       write_only=True)

    class Meta:
        ref_name = 'ReservoirCreate'
        model = Reservoir
        fields = (
            'id',
            'address',
            'user_id',
            'water_meter',
            'capacity',
            'inlet_flow',
            'outlet_flow',
        )

    def create(self, validated_data):
        # Create address
        validated_data['address'] = self.create_reservoir_address(
            validated_data.pop('address'))
        # Extract user_id & water_meter_code
        user = validated_data.pop('user_id')
        water_meter_code = validated_data.pop('water_meter')['code']
        # Create reservoir
        reservoir: Reservoir = Reservoir.objects.create(**validated_data)
        # Add user to Reservoir
        reservoir.change_current_owner(user)
        # Create water meter
        reservoir.change_current_water_meter(water_meter_code)
        return reservoir

    @classmethod
    def create_reservoir_address(cls, validated_data) -> Address:
        geolocation_data = validated_data.pop('geolocation')
        new_geolocation = Geolocation.objects.create(
            latitude=geolocation_data.pop('latitude'),
            longitude=geolocation_data.pop('longitude'),
            zoom=geolocation_data.pop('zoom'),
            horizontal_degree=geolocation_data.pop('horizontal_degree'),
            vertical_degree=geolocation_data.pop('vertical_degree'))
        
        new_address = Address.objects.create(
            geolocation=new_geolocation,
            is_external=validated_data.pop('is_external'),
            city=validated_data.pop('city'),
            country=validated_data.pop('country'),
            city_district=validated_data.pop('city_district'),
            municipality=validated_data.pop('municipality'),
            postcode=validated_data.pop('postcode'),
            province=validated_data.pop('province'),
            state=validated_data.pop('state'),
            village=validated_data.pop('village'),
            road=validated_data.pop('road'),
            number=validated_data.pop('number'),
            flat=validated_data.pop('flat'),
            gate=validated_data.pop('gate'))
        return new_address
       


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

    class Meta:
        ref_name = 'ReservoirDetail'


def get_reservoir_owner_serialized(
        owner: ReservoirOwner) -> ReservoirOwnerSerializer:
    user = owner.user
    data = {
        "id": owner.id,
        "reservoir_id": owner.reservoir,
        "user": {
            "id": user.id,
            "username": user.username,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "email": user.email,
            "phones": get_user_phones_serialized(user),
            "address": get_all_user_address_serialized(user)
        },
        "release_date": owner.release_date,
        "discharge_date": owner.discharge_date
    }
    return ReservoirOwnerSerializer(data, many=False).data
