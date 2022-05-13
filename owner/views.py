from drf_yasg.utils import swagger_auto_schema
from owner.models import Owner
from owner.serializers import OwnerSerializer
from manager.permissions import IsManagerAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

TAG = 'owner'


# Create your views here.
class OwnerListView(APIView):
    permission_classes = [IsManagerAuthenticated]

    @swagger_auto_schema(
        operation_id="getOwners",
        responses={200: OwnerSerializer(many=True)},
        tags=[TAG],
    )
    def get(self, request):
        """
        Return a list of all Owners of the logged manager.
        """
        manager = self.request.user

        # Get Resident
        owners = Owner.objects.filter(dwelling__manager__user=manager,
                                            discharge_date__isnull=True)

        owners_serialized = []
        for owner in owners:
            owners_serialized.append(OwnerSerializer(owner).data)

        return Response(owners_serialized)
