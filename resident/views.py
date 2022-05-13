from drf_yasg.utils import swagger_auto_schema
from geolocation.serializers import GeolocationSerializer
from phone.serializers import PhoneSerializer
from resident.models import Resident
from resident.serializers import ResidentSerializer
from manager.permissions import IsManagerAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from user.models import UserGeolocation, UserPhone

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
        # it can't be automatized with ResidentSerializer because
        # the model used in UserCreateSerializer has no attribute phones
        for resident in residents:
            phones = list(
                map(lambda user_phone: user_phone.phone,
                    UserPhone.objects.filter(user=resident.user)))

            phones_serialized = []
            for phone in phones:
                phones_serialized.append(PhoneSerializer(phone).data)

            geolocations = list(
                map(lambda user_geolocation: user_geolocation.geolocation,
                    UserGeolocation.objects.filter(user=resident.user)))

            geolocations_serialized = []
            for geolocation in geolocations:
                geolocations_serialized.append(
                    GeolocationSerializer(geolocation).data)

            user_serialized = {
                'id': resident.user.id,
                'first_name': resident.user.first_name,
                'last_name': resident.user.last_name,
                'email': resident.user.email,
                'phones': phones_serialized,
                'geolocation': geolocations_serialized,
            }

            resident_serialized = {
                'id': resident.id,
                'dwelling_id': resident.dwelling.id,
                'user': user_serialized,
                'release_date': resident.release_date,
                'discharge_date': resident.discharge_date,
            }
            residents_serialized.append(resident_serialized)

        return Response(residents_serialized)
