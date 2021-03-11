from phone.serializers import PhoneSerializer
from dwelling.exceptions import IncompatibleUsernameError
from address.models import Address, FullAddress
from address.serializers import FullAddressSerializer
from django.contrib.auth.models import User
from login.models import UserAddress, UserPhone
from login.serializers import UserDetailSerializer
from phone.models import Phone
from rest_framework.fields import CharField, ReadOnlyField
from rest_framework.relations import PrimaryKeyRelatedField
from rest_framework.serializers import ModelSerializer, Serializer
from watermeter.models import WaterMeter
from watermeter.serializers import WaterMeterSerializer

from dwelling.models import Dwelling, DwellingOwner, DwellingResident, Paymaster


def create_phone(user, validated_data, main):
    new_phone = Phone.objects.create(
        phone_number=validated_data.pop('phone_number'))
    UserPhone.objects.create(user=user, phone=new_phone, main=main)


def create_address(user, validated_data, main):
    # extract address_data
    address_data = validated_data.pop('address')
    # create addres
    new_address = Address.objects.create(town=address_data.pop(
        'town'), street=address_data.pop('street'), is_external=address_data.pop('is_external'))
    # create full address
    full_address = FullAddress.objects.create(address=new_address, number=validated_data.pop(
        'number'), flat=validated_data.pop('flat'), gate=validated_data.pop('gate'))
    # create user address
    UserAddress.objects.create(
        user=user, full_address=full_address, main=main)


def create_user(validated_data):
    # Extract unnecessary data
    phones = validated_data.pop('phones')
    addresses = validated_data.pop('address')
    # Create User
    user = User.objects.create(**validated_data)
    # first_iteration will be save as main phone/address
    first_iteration = True
    # Create User Phones
    for phone in phones:
        create_phone(user, phone, first_iteration)
        first_iteration = False
    # Create User Address
    first_iteration = True
    for address in addresses:
        create_address(user, address, first_iteration)
        first_iteration = False
    return user


class PaymasterSerializer(ModelSerializer):
    """
    Paymaster ModelSerializer
    """
    id = ReadOnlyField()
    username = CharField(max_length=None, min_length=None,
                         allow_blank=False, trim_whitespace=True)

    class Meta:
        ref_name = 'Paymaster'
        model = Paymaster
        fields = ('id', 'payment_type', 'iban', 'username',)


class DwellingSerializer(ModelSerializer):
    """
    Dwelling ModelSerializer
    """
    id = ReadOnlyField()
    release_date = ReadOnlyField()
    discharge_date = ReadOnlyField()
    full_address = FullAddressSerializer(many=False, read_only=False)

    class Meta:
        ref_name = 'Dwelling'
        model = Dwelling
        fields = ('id', 'full_address', 'release_date', 'discharge_date',)


