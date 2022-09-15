from drf_yasg.utils import swagger_auto_schema
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import GenericAPIView
from rest_framework.status import HTTP_404_NOT_FOUND

from manager.models import Manager, ManagerConfiguration, ManagerMessage
from manager.permissions import IsManagerAuthenticated
from person.models import Person
from manager.serializers import (ManagerConfigurationSerializer,
                                 ManagerMessageSerializer, ManagerSerializer,
                                 UserIsManagerSerializer)

TAG_MANAGER = 'manager'


class UserIsManagerView(APIView):
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        operation_id="userIsManager",
        responses={200: UserIsManagerSerializer(many=False)},
        tags=[TAG_MANAGER],
    )
    def get(self, request):
        """
        true if user is manager
        """
        managers = Manager.objects.filter(
            user__id=self.request.user.id).count()
        is_manager = False
        if managers > 0:
            is_manager = True
        data = {'is_manager': is_manager}
        return Response(UserIsManagerSerializer(data, many=False).data)


class ManagerView(APIView):
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        operation_id="getManagerByUser",
        responses={200: ManagerSerializer(many=False)},
        tags=[TAG_MANAGER],
    )
    def get(self, request):
        """
        Get Manager
        """
        manager: Manager = Person.objects.get(
            user__id=self.request.user.id).manager
        return Response(ManagerSerializer(manager, many=False).data)


class ManagerConfigurationView(APIView):
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        operation_id="getManagerConfiguration",
        responses={200: ManagerConfigurationSerializer(many=False)},
        tags=[TAG_MANAGER],
    )
    def get(self, request):
        """
        Get Manager Configuration
        """
        manager: Manager
        try:
            # Request user is Manager
            manager = Manager.objects.get(user=request.user)
        except:
            # Request user is normal User
            manager = Person.objects.get(user=request.user).manager

        try:
            configuration: ManagerConfiguration = ManagerConfiguration.objects.filter(
                manager=manager, discharge_date__isnull=True)[0]
        except:
            return Response({'status': 'No configuration found.'},
                            status=HTTP_404_NOT_FOUND)

        return Response(
            ManagerConfigurationSerializer(configuration, many=False).data)


class ManagerConfigurationUpdateView(APIView):
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        operation_id="updateManagerConfiguration",
        request_body=ManagerConfigurationSerializer,
        responses={200: ManagerConfigurationSerializer(many=False)},
        tags=[TAG_MANAGER],
    )
    def post(self, request):
        """
        Update manager configuration
        """
        manager: Manager = Manager.objects.get(user_id=self.request.user.id)

        # create a new
        configuration = manager.create_configuration(
            request.data.pop('max_daily_consumption'),
            request.data.pop('hook_price'))
        return Response(
            ManagerConfigurationSerializer(configuration, many=False).data)


class ManagerMessageView(GenericAPIView):
    permission_classes = [IsManagerAuthenticated]
    serializer_class = ManagerMessageSerializer

    @swagger_auto_schema(
        operation_id="getManagerMessage",
        responses={200: ManagerMessageSerializer(many=False)},
        tags=[TAG_MANAGER]
    )
    def get(self, request):
        """
        Get manager message
        """
        manager = Manager.objects.get(user=self.request.user)
        manager_message = ManagerMessage.objects.get_or_create(
            manager=manager)[0]
        serializer = ManagerMessageSerializer(manager_message, many=False)

        return Response(serializer.data)

    @swagger_auto_schema(
        operation_id="updateManagerMessage",
        tags=[TAG_MANAGER],
    )
    def put(self, request):
        """
        Update manager message
        """
        serializer = ManagerMessageSerializer(data=request.data)
        if serializer.is_valid(True):
            manager = Manager.objects.get(user=self.request.user)
            manager_message: ManagerMessage = ManagerMessage.objects.get_or_create(
                manager=manager)[0]
            serializer.update(manager_message, serializer.validated_data)

        return Response(serializer.validated_data)
