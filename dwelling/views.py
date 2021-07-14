from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist
from django.db import transaction
from drf_yasg.utils import swagger_auto_schema
from login.models import UserAddress, UserPhone
from manager.permissions import IsManagerAuthenticated
from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.status import HTTP_404_NOT_FOUND
from rest_framework.views import APIView
from watermeter.models import WaterMeter
from watermeter.serializers import (WaterMeterDetailSerializer,
                                    WaterMeterMeasurementSerializer,
                                    WaterMeterSerializer)

from dwelling.assemblers import (PersonTag, create_user,
                                 get_dwelling_owner_serialized,
                                 get_dwelling_resident_serialized)
from dwelling.exceptions import (IncompatibleUsernameError, InvalidEmailError,
                                 OwnerAlreadyIsResidentError, OwnerIsPaymasterError, PaymasterError,
                                 UserManagerRequiredError)
from dwelling.models import Dwelling
from dwelling.serializers import (DwellingCreateSerializer,
                                  DwellingCreateWithResidentSerializer,
                                  DwellingDetailSerializer,
                                  DwellingOwnerSerializer,
                                  DwellingResidentSerializer,
                                  PaymasterSerializer)

TAG = 'dwelling'


class DwellingListView(APIView):
    permission_classes = [IsManagerAuthenticated]

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
        manager_id = self.request.user.id
        houses = Dwelling.objects.filter(manager__user_id=manager_id)

        list_of_serialized = []
        for dwelling in houses:
            user = dwelling.get_current_resident().user
            water_meter_code = dwelling.get_current_water_meter().code
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
                'water_meter_code': water_meter_code,
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
    permission_classes = [IsManagerAuthenticated]

    @swagger_auto_schema(operation_id="createDwelling", operation_description="create a new Dwelling, the owner will be a resident")
    def post(self, request, *args, **kwargs):
        if 'resident' in request.data:
            return Response({'status': 'This request contains resident, use createDwellingWithResident instead'}, status=HTTP_404_NOT_FOUND)
        try:
            with transaction.atomic():
                return super().post(request, *args, **kwargs)
        except (InvalidEmailError, UserManagerRequiredError) as e:
            return Response({'status': e.message}, status=HTTP_404_NOT_FOUND)


class DwellingCreateWithResidentView(generics.CreateAPIView):
    queryset = Dwelling.objects.all()
    serializer_class = DwellingCreateWithResidentSerializer
    permission_classes = [IsManagerAuthenticated]

    @swagger_auto_schema(operation_id="createDwellingWithResident", operation_description="create a new Dwelling with Resident")
    def post(self, request, *args, **kwargs):
        try:
            with transaction.atomic():
                return super().post(request, *args, **kwargs)
        except (InvalidEmailError, UserManagerRequiredError) as e:
            return Response({'status': e.message}, status=HTTP_404_NOT_FOUND)


class DwellingSetOwnerAsResidentView(generics.GenericAPIView):
    queryset = Dwelling.objects.all()
    serializer_class = DwellingResidentSerializer
    permission_classes = [IsManagerAuthenticated]

    @swagger_auto_schema(
        operation_id="setOwnerAsResident",
        responses={200: DwellingResidentSerializer(many=False)}
    )
    def post(self, request, pk):
        try:
            dwelling = Dwelling.objects.get(id=pk)
            dwelling.set_owner_as_resident()
            resident = dwelling.get_current_resident()
            return Response(get_dwelling_resident_serialized(resident))
        except ObjectDoesNotExist:
            return Response({'status': 'cannot find dwelling or resident'}, status=HTTP_404_NOT_FOUND)
        except OwnerAlreadyIsResidentError as e:
            return Response({'status': e.message}, status=HTTP_404_NOT_FOUND)


class DwellingView(generics.GenericAPIView):
    queryset = Dwelling.objects.all()
    serializer_class = DwellingCreateSerializer
    permission_classes = [AllowAny]

    @swagger_auto_schema(operation_id="getDwelling")
    def get(self, request, pk):
        """
        Get Dwelling by id
        """
        try:
            dwelling = Dwelling.objects.get(id=pk)
            return Response(DwellingCreateSerializer(dwelling, many=False).data)
        except ObjectDoesNotExist:
            return Response({'status': 'cannot find dwelling'}, status=HTTP_404_NOT_FOUND)


