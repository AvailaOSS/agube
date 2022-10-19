from rest_framework.serializers import ModelSerializer

from address.models import Address


class AddressSerializer(ModelSerializer):
    """
    Address ModelSerializer
    """

    class Meta:
        ref_name = 'Address'
        model = Address
        fields = ('id', 'is_external', 'city', 'country', 'city_district',
                  'municipality', 'postcode', 'province', 'state', 'village',
                  'road')

    def __get_or_create(self, validated_data) -> Address:
        address = Address.objects.get_or_create(**validated_data)[0]
        return address

    def self_get_or_create(self):
        self.is_valid(True)
        return self.__get_or_create(self.validated_data)
