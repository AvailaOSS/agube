from django.contrib.auth.models import User

from geolocation.serializers import GeolocationSerializer
from user.models import UserGeolocation, UserPhone
from user.serializers import UserGeolocationUpdateSerializer


def get_all_user_geolocation_serialized(user: User):
    list_of_serialized: list[UserGeolocationUpdateSerializer] = \
        __serialize_user_geolocations(UserGeolocation.objects.filter(user=user))
    return list_of_serialized


def __serialize_user_geolocations(user_geolocation_list):
    list_of_serialized: list[UserGeolocationUpdateSerializer] = []

    geolocation_iteration: UserGeolocation
    for geolocation_iteration in user_geolocation_list:
        geolocation = geolocation_iteration.geolocation
        data = {
            "id": geolocation_iteration.id,
            "geolocation": GeolocationSerializer(geolocation).data,
            'main': geolocation_iteration.main,
        }

        list_of_serialized.append(
            UserGeolocationUpdateSerializer(data, many=False).data)

    return list_of_serialized


def get_all_user_phones_serialized(user: User):
    from user.serializers import UserPhoneUpdateSerializer

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
