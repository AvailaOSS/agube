from django.core.exceptions import ObjectDoesNotExist
from drf_yasg.utils import swagger_auto_schema
from geolocation.models import Geolocation
from geolocation.serializers import GeolocationSerializer
from manager.permissions import IsManagerAuthenticated
from login.permissions import IsManagerOfUser, IsUserMatch
from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.status import HTTP_404_NOT_FOUND
from rest_framework.views import APIView
from watermeter.models import WaterMeterMeasurement
from watermeter.serializers import (WaterMeterDetailSerializer,
                                    WaterMeterMeasurementSerializer,
                                    WaterMeterSerializer)

from reservoir.models import Reservoir, ReservoirWaterMeter
from reservoir.serializers import (ReservoirCreateSerializer,
                                   ReservoirDetailSerializer,
                                   ReservoirOwnerSerializer,
                                   get_reservoir_owner_serialized)

TAG = 'reservoir'


class ReservoirListView(APIView):
    permission_classes = [IsManagerAuthenticated]

    @swagger_auto_schema(
        operation_id="getReservoirs",
        responses={200: ReservoirDetailSerializer(many=True)},
        tags=[TAG],
    )
    def get(self, request):
        """
        Return a list of all Reservoir Detail.
        """
        # Get Reservoir
        owner_id = self.request.user.id
        reservoirs: list[Reservoir] = Reservoir.objects.filter(
            reservoirowner__user_id=owner_id)

        list_of_serialized = []
        for reservoir in reservoirs:
            water_meter_code: str = reservoir.get_current_water_meter().code
            address: Address = reservoir.address
            data = {
                'id': reservoir.id,
                'city': address.city,
                'road': address.road,
                'number': address.number,
                'water_meter_code': water_meter_code,
                'capacity': str(reservoir.capacity),
                'inlet_flow': str(reservoir.inlet_flow),
                'outlet_flow': str(reservoir.outlet_flow),
            }
            list_of_serialized.append(
                ReservoirDetailSerializer(data, many=False).data)

        return Response(list_of_serialized)


class ReservoirCreateView(generics.CreateAPIView):
    queryset = Reservoir.objects.all()
    serializer_class = ReservoirCreateSerializer
    permission_classes = [IsManagerAuthenticated]

    @swagger_auto_schema(operation_id="createReservoir",
                         operation_description="create a new Reservoir")
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)


class ReservoirView(generics.GenericAPIView):
    queryset = Reservoir.objects.all()
    serializer_class = ReservoirCreateSerializer
    permission_classes = [AllowAny]

    @swagger_auto_schema(operation_id="getReservoir")
    def get(self, request, pk):
        """
        Get Reservoir by id
        """
        try:
            reservoir = Reservoir.objects.get(id=pk)
            return Response(
                ReservoirCreateSerializer(reservoir, many=False).data)
        except ObjectDoesNotExist:
            return Response({'status': 'cannot find reservoir'},
                            status=HTTP_404_NOT_FOUND)


class ReservoirWaterMeterChunkView(APIView):
    permission_classes = [AllowAny]

    @swagger_auto_schema(
        operation_id="getReservoirCurrentWaterMeterMeasuresChunk",
        responses={200: WaterMeterDetailSerializer(many=False)},
        tags=[TAG],
    )
    def get(self, request, pk, chunk):
        # FIXME: move this and the Dwelling Chunk to Water Meter Chunk
        """
        Return the current Water Meter of Reservoir with measurements chunk.
        """
        try:
            water_meter = Reservoir.objects.get(
                id=pk).get_current_water_meter()

            measures_serialized = []

            measures = WaterMeterMeasurement.objects.filter(
                water_meter__in=ReservoirWaterMeter.objects.filter(
                    reservoir__id=pk).values_list("water_meter"))
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
            return Response(
                {'status': 'cannot find current water meter measures'},
                status=HTTP_404_NOT_FOUND)


class ReservoirOwnerView(generics.GenericAPIView):
    queryset = Reservoir.objects.all()
    serializer_class = ReservoirOwnerSerializer
    permission_classes = [AllowAny]

    @swagger_auto_schema(operation_id="getCurrentReservoirOwner")
    def get(self, request, pk):
        """
        Get Current Owner of the Reservoir
        """
        try:
            reservoir = Reservoir.objects.get(id=pk)
            owner = reservoir.get_current_owner()
            if not owner:
                return Response({'status': 'cannot find Current Owner'},
                                status=HTTP_404_NOT_FOUND)
            return Response(get_reservoir_owner_serialized(owner))
        except ObjectDoesNotExist:
            return Response({'status': 'cannot find reservoir'},
                            status=HTTP_404_NOT_FOUND)


class ReservoirWaterMeterHistoricalView(APIView):
    permission_classes = [IsManagerAuthenticated]

    @swagger_auto_schema(
        operation_id="getCurrentReservoirWaterMeterHistorical",
        responses={200: WaterMeterSerializer(many=True)},
    )
    def get(self, request, pk):
        try:
            water_serialized = []
            reservoir: Reservoir = Reservoir.objects.get(id=pk)
            water_meters = reservoir.get_historical_water_meter()
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
            return Response({'status': 'cannot find reservoir'},
                            status=HTTP_404_NOT_FOUND)


class ReservoirWaterMeterView(generics.GenericAPIView):
    queryset = ReservoirWaterMeter.objects.all()
    serializer_class = WaterMeterSerializer
    permission_classes = [IsManagerAuthenticated]

    @swagger_auto_schema(
        operation_id="getCurrentReservoirWaterMeter",
        responses={200: WaterMeterSerializer(many=False)},
    )
    def get(self, request, pk):
        """
        Get current Water Meter of the Reservoir
        """
        try:
            reservoir = Reservoir.objects.get(id=pk)
            water_meter = reservoir.get_current_water_meter()
            return Response(self.get_serializer(water_meter).data)
        except ObjectDoesNotExist:
            return Response({'status': 'cannot find reservoir'},
                            status=HTTP_404_NOT_FOUND)

    @swagger_auto_schema(operation_id="changeCurrentReservoirWaterMeter")
    def post(self, request, pk):
        """
        Create a new Water Meter and discharge the old Water Meter in the Reservoir
        """
        # get Reservoir
        try:
            reservoir = Reservoir.objects.get(id=pk)
            # create new Water Meter
            reservoir.change_current_water_meter(request.data['code'])
            new_water_meter = reservoir.get_current_water_meter()
            return Response(self.get_serializer(new_water_meter).data)
        except ObjectDoesNotExist:
            return Response({'status': 'cannot find reservoir'},
                            status=HTTP_404_NOT_FOUND)
