from django.urls import include, path

from login.views import (UserAddressUpdateDeleteView, UserCreateAddressView,
                         UserCreatePhoneView, UserCustomDetailListView,
                         UserDwellingDetailView, UserPhoneUpdateDeleteView)

__url_user = [
    path('<int:pk>/dwelling', UserDwellingDetailView.as_view()),
    path('<int:pk>/address', UserCreateAddressView.as_view()),
    path('<int:pk>/address/<int:full_address_id>',
         UserAddressUpdateDeleteView.as_view()),
    path('<int:pk>/phone', UserCreatePhoneView.as_view()),
    path('<int:pk>/phone/<int:phone_id>',
         UserPhoneUpdateDeleteView.as_view())
]

urlpatterns = [
    path('', UserCustomDetailListView.as_view()),
    path('/', include(__url_user))
]
