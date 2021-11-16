from dwelling.serializers import DwellingDetailSerializer
from rest_framework.fields import BooleanField

class UserDwellingDetailSerializer(DwellingDetailSerializer):
    """
    User Dwelling Details
    """
    is_owner = BooleanField()
    is_resident = BooleanField()
    
    class Meta:
        ref_name = 'UserDwellingDetail'
