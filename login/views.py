from address.models import UserFullAddress
from phone.models import Phone, UserPhone
from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist
from drf_yasg.utils import swagger_auto_schema
from rest_framework.permissions import AllowAny
from rest_framework.status import HTTP_404_NOT_FOUND
from rest_framework.response import Response
from rest_framework.views import APIView

from login.serializers import UserCustomDetailSerializer, UserUpdatePhoneSerializer

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
