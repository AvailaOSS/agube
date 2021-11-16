from manager.models import Manager
from rest_framework.permissions import IsAuthenticated
from django.core.exceptions import ObjectDoesNotExist

class IsManagerAuthenticated(IsAuthenticated):
    """
    Allows access only to authenticated managers.
    """
    message = 'The authenticahed user has to be a Manager to execute this operation.'
    def has_permission(self, request, view):
        if (not super().has_permission(request, view)):
            return False
            
        try:
            Manager.objects.get(user=request.user)
            return True
        except:
            return False
