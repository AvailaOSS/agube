from django.core.exceptions import ObjectDoesNotExist
from drf_yasg.utils import swagger_auto_schema
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.status import HTTP_404_NOT_FOUND
from rest_framework.views import APIView

from comment.models import Comment
from comment.serializers import CommentSerializer
from manager.models import Manager
from manager.permissions import IsManagerAuthenticated
from springsource.models import SpringSource, SpringSourceComment
from springsource.serializers import SpringSourceResumeSerializer, SpringSourceSerializer, SpringSourceDetailSerializer, \
    SpringSourceCommentCreateSerializer

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


class SpringSourceCommentCreateView(generics.CreateAPIView):
    queryset = SpringSourceComment.objects.all()
    serializer_class = SpringSourceCommentCreateSerializer
    permission_classes = [IsManagerAuthenticated]

    @swagger_auto_schema(operation_id="createSpringSourceComment", tag=[TAG])
    def post(self, request, *args, **kwargs):
        """ Create a new Comment for this SpringSource. """
        return super(SpringSourceCommentCreateView,
                     self).post(request, *args, **kwargs)


class SpringSourceCommentListView(generics.ListAPIView):
    serializer_class = CommentSerializer
    permission_classes = [IsManagerAuthenticated]

    def get_queryset(self):
        #  see here: https://github.com/axnsan12/drf-yasg/issues/333#issuecomment-474883875
        if getattr(self, 'swagger_fake_view', False):
            # queryset just for schema generation metadata
            return Comment.objects.none()
        pk = self.kwargs['pk']
        return list(
            map(
                lambda spring_source: spring_source.comment,
                SpringSourceComment.objects.filter(
                    spring_source__id=pk).order_by('-comment__created')))

    @swagger_auto_schema(operation_id="getSpringSourceComments", tag=[TAG])
    def get(self, request, *args, **kwargs):
        """ Return the full list of comments for this SpringSource. """
        return super(SpringSourceCommentListView,
                     self).get(request, *args, **kwargs)
