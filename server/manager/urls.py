from django.urls import include, path

from manager.views import (ManagerConfigurationUpdateView,
                           ManagerConfigurationView, ManagerView,
                           UserIsManagerView, ManagerMessageView)

__url_manager = [
    path('is-manager', UserIsManagerView.as_view()),
    path('by-user', ManagerView.as_view()),
    path('configuration', ManagerConfigurationView.as_view()),
    path('configuration/update', ManagerConfigurationUpdateView.as_view()),
    path('message', ManagerMessageView.as_view())
]

urlpatterns = [path('/', include(__url_manager))]
