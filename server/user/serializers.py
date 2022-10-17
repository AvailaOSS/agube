from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist
from dwelling.assemblers import create_user_geolocation
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


class UserGeolocationSerializer(ModelSerializer):
    """
    User Geolocation Update Serializer
    """
    geolocation = GeolocationSerializer()

    class Meta:
        ref_name = 'UserGeolocation'
        model = UserGeolocation
        fields = ('id', 'geolocation', 'main')

    def create(self, user: User, validated_data) -> UserGeolocation:
        from user.models import update_geolocation_to_not_main

        new_geolocation = GeolocationSerializer(
            data=validated_data.pop('geolocation')).self_create()
        main = validated_data.pop('main')

        # if new is main change others as not main
        if main:
            update_geolocation_to_not_main(user.id)

        # create a new geolocation
        return create_user_geolocation(user, new_geolocation, main)

    def self_create(self, user: User):
        if self.is_valid(True):
            return self.create(user, self.validated_data)

    def update(self, user: User, geolocation_id,
               validated_data) -> UserGeolocation:
        from user.exceptions import UserGeolocationError, UserGeolocationMainUpdateError
        from user.models import update_geolocation_to_not_main

        geolocation_data = validated_data.pop('geolocation')
        main = validated_data.pop('main')

        # update geolocation
        try:
            user_geolocation: UserGeolocation = UserGeolocation.objects.get(
                user=user, geolocation__id=geolocation_id)
        except ObjectDoesNotExist:
            raise UserGeolocationError

        if user_geolocation.main:
            raise UserGeolocationMainUpdateError

        # if modifiying as main change others as not main
        if main:
            update_geolocation_to_not_main(user.id)

        # update user geolocation
        GeolocationSerializer(data=geolocation_data).self_update(
            user_geolocation.geolocation)

        # update user geolocation
        user_geolocation.main = main
        user_geolocation.save()

        return user_geolocation

    def self_update(self, user: User, geolocation_id) -> UserGeolocation:
        if self.is_valid(True):
            return self.update(user, geolocation_id, self.validated_data)
