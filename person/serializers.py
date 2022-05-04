from rest_framework.fields import ReadOnlyField
from rest_framework.serializers import ModelSerializer

from person.models import PersonConfig


class PersonConfigSerializer(ModelSerializer):
    """
    PersonConfig ModelSerializer
    """

    class Meta:
        ref_name = 'PersonConfig'
        model = PersonConfig
        fields = ('mode', 'lang')
