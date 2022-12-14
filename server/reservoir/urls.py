from django.urls import include, path

from reservoir.views import (ReservoirCreateView, ReservoirListView,
                             ReservoirOwnerView, ReservoirView,
                             ReservoirWaterMeterChunkView,
                             ReservoirWaterMeterHistoricalView,
                             ReservoirWaterMeterView,
                             ReservoirResumeView,
                             ReservoirWaterMeterMeasurementsView,
                             ReservoirCommentListView,
                             ReservoirCommentCreateView)

__url_reservoir = [
    path('resume', ReservoirResumeView.as_view()),
    path('create', ReservoirCreateView.as_view()),
    path('<int:pk>', ReservoirView.as_view()),
    path('<int:pk>/owner', ReservoirOwnerView.as_view()),
    path('<int:pk>/water-meter', ReservoirWaterMeterView.as_view()),
    path('<int:pk>/water-meter/historical',
         ReservoirWaterMeterHistoricalView.as_view()),
    path('<int:pk>/water-meter/<int:chunk>',
         ReservoirWaterMeterChunkView.as_view()),
    path('<int:pk>/water-meter/measurements',
         ReservoirWaterMeterMeasurementsView.as_view()),
    path('<int:pk>/comment', ReservoirCommentListView.as_view()),
    path('comment', ReservoirCommentCreateView.as_view())
]

urlpatterns = [
    path('', ReservoirListView.as_view()),
    path('/', include(__url_reservoir))
]
