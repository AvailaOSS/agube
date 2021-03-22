from django.shortcuts import render
from drf_yasg.utils import swagger_auto_schema
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from manager.models import ManagerConfiguration
from manager.serializers import ManagerConfigurationSerializer

TAG_MANAGER = 'manager'


class ManagerConfigurationView(APIView):
    permission_classes = [AllowAny]

    @swagger_auto_schema(
        operation_id="getManagerConfiguration",
        responses={200: ManagerConfigurationSerializer(many=False)},
        tags=[TAG_MANAGER],
    )
    def get(self, request, pk):
        """
        Get Manager Configuration
        """
        configuration = ManagerConfiguration.objects.get(manager__user_id=pk)
        return Response(
            ManagerConfigurationSerializer(configuration, many=False).data)

    @ swagger_auto_schema(
        operation_id="updateManagerConfiguration",
        request_body=ManagerConfigurationSerializer,
        responses={200: ManagerConfigurationSerializer(many=False)},
        tags=[TAG_MANAGER],
    )
    def post(self, request, pk):
        """
        Update manager configuration
        """
        configuration = ManagerConfiguration.objects.get(manager__user_id=pk)
        configuration.max_daily_consumption = request.data.pop(
            'max_daily_consumption')
        configuration.save()
        configuration.create_hook(request.data.pop('hook_price')['hook_price'])
        return Response(
            ManagerConfigurationSerializer(configuration, many=False).data)
