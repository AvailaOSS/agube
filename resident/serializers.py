from rest_framework.fields import ReadOnlyField
from rest_framework.relations import PrimaryKeyRelatedField
from rest_framework.serializers import Serializer
from user.serializers import UserCreateSerializer

from resident.models import Resident


class ResidentSerializer(Serializer):
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
