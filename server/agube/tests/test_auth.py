from django.test import TestCase
from rest_framework import status
from rest_framework_jwt import utils

from agube.tests.utils import AuthTestSimulator


class AuthTestCase(AuthTestSimulator, TestCase):
    base_url = AuthTestSimulator.base_url + '/token/auth'

    def setUp(self):
        self.simulate_auth()

    def test_jwt_login(self):
        """
        Ensure JWT login view using JSON POST works.
        """
        data = {
            'username': self.admin.username,
            'password': self.admin.username
        }
        response = self.client.post(self.base_url, data, format='json')
        decoded_payload = utils.jwt_decode_handler(response.data['token'])

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(decoded_payload['user_id'], self.admin.id)
        self.assertEqual(decoded_payload['username'], self.admin.username)
