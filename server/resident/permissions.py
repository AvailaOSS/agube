from person.permissions import IsPersonEnabled
from resident.models import Resident


class IsDwellingResident(IsPersonEnabled):
    """
    Allows access only to authenticated persons enabled.
    """
    message = 'The authenticated Person is not Resident of this Dwelling'

    def has_permission(self, request, view):
        if not super().has_permission(request, view):
            return False

        # Dwelling
        try:
            Resident.objects.get(dwelling__id=view.kwargs.get('pk'), user=request.user)
            return True
        except:
            return False
