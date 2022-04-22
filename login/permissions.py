from manager.models import Manager, Person
from manager.permissions import IsManagerAuthenticated
from rest_framework.permissions import IsAuthenticated


class IsManagerOfUser(IsManagerAuthenticated):
    """
    Allow access if the request user is manager and has the requested user id assigned as person.
    """
    message = 'The authenticated user has to be Manager of the queried User to execute this operation.'

    def has_permission(self, request, view):
        if (not super().has_permission(request, view)):
            return False

        try:
            Person.objects.get(manager__user=request.user,
                               user__id=view.kwargs.get('pk'))
            return True
        except:
            return False


class IsUserMatch(IsAuthenticated):
    """
    Allow access if the request user matches user id ('pk').
    """
    message = 'The authenticated user has to be the same User as the queried User to execute this operation.'

    def has_permission(self, request, view):
        if (not super().has_permission(request, view)):
            return False

        return request.user.id == view.kwargs.get('pk')
