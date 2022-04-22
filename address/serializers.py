from rest_framework.serializers import ModelSerializer, ReadOnlyField

from address.models import Address
from geolocation.models import Geolocation
from geolocation.serializers import GeolocationSerializer


class AddressSerializer(ModelSerializer):
    """
    Address ModelSerializer
    """
    id = ReadOnlyField()
    geolocation = GeolocationSerializer(many=False, read_only=False)

    class Meta:
        ref_name = 'Address'
        model = Address
        fields = ('id', 'is_external', 'geolocation', 'city', 'country',
                  'city_district', 'municipality', 'postcode', 'province',
                  'state', 'village', 'road', 'number', 'flat', 'gate')

    def create(self, validated_data):
        geolocation_data = validated_data.pop('geolocation')
        validated_data['geolocation'] = self.__create_geolocation(
            geolocation_data)
        return Address.objects.create(**validated_data)

    @classmethod
    def __create_geolocation(cls, validated_data_address):
        return Geolocation.objects.create(**validated_data_address)
