from enum import Enum

from address.models import Address
from address.serializers import AddressSerializer
from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist
from django.utils.crypto import get_random_string
from login.models import UserAddress, UserPhone
from login.serializers import UserCreateSerializer
from manager.models import Manager, Person
from phone.models import Phone
from phone.serializers import PhoneSerializer

from dwelling.models import DwellingOwner, DwellingResident
from dwelling.send import (EmailType, publish_user_created,
                           send_user_creation_email)
from geolocation.models import Geolocation

class PersonTag(Enum):
    OWNER = "Propietario"
    RESIDENT = "Residente"


def create_phone(user: User, validated_data: PhoneSerializer, main: bool):
    new_phone = Phone.objects.create(
        phone_number=validated_data.pop('phone_number'))
    UserPhone.objects.create(user=user, phone=new_phone, main=main)


def create_address(user: User, validated_data: AddressSerializer, main: bool):
    # extract address_data
    geolocation_data = validated_data.pop('geolocation')
    # create geolocation
    new_geolocation = Geolocation.objects.create(
        latitude=geolocation_data.pop('latitude'),
        longitude=geolocation_data.pop('longitude'),
        zoom=geolocation_data.pop('zoom'),
        horizontal_degree=geolocation_data.pop('horizontal_degree'),
        vertical_degree=geolocation_data.pop('vertical_degree'))
    # create address
    new_address = Address.objects.create(
        geolocation=new_geolocation,
        is_external=validated_data.pop('is_external'),
        city=validated_data.pop('city'),
        country=validated_data.pop('country'),
        city_district=validated_data.pop('city_district'),
        municipality=validated_data.pop('municipality'),
        postcode=validated_data.pop('postcode'),
        province=validated_data.pop('province'),
        state=validated_data.pop('state'),
        village=validated_data.pop('village'),
        road=validated_data.pop('road'),
        number=validated_data.pop('number'),
        flat=validated_data.pop('flat'),
        gate=validated_data.pop('gate'))
    # create user address
    UserAddress.objects.create(user=user, address=new_address, main=main)


def create_user(tag: PersonTag, validated_data: UserCreateSerializer,
                manager: Manager):
    # Extract unnecessary data
    phones: list[PhoneSerializer] = validated_data.pop('phones')
    addresses: list[AddressSerializer] = validated_data.pop('address')

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

    # first_iteration will be save as main phone/address
    first_iteration = True
    firstPhone = ''

    # Create User Phones
    for phone in phones:
        if first_iteration:
            firstPhone = phone['phone_number']
        create_phone(user, phone, first_iteration)
        first_iteration = False

    # Create User Address
    first_iteration = True
    for address in addresses:
        create_address(user, address, first_iteration)
        first_iteration = False

    # Important: create Person after create User
    Person.objects.create(manager=manager, user=user)
    if PersonTag.OWNER == tag:
        email_type = EmailType.OWNER_EMAIL
    else:
        email_type = EmailType.RESIDENT_EMAIL

    # send email to user created
    send_user_creation_email(user, email_type)
    # publish that user was created
    publish_user_created(tag, manager, user, firstPhone)

    return user


def get_all_user_address_serialized(user: User):
    list_of_serialized: list[AddressSerializer] = []
    for address_iteration in UserAddress.objects.filter(user=user):
        address = address_iteration.address
        geo = address.geolocation
        geo_data = {
            "id": geo.id,
            "latitude": geo.latitude,
            "longitude": geo.longitude,
            "zoom": geo.zoom,
            "horizontal_degree": geo.horizontal_degree,
            "vertical_degree": geo.vertical_degree,
        }
        data = {
            "id": address.id,
            "geolocation": geo_data,
            "is_external": address.is_external,
            "city": address.city,
            "country": address.country,
            "city_district": address.city_district,
            "municipality": address.municipality,
            "postcode": address.postcode,
            "province": address.province,
            "state": address.state,
            "village": address.village,
            "road": address.road,
            "number": address.number,
            "flat": address.flat,
            "gate": address.gate
        }
        list_of_serialized.append(AddressSerializer(data, many=False).data)

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


def get_dwelling_owner_serialized(owner: DwellingOwner):
    from dwelling.serializers import DwellingOwnerSerializer

    user = owner.user
    data = {
        "id": owner.id,
        "dwelling_id": owner.dwelling,
        "user": {
            "id": user.id,
            "username": user.username,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "email": user.email,
            "phones": get_user_phones_serialized(user),
            "address": get_all_user_address_serialized(user)
        },
        "release_date": owner.release_date,
        "discharge_date": owner.discharge_date
    }
    return DwellingOwnerSerializer(data, many=False).data


def get_dwelling_resident_serialized(resident: DwellingResident):
    from dwelling.serializers import DwellingResidentSerializer
    user = resident.user
    data = {
        "id": resident.id,
        "dwelling_id": resident.dwelling,
        "user": {
            "id": user.id,
            "username": user.username,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "email": user.email,
            "phones": get_user_phones_serialized(user),
            "address": get_all_user_address_serialized(user)
        },
        "release_date": resident.release_date,
        "discharge_date": resident.discharge_date
    }
    return DwellingResidentSerializer(data, many=False).data
