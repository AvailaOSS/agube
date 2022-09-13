from manager.models import Manager
from rest_framework.permissions import IsAuthenticated


class IsManagerAuthenticated(IsAuthenticated):
    """
    Allows access only to authenticated managers.
    """
    message = 'The authenticated user has to be a Manager to execute this operation.'

    def has_permission(self, request, view):
        if not super().has_permission(request, view):
            return False

        try:
            manager = Manager.objects.get(user=request.user)
            return manager.user.is_active
        except:
            return False
