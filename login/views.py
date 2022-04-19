from address.models import Address
from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist
from drf_yasg.utils import swagger_auto_schema
from dwelling.models import Dwelling, DwellingOwner, DwellingResident
from login.serializers_external import UserDwellingDetailSerializer
from phone.models import Phone
from manager.permissions import IsManagerAuthenticated
from login.permissions import IsManagerOfUser, IsUserMatch
from rest_framework.response import Response
from rest_framework.status import HTTP_404_NOT_FOUND
from rest_framework.views import APIView
from geolocation.models import Geolocation

from login.assemblers import (get_all_user_full_address_serialized,
                              get_all_user_phones_serialized)
from login.models import (UserAddress, UserPhone, update_address_to_not_main,
                          update_phone_to_not_main)
from login.serializers import (UserAddressUpdateSerializer,
                               UserDetailSerializer, UserPhoneUpdateSerializer)

TAG_USER = 'user'


class UserCustomDetailView(APIView):
    permission_classes = [IsManagerOfUser | IsUserMatch]

    @swagger_auto_schema(
        operation_id="getUserDetail",
        responses={200: UserDetailSerializer(many=False)},
        tags=[TAG_USER],
    )
    def get(self, request, pk):
        """
        Return user information details.
        """
        user = request.user

        phone = UserPhone.objects.get(user=user, main=True)

        data = {
            "id": user.id,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "email": user.email,
            "main_phone": phone.phone,
        }

        return Response(UserDetailSerializer(data, many=False).data)


class UserDwellingDetailView(APIView):
    permission_classes = [IsManagerOfUser | IsUserMatch]

    @swagger_auto_schema(
        operation_id="getDwellingDetail",
        responses={200: UserDwellingDetailSerializer(many=True)},
        tags=[TAG_USER],
    )
    def get(self, request, pk):
        """
        Return list of Dwelling assigned to this user
        """
        dwelling_list_as_owner: list[Dwelling] = list(
            map(lambda owner: owner.dwelling,
                DwellingOwner.objects.filter(user__id=pk)))

        dwelling_list_as_resident: list[Dwelling] = list(
            map(lambda resident: resident.dwelling,
                DwellingResident.objects.filter(user__id=pk)))

        serialized_data_list: list[UserDwellingDetailSerializer] = []
        dwelling_owner_resident_set = set(dwelling_list_as_owner).intersection(
            dwelling_list_as_resident)
        serialized_data_list.extend(
            self.__serialize_user_dwelling_data(dwelling_owner_resident_set,
                                                True, True))

        dwelling_owner_set = set(dwelling_list_as_owner).difference(
            dwelling_owner_resident_set)
        serialized_data_list.extend(
            self.__serialize_user_dwelling_data(dwelling_owner_set,
                                                is_owner=True,
                                                is_resident=False))

        dwelling_resident_set = set(dwelling_list_as_resident).difference(
            dwelling_owner_resident_set)
        serialized_data_list.extend(
            self.__serialize_user_dwelling_data(dwelling_resident_set,
                                                is_resident=True,
                                                is_owner=False))

        return Response(serialized_data_list)

    def __serialize_user_dwelling_data(self, dwelling_list_set, is_owner,
                                       is_resident):
        list_of_serialized: list[UserDwellingDetailSerializer] = []
        for dwelling in dwelling_list_set:
            water_meter_code = dwelling.get_current_water_meter().code

            resident_first_name = ''
            resident_phone_number = ''
            dwelling_resident: DwellingResident = dwelling.get_current_resident(
            )
            if dwelling_resident != None:
                resident_first_name = dwelling_resident.user.first_name
                try:
                    user_phone: UserPhone = UserPhone.objects.get(
                        user=dwelling_resident.user, main=True)
                    if user_phone:
                        resident_phone_number = user_phone.phone.phone_number
                except ObjectDoesNotExist:
                    pass
            address: Address = dwelling.address
            data = {
                'id': dwelling.id,
                'water_meter_code': water_meter_code,
                'city': address.city,
                'road': address.road,
                'number': address.number,
                'resident_first_name': resident_first_name,
                'resident_phone': resident_phone_number,
                'is_owner': is_owner,
                'is_resident': is_resident
            }
            list_of_serialized.append(
                UserDwellingDetailSerializer(data, many=False).data)

        return list_of_serialized


