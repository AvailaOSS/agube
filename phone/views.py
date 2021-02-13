from rest_framework import generics
from rest_framework.permissions import AllowAny

from phone.models import Phone
from phone.serializers import PhoneSerializer


class PhoneListView(generics.ListAPIView):
    queryset = Phone.objects.all()
    serializer_class = PhoneSerializer
    permission_classes = [AllowAny]
