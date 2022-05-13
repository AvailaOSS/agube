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
        validated_data['address'] = self.__create_geolocation(address_data)
        return Geolocation.objects.create(**validated_data)

    def update(self, instance: Geolocation, validated_data):
        instance.latitude=validated_data.get('latitude')
        instance.longitude=validated_data.get('longitude')
        instance.zoom=validated_data.get('zoom')
        instance.horizontal_degree=validated_data.get('horizontal_degree')
        instance.vertical_degree=validated_data.get('vertical_degree')
        instance.number=validated_data.get('number')
        instance.flat=validated_data.get('flat')
        instance.gate=validated_data.get('gate')

        validated_address = validated_data.get('address')
        instance.address = Address.objects.get_or_create(
            is_external=validated_address.get('is_external'),
            city=validated_address.get('city'),
            country=validated_address.get('country'),
            city_district=validated_address.get('city_district'),
            municipality=validated_address.get('municipality'),
            postcode=validated_address.get('postcode'),
            province=validated_address.get('province'),
            state=validated_address.get('state'),
            village=validated_address.get('village'),
            road=validated_address.get('road'),
        )[0]
        instance.save()
        return instance

    @classmethod
    def __create_geolocation(cls, validated_data_address):
        return Address.objects.create(**validated_data_address)
