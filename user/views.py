from address.models import Address
from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist
from drf_yasg.utils import swagger_auto_schema
from dwelling.assemblers import create_user_geolocation
from dwelling.models import Dwelling, DwellingOwner, DwellingResident
from phone.models import Phone
from rest_framework.response import Response
from rest_framework.status import HTTP_404_NOT_FOUND
from rest_framework.views import APIView
from geolocation.serializers import GeolocationSerializer
from user.assemblers import (get_all_user_geolocation_serialized,
                             get_all_user_phones_serialized)
from user.models import (UserGeolocation, UserPhone,
                         update_geolocation_to_not_main,
                         update_phone_to_not_main)
from user.permissions import IsManagerOfUser, IsUserMatch
from user.serializers import (UserGeolocationUpdateSerializer,
                              UserDetailSerializer, UserPhoneUpdateSerializer,
                              PersonConfigSerializer)
from user.serializers_external import UserDwellingDetailSerializer
from person.models import PersonConfig
from person.models import Person

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
        user = User.objects.get(id=pk)

        phone = UserPhone.objects.get(user=user, main=True)

        data = {
            "id": user.id,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "email": user.email,
            "main_phone": phone.phone,
        }

        return Response(UserDetailSerializer(data, many=False).data)


class UserCustomDetailUpdateView(APIView):
    permission_classes = [IsManagerOfUser | IsUserMatch]

    @swagger_auto_schema(
        operation_id="UpdateUserDetail",
        request_body=UserDetailSerializer,
        responses={200: UserDetailSerializer(many=True)},
        tags=[TAG_USER],
    )
    def put(self, request, pk):
        """
        Return user information details.
        """
        user = User.objects.get(id=pk)

        phone = UserPhone.objects.get(user=user, main=True)

        new_first_name = request.data.pop('first_name')
        new_last_name = request.data.pop('last_name')
        new_email = request.data.pop('email')

        user.first_name = new_first_name
        user.save()
        user.last_name = new_last_name
        user.save()
        user.email = new_email
        user.save()
        data = {
            "id": user.id,
            "first_name": new_first_name,
            "last_name": new_last_name,
            "email": new_email,
            "main_phone": phone.phone,
        }

        return Response(UserDetailSerializer(data, many=False).data)


class ConfigView(APIView):
    permission_classes = [IsManagerOfUser | IsUserMatch]

    @swagger_auto_schema(
        operation_id="getConfig",
        responses={200: PersonConfigSerializer(many=False)},
        tags=[TAG_USER],
    )
    def get(self, request, pk):
        """
        Return user information details.
        """
        person = Person.objects.get(user__id=pk)
        config = person.get_config()
        data = {
            "manager_id": person.id,
            'mode': config.mode,
            'lang': config.lang
        }

        return Response(PersonConfigSerializer(data, many=False).data)


