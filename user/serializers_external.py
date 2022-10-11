from dwelling.models import Dwelling
from dwelling.serializers import DwellingDetailSerializer, SerializerMethodField
from rest_framework.fields import BooleanField


class UserDwellingDetailSerializer(DwellingDetailSerializer):
    """
    User Dwelling Details
    """
    is_owner_value: bool = False
    is_resident_value: bool = False

    def set_is_owner(self, bool: bool = True):
        self.is_owner_value = bool

    def set_is_resident(self, bool: bool = True):
        self.is_resident_value = bool

    is_owner = SerializerMethodField()
    is_resident = SerializerMethodField()

    def get_is_owner(self, obj):
        return self.is_owner_value

    def get_is_resident(self, obj):
        return self.is_resident_value

    class Meta:
        ref_name = 'UserDwellingDetail'
        model = Dwelling
        fields = ('id', 'city', 'road', 'number', 'resident_full_name',
                  'resident_phone', 'water_meter_code',
                  'last_month_consumption', 'last_month_max_consumption',
                  'latitude', 'longitude', 'is_owner', 'is_resident')
