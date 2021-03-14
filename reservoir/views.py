from django.core.exceptions import ObjectDoesNotExist
from drf_yasg.utils import swagger_auto_schema
from login.permissions import IsManagerAuthenticated
from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.status import HTTP_404_NOT_FOUND
from rest_framework.views import APIView
from watermeter.serializers import WaterMeterSerializer

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
        Return a list of all Dwelling Detail.
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

    @swagger_auto_schema(operation_id="createReservoir", operation_description="create a new Reservoir")
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
        except ObjectDoesNotExist:
            return Response({'status': 'cannot find dwelling'}, status=HTTP_404_NOT_FOUND)
        return Response(ReservoirCreateSerializer(reservoir, many=False).data)


class ReservoirOwnerView(generics.GenericAPIView):
    queryset = Reservoir.objects.all()
    serializer_class = ReservoirOwnerSerializer
    permission_classes = [AllowAny]

    @swagger_auto_schema(operation_id="getCurrentOwner")
    def get(self, request, pk):
        """
        Get Current Owner
        """
        try:
            reservoir = Reservoir.objects.get(id=pk)
        except ObjectDoesNotExist:
            return Response({'status': 'cannot find reservoir'}, status=HTTP_404_NOT_FOUND)
        owner = reservoir.get_current_owner()
        return Response(get_reservoir_owner_serialized(owner))


class ReservoirWaterMeterView(generics.GenericAPIView):
    queryset = ReservoirWaterMeter.objects.all()
    serializer_class = WaterMeterSerializer
    permission_classes = [IsManagerAuthenticated]

    @swagger_auto_schema(
        operation_id="getCurrentWaterMeter",
        responses={200: WaterMeterSerializer(many=False)},
    )
    def get(self, request, pk):
        """
        Get current Water Meter
        """
        try:
            reservoir = Reservoir.objects.get(id=pk)
        except ObjectDoesNotExist:
            return Response({'status': 'cannot find dwelling'}, status=HTTP_404_NOT_FOUND)
        water_meter = reservoir.get_current_water_meter()
        return Response(self.get_serializer(water_meter).data)

    @swagger_auto_schema(operation_id="changeCurrentWaterMeter")
    def post(self, request, pk):
        """
        Create a new Water Meter and discharge the old Water Meter
        """
        # get Dwelling
        try:
            dwelling = Reservoir.objects.get(id=pk)
        except ObjectDoesNotExist:
            return Response({'status': 'cannot find dwelling'}, status=HTTP_404_NOT_FOUND)
        # create new Water Meter
        dwelling.change_current_water_meter(request.data['code'])
        new_water_meter = dwelling.get_current_water_meter()
        return Response(self.get_serializer(new_water_meter).data)
