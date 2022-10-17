from agube.tasks import new_user_published
from django.contrib.auth.models import User
from django.urls import path
from rest_framework.test import APIClient
from rest_framework_jwt.views import obtain_jwt_token


def create_super_user():
    admin = User.objects.create_superuser('admin', 'admin@test.com', 'admin')
    payload = '{"id":"' + str(admin.id) + '","full_name":"' + admin.username + " " + admin.username + '","extra_info":"admin", "email":"' + admin.email + '","phone_number":"123456789"}'
    new_user_published(payload)
    return admin

class AuthTestSimulator():
    base_url = '/api/v1.0.0/agube'
    token=''

    def simulate_auth(self) -> None:
        # enable token/auth for testing
        from agube import urls
        urls.urlpatterns.append(path(urls.base_url + 'token/auth', obtain_jwt_token))

        # create a superuser
        self.admin = create_super_user()

        # set up test with user logged
        self.client = APIClient()
        self.client.login(username=self.admin.username, password=self.admin.username)