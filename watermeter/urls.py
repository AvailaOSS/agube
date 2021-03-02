from django.urls import include, path

from watermeter.views import (WaterMeterTotalMeasurementView,
                              WaterMeterMeasurementView)

__url_water_meter = [
    path('/measures', WaterMeterTotalMeasurementView.as_view()),
    path('/<int:pk>/measure', WaterMeterMeasurementView.as_view()),
]

urlpatterns = [
    path('water-meter', include(__url_water_meter)),
]