class PersonConfigUpdateView(APIView):
    permission_classes = [IsManagerOfUser | IsUserMatch]

    @swagger_auto_schema(
        operation_id="updateConfig",
        request_body=PersonConfigSerializer,
        responses={200: PersonConfigSerializer(many=True)},
        tags=[TAG_USER],
    )
    def put(self, request, pk):
        """
        Update configure of user
        """
        # get current user Configure
        person = Person.objects.get(user__id=pk)
        current_configure_theme: PersonConfig = person.get_config()
        # extract data
        new_configure_theme = request.data.pop('mode')
        new_configure_lang = request.data.pop('lang')

        # update phone with new data
        current_configure_theme.mode = new_configure_theme
        current_configure_theme.save()
        current_configure_theme.lang = new_configure_lang
        current_configure_theme.save()

        data = {
            "manager_id": person.id,
            "mode": current_configure_theme.mode,
            "lang": current_configure_theme.lang,
        }

        return Response(PersonConfigSerializer(data, many=False).data)


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
            map(
                lambda owner: owner.dwelling,
                DwellingOwner.objects.filter(user__id=pk).exclude(
                    discharge_date__isnull=False)))

        dwelling_list_as_resident: list[Dwelling] = list(
            map(
                lambda resident: resident.dwelling,
                DwellingResident.objects.filter(user__id=pk).exclude(
                    discharge_date__isnull=False)))

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
            address: Address = dwelling.geolocation.address
            data = {
                'id': dwelling.id,
                'water_meter_code': water_meter_code,
                'city': address.city,
                'road': address.road,
                'number': dwelling.geolocation.number,
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


class UserCreateGeolocationView(APIView):
    permission_classes = [IsManagerOfUser | IsUserMatch]

    @swagger_auto_schema(
        operation_id="addUserGeolocation",
        request_body=UserGeolocationUpdateSerializer,
        responses={200: UserGeolocationUpdateSerializer(many=False)},
        tags=[TAG_USER],
    )
    def post(self, request, pk):
        """
        Add new User Geolocation
        """
        try:
            user = User.objects.get(id=pk)
        except ObjectDoesNotExist:
            return Response({'status': 'cannot find user'},
                            status=HTTP_404_NOT_FOUND)
        # extract data
        geolocation = request.data.pop('geolocation')
        main = request.data.pop('main')
        # if new is main change others as not main
        if main:
            update_geolocation_to_not_main(pk)
        # create a new address
        created_user_address = create_user_geolocation(user, geolocation, main)
        return Response(
            UserGeolocationUpdateSerializer(created_user_address).data)

    @swagger_auto_schema(
        operation_id="getUserGeolocation",
        responses={200: UserGeolocationUpdateSerializer(many=True)},
        tags=[TAG_USER],
    )
    def get(self, request, pk):
        """
        Return list of User Geolocation
        """
        try:
            user: User = User.objects.get(id=pk)
            return Response(get_all_user_geolocation_serialized(user))
        except ObjectDoesNotExist:
            return Response({'status': 'cannot find user'},
                            status=HTTP_404_NOT_FOUND)


class UserAddressUpdateDeleteView(APIView):
    permission_classes = [IsManagerOfUser | IsUserMatch]

    @swagger_auto_schema(
        operation_id="updateUserGeolocation",
        request_body=UserGeolocationUpdateSerializer,
        responses={200: UserGeolocationUpdateSerializer(many=False)},
        tags=[TAG_USER],
    )
    def put(self, request, pk, geolocation_id):
        """
        Update user address
        """
        try:
            user: User = User.objects.get(id=pk)
        except ObjectDoesNotExist:
            return Response({'status': 'cannot find user'},
                            status=HTTP_404_NOT_FOUND)
        # extract data
        geolocation_data = request.data.pop('geolocation')
        main = request.data.pop('main')
        # if new is main change others as not main
        if main:
            update_geolocation_to_not_main(pk)
        # update phone with new data
        try:
            user_geolocation: UserGeolocation = UserGeolocation.objects.get(
                user__id=pk, geolocation__id=geolocation_id)
        except ObjectDoesNotExist:
            return Response({'status': 'cannot find user address'},
                            status=HTTP_404_NOT_FOUND)

        if user_geolocation.main:
            return Response({'status': 'cannot update main address'},
                            status=HTTP_404_NOT_FOUND)

        update_this_geolocation = user_geolocation.geolocation

        # FIXME: do not update address, create a new if not exist
        # update_this_address = update_this_geolocation.address
        # address_data = geolocation_data.get('address')
        # update_this_address.city = address_data.get('city')
        # update_this_address.country = address_data.get('country')
        # update_this_address.city_district = address_data.get('city_district')
        # update_this_address.municipality = address_data.get('municipality')
        # update_this_address.postcode = address_data.get('postcode')
        # update_this_address.province = address_data.get('province')
        # update_this_address.state = address_data.get('state')
        # update_this_address.village = address_data.get('village')
        # update_this_address.road = address_data.get('road')
        # update_this_address.save()

        update_this_geolocation.latitude = geolocation_data.get('latitude')
        update_this_geolocation.longitude = geolocation_data.get('longitude')
        update_this_geolocation.zoom = geolocation_data.get('zoom')
        update_this_geolocation.horizontal_degree = geolocation_data.get(
            'horizontal_degree')
        update_this_geolocation.vertical_degree = geolocation_data.get(
            'vertical_degree')
        update_this_geolocation.number = geolocation_data.get('number')
        update_this_geolocation.flat = geolocation_data.get('flat')
        update_this_geolocation.gate = geolocation_data.get('gate')
        update_this_geolocation.save()

        user_geolocation.main = main
        user_geolocation.save()

        # FIXME: use UserGeolocationUpdateSerializer directly instead of manually
        data = {
            "id": user_geolocation.id,
            "geolocation": GeolocationSerializer(update_this_geolocation).data,
            'main': user_geolocation.main,
        }

        return Response(UserGeolocationUpdateSerializer(data, many=False).data)

    @swagger_auto_schema(
        operation_id="deleteUserGeolocation",
        tags=[TAG_USER],
    )
    def delete(self, request, pk, geolocation_id):
        """
        Delete User Geolocation
        """
        try:
            user_geolocation: UserGeolocation = UserGeolocation.objects.get(
                user__id=pk, geolocation__id=geolocation_id)
        except ObjectDoesNotExist:
            return Response({'status': 'cannot find User Geolocation'},
                            status=HTTP_404_NOT_FOUND)

        if user_geolocation.main:
            return Response({'status': 'cannot delete main address'},
                            status=HTTP_404_NOT_FOUND)

        geolocation = user_geolocation.geolocation
        user_geolocation.delete()
        if geolocation.address.is_external:
            geolocation.address.delete()
            geolocation.delete()
        return Response({'status': 'delete successfull!'})
