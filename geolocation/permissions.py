from manager.permissions import IsManagerAuthenticated

from geolocation.models import Geolocation
from dwelling.models import Dwelling
from reservoir.models import ReservoirOwner, Reservoir
from person.models import Person
from user.models import UserGeolocation

class IsManagerOfGeolocation(IsManagerAuthenticated):
    """
    Allows access only to authenticated managers of the community geolocation.
    """
    message = 'The authenticated user has to be the Manager of the community geolocation to execute this operation.'
    def has_permission(self, request, view):
        if (not super().has_permission(request, view)):
            return False

        try:
            geolocation = Geolocation.objects.get(id=view.kwargs.get('pk'))
        except:
            return False

        # Dwelling
        try:
            dwelling = Dwelling.objects.get(manager__user=request.user,
            geolocation=geolocation)
            return True
        except: pass
        # Reservoir
        try:
            reservoir_owner = ReservoirOwner.objects.get(user=request.user,
                reservoir__geolocation=geolocation)
            return true
        except: pass
        # User
        try:
            person = Person.objects.get(manager__user=request.user,
                user=UserGeolocation.objects.get(geolocation=geolocation))
            return True
        except: pass

        return False
