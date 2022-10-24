from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist
from django.db import transaction
from django.utils.crypto import get_random_string
from enum import Enum

from dwelling.send import (EmailType,
                           send_user_creation_email)
from geolocation.models import Geolocation
from manager.models import Manager
from owner.models import Owner
from person.models import Person
from person.models import PersonConfig
from phone.models import Phone
from phone.serializers import PhoneSerializer
from resident.models import Resident
from user.models import UserGeolocation, UserPhone


# FIXME: the user methods must be moved to login app
class PersonTag(Enum):
    OWNER = "Propietario"
    RESIDENT = "Residente"


# FIXME: pass model objects not validated_data
def create_phone(user: User, validated_data, main: bool):
    new_phone = Phone.objects.create(
        phone_number=validated_data.pop('phone_number'))
    UserPhone.objects.create(user=user, phone=new_phone, main=main)


def create_user_geolocation(user: User, geolocation: Geolocation,
                            main: bool):
    # create user geolocation
    return UserGeolocation.objects.create(
        user=user, geolocation=geolocation, main=main)


# FIXME: pass model objects not validated_data
def create_user(tag: PersonTag, validated_data,
                manager: Manager):
    from geolocation.serializers import GeolocationSerializer
    with transaction.atomic():
        # Extract unnecessary data
        phones: list[PhoneSerializer] = validated_data.pop('phones')
        geolocation_serializer_list: list[GeolocationSerializer] = []
        if 'geolocation' in validated_data:
            geolocation_serializer_list = GeolocationSerializer(data=validated_data.pop('geolocation'), many=True)

        # Generate activation code for the new user
        retry = True
        activation_code = get_random_string(length=6)

        while retry:
            try:
                User.objects.get(username=activation_code)
            except ObjectDoesNotExist:
                retry = False
            activation_code = get_random_string(length=6)

        # Create User
        user: User = User.objects.create(username=activation_code,
                                         **validated_data)
        user.is_active = False
        user.save()

        # first_iteration will be save as main phone/geolocation
        first_iteration = True
        firstPhone = ''

        # Create User Phones
        for phone in phones:
            if first_iteration:
                firstPhone = phone['phone_number']
            create_phone(user, phone, first_iteration)
            first_iteration = False

        # Create User geolocation
        first_iteration = True
        for geolocation_serializer in geolocation_serializer_list:
            create_user_geolocation(user, geolocation_serializer.self_create(), first_iteration)
            first_iteration = False

        # Important: create Person after create User
        person = Person.objects.create(manager=manager, user=user)

        # Set Manager Configuration for this Person
        manager_config = PersonConfig.objects.get(person__user=manager.user)
        PersonConfig.objects.create(person=person,
                                    mode=manager_config.mode,
                                    lang=manager_config.lang)

        if PersonTag.OWNER == tag:
            email_type = EmailType.OWNER_EMAIL
        else:
            email_type = EmailType.RESIDENT_EMAIL

        # send email to user created
        transaction.on_commit(lambda: send_user_creation_email(user, email_type))

    return user


def get_all_user_geolocation_serialized(user: User):
    from geolocation.serializers import GeolocationSerializer
    list_of_serialized: list[GeolocationSerializer] = []
    for geolocation_iteration in UserGeolocation.objects.filter(user=user):
        list_of_serialized.append(GeolocationSerializer(
            geolocation_iteration.geolocation, many=False).data)

    return list_of_serialized


def get_user_phones_serialized(user: User):
    list_of_serialized: list[PhoneSerializer] = []
    for phone_iteration in UserPhone.objects.filter(user=user):
        phone = phone_iteration.phone
        data = {
            "phone_number": phone.phone_number,
            "id": phone.id,
        }
        list_of_serialized.append(PhoneSerializer(data, many=False).data)

    return list_of_serialized


def get_dwelling_owner_serialized(owner: Owner):
    from owner.serializers import OwnerSerializer
    return OwnerSerializer(owner, many=False).data


def get_dwelling_resident_serialized(resident: Resident):
    from resident.serializers import ResidentSerializer
    return ResidentSerializer(resident, many=False).data
