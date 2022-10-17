from django.urls import path

from address.views import AddressListView

urlpatterns = [
    path('', AddressListView.as_view()),
]
