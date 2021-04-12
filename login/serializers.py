from address.serializers import FullAddressSerializer
from django.contrib.auth.models import User
from phone.serializers import PhoneSerializer
from rest_framework.fields import BooleanField, CharField, ReadOnlyField
from rest_framework.serializers import ModelSerializer, Serializer

from login.models import UserAddress, UserPhone


class UserSerializer(ModelSerializer):
    """
    User ModelSerializer
    """
    id = ReadOnlyField()

    class Meta:
        ref_name = 'User'
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'email',)


class UserDetailSerializer(UserSerializer):
    """
    User Detail, phone + address ModelSerializer
    """
    id = ReadOnlyField()
    phones = PhoneSerializer(many=True, read_only=False)
    address = FullAddressSerializer(many=True, read_only=False)

    class Meta:
        ref_name = 'UserDetail'
        model = User
        fields = ('id', 'username', 'first_name',
                  'last_name', 'email', 'phones', 'address',)


class UserCustomDetailSerializer(Serializer):
    """
    User Custom Detail ModelSerializer
    """
    id = ReadOnlyField()
    first_name = CharField(
        max_length=None, min_length=None, allow_blank=False, trim_whitespace=True)
    last_name = CharField(
        max_length=None, min_length=None, allow_blank=False, trim_whitespace=True)
    phone = CharField(
        max_length=None, min_length=None, allow_blank=False, trim_whitespace=True)
    email = CharField(
        max_length=None, min_length=None, allow_blank=False, trim_whitespace=True)
    town = CharField(max_length=None, min_length=None,
                     allow_blank=False, trim_whitespace=True)
    street = CharField(max_length=None, min_length=None,
                       allow_blank=False, trim_whitespace=True)
    number = CharField(max_length=None, min_length=None,
                       allow_blank=False, trim_whitespace=True)
    flat = CharField(max_length=None, min_length=None,
                     allow_blank=False, trim_whitespace=True)
    gate = CharField(max_length=None, min_length=None,
                     allow_blank=False, trim_whitespace=True)

    class Meta:
        ref_name = 'UserDetailCustom'


class UserPhoneUpdateSerializer(Serializer):
    """
    User update phone
    """
    phone = CharField(
        max_length=None, min_length=None, allow_blank=False, trim_whitespace=True)
    main = BooleanField()

    class Meta:
        ref_name = 'UserPhone'


class UserAddressUpdateSerializer(Serializer):
    """
    User Address ModelSerializer
    """
    id = ReadOnlyField()
    full_address = FullAddressSerializer(many=False, read_only=False)
    main = BooleanField()

    class Meta:
        ref_name = 'UserAddress'


def get_all_user_full_address_serialized(user):
    list_of_serialized = []
    for address_iteration in UserAddress.objects.filter(user=user):
        full_address = address_iteration.full_address
        data = {
            "id": address_iteration.id,
            "full_address": {
                "address": {
                    "id": full_address.address.id,
                    "town": full_address.address.town,
                    "street": full_address.address.street,
                    "is_external": full_address.address.is_external
                },
                "id": full_address.id,
                "number": full_address.number,
                "flat": full_address.flat,
                "gate": full_address.gate
            },
            "main": address_iteration.main
        }
        list_of_serialized.append(
            UserAddressUpdateSerializer(data, many=False).data)

    return list_of_serialized


def get_all_user_phones_serialized(user):
    list_of_serialized = []
    for phone_iteration in UserPhone.objects.filter(user=user):
        data = {
            "phone": phone_iteration.phone.phone_number,
            "main": phone_iteration.main,
        }
        list_of_serialized.append(
            UserPhoneUpdateSerializer(data, many=False).data)

    return list_of_serialized
