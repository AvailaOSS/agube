from django.core.exceptions import ObjectDoesNotExist
from drf_yasg.utils import swagger_auto_schema
from manager.permissions import IsManagerAuthenticated
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
    permission_classes = [AllowAny]

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
        reservoirs = Reservoir.objects.all()

        list_of_serialized = []
        for reservoir in reservoirs:
            data = {
                'id': reservoir.id,
                'town': reservoir.full_address.address.town,
                'street': reservoir.full_address.address.street,
                'number': reservoir.full_address.number,
                'flat': reservoir.full_address.flat,
                'gate': reservoir.full_address.gate,
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

            # FIXME: can improve it with .objects.select_related ?
            for reservoirWaterMeter in ReservoirWaterMeter.objects.filter(
                    reservoir__id=pk):

                # if len is full do not add more elements
                if len(measures_serialized) < chunk:
                    for measurement in WaterMeterMeasurement.objects.filter(
                            water_meter__id=reservoirWaterMeter.water_meter.id
                    ).order_by('-date'):
                        data = {
                            'id': measurement.id,
                            'measurement': measurement.measurement,
                            'date': measurement.date,
                        }
                        # if len is full do not add more elements
                        if len(measures_serialized) < chunk:
                            measures_serialized.append(
                                WaterMeterMeasurementSerializer(
                                    data, many=False).data)

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
            return Response(get_reservoir_owner_serialized(owner))
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
