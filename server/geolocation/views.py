from django.core.exceptions import ObjectDoesNotExist
from django.shortcuts import render
from drf_yasg.utils import swagger_auto_schema
from rest_framework.response import Response
from rest_framework.status import HTTP_404_NOT_FOUND, HTTP_400_BAD_REQUEST
from rest_framework.views import APIView

from geolocation.models import Geolocation
from geolocation.permissions import IsManagerOfGeolocation
from geolocation.serializers import GeolocationSerializer


class GeolocationView(APIView):
    permission_classes = [IsManagerOfGeolocation]

    @swagger_auto_schema(operation_id="getGeolocation",
                         responses={200: GeolocationSerializer(many=False)})
    def get(self, request, pk):
        """
        Get a geolocation by id
        """
        try:
            geolocation: Geolocation = Geolocation.objects.get(id=pk)
            return Response(GeolocationSerializer(geolocation, many=False).data)
        except ObjectDoesNotExist:
            return Response({'status': 'cannot find geolocation'},
                            status=HTTP_404_NOT_FOUND)

    @swagger_auto_schema(operation_id="updateGeolocation",
                         request_body=GeolocationSerializer,
                         responses={200: GeolocationSerializer(many=False)})
    def post(self, request, pk):
        """
        Update a geolocation by id
        """
        geolocation_serializer = GeolocationSerializer(data=request.data)
        if geolocation_serializer.is_valid(True):
            updated_geolocation = geolocation_serializer.update(
                Geolocation.objects.get(id=pk), geolocation_serializer.validated_data)
            return Response(GeolocationSerializer(updated_geolocation).data)
