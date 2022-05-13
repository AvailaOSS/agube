from owner.models import Owner
from user.serializers import UserCreateSerializer
from rest_framework.fields import ReadOnlyField
from rest_framework.relations import PrimaryKeyRelatedField
from rest_framework.serializers import ModelSerializer


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

    def to_representation(self, instance):
        user_serialized = UserCreateSerializer(instance.user).data

        owner_serialized = {
            'id': instance.id,
            'dwelling_id': instance.dwelling.id,
            'user': user_serialized,
            'release_date': instance.release_date,
            'discharge_date': instance.discharge_date,
        }
        return owner_serialized
