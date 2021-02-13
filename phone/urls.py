from phone.views import PhoneListView
from django.urls import path, include


__url_phone = [
    path('', PhoneListView.as_view()),
]

urlpatterns = [
    path('phone', include(__url_phone)),
]
