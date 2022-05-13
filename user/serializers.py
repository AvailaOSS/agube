from django.contrib.auth.models import User
from geolocation.serializers import GeolocationSerializer
from phone.serializers import PhoneSerializer
from rest_framework.fields import BooleanField, CharField, ReadOnlyField
from rest_framework.serializers import ModelSerializer, Serializer
from person.models import PersonConfig


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
    User Create, phone + geolocation ModelSerializer
    """
    id = ReadOnlyField()
    phones = PhoneSerializer(many=True, read_only=False)
    geolocation = GeolocationSerializer(required=False,
                                        many=True,
                                        read_only=False)

    class Meta:
        ref_name = 'UserCreate'
        model = User
        fields = (
            'id',
            'first_name',
            'last_name',
            'email',
            'phones',
            'geolocation',
        )


class UserDetailSerializer(UserSerializer):
    """
    User Detail, phone + geolocation ModelSerializer
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


class PersonConfigSerializer(UserSerializer):
    """
    User Detail, config ModelSerializer
    """
    id = ReadOnlyField()

    class Meta:
        ref_name = 'PersonConfig'
        model = PersonConfig
        fields = ('mode', 'lang')


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


class UserGeolocationUpdateSerializer(Serializer):
    """
    User Geolocation ModelSerializer
    """
    id = ReadOnlyField()
    geolocation = GeolocationSerializer(many=False, read_only=False)
    main = BooleanField()

    class Meta:
        ref_name = 'UserGeolocation'
