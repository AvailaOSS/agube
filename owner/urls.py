from django.urls import include, path

from owner.views import OwnerListView, OwnerView

__url_owner = [
    path('', OwnerListView.as_view()),
    path('/<int:pk>', OwnerView.as_view()),
]

urlpatterns = [path('', include(__url_owner))]