class UserCreatePhoneView(APIView):
    permission_classes = [IsManagerOfUser | IsUserMatch]

    @swagger_auto_schema(
        operation_id="addUserPhone",
        request_body=UserPhoneUpdateSerializer,
        responses={200: UserPhoneUpdateSerializer(many=False)},
        tags=[TAG_USER],
    )
    def post(self, request, pk):
        """
        Add new Phone to User
        """
        try:
            user: User = User.objects.get(id=pk)
        except ObjectDoesNotExist:
            return Response({'status': 'cannot find user'},
                            status=HTTP_404_NOT_FOUND)
        # extract data
        new_phone = request.data.pop('phone')
        main = request.data.pop('main')
        # if new is main change others as not main
        if main:
            update_phone_to_not_main(pk)

        # create a new user phone
        userPhone = UserPhone.objects.create(
            user=user,
            phone=Phone.objects.create(phone_number=new_phone),
            main=main)

        data = {
            "phone_id": userPhone.phone.id,
            "phone": userPhone.phone.phone_number,
            "main": userPhone.main,
        }

        return Response(UserPhoneUpdateSerializer(data, many=False).data)

    @swagger_auto_schema(
        operation_id="getUserPhone",
        responses={200: UserPhoneUpdateSerializer(many=True)},
        tags=[TAG_USER],
    )
    def get(self, request, pk):
        """
        Return list of user Phones
        """
        try:
            user: User = User.objects.get(id=pk)
            return Response(get_all_user_phones_serialized(user))
        except ObjectDoesNotExist:
            return Response({'status': 'cannot find user'},
                            status=HTTP_404_NOT_FOUND)


class UserPhoneUpdateDeleteView(APIView):
    permission_classes = [IsManagerOfUser | IsUserMatch]

    @swagger_auto_schema(
        operation_id="updateUserPhone",
        request_body=UserPhoneUpdateSerializer,
        responses={200: UserPhoneUpdateSerializer(many=True)},
        tags=[TAG_USER],
    )
    def put(self, request, pk, phone_id):
        """
        Update phone of user
        """
        # get current user phone
        current_user_phone: UserPhone = UserPhone.objects.get(
            user__id=pk, phone__id=phone_id)
        # extract data
        new_phone = request.data.pop('phone')
        main = request.data.pop('main')
        # if new is main change others as not main
        if main:
            update_phone_to_not_main(pk)
        # update phone with new data
        current_user_phone.phone.phone_number = new_phone
        current_user_phone.phone.save()
        current_user_phone.main = main
        current_user_phone.save()

        data = {
            "phone": current_user_phone.phone.phone_number,
            "main": current_user_phone.main,
        }

        return Response(UserPhoneUpdateSerializer(data, many=False).data)

    @swagger_auto_schema(
        operation_id="deleteUserPhone",
        tags=[TAG_USER],
    )
    def delete(self, request, pk, phone_id):
        """
        Delete Phone of User
        """
        user_phone: UserPhone = UserPhone.objects.get(user__id=pk,
                                                      phone__id=phone_id)
        if user_phone.main:
            return Response({'status': 'cannot delete main phone'},
                            status=HTTP_404_NOT_FOUND)
        user_phone.delete()
        user_phone.phone.delete()
        return Response({'status': 'delete successfull!'})


