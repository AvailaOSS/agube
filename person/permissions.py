from rest_framework.permissions import IsAuthenticated

from person.models import Person


class IsPersonEnabled(IsAuthenticated):
    """
    Allows access only to authenticated persons enabled.
    """
    message = 'The authenticated Person has to be enabled to execute this operation.'

    def has_permission(self, request, view):
        if not super().has_permission(request, view):
            return False

        try:
            person = Person.objects.get(user=request.user)
            return person.user.is_active
        except:
            return False