class DwellingCreateSerializer(ModelSerializer):
    """
    Dwelling Create ModelSerializer
    """
    id = ReadOnlyField()
    full_address = FullAddressSerializer(many=False, read_only=False)
    paymaster = PaymasterSerializer(
        many=False, read_only=False, write_only=True)
    owner = UserDetailSerializer(many=False, read_only=False, write_only=True)
    resident = UserDetailSerializer(
        many=False, read_only=False, write_only=True)
    water_meter = WaterMeterSerializer(
        many=False, read_only=False, write_only=True)

    class Meta:
        ref_name = 'DwellingCreate'
        model = Dwelling
        fields = ('id', 'full_address', 'paymaster',
                  'owner', 'resident', 'water_meter',)

    def create(self, validated_data):
        # Create address
        validated_data['full_address'] = self.create_dwelling_address(
            validated_data.pop('full_address'))
        # Create Owner
        owner = create_user(validated_data.pop('owner'))
        # Create Resident
        resident = create_user(validated_data.pop('resident'))
        # Extract water_meter_code
        water_meter_code = validated_data.pop('water_meter')['code']
        # Create dwelling
        dwelling = Dwelling.objects.create(**validated_data)
        # Add users to Dwelling
        dwelling.change_current_owner(owner)
        dwelling.change_current_resident(resident)
        # Create water meter
        dwelling.change_current_water_meter(water_meter_code)
        # Create paymaster
        self.create_paymaster(validated_data.pop(
            'paymaster'), dwelling,  owner, resident)
        return dwelling

    @classmethod
    def create_paymaster(cls, validated_data, dwelling, owner, resident):
        payment_type = validated_data.pop('payment_type')
        iban = validated_data.pop('iban')
        username = validated_data.pop('username')
        user_paymaster = None
        if owner.username == username:
            user_paymaster = owner
        elif resident.username == username:
            user_paymaster = resident
        else:
            raise IncompatibleUsernameError(username)
        return dwelling.create_paymaster(payment_type, iban, user_paymaster)

    @classmethod
    def create_dwelling_address(cls, validated_data):
        address_data = validated_data.pop('address')
        town = address_data.pop('town')
        street = address_data.pop('street')
        validated_data['address'] = Address.objects.create(
            town=town, street=street, is_external=False)
        return FullAddress.objects.create(**validated_data)

    @classmethod
    def create_water_meter(cls, dwelling, validated_data):
        return WaterMeter.objects.create(dwelling=dwelling, code=validated_data['code'])


class DwellingOwnerSerializer(ModelSerializer):
    """
    Dwelling User Owner ModelSerializer
    """
    id = ReadOnlyField()
    dwelling_id = PrimaryKeyRelatedField(many=False, read_only=True)
    user = UserDetailSerializer(many=False)
    release_date = ReadOnlyField()
    discharge_date = ReadOnlyField()

    class Meta:
        ref_name = 'Owner'
        model = DwellingOwner
        fields = ('id', 'dwelling_id', 'user',
                  'release_date', 'discharge_date',)


class DwellingResidentSerializer(ModelSerializer):
    """
    Dwelling User Resident ModelSerializer
    """
    id = ReadOnlyField()
    dwelling_id = PrimaryKeyRelatedField(many=False, read_only=True)
    user = UserDetailSerializer(many=False)
    release_date = ReadOnlyField()
    discharge_date = ReadOnlyField()

    class Meta:
        ref_name = 'Resident'
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

    class Meta:
        ref_name = 'DwellingDetail'


def get_all_user_address_serialized(user):
    list_of_serialized = []
    for address_iteration in UserAddress.objects.filter(user=user):
        full_address = address_iteration.full_address
        data = {
            "id": full_address.id,
            "address": {
                "id": full_address.address.id,
                "town": full_address.address.town,
                "street": full_address.address.street,
                "is_external": full_address.address.is_external
            },
            "number": full_address.number,
            "flat": full_address.flat,
            "gate": full_address.gate
        }
        list_of_serialized.append(
            FullAddressSerializer(data, many=False).data)

    return list_of_serialized


def get_user_phones_serialized(user):
    list_of_serialized = []
    for phone_iteration in UserPhone.objects.filter(user=user):
        phone = phone_iteration.phone
        data = {
            "phone_number": phone.phone_number,
            "id": phone.id,
        }
        list_of_serialized.append(
            PhoneSerializer(data, many=False).data)

    return list_of_serialized


def get_dwelling_owner_serialized(owner: DwellingOwner):
    user = owner.user
    data = {
        "id": owner.id,
        "dwelling_id": owner.dwelling,
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
    return DwellingOwnerSerializer(data, many=False).data


def get_dwelling_resident_serialized(resident: DwellingResident):
    user = resident.user
    data = {
        "id": resident.id,
        "dwelling_id": resident.dwelling,
        "user": {
            "id": user.id,
            "username": user.username,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "email": user.email,
            "phones": get_user_phones_serialized(user),
            "address": get_all_user_address_serialized(user)
        },
        "release_date": resident.release_date,
        "discharge_date": resident.discharge_date
    }
    return DwellingResidentSerializer(data, many=False).data