class UserCreateAddressView(APIView):
    permission_classes = [IsManagerOfUser | IsUserMatch]

    @swagger_auto_schema(
        operation_id="addUserAddress",
        request_body=UserAddressUpdateSerializer,
        responses={200: UserAddressUpdateSerializer(many=False)},
        tags=[TAG_USER],
    )
    def post(self, request, pk):
        """
        Add new User Address
        """
        try:
            user = User.objects.get(id=pk)
        except ObjectDoesNotExist:
            return Response({'status': 'cannot find user'},
                            status=HTTP_404_NOT_FOUND)
        # extract data
        address = request.data.pop('address')
        main = request.data.pop('main')
        # if new is main change others as not main
        if main:
            update_address_to_not_main(pk)
        # create a new full address
        created_user_address = self.create_address(user, address, main)

        return Response(UserAddressUpdateSerializer(created_user_address).data)

    @classmethod
    def create_address(cls, user, validated_data, main):
        geolocation_data = validated_data.pop('geolocation')
    # create geolocation
        new_geolocation = Geolocation.objects.create(
            latitude=geolocation_data.pop('latitude'),
            longitude=geolocation_data.pop('longitude'),
            zoom=geolocation_data.pop('zoom'),
            horizontal_degree=geolocation_data.pop('horizontal_degree'),
            vertical_degree=geolocation_data.pop('vertical_degree'))
        # Extract Address data
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
        return UserAddress.objects.create(user=user,
                                          address=new_address,
                                          main=main)

    @swagger_auto_schema(
        operation_id="getUserAddress",
        responses={200: UserAddressUpdateSerializer(many=True)},
        tags=[TAG_USER],
    )
    def get(self, request, pk):
        """
        Return list of User Full Address
        """
        try:
            user: User = User.objects.get(id=pk)
            return Response(get_all_user_full_address_serialized(user))
        except ObjectDoesNotExist:
            return Response({'status': 'cannot find user'},
                            status=HTTP_404_NOT_FOUND)


class UserAddressUpdateDeleteView(APIView):
    permission_classes = [IsManagerOfUser | IsUserMatch]

    @swagger_auto_schema(
        operation_id="updateUserAddress",
        request_body=UserAddressUpdateSerializer,
        responses={200: UserAddressUpdateSerializer(many=True)},
        tags=[TAG_USER],
    )
    def put(self, request, pk, full_address_id):
        """
        Update user address
        """
        try:
            user: User = User.objects.get(id=pk)
        except ObjectDoesNotExist:
            return Response({'status': 'cannot find user'},
                            status=HTTP_404_NOT_FOUND)
        # extract data
        address_json = request.data.pop('address')
        main = request.data.pop('main')
        # if new is main change others as not main
        if main:
            update_address_to_not_main(pk)
        # update phone with new data
        try:
            user_address: UserAddress = UserAddress.objects.get(
                user__id=pk, address__id=address_id)
        except ObjectDoesNotExist:
            return Response({'status': 'cannot find user full address'},
                            status=HTTP_404_NOT_FOUND)
        address_data = address_json.pop('address')
        update_this_address = user_address.address
        update_this_address.city = address_data.pop('city')
        update_this_address.country = address_data.pop('country')
        update_this_address.city_district = address_data.pop('city_district')
        update_this_address.municipality = address_data.pop('municipality')
        update_this_address.postcode = address_data.pop('postcode')
        update_this_address.province = address_data.pop('province')
        update_this_address.state = address_data.pop('state')
        update_this_address.village = address_data.pop('village')
        update_this_address.road = address_data.pop('road')
        update_this_address.number = address_data.pop('number')
        update_this_address.flat = address_data.pop('flat')
        update_this_address.gate = address_data.pop('gate')
        update_this_address.save()

        return Response(get_all_user_full_address_serialized(user))

    @swagger_auto_schema(
        operation_id="deleteUserAddress",
        tags=[TAG_USER],
    )
    def delete(self, request, pk, full_address_id):
        """
        Delete User address
        """
        try:
            user_address: UserAddress = UserAddress.objects.get(
                user__id=pk, full_address__id=full_address_id)
        except ObjectDoesNotExist:
            return Response({'status': 'cannot find user full address'},
                            status=HTTP_404_NOT_FOUND)
        user_address = UserAddress.objects.get(
            user__id=pk, full_address__id=full_address_id)
        if user_address.main:
            return Response({'status': 'cannot delete main address'},
                            status=HTTP_404_NOT_FOUND)
        full_address = user_address.full_address
        user_address.delete()
        if full_address.address.is_external:
            full_address.delete()
            full_address.address.delete()
        return Response({'status': 'delete successfull!'})
