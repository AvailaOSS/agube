from django.urls import path, include

from address.views import AddressCreateListView

__url_address = [
    path('', AddressCreateListView.as_view()),
]

urlpatterns = [
    path('address', include(__url_address)),
]
