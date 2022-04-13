from address.serializers import FullAddressSerializer
from django.contrib.auth.models import User
from phone.serializers import PhoneSerializer
from rest_framework.fields import BooleanField, CharField, ReadOnlyField
from rest_framework.serializers import ModelSerializer, Serializer


class UserSerializer(ModelSerializer):
    """
    User ModelSerializer
    """
    id = ReadOnlyField()

    class Meta:
        ref_name = 'User'
        model = User
        fields = (
            'id',
            'first_name',
            'last_name',
            'email',
        )


class UserCreateSerializer(UserSerializer):
    """
    User Create, phone + address ModelSerializer
    """
    id = ReadOnlyField()
    phones = PhoneSerializer(many=True, read_only=False)
    address = FullAddressSerializer(required=False, many=True, read_only=False)

    class Meta:
        ref_name = 'UserCreate'
        model = User
        fields = (
            'id',
            'first_name',
            'last_name',
            'email',
            'phones',
            'address',
        )


class UserDetailSerializer(UserSerializer):
    """
    User Detail, phone + address ModelSerializer
    """
    id = ReadOnlyField()
    main_phone = PhoneSerializer(
        many=False,
        read_only=False,
    )

    class Meta:
        ref_name = 'UserDetail'
        model = User
        fields = (
            'id',
            'first_name',
            'last_name',
            'email',
            'main_phone',
        )


class UserCustomDetailSerializer(Serializer):
    """
    User Custom Detail ModelSerializer
    """
    id = ReadOnlyField()
    first_name = CharField(max_length=None,
                           min_length=None,
                           allow_blank=False,
                           trim_whitespace=True)
    last_name = CharField(max_length=None,
                          min_length=None,
                          allow_blank=False,
                          trim_whitespace=True)
    phone = CharField(max_length=None,
                      min_length=None,
                      allow_blank=False,
                      trim_whitespace=True)
    email = CharField(max_length=None,
                      min_length=None,
                      allow_blank=False,
                      trim_whitespace=True)
    town = CharField(max_length=None,
                     min_length=None,
                     allow_blank=False,
                     trim_whitespace=True)
    street = CharField(max_length=None,
                       min_length=None,
                       allow_blank=False,
                       trim_whitespace=True)
    number = CharField(max_length=None,
                       min_length=None,
                       allow_blank=False,
                       trim_whitespace=True)
    flat = CharField(max_length=None,
                     min_length=None,
                     allow_blank=False,
                     trim_whitespace=True)
    gate = CharField(max_length=None,
                     min_length=None,
                     allow_blank=False,
                     trim_whitespace=True)

    class Meta:
        ref_name = 'UserDetailCustom'


class UserPhoneUpdateSerializer(Serializer):
    """
    User update phone
    """
    phone_id = ReadOnlyField()
    phone = CharField(max_length=None,
                      min_length=None,
                      allow_blank=False,
                      trim_whitespace=True)
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
