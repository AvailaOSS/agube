from django.urls import include, path

from manager.views import (ManagerConfigurationUpdateView,
                           ManagerConfigurationView, ManagerView,
                           UserIsManagerView)

__url_manager = [
    path('/is-manager', UserIsManagerView.as_view()),
    path('/by-user', ManagerView.as_view()),
    path('/configuration', ManagerConfigurationView.as_view()),
    path('/configuration/update', ManagerConfigurationUpdateView.as_view()),
]

urlpatterns = [
    path('manager', include(__url_manager)),
]
