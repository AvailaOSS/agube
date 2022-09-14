from django.urls import include, path

from comment.views import CommentView

__url_comments = [
    path('comment/<int:pk>', CommentView.as_view()),
]

urlpatterns = [
    path('/', include(__url_comments))
]
