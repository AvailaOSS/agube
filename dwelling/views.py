from address.models import Address
from django.core.exceptions import ObjectDoesNotExist
from django.db import transaction
from drf_yasg.utils import swagger_auto_schema
from owner.models import Owner
from owner.serializers import OwnerSerializer
from resident.models import Resident
from resident.serializers import ResidentSerializer
from user.models import UserPhone
from rest_framework.permissions import IsAuthenticated
from manager.permissions import IsManagerAuthenticated
from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.status import HTTP_404_NOT_FOUND
from rest_framework.views import APIView
from watermeter.models import WaterMeter, WaterMeterMeasurement
from watermeter.serializers import (WaterMeterDetailSerializer,
                                    WaterMeterMeasurementSerializer,
                                    WaterMeterSerializer)

from dwelling.assemblers import (PersonTag, create_user,
                                 get_dwelling_owner_serialized,
                                 get_dwelling_resident_serialized)
from dwelling.exceptions import (EmailValidationError, InvalidEmailError,
                                 OwnerAlreadyIsResidentError,
                                 UserManagerRequiredError)
from dwelling.models import Dwelling, DwellingWaterMeter
from dwelling.serializers import (DwellingResumeSerializer,
                                  DwellingCreateSerializer,
                                  DwellingDetailSerializer)

TAG = 'dwelling'


class DwellingResumeView(APIView):
    permission_classes = [IsManagerAuthenticated]

    @swagger_auto_schema(
        operation_id="getDwellingResume",
        operation_description="get Resume of the Dwellings",
        responses={200: DwellingResumeSerializer(many=False)},
        tags=[TAG],
    )
    def get(self, request, *args, **kwargs):
        manager = self.request.user
        total_dwellings = Dwelling.objects.filter(
            manager__user=manager, discharge_date__isnull=True).count()

        total_residents = Resident.objects.filter(
            dwelling__manager__user=manager).count()

        total_owners = Owner.objects.filter(
            dwelling__manager__user=manager).count()

        data = {
            'total_dwellings': total_dwellings,
            'total_residents': total_residents,
            'total_owners': total_owners
        }
        return Response(DwellingResumeSerializer(data, many=False).data)


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
        houses: list[Dwelling] = Dwelling.objects.filter(
            manager__user_id=manager_id, discharge_date__isnull=True)

        list_of_serialized: list[DwellingDetailSerializer] = []
        for dwelling in houses:
            water_meter_code: str = dwelling.get_current_water_meter().code

            resident_first_name = ''
            user_phone_number = ''

            has_resident = dwelling.get_current_resident()
            if has_resident:
                resident = has_resident.user
                resident_first_name = resident.first_name
                try:
                    user_phone: UserPhone = UserPhone.objects.get(
                        user=resident, main=True)
                    if user_phone:
                        user_phone_number = user_phone.phone.phone_number
                except ObjectDoesNotExist:
                    pass

            address: Address = dwelling.geolocation.address
            data = {
                'id': dwelling.id,
                'city': address.city,
                'road': address.road,
                'number': dwelling.geolocation.number,
                'water_meter_code': water_meter_code,
                'resident_first_name': resident_first_name,
                'resident_phone': user_phone_number,
                'latitude': dwelling.geolocation.latitude,
                'longitude': dwelling.geolocation.longitude,
            }

            list_of_serialized.append(
                DwellingDetailSerializer(data, many=False).data)

        return Response(list_of_serialized)


class DwellingCreateView(generics.CreateAPIView):
    queryset = Dwelling.objects.all()
    serializer_class = DwellingCreateSerializer
    permission_classes = [IsManagerAuthenticated]

    @swagger_auto_schema(operation_id="createDwelling",
                         operation_description="create a new Dwelling")
    def post(self, request, *args, **kwargs):
        try:
            with transaction.atomic():
                return super().post(request, *args, **kwargs)
        except (InvalidEmailError, EmailValidationError,
                UserManagerRequiredError) as e:
            return Response({'status': e.message}, status=HTTP_404_NOT_FOUND)


class DwellingSetOwnerAsResidentView(APIView):
    permission_classes = [IsManagerAuthenticated]

    @swagger_auto_schema(
        operation_id="setOwnerAsResident",
        responses={200: ResidentSerializer(many=False)})
    def post(self, request, pk):
        try:
            dwelling: Dwelling = Dwelling.objects.get(id=pk)
            dwelling.set_owner_as_resident()
            resident = dwelling.get_current_resident()
            return Response(get_dwelling_resident_serialized(resident))
        except ObjectDoesNotExist:
            return Response({'status': 'cannot find dwelling or resident'},
                            status=HTTP_404_NOT_FOUND)
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
            dwelling: Dwelling = Dwelling.objects.get(id=pk)
            return Response(
                DwellingCreateSerializer(dwelling, many=False).data)
        except ObjectDoesNotExist:
            return Response({'status': 'cannot find dwelling'},
                            status=HTTP_404_NOT_FOUND)


class DwellingOwnerView(generics.GenericAPIView):
    queryset = Dwelling.objects.all()
    serializer_class = OwnerSerializer
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(operation_id="getCurrentOwner",
                         responses={200: OwnerSerializer(many=False)})
    def get(self, request, pk):
        """
        Get Current Owner
        """
        try:
            dwelling: Dwelling = Dwelling.objects.get(id=pk)
            owner = dwelling.get_current_owner()
            if not owner:
                return Response({'status': 'cannot find Current Owner'},
                                status=HTTP_404_NOT_FOUND)
            return Response(get_dwelling_owner_serialized(owner))
        except ObjectDoesNotExist:
            return Response({'status': 'cannot find dwelling'},
                            status=HTTP_404_NOT_FOUND)

    @swagger_auto_schema(operation_id="changeCurrentOwner")
    def post(self, request, pk):
        """
        Create a new user owner and discharge the old owner
        """
        try:
            with transaction.atomic():
                dwelling: Dwelling = Dwelling.objects.get(id=pk)
                user = create_user(PersonTag.OWNER, request.data['user'],
                                   dwelling.manager)
                dwelling.change_current_owner(user)
                owner = dwelling.get_current_owner()
                return Response(get_dwelling_owner_serialized(owner))
        except ObjectDoesNotExist:
            return Response({'status': 'cannot find dwelling'},
                            status=HTTP_404_NOT_FOUND)


