from login.views import UserCreateAddressView, UserCustomDetailListView, UserDwellingDetailView, UserCreatePhoneView, UserUpdateDeletePhoneView
from django.urls import path, include

__url_user = [
    path('', UserCustomDetailListView.as_view()),
    path('/<int:pk>/dwelling', UserDwellingDetailView.as_view()),
    path('/<int:pk>/address', UserCreateAddressView.as_view()),
    path('/<int:pk>/phone', UserCreatePhoneView.as_view()),
    path('/<int:pk>/phone/<int:phone_id>', UserUpdateDeletePhoneView.as_view()),
    # path('/<int:pk>/address', UserChangeAddressView.as_view()),
]

urlpatterns = [
    path('user', include(__url_user)),
]
