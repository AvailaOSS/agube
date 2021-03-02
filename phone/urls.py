from django.urls import include, path

from phone.views import PhoneListView

__url_phone = [
    path('', PhoneListView.as_view()),
]

urlpatterns = [
    path('phone', include(__url_phone)),
]
