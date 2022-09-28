from rest_framework.serializers import ModelSerializer

from geolocation.models import Geolocation
from address.serializers import AddressSerializer


class GeolocationSerializer(ModelSerializer):
    """
    Geolocation ModelSerializer
    """
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

    def create(self, validated_data) -> Geolocation:
        new_address = AddressSerializer(
            data=validated_data.pop('address')).self_get_or_create()
        new_geolocation = Geolocation.objects.create(address=new_address,
                                                     **validated_data)
        return new_geolocation

    def self_create(self):
        self.is_valid(raise_exception=True)
        return self.create(self.validated_data)

    def update(self, instance: Geolocation, validated_data) -> Geolocation:
        new_address = AddressSerializer(
            data=validated_data.pop('address')).self_get_or_create()
        instance.address = new_address

        instance.latitude = validated_data.get('latitude', instance.latitude)
        instance.longitude = validated_data.get('longitude',
                                                instance.longitude)
        instance.zoom = validated_data.get('zoom', instance.zoom)
        instance.horizontal_degree = validated_data.get(
            'horizontal_degree', instance.horizontal_degree)
        instance.vertical_degree = validated_data.get('vertical_degree',
                                                      instance.vertical_degree)
        instance.number = validated_data.get('number', instance.number)
        instance.flat = validated_data.get('flat', instance.flat)
        instance.gate = validated_data.get('gate', instance.gate)

        instance.save()
        return instance

    def self_update(self, instance: Geolocation):
        self.is_valid(True)
        return self.update(instance, self.validated_data)