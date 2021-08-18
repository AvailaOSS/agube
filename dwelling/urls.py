from django.urls import include, path

from dwelling.views import (DwellingCreateView, DwellingListView,
                            DwellingOwnerView, DwellingResidentView,
                            DwellingSetOwnerAsResidentView, DwellingView,
                            DwellingWaterMeterChunkView,
                            DwellingWaterMeterView)

__url_dwelling = [
    path('', DwellingListView.as_view()),
    path('/create', DwellingCreateView.as_view()),
    path('/<int:pk>', DwellingView.as_view()),
    path('/<int:pk>/owner', DwellingOwnerView.as_view()),
    path('/<int:pk>/owner-as-resident',
         DwellingSetOwnerAsResidentView.as_view()),
    path('/<int:pk>/resident', DwellingResidentView.as_view()),
    path('/<int:pk>/water-meter', DwellingWaterMeterView.as_view()),
    path('/<int:pk>/water-meter/<int:chunk>',
         DwellingWaterMeterChunkView.as_view()),
]

urlpatterns = [
    path('dwelling', include(__url_dwelling)),
]
