from address.models import Address
from geolocation.models import Geolocation


def create_geolocation(validated_data) -> Geolocation:
    address_data = validated_data.get('address')
    new_address = Address.objects.get_or_create(
        is_external=address_data.get('is_external'),
        city=address_data.get('city'),
        country=address_data.get('country'),
        city_district=address_data.get('city_district'),
        municipality=address_data.get('municipality'),
        postcode=address_data.get('postcode'),
        province=address_data.get('province'),
        state=address_data.get('state'),
        village=address_data.get('village'),
        road=address_data.get('road'))[0]

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
