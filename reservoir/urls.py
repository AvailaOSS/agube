from django.urls import include, path

from reservoir.views import (ReservoirCreateView, ReservoirGeolocationView,
                             ReservoirListView, ReservoirOwnerView,
                             ReservoirView, ReservoirWaterMeterChunkView,
                             ReservoirWaterMeterHistoricalView,
                             ReservoirWaterMeterView)

__url_reservoir = [
    path('create', ReservoirCreateView.as_view()),
    path('<int:pk>', ReservoirView.as_view()),
    path('<int:pk>/geolocation', ReservoirGeolocationView.as_view()),
    path('<int:pk>/owner', ReservoirOwnerView.as_view()),
    path('<int:pk>/water-meter', ReservoirWaterMeterView.as_view()),
    path('<int:pk>/water-meter/historical',
         ReservoirWaterMeterHistoricalView.as_view()),
    path('<int:pk>/water-meter/<int:chunk>',
         ReservoirWaterMeterChunkView.as_view())
]

urlpatterns = [
    path('', ReservoirListView.as_view()),
    path('/', include(__url_reservoir))
]
