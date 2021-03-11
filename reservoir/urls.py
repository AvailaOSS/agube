from django.urls import include, path

from reservoir.views import (ReservoirCreateView, ReservoirListView,
                             ReservoirOwnerView, ReservoirView,
                             ReservoirWaterMeterView)

__url_reservoir = [
    path('', ReservoirListView.as_view()),
    path('/create', ReservoirCreateView.as_view()),
    path('/<int:pk>', ReservoirView.as_view()),
    path('/<int:pk>/owner', ReservoirOwnerView.as_view()),
    path('/<int:pk>/water-meter', ReservoirWaterMeterView.as_view()),
]

urlpatterns = [
    path('reservoir', include(__url_reservoir)),
]
