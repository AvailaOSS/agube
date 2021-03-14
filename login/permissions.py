from login.models import Manager
from rest_framework.permissions import BasePermission
from django.core.exceptions import ObjectDoesNotExist

class IsManagerAuthenticated(BasePermission):
    """
    Allows access only to authenticated users.
    """
    message = "Only User Manager can execute this operation."

    def has_permission(self, request, view):
        try:
            Manager.objects.get(user_id=request.user.id)
            return True
        except ObjectDoesNotExist:
            return False