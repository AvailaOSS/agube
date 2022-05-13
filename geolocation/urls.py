from django.urls import path, include

from geolocation.views import GeolocationView

__url_geolocation = [
    path('<int:pk>', GeolocationView.as_view()),
]

urlpatterns = [
    path('/', include(__url_geolocation))
]
