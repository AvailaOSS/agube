"""
Authentication middleware
"""

from django.utils import timezone
from rest_framework_jwt.authentication import (JSONWebTokenAuthentication,
                                               jwt_decode_handler)


class ApiJSONWebTokenAuthentication(JSONWebTokenAuthentication):
    """
    Override DEFAULT_AUTHENTICATION_CLASSES in settings.py
    """

    def get_jwt_value(self, request):
        auth = super().get_jwt_value(request)

        if auth:
            payload = jwt_decode_handler(auth)
            user = super().authenticate_credentials(payload)
            user.last_login = timezone.now()
            user.save()

        return auth
