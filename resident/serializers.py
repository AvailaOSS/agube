from rest_framework.fields import ReadOnlyField, CharField
from rest_framework.relations import PrimaryKeyRelatedField
from rest_framework.serializers import ModelSerializer
from geolocation.serializers import GeolocationSerializer
from user.models import UserPhone
from user.serializers import UserCreateSerializer
from resident.models import Resident


class ResidentDetailSerializer(ModelSerializer):
    """
    User Resident ModelSerializer
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
    email = CharField(max_length=None,
                      min_length=None,
                      allow_blank=False,
                      trim_whitespace=True)
    phone = CharField(max_length=None,
                      min_length=None,
                      allow_blank=False,
                      trim_whitespace=True)
    geolocation = GeolocationSerializer(required=False,
                                        many=True,
                                        read_only=False)

    class Meta:
        ref_name = 'ResidentDetail'

    def to_representation(self, instance: Resident):

        data = {
            'id': instance.id,
            'first_name': instance.user.first_name,
            'last_name': instance.user.last_name,
            'email': instance.user.email,
            'phone': UserPhone.objects.get(user=instance.user, main=True).phone.phone_number,
            'geolocation': GeolocationSerializer(instance.dwelling.geolocation).data,
        }
        return data


class ResidentSerializer(ModelSerializer):
    """
    User Resident ModelSerializer
    """
    id = ReadOnlyField()
    dwelling_id = PrimaryKeyRelatedField(many=False, read_only=True)
    user = UserCreateSerializer(many=False)
    release_date = ReadOnlyField()
    discharge_date = ReadOnlyField()

    class Meta:
        ref_name = 'Resident'
        model = Resident
        fields = (
            'id',
            'dwelling_id',
            'user',
            'release_date',
            'discharge_date',
        )

    def to_representation(self, instance):
        user_serialized = UserCreateSerializer(instance.user).data

        resident_serialized = {
            'id': instance.id,
            'dwelling_id': instance.dwelling.id,
            'user': user_serialized,
            'release_date': instance.release_date,
            'discharge_date': instance.discharge_date,
        }
        return resident_serialized
