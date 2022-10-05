from django.core.exceptions import ObjectDoesNotExist
from drf_yasg.utils import swagger_auto_schema
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.status import HTTP_404_NOT_FOUND
from rest_framework.views import APIView

from manager.models import Manager
from manager.permissions import IsManagerAuthenticated
from springsource.models import SpringSource
from springsource.serializers import SpringSourceResumeSerializer, SpringSourceSerializer, SpringSourceDetailSerializer

TAG = 'springsource'


class SpringSourceResumeView(APIView):
    permission_classes = [IsManagerAuthenticated]

    @swagger_auto_schema(
        operation_id="getSpringSourceResume",
        operation_description="get Resume of the SpringSource",
        responses={200: SpringSourceResumeSerializer(many=False)},
        tags=[TAG],
    )
    def get(self, request, *args, **kwargs):
        manager = Manager.objects.get(user=self.request.user)
        return Response(SpringSourceResumeSerializer(manager, many=False).data)


class SpringSourceListView(generics.ListAPIView):
    queryset = SpringSource.objects.all()
    serializer_class = SpringSourceDetailSerializer
    permission_classes = [IsManagerAuthenticated]

    @swagger_auto_schema(
        operation_id="getSpringSources",
        operation_description="Return a list of all SpringSource Detail.",
        tags=[TAG],
    )
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)


class SpringSourceCreateView(generics.CreateAPIView):
    queryset = SpringSource.objects.all()
    serializer_class = SpringSourceSerializer
    permission_classes = [IsManagerAuthenticated]

    @swagger_auto_schema(operation_id="createSpringSource",
                         operation_description="create a new SpringSource")
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)


class SpringSourceView(generics.RetrieveAPIView):
    queryset = SpringSource.objects.all()
    serializer_class = SpringSourceSerializer
    permission_classes = [IsManagerAuthenticated]

    @swagger_auto_schema(operation_id="getSpringSource")
    def get(self, request, pk):
        """
        Get SpringSourceSerializer by id
        """
        try:
            spring_source = SpringSource.objects.get(id=pk)
            return Response(SpringSourceSerializer(spring_source, many=False).data)
        except ObjectDoesNotExist:
            return Response({'status': 'cannot find SpringSource'}, status=HTTP_404_NOT_FOUND)
