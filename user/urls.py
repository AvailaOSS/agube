from django.urls import include, path

from user.views import (UserAddressUpdateDeleteView, UserCreateGeolocationView,
                        UserCreatePhoneView, UserCustomDetailView,
                        UserCustomDetailUpdateView, UserDwellingDetailView,
                        UserPhoneUpdateDeleteView, ConfigView,
                        PersonConfigUpdateView, UserPhotoDetailView,
                        UserPhotoCreateView)

__url_user = [
    path('<int:pk>', UserCustomDetailView.as_view()),
    path('<int:pk>/', UserCustomDetailUpdateView.as_view()),
    path('<int:pk>/photo', UserPhotoDetailView.as_view()),
    path('photo', UserPhotoCreateView.as_view({'post': 'create'})),
    path('<int:pk>/config', ConfigView.as_view()),
    path('<int:pk>/config/', PersonConfigUpdateView.as_view()),
    path('<int:pk>/dwelling', UserDwellingDetailView.as_view()),
    path('<int:pk>/geolocation', UserCreateGeolocationView.as_view()),
    path('<int:pk>/geolocation/<int:geolocation_id>',
         UserAddressUpdateDeleteView.as_view()),
    path('<int:pk>/phone', UserCreatePhoneView.as_view()),
    path('<int:pk>/phone/<int:phone_id>', UserPhoneUpdateDeleteView.as_view()),
]

urlpatterns = [path('/', include(__url_user))]
