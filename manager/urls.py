from django.urls import include, path

from manager.views import (ManagerConfigurationView)

__url_manager = [
    path('/<int:pk>', ManagerConfigurationView.as_view()),
]

urlpatterns = [
    path('manager', include(__url_manager)),
]
