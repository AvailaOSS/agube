from django.urls import include, path

from watermeter.views import (WaterMeterCreateMeasurementView,
                              WaterMeterMeasurementChunkView,
                              WaterMeterMeasurementView)

__url_water_meter = [
    path('/measures', WaterMeterMeasurementView.as_view()),
    path('/<int:pk>/measure/<int:chunk>',
         WaterMeterMeasurementChunkView.as_view()),
    path('/<int:pk>/measure', WaterMeterCreateMeasurementView.as_view()),
]

urlpatterns = [
    path('water-meter', include(__url_water_meter)),
]
