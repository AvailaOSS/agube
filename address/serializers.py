from rest_framework.serializers import ModelSerializer, ReadOnlyField

from address.models import Address


class AddressSerializer(ModelSerializer):
    """
    Address ModelSerializer
    """
    id = ReadOnlyField()

    class Meta:
        ref_name = 'Address'
        model = Address
        fields = ('id', 'is_external', 'city', 'country', 'city_district',
                  'municipality', 'postcode', 'province', 'state', 'village',
                  'road')
