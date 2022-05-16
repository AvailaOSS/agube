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
        validated_data_address = validated_data.get('address')
        new_address = self.__get_or_create_address(validated_data_address)
        new_geolocation = Geolocation.objects.create(
            address=new_address,
            latitude=validated_data.get('latitude'),
            longitude=validated_data.get('longitude'),
            zoom=validated_data.get('zoom'),
            horizontal_degree=validated_data.get('horizontal_degree'),
            vertical_degree=validated_data.get('vertical_degree'),
            number=validated_data.get('number'),
            flat=validated_data.get('flat'),
            gate=validated_data.get('gate'))

        return new_geolocation

    def self_create(self):
        self.is_valid(raise_exception=True)
        return self.create(self.validated_data)

    def update(self, instance: Geolocation, validated_data):
        instance.latitude=validated_data.get('latitude')
        instance.longitude=validated_data.get('longitude')
        instance.zoom=validated_data.get('zoom')
        instance.horizontal_degree=validated_data.get('horizontal_degree')
        instance.vertical_degree=validated_data.get('vertical_degree')
        instance.number=validated_data.get('number')
        instance.flat=validated_data.get('flat')
        instance.gate=validated_data.get('gate')

        validated_data_address = validated_data.get('address')
        instance.address = self.__get_or_create_address(validated_data_address)
        instance.save()
        return instance

    @classmethod
    def __get_or_create_address(cls, validated_data_address) -> Address:
        new_address = Address.objects.get_or_create(
            is_external=validated_data_address.get('is_external'),
            city=validated_data_address.get('city'),
            country=validated_data_address.get('country'),
            city_district=validated_data_address.get('city_district'),
            municipality=validated_data_address.get('municipality'),
            postcode=validated_data_address.get('postcode'),
            province=validated_data_address.get('province'),
            state=validated_data_address.get('state'),
            village=validated_data_address.get('village'),
            road=validated_data_address.get('road'),
        )[0]
        return new_address
