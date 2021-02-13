from django.test import TestCase

from .models import Address, FullAddress


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


class FullAddressTestCase(TestCase):

    def setUp(self):
        address = Address.objects.create(street='wall street', is_external=False)
        FullAddress.objects.create(address=address, number=57, flat='99', gate='A', town='New York')
        FullAddress.objects.create(address=address, number=56, town='New York')

    def test_get_full_address(self):
        """test full address obtains correctly"""
        wall_street_1 = FullAddress.objects.get(id=1)
        self.assertEqual(wall_street_1.address, Address.objects.get(id=1))
        self.assertEqual(wall_street_1.number, 57)
        self.assertEqual(wall_street_1.flat, '99')
        self.assertEqual(wall_street_1.gate, 'A')
        self.assertEqual(wall_street_1.town, 'New York')

        wall_street_2 = FullAddress.objects.get(id=2)
        self.assertEqual(wall_street_2.address, Address.objects.get(id=1))
        self.assertEqual(wall_street_2.number, 56)
        self.assertEqual(wall_street_2.flat, None)
        self.assertEqual(wall_street_2.gate, None)
        self.assertEqual(wall_street_2.town, 'New York')

    def test_get_full_address_ordered(self):
        """test full address obtains correctly ordered"""
        full_address = FullAddress.objects.all()
        self.assertEqual(full_address[0].id, 2)
        self.assertEqual(full_address[1].id, 1)
