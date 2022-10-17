from django.urls import include, path

from resident.views import ResidentListView, ResidentView

__url_resident = [
    path('<int:pk>', ResidentView.as_view()),
]

urlpatterns = [
    path('', ResidentListView.as_view()),
    path('/', include(__url_resident))
]
