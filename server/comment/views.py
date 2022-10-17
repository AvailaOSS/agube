from drf_yasg.utils import swagger_auto_schema
from rest_framework import generics

from comment.models import Comment
from comment.serializers import CommentSerializer
from manager.permissions import IsManagerAuthenticated

TAG = 'comments'


# Create your views here.
class CommentView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CommentSerializer
    permission_classes = [IsManagerAuthenticated]

    def get_queryset(self):
        #  see here: https://github.com/axnsan12/drf-yasg/issues/333#issuecomment-474883875
        if getattr(self, 'swagger_fake_view', False):
            # queryset just for schema generation metadata
            return Comment.objects.none()
        pk = self.kwargs['pk']
        return Comment.objects.filter(id=pk)

    @swagger_auto_schema(
        operation_id="getComment",
        tag=[TAG])
    def get(self, request, *args, **kwargs):
        """ Return the Comment """
        return super(CommentView, self).get(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_id="updateComment",
        tag=[TAG])
    def put(self, request, *args, **kwargs):
        """ Update the Comment """
        return super(CommentView, self).put(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_id="patchComment",
        tag=[TAG])
    def patch(self, request, *args, **kwargs):
        """ Update the Comment """
        return super(CommentView, self).patch(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_id="deleteComment",
        tag=[TAG])
    def delete(self, request, *args, **kwargs):
        """ Delete the Comment """
        return super(CommentView, self).delete(request, *args, **kwargs)
