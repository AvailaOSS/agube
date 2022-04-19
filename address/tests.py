from django.test import TestCase

from .models import Address


class AddressTestCase(TestCase):
    def setUp(self):
        Address.objects.create(street='wall street', is_external=False)
        Address.objects.create(street='central park', is_external=True)

    def test_get_address(self):
        """test address obtains correctly"""
        wall_street = Address.objects.get(id=1)
        self.assertEqual(wall_street.street, 'wall street')
        self.assertEqual(wall_street.is_external, False)

        central_park = Address.objects.get(id=2)
        self.assertEqual(central_park.street, 'central park')
        self.assertEqual(central_park.is_external, True)
