from django.urls import include, path

from login.views import (UserAddressUpdateDeleteView, UserCreateAddressView,
                         UserCreatePhoneView, UserCustomDetailView,UserCustomDetailUpdateView,
                         UserDwellingDetailView, UserPhoneUpdateDeleteView,
                         ConfigView, UserConfigUpdateView)

__url_user = [
    path('<int:pk>', UserCustomDetailView.as_view()),
    path('<int:pk>/', UserCustomDetailUpdateView.as_view()),
    path('<int:pk>/config', ConfigView.as_view()),
    path('<int:pk>/config/', UserConfigUpdateView.as_view()),
    path('<int:pk>/dwelling', UserDwellingDetailView.as_view()),
    path('<int:pk>/address', UserCreateAddressView.as_view()),
    path('<int:pk>/address/<int:address_id>',
         UserAddressUpdateDeleteView.as_view()),
    path('<int:pk>/phone', UserCreatePhoneView.as_view()),
    path('<int:pk>/phone/<int:phone_id>', UserPhoneUpdateDeleteView.as_view()),
]

urlpatterns = [path('/', include(__url_user))]
