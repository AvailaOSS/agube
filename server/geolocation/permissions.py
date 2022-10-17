from django.core.exceptions import ObjectDoesNotExist

from dwelling.models import Dwelling
from geolocation.models import Geolocation
from manager.permissions import IsManagerAuthenticated
from person.models import Person
from reservoir.models import ReservoirOwner
from springsource.models import SpringSource
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
        except ObjectDoesNotExist:
            return False

        # Dwelling
        try:
            dwelling = Dwelling.objects.get(manager__user=request.user, geolocation=geolocation)
            return True
        except ObjectDoesNotExist:
            pass

        # Reservoir
        try:
            reservoir_owner = ReservoirOwner.objects.get(user=request.user, reservoir__geolocation=geolocation)
            return True
        except ObjectDoesNotExist:
            pass

        # Spring Source
        try:
            spring_source = SpringSource.objects.get(manager__user=request.user, geolocation=geolocation)
            return True
        except ObjectDoesNotExist:
            pass

        # User
        try:
            person = Person.objects.get(manager__user=request.user,
                                        user=UserGeolocation.objects.get(geolocation=geolocation).user)
            return True
        except ObjectDoesNotExist:
            pass

        return False
