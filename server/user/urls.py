from django.urls import include, path

from user.views import (UserGeolocationUpdateDeleteView, UserGeolocationView,
                        UserCreatePhoneView, UserCustomDetailView,
                        UserCustomDetailUpdateView, UserDwellingDetailView,
                        UserPhoneUpdateDeleteView, ConfigView,
                        PersonConfigUpdateView, UserPhotoDetailView,
                        UserPhotoCreateView)

__url_user = [
    path('<int:pk>', UserCustomDetailView.as_view()),
    path('<int:pk>/update', UserCustomDetailUpdateView.as_view()),
    path('<int:pk>/photo', UserPhotoDetailView.as_view()),
    path('photo', UserPhotoCreateView.as_view()),
    path('<int:pk>/config', ConfigView.as_view()),
    path('<int:pk>/config/update', PersonConfigUpdateView.as_view()),
    path('<int:pk>/dwelling', UserDwellingDetailView.as_view()),
    path('<int:pk>/geolocation', UserGeolocationView.as_view()),
    path('<int:pk>/geolocation/<int:geolocation_id>',
         UserGeolocationUpdateDeleteView.as_view()),
    path('<int:pk>/phone', UserCreatePhoneView.as_view()),
    path('<int:pk>/phone/<int:phone_id>', UserPhoneUpdateDeleteView.as_view()),
]

urlpatterns = [path('/', include(__url_user))]
