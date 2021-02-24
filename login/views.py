from dwelling.models import DwellingOwner, DwellingResident
from address.models import Address, FullAddress, UserFullAddress
from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist
from drf_yasg.utils import swagger_auto_schema
from dwelling.serializers import DwellingDetailSerializer
from phone.models import Phone, UserPhone
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.status import HTTP_404_NOT_FOUND
from rest_framework.views import APIView

from login.serializers import (UserAddressUpdateSerializer, UserCustomDetailSerializer,
                               UserUpdatePhoneSerializer)

TAG = 'user'


class UserCustomDetailListView(APIView):
    permission_classes = [AllowAny]

    @swagger_auto_schema(
        responses={200: UserCustomDetailSerializer(many=True)},
        tags=[TAG],
    )
    def get(self, request):
        """
        Return list of users with custom details.
        """
        list_of_serialized = []
        for user in User.objects.all():

            user_full_address = UserFullAddress.objects.get(
                user=user, main=True).full_address

            user_phone_number = ''
            try:
                user_phone = UserPhone.objects.get(user=user, main=True)
                if user_phone:
                    user_phone_number = user_phone.phone.phone_number
            except ObjectDoesNotExist:
                pass

            data = {
                "id": user.id,
                "first_name": user.first_name,
                "last_name": user.last_name,
                "phone": user_phone_number,
                "email": user.email,
                "street": user_full_address.address.street,
                "number": user_full_address.number,
                "flat": user_full_address.flat,
                "gate": user_full_address.gate,
                "town": user_full_address.town
            }
            list_of_serialized.append(
                UserCustomDetailSerializer(data, many=False).data)

        return Response(list_of_serialized)


class UserDwellingDetailView(APIView):
    permission_classes = [AllowAny]

    @swagger_auto_schema(
        responses={200: DwellingDetailSerializer(many=True)},
        tags=[TAG],
    )
    def get(self, request, pk):
        """
        Return list of user Dwelling
        """
        attrList = []
        attrList.extend(
            list(map(lambda x: x.dwelling, DwellingOwner.objects.filter(user__id=pk))))
        attrList.extend(
            list(map(lambda x: x.dwelling, DwellingResident.objects.filter(user__id=pk))))

        list_of_serialized = []
        for dwelling in attrList:
            user = dwelling.get_resident().user

            user_full_address = UserFullAddress.objects.get(
                user=user, main=True).full_address

            user_phone_number = ''
            try:
                user_phone = UserPhone.objects.get(user=user, main=True)
                if user_phone:
                    user_phone_number = user_phone.phone.phone_number
            except ObjectDoesNotExist:
                pass

            data = {
                'id': dwelling.id,
                'street': user_full_address.address.street,
                'number': user_full_address.number,
                'flat': user_full_address.flat,
                'gate': user_full_address.gate,
                'town': user_full_address.town,
                'resident_first_name': user.first_name,
                'resident_phone': user_phone_number,
            }
            list_of_serialized.append(
                DwellingDetailSerializer(data, many=False).data)

        return Response(list_of_serialized)


def update_all_phones_to_not_main(user_id):
    try:
        user_phone = UserPhone.objects.get(user__id=user_id, main=True)
        user_phone.main = False
        user_phone.save()
    except ObjectDoesNotExist:
        pass


def get_all_user_phones_serialized(user):
    list_of_serialized = []
    for phone_iteration in UserPhone.objects.filter(user=user):
        data = {
            "phone": phone_iteration.phone.phone_number,
            "main": phone_iteration.main,
        }
        list_of_serialized.append(
            UserUpdatePhoneSerializer(data, many=False).data)

    return Response(list_of_serialized)


class UserCreatePhoneView(APIView):
    permission_classes = [AllowAny]

    @swagger_auto_schema(
        request_body=UserUpdatePhoneSerializer,
        responses={200: UserUpdatePhoneSerializer(many=True)},
        tags=[TAG],
    )
    def post(self, request, pk):
        """
        Add new Phone to User
        """
        user = User.objects.get(id=pk)
        # extract data
        new_phone = request.data.pop('phone')
        main = request.data.pop('main')
        # if new is main change others as not main
        if main:
            update_all_phones_to_not_main(pk)
        # create a new user phone
        UserPhone.objects.create(
            user=user, phone=Phone.objects.create(phone_number=new_phone), main=main)

        return get_all_user_phones_serialized(user)

    @swagger_auto_schema(
        responses={200: UserUpdatePhoneSerializer(many=True)},
        tags=[TAG],
    )
    def get(self, request, pk):
        """
        Return list of user Phones
        """
        user = User.objects.get(id=pk)
        return get_all_user_phones_serialized(user)


