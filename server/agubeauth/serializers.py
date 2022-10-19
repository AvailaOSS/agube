from django.contrib.auth.models import User
from rest_framework.fields import CharField
from rest_framework.serializers import ModelSerializer, Serializer


class ChangePasswordSerializer(Serializer):
    """
    Change Password Serializer
    """
    username = CharField(max_length=None,
                         min_length=None,
                         allow_blank=False,
                         trim_whitespace=True)
    password = CharField(max_length=None,
                         min_length=None,
                         allow_blank=False,
                         trim_whitespace=True)
    confirm_password = CharField(max_length=None,
                                 min_length=None,
                                 allow_blank=False,
                                 trim_whitespace=True)


class EnableAccountSerializer(Serializer):
    """
    Enable Account, set username and password Serializer
    """
    activation_code = CharField(max_length=None,
                                min_length=None,
                                allow_blank=False,
                                trim_whitespace=True)
    username = CharField(max_length=None,
                         min_length=None,
                         allow_blank=False,
                         trim_whitespace=True)
    password = CharField(max_length=None,
                         min_length=None,
                         allow_blank=False,
                         trim_whitespace=True)
    confirm_password = CharField(max_length=None,
                                 min_length=None,
                                 allow_blank=False,
                                 trim_whitespace=True)


class ResetPasswordSerializer(Serializer):
    """
    Reset Password Serializer
    """
    email = CharField(max_length=None,
                      min_length=None,
                      allow_blank=False,
                      trim_whitespace=True)
