from address.models import Address, FullAddress
from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist
from drf_yasg.utils import swagger_auto_schema
from dwelling.models import DwellingOwner, DwellingResident
from dwelling.serializers import DwellingDetailSerializer
from phone.models import Phone
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.status import HTTP_404_NOT_FOUND
from rest_framework.views import APIView

from login.models import UserAddress, UserPhone
from login.serializers import (UserAddressUpdateSerializer,
                               UserCustomDetailSerializer,
                               UserPhoneUpdateSerializer)

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

            user_address = UserAddress.objects.get(
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
                "town": user_address.address.town,
                "street": user_address.address.street,
                "number": user_address.number,
                "flat": user_address.flat,
                "gate": user_address.gate
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

            user_address = UserAddress.objects.get(
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
                'town': user_address.address.town,
                'street': user_address.address.street,
                'number': user_address.number,
                'flat': user_address.flat,
                'gate': user_address.gate,
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
            UserPhoneUpdateSerializer(data, many=False).data)

    return Response(list_of_serialized)


class UserCreatePhoneView(APIView):
    permission_classes = [AllowAny]

    @swagger_auto_schema(
        request_body=UserPhoneUpdateSerializer,
        responses={200: UserPhoneUpdateSerializer(many=True)},
        tags=[TAG],
    )
    def post(self, request, pk):
        """
        Add new Phone to User
        """
        try:
            user = User.objects.get(id=pk)
        except ObjectDoesNotExist:
            return Response({'status': 'cannot find user'}, status=HTTP_404_NOT_FOUND)
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
        responses={200: UserPhoneUpdateSerializer(many=True)},
        tags=[TAG],
    )
    def get(self, request, pk):
        """
        Return list of user Phones
        """
        try:
            user = User.objects.get(id=pk)
        except ObjectDoesNotExist:
            return Response({'status': 'cannot find user'}, status=HTTP_404_NOT_FOUND)
        return get_all_user_phones_serialized(user)


class UserPhoneUpdateDeleteView(APIView):
    permission_classes = [AllowAny]

    @ swagger_auto_schema(
        request_body=UserPhoneUpdateSerializer,
        responses={200: UserPhoneUpdateSerializer(many=True)},
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
            UserPhoneUpdateSerializer(data, many=False).data)

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


def update_all_user_address_to_not_main(user_id):
    try:
        user_address = UserAddress.objects.get(user__id=user_id, main=True)
        user_address.main = False
        user_address.save()
    except ObjectDoesNotExist:
        pass


def get_all_user_address_serialized(user):
    list_of_serialized = []
    for address_iteration in UserAddress.objects.filter(user=user):
        full_address = address_iteration.full_address
        data =   {
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
                "gate": full_address.gate,
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
        try:
            user = User.objects.get(id=pk)
        except ObjectDoesNotExist:
            return Response({'status': 'cannot find user'}, status=HTTP_404_NOT_FOUND)
        # extract data
        full_address = request.data.pop('full_address')
        main = request.data.pop('main')
        # if new is main change others as not main
        if main:
            update_all_user_address_to_not_main(pk)
        # create a new full address
        self.create_address(user, full_address, main)

        return get_all_user_address_serialized(user)

    @classmethod
    def create_address(cls, user, validated_data, main):
        # Extract Address data
        address_data = validated_data.pop('address')
        town = address_data.pop('town')
        street = address_data.pop('street')
        is_external = address_data.pop('is_external')

        # Create Address
        new_address = Address.objects.create(
            town=town, street=street, is_external=is_external)

        # Extract Full Address data
        number = validated_data.pop('number')
        flat = validated_data.pop('flat')
        gate = validated_data.pop('gate')

        # Create Full Address
        new_full_address = FullAddress.objects.create(
            address=new_address, number=number, flat=flat, gate=gate)

        # Create User Full Address
        UserAddress.objects.create(
            user=user, full_address=new_full_address, main=main)

    @swagger_auto_schema(
        responses={200: UserAddressUpdateSerializer(many=True)},
        tags=[TAG],
    )
    def get(self, request, pk):
        """
        Return list of User Full Address
        """
        try:
            user = User.objects.get(id=pk)
        except ObjectDoesNotExist:
            return Response({'status': 'cannot find user'}, status=HTTP_404_NOT_FOUND)
        return get_all_user_address_serialized(user)


class UserAddressUpdateDeleteView(APIView):
    permission_classes = [AllowAny]

    @ swagger_auto_schema(
        request_body=UserAddressUpdateSerializer,
        responses={200: UserAddressUpdateSerializer(many=True)},
        tags=[TAG],
    )
    def put(self, request, pk, full_address_id):
        """
        Update user address
        """
        try:
            user = User.objects.get(id=pk)
        except ObjectDoesNotExist:
            return Response({'status': 'cannot find user'}, status=HTTP_404_NOT_FOUND)
        # extract data
        full_address = request.data.pop('full_address')
        main = request.data.pop('main')
        # if new is main change others as not main
        if main:
            update_all_user_address_to_not_main(pk)
        # update phone with new data
        try:
            user_address = UserAddress.objects.get(user__id=pk, full_address__id=full_address_id)
        except ObjectDoesNotExist:
            return Response({'status': 'cannot find user full address'}, status=HTTP_404_NOT_FOUND)
        address = full_address.pop('address')
        user_address.full_address.address.town = address.pop('town')
        user_address.full_address.address.street = address.pop('street')
        user_address.full_address.address.is_external = address.pop('is_external')
        user_address.full_address.address.save()
        user_address.full_address.number = full_address.pop('number')
        user_address.full_address.flat = full_address.pop('flat')
        user_address.full_address.gate = full_address.pop('gate')
        user_address.full_address.save()
        user_address.main = main
        user_address.save()

        return get_all_user_address_serialized(user)

    @swagger_auto_schema(
        tags=[TAG],
    )
    def delete(self, request, pk, full_address_id):
        """
        Delete User address
        """
        try:
            user_address = UserAddress.objects.get(user__id=pk, full_address__id=full_address_id)
        except ObjectDoesNotExist:
            return Response({'status': 'cannot find user full address'}, status=HTTP_404_NOT_FOUND)
        user_address = UserAddress.objects.get(user__id=pk, full_address__id=full_address_id)
        if user_address.main:
            return Response({'status': 'cannot delete main address'}, status=HTTP_404_NOT_FOUND)
        full_address = user_address.full_address
        user_address.delete()
        if full_address.address.is_external:
            full_address.delete()
            full_address.address.delete()
        return Response({'status': 'delete successfull!'})
