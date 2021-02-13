from rest_framework import generics
from rest_framework.permissions import AllowAny

from address.models import Address
from address.serializers import AddressSerializer


class AddressCreateListView(generics.ListAPIView, generics.CreateAPIView):
    queryset = Address.objects.all()
    serializer_class = AddressSerializer
    permission_classes = [AllowAny]
