from dwelling.exceptions import IncompatibleUsernameError
from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist
from drf_yasg.utils import swagger_auto_schema
from login.models import UserAddress, UserPhone
from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.status import HTTP_404_NOT_FOUND
from rest_framework.views import APIView
from watermeter.models import WaterMeter
from watermeter.serializers import (WaterMeterDetailSerializer,
                                    WaterMeterMeasurementSerializer,
                                    WaterMeterSerializer)

from dwelling.models import Dwelling, DwellingOwner, DwellingResident
from dwelling.serializers import (DwellingCreateSerializer,
                                  DwellingDetailSerializer,
                                  DwellingOwnerSerializer,
                                  DwellingResidentSerializer,
                                  PaymasterSerializer, create_user,
                                  get_dwelling_owner_serialized,
                                  get_dwelling_resident_serialized)

TAG = 'dwelling'


class DwellingListView(APIView):
    permission_classes = [AllowAny]

    @swagger_auto_schema(
        operation_id="getDwellings",
        responses={200: DwellingDetailSerializer(many=True)},
        tags=[TAG],
    )
    def get(self, request):
        """
        Return a list of all Dwelling Detail.
        """
        # Get Dwelling
        dwelling = Dwelling.objects.all()

        list_of_serialized = []
        for house in dwelling:
            user = house.get_current_resident().user
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
                'id': house.id,
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


class DwellingCreateView(generics.CreateAPIView):
    queryset = Dwelling.objects.all()
    serializer_class = DwellingCreateSerializer
    permission_classes = [AllowAny]

    @swagger_auto_schema(operation_id="createDwelling", operation_description="create a new Dwelling")
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)


class DwellingOwnerView(generics.GenericAPIView):
    queryset = Dwelling.objects.all()
    serializer_class = DwellingOwnerSerializer
    permission_classes = [AllowAny]

    @swagger_auto_schema(operation_id="getCurrentOwner")
    def get(self, request, pk):
        """
        Get Current Owner
        """
        try:
            dwelling = Dwelling.objects.get(id=pk)
        except ObjectDoesNotExist:
            return Response({'status': 'cannot find dwelling'}, status=HTTP_404_NOT_FOUND)
        owner = dwelling.get_current_owner()
        return Response(get_dwelling_owner_serialized(owner))

    @swagger_auto_schema(operation_id="changeCurrentOwner")
    def post(self, request, pk):
        """
        Create a new user owner and discharge the old owner
        """
        try:
            dwelling = Dwelling.objects.get(id=pk)
        except ObjectDoesNotExist:
            return Response({'status': 'cannot find dwelling'}, status=HTTP_404_NOT_FOUND)
        user = create_user(request.data['user'])
        dwelling.change_current_owner(user)
        owner = dwelling.get_current_owner()
        return Response(get_dwelling_owner_serialized(owner))


class DwellingResidentView(generics.GenericAPIView):
    queryset = Dwelling.objects.all()
    serializer_class = DwellingResidentSerializer
    permission_classes = [AllowAny]

    @swagger_auto_schema(
        operation_id="getCurrentResident",
        responses={200: DwellingResidentSerializer(many=False)}
    )
    def get(self, request, pk):
        """
        Get current Resident
        """
        try:
            dwelling = Dwelling.objects.get(id=pk)
        except ObjectDoesNotExist:
            return Response({'status': 'cannot find dwelling'}, status=HTTP_404_NOT_FOUND)
        resident = dwelling.get_current_resident()
        return Response(get_dwelling_resident_serialized(resident))

    @swagger_auto_schema(operation_id="changeCurrentResident")
    def post(self, request, pk):
        """
        Create a new user resident and discharge the old resident
        """
        try:
            dwelling = Dwelling.objects.get(id=pk)
        except ObjectDoesNotExist:
            return Response({'status': 'cannot find dwelling'}, status=HTTP_404_NOT_FOUND)
        user = create_user(request.data['user'])
        dwelling.change_current_resident(user)
        resident = dwelling.get_current_resident()
        return Response(get_dwelling_resident_serialized(resident))


