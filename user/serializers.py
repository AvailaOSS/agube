from django.contrib.auth.models import User
from geolocation.serializers import GeolocationSerializer
from phone.serializers import PhoneSerializer
from rest_framework.fields import BooleanField, CharField, ReadOnlyField
from rest_framework.serializers import ModelSerializer, Serializer
from person.models import PersonConfig
from user.models import UserGeolocation, UserPhone


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

    def to_representation(self, instance):
        phones = list(
            map(lambda user_phone: user_phone.phone,
                UserPhone.objects.filter(user=instance)))

        phones_serialized = []
        for phone in phones:
            phones_serialized.append(PhoneSerializer(phone).data)

        geolocations = list(
            map(lambda user_geolocation: user_geolocation.geolocation,
                UserGeolocation.objects.filter(user=instance)))

        geolocations_serialized = []
        for geolocation in geolocations:
            geolocations_serialized.append(
                GeolocationSerializer(geolocation).data)

        user_serialized = {
            'id': instance.id,
            'first_name': instance.first_name,
            'last_name': instance.last_name,
            'email': instance.email,
            'phones': phones_serialized,
            'geolocation': geolocations_serialized,
        }
        return user_serialized


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
