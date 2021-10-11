from enum import Enum

from address.models import Address, FullAddress
from address.serializers import AddressSerializer, FullAddressSerializer
from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist
from django.utils.crypto import get_random_string
from login.models import UserAddress, UserPhone
from login.serializers import UserDetailSerializer
from manager.models import Manager, Person
from phone.models import Phone
from phone.serializers import PhoneSerializer

from dwelling.models import DwellingOwner, DwellingResident
from dwelling.send import (EmailType, publish_user_created,
                           send_user_creation_email)


class PersonTag(Enum):
    OWNER = "Propietario"
    RESIDENT = "Residente"


def create_phone(user: User, validated_data: PhoneSerializer, main: bool):
    new_phone = Phone.objects.create(
        phone_number=validated_data.pop('phone_number'))
    UserPhone.objects.create(user=user, phone=new_phone, main=main)


def create_address(user: User, validated_data: AddressSerializer, main: bool):
    # extract address_data
    address_data = validated_data.pop('address')
    # create addres
    new_address = Address.objects.create(
        town=address_data.pop('town'),
        street=address_data.pop('street'),
        is_external=address_data.pop('is_external'))
    # create full address
    full_address = FullAddress.objects.create(
        address=new_address,
        number=validated_data.pop('number'),
        flat=validated_data.pop('flat'),
        gate=validated_data.pop('gate'))
    # create user address
    UserAddress.objects.create(user=user, full_address=full_address, main=main)


def create_user(tag: PersonTag, validated_data: UserDetailSerializer,
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
    list_of_serialized: list[FullAddressSerializer] = []
    for address_iteration in UserAddress.objects.filter(user=user):
        full_address = address_iteration.full_address
        data = {
            "id": full_address.id,
            "address": {
                "id": full_address.address.id,
                "town": full_address.address.town,
                "street": full_address.address.street,
                "is_external": full_address.address.is_external
            },
            "number": full_address.number,
            "flat": full_address.flat,
            "gate": full_address.gate
        }
        list_of_serialized.append(FullAddressSerializer(data, many=False).data)

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