class DwellingOwnerView(generics.GenericAPIView):
    queryset = Dwelling.objects.all()
    serializer_class = DwellingOwnerSerializer
    permission_classes = [IsManagerAuthenticated]

    @swagger_auto_schema(operation_id="getCurrentOwner")
    def get(self, request, pk):
        """
        Get Current Owner
        """
        try:
            dwelling = Dwelling.objects.get(id=pk)
            owner = dwelling.get_current_owner()
            return Response(get_dwelling_owner_serialized(owner))
        except ObjectDoesNotExist:
            return Response({'status': 'cannot find dwelling'}, status=HTTP_404_NOT_FOUND)

    @swagger_auto_schema(operation_id="changeCurrentOwner")
    def post(self, request, pk):
        """
        Create a new user owner and discharge the old owner
        """
        try:
            with transaction.atomic():
                dwelling = Dwelling.objects.get(id=pk)
                current_paymaster = dwelling.get_current_paymaster().user
                if dwelling.is_paymaster(current_paymaster):
                    raise OwnerIsPaymasterError(current_paymaster.username)
                user = create_user(
                    PersonTag.OWNER, request.data['user'], dwelling.manager)
                dwelling.change_current_owner(user)
                owner = dwelling.get_current_owner()
                return Response(get_dwelling_owner_serialized(owner))
        except ObjectDoesNotExist:
            return Response({'status': 'cannot find dwelling'}, status=HTTP_404_NOT_FOUND)
        except (PaymasterError, OwnerIsPaymasterError) as e:
            return Response({'status': e.message}, status=HTTP_404_NOT_FOUND)


class DwellingResidentView(generics.GenericAPIView):
    queryset = Dwelling.objects.all()
    serializer_class = DwellingResidentSerializer
    permission_classes = [IsManagerAuthenticated]

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
            resident = dwelling.get_current_resident()
            return Response(get_dwelling_resident_serialized(resident))
        except ObjectDoesNotExist:
            return Response({'status': 'cannot find dwelling'}, status=HTTP_404_NOT_FOUND)

    @swagger_auto_schema(operation_id="changeCurrentResident")
    def post(self, request, pk):
        """
        Create a new user resident and discharge the old resident
        """
        try:
            with transaction.atomic():
                dwelling = Dwelling.objects.get(id=pk)
                user = create_user(
                    PersonTag.RESIDENT, request.data['user'], dwelling.manager)
                dwelling.change_current_resident(user)
                resident = dwelling.get_current_resident()
            return Response(get_dwelling_resident_serialized(resident))
        except ObjectDoesNotExist:
            return Response({'status': 'cannot find dwelling'}, status=HTTP_404_NOT_FOUND)
        except PaymasterError as e:
            return Response({'status': e.message}, status=HTTP_404_NOT_FOUND)


class DwellingWaterMeterView(generics.GenericAPIView):
    queryset = WaterMeter.objects.all()
    serializer_class = WaterMeterSerializer
    permission_classes = [IsManagerAuthenticated]

    @swagger_auto_schema(
        operation_id="getCurrentDwellingWaterMeter",
        responses={200: WaterMeterSerializer(many=False)},
    )
    def get(self, request, pk):
        """
        Get current Water Meter
        """
        try:
            dwelling = Dwelling.objects.get(id=pk)
            water_meter = dwelling.get_current_water_meter()
            return Response(self.get_serializer(water_meter).data)
        except ObjectDoesNotExist:
            return Response({'status': 'cannot find dwelling'}, status=HTTP_404_NOT_FOUND)

    @swagger_auto_schema(operation_id="changeCurrentDwellingWaterMeter")
    def post(self, request, pk):
        """
        Create a new Water Meter and discharge the old Water Meter
        """
        # get Dwelling
        try:
            with transaction.atomic():
                dwelling = Dwelling.objects.get(id=pk)
                # create new Water Meter
                dwelling.change_current_water_meter(request.data['code'])
                new_water_meter = dwelling.get_current_water_meter()
                return Response(self.get_serializer(new_water_meter).data)
        except ObjectDoesNotExist:
            return Response({'status': 'cannot find dwelling'}, status=HTTP_404_NOT_FOUND)


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
        except ObjectDoesNotExist:
            return Response({'status': 'cannot find dwelling'}, status=HTTP_404_NOT_FOUND)


class DwellingPaymasterView(APIView):
    permission_classes = [IsManagerAuthenticated]

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
            return Response(PaymasterSerializer(dwelling.get_current_paymaster(), many=False).data)
        except ObjectDoesNotExist:
            return Response({'status': 'cannot find dwelling'}, status=HTTP_404_NOT_FOUND)

    @swagger_auto_schema(
        operation_id="changePaymaster",
        request_body=PaymasterSerializer,
        responses={200: PaymasterSerializer(many=False)},
        tags=[TAG],
    )
    def post(self, request, pk):
        """
        change Paymaster info
        """
        # Get Dwelling
        try:
            with transaction.atomic():
                dwelling = Dwelling.objects.get(id=pk)
                # extract data
                payment_type = request.data['payment_type']
                iban = request.data['iban']
                username = request.data['username']
                # extract user
                user = User.objects.get(username=username)
                # change paymaster
                current_paymaster = dwelling.change_paymaster(
                    payment_type, iban, user)
                return Response(PaymasterSerializer(current_paymaster, many=False).data)
        except ObjectDoesNotExist as e:
            return Response({'status':  'cannot find user'}, status=HTTP_404_NOT_FOUND)
        except ObjectDoesNotExist:
            return Response({'status': 'cannot find dwelling'}, status=HTTP_404_NOT_FOUND)
        except IncompatibleUsernameError as e:
            return Response({'status':  e.message}, status=HTTP_404_NOT_FOUND)
