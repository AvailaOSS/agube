from django.urls import include, path

from watermeter.views import WaterMeterMeasurementView

__url_water_meter = [
    path('/<int:pk>/measure', WaterMeterMeasurementView.as_view()),
]

urlpatterns = [
    path('water-meter', include(__url_water_meter)),
]
