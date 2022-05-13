from django.urls import include, path

from owner.views import OwnerListView

__url_owner = [
    path('', OwnerListView.as_view()),
]

urlpatterns = [path('', include(__url_owner))]
