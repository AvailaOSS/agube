from login.views import UserCustomDetailListView, UserCreatePhoneView, UserUpdateDeletePhoneView
from django.urls import path, include

__url_user = [
    path('', UserCustomDetailListView.as_view()),
    path('/<int:pk>/phone', UserCreatePhoneView.as_view()),
    path('/<int:pk>/phone/<int:phone_id>', UserUpdateDeletePhoneView.as_view()),
    # path('/<int:pk>/address', UserChangeAddressView.as_view()),
]

urlpatterns = [
    path('user', include(__url_user)),
]
