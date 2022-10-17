from django.core.exceptions import ObjectDoesNotExist
from drf_yasg.utils import swagger_auto_schema
from manager.permissions import IsManagerAuthenticated
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.status import HTTP_404_NOT_FOUND
from rest_framework.views import APIView

from owner.models import Owner
from owner.serializers import OwnerDetailSerializer, OwnerSerializer

TAG = 'owner'


# Create your views here.
class OwnerListView(APIView):
    permission_classes = [IsManagerAuthenticated]

    @swagger_auto_schema(
        operation_id="getOwners",
        responses={200: OwnerDetailSerializer(many=True)},
        tags=[TAG],
    )
    def get(self, request):
        """
        Return a list of all Owners of the logged manager.
        """
        manager = self.request.user

        # Get Owner
        owners = Owner.objects.filter(dwelling__manager__user=manager,
                                      discharge_date__isnull=True)

        owners_serialized = []
        for owner in owners:
            owners_serialized.append(OwnerDetailSerializer(owner).data)

        return Response(owners_serialized)


class OwnerView(generics.GenericAPIView):
    queryset = Owner.objects.all()
    serializer_class = OwnerSerializer
    permission_classes = [IsManagerAuthenticated]

    @swagger_auto_schema(operation_id="getOwner")
    def get(self, request, pk):
        """
        Get Owner by id
        """
        try:
            owner: Owner = Owner.objects.get(id=pk)
            return Response(OwnerSerializer(owner, many=False).data)
        except ObjectDoesNotExist:
            return Response({'status': 'cannot find owner'},
                            status=HTTP_404_NOT_FOUND)
