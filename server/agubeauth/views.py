from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist
from drf_yasg.openapi import Response as OpenApiResponse
from drf_yasg.utils import swagger_auto_schema
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.status import (HTTP_200_OK, HTTP_204_NO_CONTENT,
                                   HTTP_404_NOT_FOUND, HTTP_400_BAD_REQUEST)
from rest_framework.views import APIView
from django.utils.crypto import get_random_string
from agubeauth.exceptions import UsernameValidationError
from agubeauth.models import validate
from agubeauth.send import send_reset_password_email
from agubeauth.serializers import EnableAccountSerializer, ChangePasswordSerializer, ResetPasswordSerializer

TAG_AUTH = 'auth'


class EnableAccountView(APIView):
    permission_classes = [AllowAny]

    @swagger_auto_schema(
        operation_id="enableAccount",
        operation_description=
        "enable account of user if first time log in and save the new password",
        request_body=EnableAccountSerializer,
        responses={
            HTTP_204_NO_CONTENT:
                OpenApiResponse(description="Enable account correctly")
        },
        tags=[TAG_AUTH],
    )
    def put(self, request):
        activation_code = request.data['activation_code']
        username = request.data['username']
        password = request.data['password']
        confirm_password = request.data['confirm_password']

        if confirm_password != password or password is None:
            return Response({'status': 'passwords do not match'},
                            status=HTTP_404_NOT_FOUND)
        if (validate(username=username)):
            return Response({'status': 'Invalid Format'},
                            status=HTTP_400_BAD_REQUEST)
        try:
            user: User = User.objects.get(username=activation_code)
            if user.is_active:
                return Response({'status': 'user enabled already'},
                                status=HTTP_404_NOT_FOUND)
            user.set_password(password)
            user.username = username
            user.is_active = True
            user.save()
            return Response(None, status=HTTP_200_OK)
        except ObjectDoesNotExist:
            return Response({'status': 'incorrect activation code'},
                            status=HTTP_404_NOT_FOUND)


class ChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        operation_id="changePassword",
        operation_description="change password",
        request_body=ChangePasswordSerializer,
        responses={
            HTTP_204_NO_CONTENT:
                OpenApiResponse(description="Password reset correctly")
        },
        tags=[TAG_AUTH],
    )
    def put(self, request):
        username = request.data['username']
        password = request.data['password']
        confirm_password = request.data['confirm_password']
        if confirm_password != password or password is None:
            return Response({'status': 'passwords do not match'},
                            status=HTTP_404_NOT_FOUND)
        if (validate(username=username)):
            return Response({'status': 'Invalid Format'},
                            status=HTTP_400_BAD_REQUEST)

        if self.request.user.username != username:
            return Response({'status': 'incompatible user'},
                            status=HTTP_404_NOT_FOUND)
        try:
            user: User = User.objects.get(username=username)
            if not user.is_active:
                return Response({'status': 'user must be enabled first'},
                                status=HTTP_404_NOT_FOUND)
            user.set_password(password)
            user.save()
            return Response(None, status=HTTP_200_OK)
        except ObjectDoesNotExist:
            return Response({'status': 'cannot find user'},
                            status=HTTP_404_NOT_FOUND)


class ResetPasswordView(APIView):
    permission_classes = [AllowAny]

    @swagger_auto_schema(
        operation_id="resetPassword",
        operation_description="reset password with",
        request_body=ResetPasswordSerializer,
        responses={
            HTTP_204_NO_CONTENT:
                OpenApiResponse(description="Email sent and password reset")
        },
        tags=[TAG_AUTH],
    )
    def put(self, request):
        email = request.data['email']

        try:
            user: User = User.objects.get(username=email)
        except ObjectDoesNotExist:
            return Response({'status': 'user does not exist in database'},
                            status=HTTP_404_NOT_FOUND)

        # Generate activation code for the new user
        retry = True
        activation_code = get_random_string(length=6)

        while retry:
            try:
                User.objects.get(username=activation_code)
            except ObjectDoesNotExist:
                retry = False
            activation_code = get_random_string(length=6)

        # Update User
        user.username = activation_code
        user.is_active = False
        user.save()

        # send email to user
        send_reset_password_email(user)
        return Response({'status': 'Email sent and password reset'}, status=HTTP_204_NO_CONTENT)
