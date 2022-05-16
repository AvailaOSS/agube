from django.urls import include, path

from resident.views import ResidentListView, ResidentView

__url_resident = [
    path('', ResidentListView.as_view()),
    path('/<int:pk>', ResidentView.as_view()),
]

urlpatterns = [path('', include(__url_resident))]
