from django.contrib.auth.models import User

from address.serializers import AddressSerializer
from login.models import UserAddress, UserPhone
from login.serializers import UserAddressUpdateSerializer


def get_all_user_full_address_serialized(user: User):
    list_of_serialized: list[UserAddressUpdateSerializer] = \
        __serialize_user_addresses(UserAddress.objects.filter(user=user))
    return list_of_serialized


def __serialize_user_addresses(user_address_list):
    list_of_serialized: list[UserAddressUpdateSerializer] = []

    address_iteration: UserAddress
    for address_iteration in user_address_list:
        address = address_iteration.address

        data = {
            "id": address_iteration.id,
            "address": AddressSerializer(address).data,
            'main': address_iteration.main,
        }

        list_of_serialized.append(
            UserAddressUpdateSerializer(data, many=False).data)

    return list_of_serialized


def get_all_user_phones_serialized(user: User):
    from login.serializers import UserPhoneUpdateSerializer

    list_of_serialized: list[UserPhoneUpdateSerializer] = []

    phone_iteration: UserPhone
    for phone_iteration in UserPhone.objects.filter(user=user):
        data = {
            "phone_id": phone_iteration.phone.id,
            "phone": phone_iteration.phone.phone_number,
            "main": phone_iteration.main,
        }
        list_of_serialized.append(
            UserPhoneUpdateSerializer(data, many=False).data)

    return list_of_serialized
