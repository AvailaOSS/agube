from rest_framework.fields import ReadOnlyField
from rest_framework.serializers import ModelSerializer, Serializer, BooleanField

from manager.models import Manager, ManagerConfiguration


class UserIsManagerSerializer(Serializer):
    """
    User Is Manager ModelSerializer
    """
    is_manager = BooleanField()

    class Meta:
        ref_name = 'UserIsManager'


class ManagerSerializer(ModelSerializer):
    """
    Manager ModelSerializer
    """
    user_id = ReadOnlyField()

    class Meta:
        ref_name = 'Manager'
        model = Manager
        fields = ('user_id', )


class ManagerConfigurationSerializer(ModelSerializer):
    """
    ManagerConfiguration ModelSerializer
    """
    id = ReadOnlyField()
    release_date = ReadOnlyField()
    discharge_date = ReadOnlyField()

    class Meta:
        ref_name = 'ManagerConfiguration'
        model = ManagerConfiguration
        fields = (
            'id',
            'max_daily_consumption',
            'hook_price',
            'release_date',
            'discharge_date',
        )