class UserUpdateDeletePhoneView(APIView):
    permission_classes = [AllowAny]

    @ swagger_auto_schema(
        request_body=UserUpdatePhoneSerializer,
        responses={200: UserUpdatePhoneSerializer(many=True)},
        tags=[TAG],
    )
    def put(self, request, pk, phone_id):
        """
        Update phone of user
        """
        # get current user phone
        current_user_phone = UserPhone.objects.get(
            user__id=pk, phone__id=phone_id)
        # extract data
        new_phone = request.data.pop('phone')
        main = request.data.pop('main')
        # if new is main change others as not main
        if main:
            update_all_phones_to_not_main(pk)
        # update phone with new data
        current_user_phone.phone.phone_number = new_phone
        current_user_phone.phone.save()
        current_user_phone.main = main
        current_user_phone.save()

        data = {
            "phone": current_user_phone.phone.phone_number,
            "main": current_user_phone.main,
        }

        return Response(
            UserUpdatePhoneSerializer(data, many=False).data)

    @swagger_auto_schema(
        tags=[TAG],
    )
    def delete(self, request, pk, phone_id):
        """
        Delete Phone of User
        """
        user_phone = UserPhone.objects.get(user__id=pk, phone__id=phone_id)
        if user_phone.main:
            return Response({'status': 'cannot delete main phone'}, status=HTTP_404_NOT_FOUND)
        user_phone.delete()
        user_phone.phone.delete()
        return Response({'status': 'delete successfull!'})


def update_all_user_full_address_to_not_main(user_id):
    try:
        user_address = UserFullAddress.objects.get(user__id=user_id, main=True)
        user_address.main = False
        user_address.save()
    except ObjectDoesNotExist:
        pass


def get_all_user_full_address_serialized(user):
    list_of_serialized = []
    for address_iteration in UserFullAddress.objects.filter(user=user):
        full_address = address_iteration.full_address
        data =   {
            "id": address_iteration.id,
            "full_address": {
                "address": {
                    "id": full_address.address.id,
                    "street": full_address.address.street,
                    "is_external": full_address.address.is_external
                },
                "id": full_address.id,
                "number": full_address.number,
                "flat": full_address.flat,
                "gate": full_address.gate,
                "town": full_address.town,
            },
            "main": address_iteration.main
        }
        list_of_serialized.append(
            UserAddressUpdateSerializer(data, many=False).data)

    return Response(list_of_serialized)


class UserCreateAddressView(APIView):
    permission_classes = [AllowAny]

    @swagger_auto_schema(
        request_body=UserAddressUpdateSerializer,
        responses={200: UserAddressUpdateSerializer(many=True)},
        tags=[TAG],
    )
    def post(self, request, pk):
        """
        Add new User Full Address
        """
        user = User.objects.get(id=pk)
        # extract data
        full_address = request.data.pop('full_address')
        main = request.data.pop('main')
        # if new is main change others as not main
        if main:
            update_all_user_full_address_to_not_main(pk)
        # create a new full address
        self.create_address(user, full_address, main)

        return get_all_user_full_address_serialized(user)

    @classmethod
    def create_address(cls, user, validated_data, main):
        # Extract Address data
        address_data = validated_data.pop('address')
        street = address_data.pop('street')
        is_external = address_data.pop('is_external')

        # Create Address
        new_address = Address.objects.create(
            street=street, is_external=is_external)

        # Extract Full Address data
        number = validated_data.pop('number')
        flat = validated_data.pop('flat')
        gate = validated_data.pop('gate')
        town = validated_data.pop('town')

        # Create Full Address
        new_full_address = FullAddress.objects.create(
            address=new_address, number=number, flat=flat, gate=gate, town=town)

        # Create User Full Address
        UserFullAddress.objects.create(
            user=user, full_address=new_full_address, main=main)

    @swagger_auto_schema(
        responses={200: UserAddressUpdateSerializer(many=True)},
        tags=[TAG],
    )
    def get(self, request, pk):
        """
        Return list of User Full Address
        """
        user = User.objects.get(id=pk)
        return get_all_user_full_address_serialized(user)
