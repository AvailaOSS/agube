from rest_framework.serializers import ModelSerializer, ReadOnlyField

from geolocation.models import Geolocation


class GeolocationSerializer(ModelSerializer):
    """
    Geolocation ModelSerializer
    """
    id = ReadOnlyField()

    class Meta:
        ref_name = 'Geolocation'
        model = Geolocation
        fields = (
            'id',
            'latitude',
            'longitude',
            'zoom',
            'horizontalDegree',
            'verticalDegree',
        )