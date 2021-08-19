from django.urls import include, path

from manager.views import (ManagerConfigurationView, ManagerView,
                           UserIsManagerView)

__url_manager = [
    path('/is-manager', UserIsManagerView.as_view()),
    path('/by-user', ManagerView.as_view()),
    path('/<int:pk>/configuration', ManagerConfigurationView.as_view()),
]

urlpatterns = [
    path('manager', include(__url_manager)),
]
