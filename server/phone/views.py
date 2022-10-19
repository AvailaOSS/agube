from drf_yasg.utils import swagger_auto_schema
from rest_framework import generics

from manager.permissions import IsManagerAuthenticated
from phone.models import Phone
from phone.serializers import PhoneSerializer


class PhoneListView(generics.ListAPIView):
    queryset = Phone.objects.all()
    serializer_class = PhoneSerializer
    permission_classes = [IsManagerAuthenticated]

    @swagger_auto_schema(operation_id="getPhones",
                         operation_description="get list of phones")
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)
