from django.urls import include, path

from resident.views import ResidentListView

__url_resident = [
    path('', ResidentListView.as_view()),
]

urlpatterns = [path('', include(__url_resident))]
