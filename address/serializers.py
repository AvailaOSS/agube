from rest_framework.serializers import ModelSerializer, ReadOnlyField

from address.models import Address, FullAddress


class AddressSerializer(ModelSerializer):
    """
    Address ModelSerializer
    """
    id = ReadOnlyField()

    class Meta:
        model = Address
        fields = ('id', 'street', 'is_external',)


class FullAddressSerializer(ModelSerializer):
    """
    FullAddress ModelSerializer
    """
    id = ReadOnlyField()
    address = AddressSerializer(many=False, read_only=False)

    class Meta:
        model = FullAddress
        fields = ('id', 'address', 'number', 'flat', 'gate', 'town',)

    def create(self, validated_data):
        validated_data['address'] = self.__create_address(
            validated_data.pop('address'))
        return Address.objects.create(**validated_data)

    @classmethod
    def __create_address(cls, validated_data_address):
        return Address.objects.create(**validated_data_address)
