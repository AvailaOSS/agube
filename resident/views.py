from drf_yasg.utils import swagger_auto_schema
from resident.models import Resident
from resident.serializers import ResidentSerializer
from manager.permissions import IsManagerAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

TAG = 'Resident'


# Create your views here.
class ResidentListView(APIView):
    permission_classes = [IsManagerAuthenticated]

    @swagger_auto_schema(
        operation_id="getResidents",
        responses={200: ResidentSerializer(many=True)},
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
            residents_serialized.append(ResidentSerializer(resident).data)

        return Response(residents_serialized)
