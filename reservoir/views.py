from django.core.exceptions import ObjectDoesNotExist
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.status import HTTP_404_NOT_FOUND, HTTP_400_BAD_REQUEST
from rest_framework.views import APIView

from address.models import Address
from agube.exceptions import DateFilterBadFormatError, DateFilterNoEndDateError, DateFilterStartGtEnd
from agube.pagination import CustomPagination, CustomPaginationInspector
from agube.utils import validate_query_date_filters
from comment.models import Comment
from comment.serializers import CommentSerializer
from manager.permissions import IsManagerAuthenticated
from reservoir.exceptions import ReservoirWithoutWaterMeterError
from reservoir.models import Reservoir, ReservoirWaterMeter, ReservoirOwner, ReservoirComment
from reservoir.serializers import (ReservoirCreateSerializer,
                                   ReservoirDetailSerializer,
                                   ReservoirOwnerSerializer,
                                   ReservoirResumeSerializer,
                                   get_reservoir_owner_serialized, ReservoirCommentCreateSerializer)
from watermeter.models import WaterMeterMeasurement
from watermeter.serializers import (WaterMeterDetailSerializer,
                                    WaterMeterMeasurementSerializer,
                                    WaterMeterSerializer)
from watermeter.utils import get_watermeter_measurements_from_watermeters

TAG = 'reservoir'


