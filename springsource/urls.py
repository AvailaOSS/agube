from django.urls import include, path

from springsource.views import SpringSourceResumeView, SpringSourceListView, SpringSourceCreateView, SpringSourceView

__url_spring_source = [
    path('create', SpringSourceCreateView.as_view()),
    path('resume', SpringSourceResumeView.as_view()),
    path('<int:pk>', SpringSourceView.as_view()),
]

urlpatterns = [
    path('', SpringSourceListView.as_view()),
    path('/', include(__url_spring_source))
]
