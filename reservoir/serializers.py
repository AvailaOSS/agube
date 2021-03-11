from address.models import Address, FullAddress
from address.serializers import FullAddressSerializer
from django.contrib.auth.models import User
from dwelling.models import Dwelling
from dwelling.serializers import get_all_user_address_serialized, get_user_phones_serialized
from login.serializers import UserDetailSerializer
from rest_framework.fields import CharField, ReadOnlyField
from rest_framework.relations import PrimaryKeyRelatedField
from rest_framework.serializers import ModelSerializer, Serializer
from watermeter.models import WaterMeter
from watermeter.serializers import WaterMeterSerializer

from reservoir.models import Reservoir, ReservoirOwner, ReservoirWaterMeter


class ReservoirSerializer(ModelSerializer):
    """
    Reservoir ModelSerializer
    """
    id = ReadOnlyField()
    release_date = ReadOnlyField()
    discharge_date = ReadOnlyField()
    full_address = FullAddressSerializer(many=False, read_only=False)

    class Meta:
        ref_name = 'Reservoir'
        model = Reservoir
        fields = ('id', 'full_address', 'release_date',
                  'discharge_date', 'capacity', 'inlet_flow', 'outlet_flow',)


class ReservoirCreateSerializer(ModelSerializer):
    """
    Reservoir Create ModelSerializer
    """
    id = ReadOnlyField()
    full_address = FullAddressSerializer(many=False, read_only=False)
    user_id = PrimaryKeyRelatedField(
        many=False,  read_only=False, write_only=True, queryset=User.objects.all())
    water_meter = WaterMeterSerializer(
        many=False, read_only=False, write_only=True)

    class Meta:
        ref_name = 'ReservoirCreate'
        model = Reservoir
        fields = ('id', 'full_address', 'user_id', 'water_meter',
                  'capacity', 'inlet_flow', 'outlet_flow',)

    def create(self, validated_data):
        # Create address
        validated_data['full_address'] = self.create_reservoir_address(
            validated_data.pop('full_address'))
        # Extract user_id & water_meter_code
        user = validated_data.pop('user_id')
        water_meter_code = validated_data.pop('water_meter')['code']
        # Create reservoir
        reservoir = Reservoir.objects.create(**validated_data)
        # Add user to Reservoir
        reservoir.change_current_owner(user)
        # Create water meter
        reservoir.change_current_water_meter(water_meter_code)
        return reservoir

    @classmethod
    def create_reservoir_address(cls, validated_data):
        address_data = validated_data.pop('address')
        town = address_data.pop('town')
        street = address_data.pop('street')
        validated_data['address'] = Address.objects.create(
            town=town, street=street, is_external=False)
        return FullAddress.objects.create(**validated_data)


class ReservoirOwnerSerializer(ModelSerializer):
    """
    Reservoir User Owner ModelSerializer
    """
    id = ReadOnlyField()
    reservoir_id = PrimaryKeyRelatedField(many=False, read_only=True)
    user = UserDetailSerializer(many=False)
    release_date = ReadOnlyField()
    discharge_date = ReadOnlyField()

    class Meta:
        ref_name = 'Owner'
        model = ReservoirOwner
        fields = ('id', 'reservoir_id', 'user',
                  'release_date', 'discharge_date',)


class ReservoirDetailSerializer(Serializer):
    """
    Reservoir Detail ModelSerializer
    """
    id = ReadOnlyField()
    street = CharField(max_length=None, min_length=None,
                       allow_blank=False, trim_whitespace=True)
    number = CharField(max_length=None, min_length=None,
                       allow_blank=False, trim_whitespace=True)
    flat = CharField(max_length=None, min_length=None,
                     allow_blank=False, trim_whitespace=True)
    gate = CharField(max_length=None, min_length=None,
                     allow_blank=False, trim_whitespace=True)
    town = CharField(max_length=None, min_length=None,
                     allow_blank=False, trim_whitespace=True)
    capacity = CharField(max_length=None, min_length=None,
                         allow_blank=False, trim_whitespace=True)
    inlet_flow = CharField(max_length=None, min_length=None,
                           allow_blank=False, trim_whitespace=True)
    outlet_flow = CharField(max_length=None, min_length=None,
                            allow_blank=False, trim_whitespace=True)

    class Meta:
        ref_name = 'ReservoirDetail'


def get_reservoir_owner_serialized(owner: ReservoirOwner):
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
