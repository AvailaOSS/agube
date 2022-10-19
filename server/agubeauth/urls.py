from django.urls import include, path

from agubeauth.views import EnableAccountView, ChangePasswordView, ResetPasswordView

__url_auth = [
    path('enable-account', EnableAccountView.as_view()),
    path('change-password', ChangePasswordView.as_view()),
    path('reset-password', ResetPasswordView.as_view())
]

urlpatterns = [
    path('/', include(__url_auth))
]
