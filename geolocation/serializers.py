from rest_framework.serializers import ModelSerializer, ReadOnlyField

from geolocation.models import Geolocation
from address.serializers import AddressSerializer
from address.models import Address


class GeolocationSerializer(ModelSerializer):
    """
    Geolocation ModelSerializer
    """
    id = ReadOnlyField()
    address = AddressSerializer(many=False, read_only=False)

    class Meta:
        ref_name = 'Geolocation'
        model = Geolocation
        fields = (
            'id',
            'address',
            'latitude',
            'longitude',
            'zoom',
            'horizontal_degree',
            'vertical_degree',
            'number',
            'flat',
            'gate',
        )

    def create(self, validated_data):
        address_data = validated_data.pop('address')
        validated_data['address'] = self.__create_address(address_data)
        return Geolocation.objects.create(**validated_data)

    @classmethod
    def __create_address(cls, validated_data_address):
        return Address.objects.create(**validated_data_address)
