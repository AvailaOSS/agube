from django.urls import include, path

from watermeter.views import WaterMeterMeasurementView, MeasurementView

# Water Meter
__url_water_meter = [
    path('<int:pk>/measurement', WaterMeterMeasurementView.as_view()),
]

urlpatterns = [
    path('/', include(__url_water_meter))
]

# Measurement
__url_measurement = [
    path('<int:pk>', MeasurementView.as_view()),
]

urlpatternsMeasurement = [
    path('/', include(__url_measurement))
]
