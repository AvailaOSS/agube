from address.models import Address
from address.serializers import AddressSerializer
from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist
from login.serializers import UserCreateSerializer
from manager.models import Manager
from rest_framework.fields import CharField, ReadOnlyField
from rest_framework.relations import PrimaryKeyRelatedField
from rest_framework.serializers import ModelSerializer, Serializer
from watermeter.models import WaterMeter
from watermeter.serializers import WaterMeterSerializer

from dwelling.exceptions import UserManagerRequiredError
from dwelling.models import Dwelling, DwellingOwner, DwellingResident

from address.assembler import create_address


class DwellingSerializer(ModelSerializer):
    """
    Dwelling ModelSerializer
    """
    id = ReadOnlyField()
    release_date = ReadOnlyField()
    discharge_date = ReadOnlyField()
    address = AddressSerializer(many=False, read_only=False)

    class Meta:
        ref_name = 'Dwelling'
        model = Dwelling
        fields = (
            'id',
            'address',
            'release_date',
            'discharge_date',
        )


class DwellingCreateSerializer(ModelSerializer):
    """
    Dwelling Create ModelSerializer
    """
    id = ReadOnlyField()
    address = AddressSerializer(many=False, read_only=False)
    water_meter = WaterMeterSerializer(many=False,
                                       read_only=False,
                                       write_only=True)

    class Meta:
        ref_name = 'DwellingCreate'
        model = Dwelling
        fields = (
            'id',
            'address',
            'water_meter',
        )

    def create(self, validated_data):
        user: User = self.context.get("request").user
        try:
            manager: Manager = Manager.objects.get(user_id=user.id)
        except ObjectDoesNotExist:
            raise UserManagerRequiredError()
        # Create address
        validated_data['address'] = self.create_dwelling_address(
            validated_data.pop('address'))
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
    def create_dwelling_address(cls, validated_data) -> Address:
        return create_address(validated_data)


class DwellingOwnerSerializer(ModelSerializer):
    """
    Dwelling User Owner ModelSerializer
    """
    id = ReadOnlyField()
    dwelling_id = PrimaryKeyRelatedField(many=False, read_only=True)
    user = UserCreateSerializer(many=False)
    release_date = ReadOnlyField()
    discharge_date = ReadOnlyField()

    class Meta:
        ref_name = 'Owner'
        model = DwellingOwner
        fields = (
            'id',
            'dwelling_id',
            'user',
            'release_date',
            'discharge_date',
        )


class DwellingResidentSerializer(ModelSerializer):
    """
    Dwelling User Resident ModelSerializer
    """
    id = ReadOnlyField()
    dwelling_id = PrimaryKeyRelatedField(many=False, read_only=True)
    user = UserCreateSerializer(many=False)
    release_date = ReadOnlyField()
    discharge_date = ReadOnlyField()

    class Meta:
        ref_name = 'Resident'
        model = DwellingResident
        fields = (
            'id',
            'dwelling_id',
            'user',
            'release_date',
            'discharge_date',
        )


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
        ref_name = 'MyDwellingDetail'
