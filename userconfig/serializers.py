from rest_framework.fields import ReadOnlyField
from rest_framework.serializers import ModelSerializer

from userconfig.models import UserConfig


class UserConfigSerializer(ModelSerializer):
    """
    UserConfig ModelSerializer
    """

    class Meta:
        ref_name = 'UserConfig'
        model = UserConfig
        fields = ('mode', 'lang')
