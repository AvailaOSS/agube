from django.urls import path, include

from dwelling.views import DwellingListView, DwellingCreateView, DwellingOwnerView, DwellingResidentView, DwellingWaterMeterView, DwellingWaterMeterDetailView

__url_dwelling = [
    path('', DwellingListView.as_view()),
    path('/create', DwellingCreateView.as_view()),
    path('/<int:pk>/owner', DwellingOwnerView.as_view()),
    path('/<int:pk>/resident', DwellingResidentView.as_view()),
    path('/<int:pk>/water-meter', DwellingWaterMeterView.as_view()),
    path('/<int:pk>/water-meter/detail', DwellingWaterMeterDetailView.as_view()),
]

urlpatterns = [
    path('dwelling', include(__url_dwelling)),
]