class DwellingWaterMeterView(generics.GenericAPIView):
    queryset = WaterMeter.objects.all()
    serializer_class = WaterMeterSerializer
    permission_classes = [AllowAny]

    @swagger_auto_schema(
        operation_id="getCurrentWaterMeter",
        responses={200: WaterMeterSerializer(many=False)},
    )
    def get(self, request, pk):
        """
        Get current Water Meter
        """
        try:
            dwelling = Dwelling.objects.get(id=pk)
        except ObjectDoesNotExist:
            return Response({'status': 'cannot find dwelling'}, status=HTTP_404_NOT_FOUND)
        water_meter = dwelling.get_current_water_meter()
        return Response(self.get_serializer(water_meter).data)

    @swagger_auto_schema(operation_id="changeCurrentWaterMeter")
    def post(self, request, pk):
        """
        Create a new Water Meter and discharge the old Water Meter
        """
        # get Dwelling
        try:
            dwelling = Dwelling.objects.get(id=pk)
        except ObjectDoesNotExist:
            return Response({'status': 'cannot find dwelling'}, status=HTTP_404_NOT_FOUND)
        # create new Water Meter
        dwelling.change_current_water_meter(request.data['code'])
        new_water_meter = dwelling.get_current_water_meter()
        return Response(self.get_serializer(new_water_meter).data)


class DwellingWaterMeterChunkView(APIView):
    permission_classes = [AllowAny]

    @swagger_auto_schema(
        operation_id="getCurrentWaterMeterMeasuresChunk",
        responses={200: WaterMeterDetailSerializer(many=False)},
        tags=[TAG],
    )
    def get(self, request, pk, chunk):
        """
        Return the current Water Meter with measurements chunk.
        """
        # Get Dwelling
        try:
            dwelling = Dwelling.objects.get(id=pk)
        except ObjectDoesNotExist:
            return Response({'status': 'cannot find dwelling'}, status=HTTP_404_NOT_FOUND)
        water_meter = dwelling.get_current_water_meter()

        list_of_water_meter_serialized = []
        for measurement in water_meter.get_measurements_chunk(chunk):

            data = {
                'id': measurement.id,
                'measurement': measurement.measurement,
                'date': measurement.date,
            }
            list_of_water_meter_serialized.append(
                WaterMeterMeasurementSerializer(data, many=False).data)

        data = {
            'id': water_meter.id,
            'code': water_meter.code,
            'release_date': water_meter.release_date,
            'discharge_date': water_meter.discharge_date,
            'water_meter': list_of_water_meter_serialized,
        }

        return Response(WaterMeterDetailSerializer(data, many=False).data)


class DwellingPaymasterView(APIView):
    permission_classes = [AllowAny]

    @swagger_auto_schema(
        operation_id="getPaymaster",
        responses={200: PaymasterSerializer(many=False)},
        tags=[TAG],
    )
    def get(self, request, pk):
        """
        Return Paymaster info
        """
        # Get Dwelling
        try:
            dwelling = Dwelling.objects.get(id=pk)
        except ObjectDoesNotExist:
            return Response({'status': 'cannot find dwelling'}, status=HTTP_404_NOT_FOUND)
        return Response(PaymasterSerializer(dwelling.paymaster, many=False).data)

    @swagger_auto_schema(
        operation_id="updatePaymaster",
        request_body=PaymasterSerializer,
        responses={200: PaymasterSerializer(many=False)},
        tags=[TAG],
    )
    def put(self, request, pk):
        """
        Update Paymaster info
        """
        # Get Dwelling
        try:
            dwelling = Dwelling.objects.get(id=pk)
        except ObjectDoesNotExist:
            return Response({'status': 'cannot find dwelling'}, status=HTTP_404_NOT_FOUND)
        # extract data
        current_paymaster = dwelling.paymaster
        current_paymaster.payment_type = request.data['payment_type']
        current_paymaster.iban = request.data['iban']
        username = request.data['username']
        # get owner
        try:
            owner = DwellingOwner.objects.get(
                dwelling=dwelling, user__username=username, discharge_date=None)
        except ObjectDoesNotExist:
            return Response({'status':  IncompatibleUsernameError(username).message}, status=HTTP_404_NOT_FOUND)
        if owner:
            current_paymaster.user = owner.user
        else:
            # get resident
            try:
                resident = DwellingResident.objects.get(
                    dwelling=dwelling, user__username=username, discharge_date=None)
                current_paymaster.user = resident.user
            except ObjectDoesNotExist:
                return Response({'status':  IncompatibleUsernameError(username).message}, status=HTTP_404_NOT_FOUND)
        # all ok then save
        current_paymaster.save()
        return Response(PaymasterSerializer(current_paymaster, many=False).data)
