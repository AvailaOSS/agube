from rest_framework.fields import CharField, ReadOnlyField
from rest_framework.relations import PrimaryKeyRelatedField
from rest_framework.serializers import ModelSerializer, Serializer

from geolocation.serializers import GeolocationSerializer
from owner.models import Owner
from user.models import UserPhone
from user.serializers import UserCreateSerializer


class OwnerDetailSerializer(Serializer):
    """
    User Owner Serializer
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
                                        many=False,
                                        read_only=False)

    class Meta:
        ref_name = 'OwnerDetail'

    def to_representation(self, instance: Owner):
        data = {
            'id':
                instance.id,
            'first_name':
                instance.user.first_name,
            'last_name':
                instance.user.last_name,
            'email':
                instance.user.email,
            'phone':
                UserPhone.objects.get(user=instance.user,
                                      main=True).phone.phone_number,
            'geolocation':
                GeolocationSerializer(instance.dwelling.geolocation).data,
        }
        return data


class OwnerSerializer(ModelSerializer):
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
        model = Owner
        fields = (
            'id',
            'dwelling_id',
            'user',
            'release_date',
            'discharge_date',
        )

    def to_representation(self, instance: Owner):
        user_serialized = UserCreateSerializer(instance.user).data

        owner_serialized = {
            'id': instance.id,
            'dwelling_id': instance.dwelling.id,
            'user': user_serialized,
            'release_date': instance.release_date,
            'discharge_date': instance.discharge_date,
        }
        return owner_serialized
