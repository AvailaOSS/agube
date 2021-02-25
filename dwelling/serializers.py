from address.models import Address, FullAddress
from login.models import UserFullAddress
from address.serializers import FullAddressSerializer
from django.contrib.auth.models import User
from login.serializers import UserDetailSerializer, UserSerializer
from rest_framework.fields import ReadOnlyField, CharField
from rest_framework.relations import PrimaryKeyRelatedField
from rest_framework.serializers import ModelSerializer, Serializer
from watermeter.models import WaterMeter
from phone.models import Phone, UserPhone
from watermeter.serializers import WaterMeterSerializer

from dwelling.models import Dwelling, DwellingOwner, DwellingResident


class DwellingSerializer(ModelSerializer):
    """
    Dwelling ModelSerializer
    """
    id = ReadOnlyField()
    release_date = ReadOnlyField()
    discharge_date = ReadOnlyField()
    full_address = FullAddressSerializer(many=False, read_only=False)

    class Meta:
        model = Dwelling
        fields = ('id', 'full_address', 'release_date', 'discharge_date',)


class DwellingCreateSerializer(ModelSerializer):
    """
    Dwelling Create ModelSerializer
    """
    id = ReadOnlyField()
    full_address = FullAddressSerializer(many=False, read_only=False)
    owner = UserDetailSerializer(many=False, read_only=False, write_only=True)
    resident = UserDetailSerializer(
        many=False, read_only=False, write_only=True)
    water_meter = WaterMeterSerializer(
        many=False, read_only=False, write_only=True)

    class Meta:
        model = Dwelling
        fields = ('id', 'full_address', 'owner', 'resident', 'water_meter',)

    def create(self, validated_data):
        # Create address
        validated_data['full_address'] = self.create_dwelling_address(
            validated_data.pop('full_address'))
        # Create Owner
        owner = self.create_user(validated_data.pop('owner'))
        # Create Resident
        resident = self.create_user(validated_data.pop('resident'))
        water_meter_data = validated_data.pop('water_meter')
        # Create dwelling
        dwelling = Dwelling.objects.create(**validated_data)
        self.create_water_meter(dwelling, water_meter_data)
        # Add users to Dwelling
        dwelling.add_owner(owner)
        dwelling.add_resident(resident)
        return dwelling

    @classmethod
    def create_dwelling_address(cls, validated_data):
        address_data = validated_data.pop('address')
        town = address_data.pop('town')
        street = address_data.pop('street')
        validated_data['address'] = Address.objects.create(
            town=town, street=street, is_external=False)
        return FullAddress.objects.create(**validated_data)

    @classmethod
    def create_user(cls, validated_data):
        # Extract unnecessary data
        phones = validated_data.pop('phones')
        addresses = validated_data.pop('address')
        # Create User
        user = User.objects.create(**validated_data)
        # first_iteration will be save as main phone/address
        first_iteration = True
        # Create User Phones
        for phone in phones:
            cls.create_phone(user, phone, first_iteration)
            first_iteration = False
        # Create User Address
        first_iteration = True
        for address in addresses:
            cls.create_address(user, address, first_iteration)
            first_iteration = False
        return user

    @classmethod
    def create_phone(cls, user, validated_data, main):
        new_phone = Phone.objects.create(
            phone_number=validated_data.pop('phone_number'))
        UserPhone.objects.create(user=user, phone=new_phone, main=main)

    @classmethod
    def create_address(cls, user, validated_data, main):
        # extract address_data
        address_data = validated_data.pop('address')
        # create addres
        new_address = Address.objects.create(town=address_data.pop(
            'town'), street=address_data.pop('street'), is_external=address_data.pop('is_external'))
        # create full address
        full_address = FullAddress.objects.create(address=new_address, number=validated_data.pop(
            'number'), flat=validated_data.pop('flat'), gate=validated_data.pop('gate'))
        # create user address
        UserFullAddress.objects.create(
            user=user, full_address=full_address, main=main)

    @classmethod
    def create_water_meter(cls, dwelling, validated_data):
        return WaterMeter.objects.create(dwelling=dwelling, code=validated_data['code'])


class DwellingOwnerSerializer(ModelSerializer):
    """
    Dwelling User Owner ModelSerializer
    """
    id = ReadOnlyField()
    dwelling_id = PrimaryKeyRelatedField(many=False, read_only=True)
    user = UserSerializer(many=False)
    release_date = ReadOnlyField()
    discharge_date = ReadOnlyField()

    class Meta:
        model = DwellingOwner
        fields = ('id', 'dwelling_id', 'user',
                  'release_date', 'discharge_date',)


class DwellingResidentSerializer(ModelSerializer):
    """
    Dwelling User Resident ModelSerializer
    """
    id = ReadOnlyField()
    dwelling_id = PrimaryKeyRelatedField(many=False, read_only=True)
    user = UserSerializer(many=False)
    release_date = ReadOnlyField()
    discharge_date = ReadOnlyField()

    class Meta:
        model = DwellingResident
        fields = ('id', 'dwelling_id', 'user',
                  'release_date', 'discharge_date',)


class DwellingDetailSerializer(Serializer):
    """
    Dwelling Detail ModelSerializer
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
    resident_first_name = CharField(
        max_length=None, min_length=None, allow_blank=False, trim_whitespace=True)
    resident_phone = CharField(
        max_length=None, min_length=None, allow_blank=False, trim_whitespace=True)
