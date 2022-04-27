from rest_framework.fields import ReadOnlyField
from rest_framework.serializers import ModelSerializer

from configurethemelang.models import ConfigureThemeLang


class ConfigureThemeLangSerializer(ModelSerializer):
    """
    ConfigureThemeLang ModelSerializer
    """

    class Meta:
        ref_name = 'ConfigureThemeLang'
        model = ConfigureThemeLang
        fields = ('mode', 'lang')
