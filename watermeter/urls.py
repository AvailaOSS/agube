from watermeter.views import WaterMeterMeasurementView, WaterMeterMeasurementChunkView, WaterMeterCreateMeasurementView
from django.urls import path, include

__url_water_meter = [
    path('/measures', WaterMeterMeasurementView.as_view()),
    path('/<int:pk>/measure/<int:chunk>',
         WaterMeterMeasurementChunkView.as_view()),
    path('/<int:pk>/measure', WaterMeterCreateMeasurementView.as_view()),
]

urlpatterns = [
    path('water-meter', include(__url_water_meter)),
]