class ReservoirResumeView(APIView):
    permission_classes = [IsManagerAuthenticated]

    @swagger_auto_schema(
        operation_id="getReservoirResume",
        operation_description="get Resume of the Reservoir",
        responses={200: ReservoirResumeSerializer(many=False)},
        tags=[TAG],
    )
    def get(self, request, *args, **kwargs):
        manager = self.request.user.id
        total_reservoirs = ReservoirOwner.objects.filter(
            user__id=manager, discharge_date__isnull=True).count()
        data = {'total_reservoirs': total_reservoirs}
        # FIXME: do it like -> SpringSourceResumeView (Serializer has the responsability to create te representation)
        return Response(ReservoirResumeSerializer(data, many=False).data)


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
            water_meter_code: str = ''
            water_meter = reservoir.get_current_water_meter()
            if water_meter:
                water_meter_code = water_meter.code
            address: Address = reservoir.geolocation.address
            data = {
                'id': reservoir.id,
                'city': address.city,
                'road': address.road,
                'number': reservoir.geolocation.number,
                'water_meter_code': water_meter_code,
                'capacity': str(reservoir.capacity),
                'inlet_flow': str(reservoir.inlet_flow),
                'outlet_flow': str(reservoir.outlet_flow),
                'latitude': reservoir.geolocation.latitude,
                'longitude': reservoir.geolocation.longitude,
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

            if not water_meter:
                raise ReservoirWithoutWaterMeterError()

            measures_serialized = []

            measures = WaterMeterMeasurement.objects.filter(
                water_meter__in=ReservoirWaterMeter.objects.filter(
                    reservoir__id=pk).values_list("water_meter"))
            for measure in measures:

                # if len is full do not add more elements
                if len(measures_serialized) < chunk:

                    # if len is full do not add more elements
                    if len(measures_serialized) < chunk:
                        measures_serialized.append(
                            WaterMeterMeasurementSerializer(measure,
                                                            many=False).data)

            # FIXME: do not build json manually
            data = {
                'id': water_meter.id,
                'code': water_meter.code,
                'release_date': water_meter.release_date,
                'discharge_date': water_meter.discharge_date,
                'measures': measures_serialized,
            }

            return Response(data)
        except ObjectDoesNotExist:
            return Response(
                {'status': 'cannot find current water meter measures'},
                status=HTTP_404_NOT_FOUND)
        except ReservoirWithoutWaterMeterError as e:
            return Response({'status': e.message}, status=HTTP_404_NOT_FOUND)


class ReservoirOwnerView(generics.GenericAPIView):
    queryset = Reservoir.objects.all()
    serializer_class = ReservoirOwnerSerializer
    permission_classes = [AllowAny]

    @swagger_auto_schema(operation_id="getCurrentReservoirOwner",
                         responses={200: ReservoirOwnerSerializer(many=False)})
    def get(self, request, pk):
        """
        Get Current Owner of the Reservoir
        """
        try:
            reservoir: Reservoir = Reservoir.objects.get(id=pk)
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
        responses={200: WaterMeterDetailSerializer(many=True)},
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

            if not water_meter:
                raise ReservoirWithoutWaterMeterError()

            return Response(self.get_serializer(water_meter).data)
        except ObjectDoesNotExist:
            return Response({'status': 'cannot find reservoir'},
                            status=HTTP_404_NOT_FOUND)
        except ReservoirWithoutWaterMeterError as e:
            return Response({'status': e.message}, status=HTTP_404_NOT_FOUND)

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


class ReservoirWaterMeterMeasurementsView(generics.GenericAPIView):
    permission_classes = [IsManagerAuthenticated]
    serializer_class = WaterMeterMeasurementSerializer
    queryset = Reservoir.objects.all()
    pagination_class = CustomPagination

    @swagger_auto_schema(
        operation_id="getReservoirWaterMeterMeasurements",
        paginator_inspectors=[CustomPaginationInspector],
        manual_parameters=[
            openapi.Parameter('start_date',
                              openapi.IN_QUERY,
                              description="Filter start date",
                              type=openapi.TYPE_STRING,
                              format=openapi.FORMAT_DATE),
            openapi.Parameter('end_date',
                              openapi.IN_QUERY,
                              description="Filter end date",
                              type=openapi.TYPE_STRING,
                              format=openapi.FORMAT_DATE)
        ],
        tags=[TAG],
    )
    def get(self, request, pk):
        """
        Return a pagination of reservoir water meter measurements between dates.
        """
        # Validate date filters
        try:
            datetime_filters = validate_query_date_filters(
                request.query_params.get('start_date'),
                request.query_params.get('end_date'))
        except (DateFilterBadFormatError, DateFilterNoEndDateError,
                DateFilterStartGtEnd) as e:
            return Response({'status': e.message}, status=HTTP_400_BAD_REQUEST)

        # Get Reservoir
        try:
            reservoir: Reservoir = Reservoir.objects.get(id=pk)
        except ObjectDoesNotExist:
            return Response({'status': 'cannot find reservoir'},
                            status=HTTP_404_NOT_FOUND)

        # Get reservoir water meter historical
        watermeter_list = reservoir.get_historical_water_meter()
        if watermeter_list == []:
            raise ReservoirWithoutWaterMeterError()

        # Get measurements
        if datetime_filters is None:
            measurement_list = get_watermeter_measurements_from_watermeters(
                watermeter_list)
        else:
            # Get measurements filtered between dates
            start_datetime, end_datetime = datetime_filters
            measurement_list = get_watermeter_measurements_from_watermeters(
                watermeter_list,
                start_datetime=start_datetime,
                end_datetime=end_datetime)

        # Create result pagination
        queryset = measurement_list
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            result = self.get_paginated_response(serializer.data)
            data = result.data
        else:
            serializer = self.get_serializer(queryset, many=True)
            data = serializer.data
        return Response(data)


class ReservoirCommentCreateView(generics.CreateAPIView):
    queryset = ReservoirComment.objects.all()
    serializer_class = ReservoirCommentCreateSerializer
    permission_classes = [IsManagerAuthenticated]

    @swagger_auto_schema(operation_id="createReservoirComment", tag=[TAG])
    def post(self, request, *args, **kwargs):
        """ Create a new Comment for this Reservoir. """
        return super(ReservoirCommentCreateView,
                     self).post(request, *args, **kwargs)


class ReservoirCommentListView(generics.ListAPIView):
    serializer_class = CommentSerializer
    permission_classes = [IsManagerAuthenticated]

    def get_queryset(self):
        #  see here: https://github.com/axnsan12/drf-yasg/issues/333#issuecomment-474883875
        if getattr(self, 'swagger_fake_view', False):
            # queryset just for schema generation metadata
            return Comment.objects.none()
        pk = self.kwargs['pk']
        return list(
            map(
                lambda reservoir: reservoir.comment,
                ReservoirComment.objects.filter(
                    reservoir__id=pk).order_by('-comment__created')))

    @swagger_auto_schema(operation_id="getReservoirComments", tag=[TAG])
    def get(self, request, *args, **kwargs):
        """ Return the full list of comments for this Reservoir. """
        return super(ReservoirCommentListView,
                     self).get(request, *args, **kwargs)
