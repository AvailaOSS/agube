from rest_framework.fields import ReadOnlyField
from rest_framework.serializers import ModelSerializer, Serializer, BooleanField

from manager.models import Manager, ManagerConfiguration, ManagerMessage


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
        fields = ('user_id',)


class ManagerConfigurationSerializer(ModelSerializer):
    """
    ManagerConfiguration ModelSerializer
    """

    class Meta:
        ref_name = 'ManagerConfiguration'
        model = ManagerConfiguration
        fields = ('id', 'max_daily_consumption', 'hook_price', 'release_date',
                  'discharge_date')
        read_only_fields = ['release_date', 'discharge_date']

    def create(self, manager: Manager, validated_data):
        return manager.create_configuration(
            validated_data.pop('max_daily_consumption'),
            validated_data.pop('hook_price'))

    def self_create(self, manager: Manager):
        self.is_valid(True)
        return self.create(manager, self.validated_data)


class ManagerMessageSerializer(ModelSerializer):
    class Meta:
        ref_name = 'ManagerMessage'
        model = ManagerMessage
        fields = ('is_active', 'message')
        extra_kwargs = {'is_active': {'required': True}}

    def update(self, instance: ManagerMessage, validated_data):
        instance.is_active = validated_data.get('is_active',
                                                instance.is_active)
        instance.message = validated_data.get('message', instance.message)
        instance.save()
        return instance