class DwellingResidentView(generics.GenericAPIView):
    queryset = Dwelling.objects.all()
    serializer_class = ResidentSerializer
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        operation_id="getCurrentResident",
        responses={200: ResidentSerializer(many=False)})
    def get(self, request, pk):
        """
        Get current Resident
        """
        try:
            dwelling: Dwelling = Dwelling.objects.get(id=pk)
            resident = dwelling.get_current_resident()
            if not resident:
                return Response({'status': 'cannot find current resident'},
                                status=HTTP_404_NOT_FOUND)
            return Response(get_dwelling_resident_serialized(resident))
        except ObjectDoesNotExist:
            return Response({'status': 'cannot find dwelling'},
                            status=HTTP_404_NOT_FOUND)

    @swagger_auto_schema(operation_id="changeCurrentResident")
    def post(self, request, pk):
        """
        Create a new user resident and discharge the old resident
        """
        try:
            with transaction.atomic():
                dwelling: Dwelling = Dwelling.objects.get(id=pk)
                user = create_user(PersonTag.RESIDENT, request.data['user'],
                                   dwelling.manager)
                dwelling.change_current_resident(user)
                resident = dwelling.get_current_resident()
            return Response(get_dwelling_resident_serialized(resident))
        except ObjectDoesNotExist:
            return Response({'status': 'cannot find dwelling'},
                            status=HTTP_404_NOT_FOUND)


class DwellingWaterMeterHistoricalView(APIView):
    permission_classes = [IsManagerAuthenticated]

    @swagger_auto_schema(
        operation_id="getCurrentDwellingWaterMeterHistorical",
        responses={200: WaterMeterDetailSerializer(many=True)},
    )
    def get(self, request, pk):
        try:
            water_serialized = []
            dwelling: Dwelling = Dwelling.objects.get(id=pk)
            water_meters = dwelling.get_historical_water_meter()
            for water_meter in water_meters:
                measures = water_meter.get_measurements()
                measures_serialized = []
                for measure in measures:
                    data = {
                        'id': measure.id,
                        'measurement': measure.measurement,
                        'date': measure.date,
                    }
                    measures_serialized.append(
                        WaterMeterMeasurementSerializer(data, many=False).data)
                data = {
                    'id': water_meter.id,
                    'code': water_meter.code,
                    'release_date': water_meter.release_date,
                    'discharge_date': water_meter.discharge_date,
                    'measures': measures_serialized
                }
                water_serialized.append(
                    WaterMeterDetailSerializer(data, many=False).data)

            return Response(water_serialized)
        except ObjectDoesNotExist:
            return Response({'status': 'cannot find dwelling'},
                            status=HTTP_404_NOT_FOUND)


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
            dwelling: Dwelling = Dwelling.objects.get(id=pk)
            water_meter = dwelling.get_current_water_meter()
            return Response(self.get_serializer(water_meter).data)
        except ObjectDoesNotExist:
            return Response({'status': 'cannot find dwelling'},
                            status=HTTP_404_NOT_FOUND)

    @swagger_auto_schema(operation_id="changeCurrentDwellingWaterMeter")
    def post(self, request, pk):
        """
        Create a new Water Meter and discharge the old Water Meter
        """
        # get Dwelling
        try:
            with transaction.atomic():
                dwelling: Dwelling = Dwelling.objects.get(id=pk)
                # create new Water Meter
                dwelling.change_current_water_meter(request.data['code'])
                new_water_meter = dwelling.get_current_water_meter()
                return Response(self.get_serializer(new_water_meter).data)
        except ObjectDoesNotExist:
            return Response({'status': 'cannot find dwelling'},
                            status=HTTP_404_NOT_FOUND)


class DwellingWaterMeterChunkView(APIView):
    permission_classes = [AllowAny]

    @swagger_auto_schema(
        operation_id="getCurrentWaterMeterMeasuresChunk",
        responses={200: WaterMeterDetailSerializer(many=False)},
        tags=[TAG],
    )
    def get(self, request, pk, chunk):
        """
        Return the current Water Meter with total measurements (chunk).
        """
        try:
            water_meter = Dwelling.objects.get(id=pk).get_current_water_meter()

            measures_serialized = []

            measures = WaterMeterMeasurement.objects.filter(
                water_meter__in=DwellingWaterMeter.objects.filter(
                    dwelling__id=pk).values_list("water_meter"))
            for measure in measures:

                # if len is full do not add more elements
                if len(measures_serialized) < chunk:
                    data = {
                        'id': measure.id,
                        'measurement': measure.measurement,
                        'date': measure.date,
                    }
                    # if len is full do not add more elements
                    if len(measures_serialized) < chunk:
                        measures_serialized.append(
                            WaterMeterMeasurementSerializer(data,
                                                            many=False).data)

            data = {
                'id': water_meter.id,
                'code': water_meter.code,
                'release_date': water_meter.release_date,
                'discharge_date': water_meter.discharge_date,
                'measures': measures_serialized,
            }

            return Response(WaterMeterDetailSerializer(data, many=False).data)
        except ObjectDoesNotExist:
            return Response({'status': 'cannot find dwelling'},
                            status=HTTP_404_NOT_FOUND)
