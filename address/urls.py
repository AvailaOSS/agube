from django.urls import include, path

from address.views import AddressCreateListView

urlpatterns = [
    path('', AddressCreateListView.as_view()),
]
