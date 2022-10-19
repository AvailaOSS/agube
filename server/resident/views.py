from django.core.exceptions import ObjectDoesNotExist
from drf_yasg.utils import swagger_auto_schema
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.status import HTTP_404_NOT_FOUND
from rest_framework.views import APIView

from manager.permissions import IsManagerAuthenticated
from resident.models import Resident
from resident.serializers import ResidentDetailSerializer, ResidentSerializer

TAG = 'resident'


# Create your views here.
class ResidentListView(APIView):
    permission_classes = [IsManagerAuthenticated]

    @swagger_auto_schema(
        operation_id="getResidents",
        responses={200: ResidentDetailSerializer(many=True)},
        tags=[TAG],
    )
    def get(self, request):
        """
        Return a list of all Residents of the logged manager.
        """
        manager = self.request.user

        # Get Resident
        residents = Resident.objects.filter(dwelling__manager__user=manager,
                                            discharge_date__isnull=True)

        residents_serialized = []
        for resident in residents:
            residents_serialized.append(
                ResidentDetailSerializer(resident).data)

        return Response(residents_serialized)


class ResidentView(generics.GenericAPIView):
    queryset = Resident.objects.all()
    serializer_class = ResidentSerializer
    permission_classes = [IsManagerAuthenticated]

    @swagger_auto_schema(operation_id="getResident")
    def get(self, request, pk):
        """
        Get Resident by id
        """
        try:
            resident: Resident = Resident.objects.get(id=pk)
            return Response(ResidentSerializer(resident, many=False).data)
        except ObjectDoesNotExist:
            return Response({'status': 'cannot find resident'},
                            status=HTTP_404_NOT_FOUND)
