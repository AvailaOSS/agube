from address.models import Address
from geolocation.models import Geolocation


def create_address(validated_data) -> Address:
    geolocation_data = validated_data.get('geolocation')
    new_geolocation = Geolocation.objects.create(
        latitude=geolocation_data.get('latitude'),
        longitude=geolocation_data.get('longitude'),
        zoom=geolocation_data.get('zoom'),
        horizontal_degree=geolocation_data.get('horizontal_degree'),
        vertical_degree=geolocation_data.get('vertical_degree'))

    new_address = Address.objects.create(
        geolocation=new_geolocation,
        is_external=validated_data.get('is_external'),
        city=validated_data.get('city'),
        country=validated_data.get('country'),
        city_district=validated_data.get('city_district'),
        municipality=validated_data.get('municipality'),
        postcode=validated_data.get('postcode'),
        province=validated_data.get('province'),
        state=validated_data.get('state'),
        village=validated_data.get('village'),
        road=validated_data.get('road'),
        number=validated_data.get('number'),
        flat=validated_data.get('flat'),
        gate=validated_data.get('gate'))
    return new_address
