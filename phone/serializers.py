from rest_framework.fields import ReadOnlyField
from rest_framework.serializers import ModelSerializer

from phone.models import Phone


class PhoneSerializer(ModelSerializer):
    """
    Phone ModelSerializer
    """
    id = ReadOnlyField()

    class Meta:
        model = Phone
        fields = ('id', 'phone_number',)
