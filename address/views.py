from drf_yasg.utils import swagger_auto_schema
from rest_framework import generics
from rest_framework.permissions import AllowAny

from address.models import Address
from address.serializers import AddressSerializer
from manager.models import Manager
from person.models import Person
from user.models import UserGeolocation
from dwelling.models import Dwelling
from reservoir.models import Reservoir, ReservoirOwner
from rest_framework.response import Response


class AddressListView(generics.ListAPIView):
    queryset = Address.objects.all()
    serializer_class = AddressSerializer
    permission_classes = [AllowAny]

    @swagger_auto_schema(operation_id="getAddress",
                         operation_description="get list of address")
    def get(self, request, *args, **kwargs):
        manager = Manager.objects.get(user=self.request.user)

        address_total = []

        person_users = Person.objects.filter(
            manager=manager).values_list('user')

        user_addresses = Address.objects.filter(
            id__in=UserGeolocation.objects.filter(user__in=person_users).
            values_list('geolocation').values_list('address'))

        dwellings_address = Address.objects.filter(
            id__in=Dwelling.objects.filter(manager=manager).values_list(
                'geolocation').values_list('address'))

        reservoirs_address = Address.objects.filter(
            id__in=Reservoir.objects.filter(
                id__in=ReservoirOwner.objects.filter(user_id__in=person_users).
                values_list('reservoir_id')).values_list('address'))

        address_total.extend(user_addresses)
        address_total.extend(dwellings_address)
        address_total.extend(reservoirs_address)

        address_serialized = []

        for address in set(address_total):
            address_serialized.append(AddressSerializer(address).data)

        return Response(address_serialized)
