from django.urls import include, path

from phone.views import PhoneListView

urlpatterns = [
    path('', PhoneListView.as_view())
]
