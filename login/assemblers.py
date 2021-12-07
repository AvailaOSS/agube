from django.contrib.auth.models import User

from login.models import UserAddress, UserPhone
from login.serializers import UserAddressUpdateSerializer

def get_all_user_full_address_serialized(user: User):
    list_of_serialized: list[UserAddressUpdateSerializer] = []
    # Main address in 1st place
    list_of_serialized = __serialize_user_addresses(UserAddress.objects.filter(user=user, main=True))
    # Other addresses
    alternative_address_list = UserAddress.objects.filter(user=user, main=False)
    if alternative_address_list:
        list_of_serialized.append(__serialize_user_addresses(alternative_address_list))

    return list_of_serialized

def __serialize_user_addresses(user_address_list):
    list_of_serialized: list[UserAddressUpdateSerializer] = []

    address_iteration: UserAddress
    for address_iteration in user_address_list:
        full_address = address_iteration.full_address
        data = {
            "id": address_iteration.id,
            "full_address": {
                "address": {
                    "id": full_address.address.id,
                    "town": full_address.address.town,
                    "street": full_address.address.street,
                    "is_external": full_address.address.is_external
                },
                "id": full_address.id,
                "number": full_address.number,
                "flat": full_address.flat,
                "gate": full_address.gate
            },
            "main": address_iteration.main
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
            "phone_id" : phone_iteration.phone.id,
            "phone": phone_iteration.phone.phone_number,
            "main": phone_iteration.main,
        }
        list_of_serialized.append(
            UserPhoneUpdateSerializer(data, many=False).data)

    return list_of_serialized
