from django.urls import include, path

from login.views import (ManagerConfigurationView, UserAddressUpdateDeleteView, UserCreateAddressView,
                         UserCreatePhoneView, UserCustomDetailListView,
                         UserDwellingDetailView, UserPhoneUpdateDeleteView)

__url_manager = [
    path('/<int:pk>', ManagerConfigurationView.as_view()),
]

__url_user = [
    path('', UserCustomDetailListView.as_view()),
    path('/<int:pk>/dwelling', UserDwellingDetailView.as_view()),
    path('/<int:pk>/address', UserCreateAddressView.as_view()),
    path('/<int:pk>/address/<int:full_address_id>',
         UserAddressUpdateDeleteView.as_view()),
    path('/<int:pk>/phone', UserCreatePhoneView.as_view()),
    path('/<int:pk>/phone/<int:phone_id>', UserPhoneUpdateDeleteView.as_view()),
]

urlpatterns_manager = [
    path('manager', include(__url_manager)),
]

urlpatterns = [
    path('user', include(__url_user)),
]
