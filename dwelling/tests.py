from django.test import TestCase

from address.models import Address, FullAddress
from dwelling.models import Dwelling, DwellingOwner
from owner.models import Owner


class DwellingTestCase(TestCase):

    def setUp(self):
        # create address
        address = Address.objects.create(street='Stark Industries', is_external=False)
        full_address = FullAddress.objects.create(address=address, number=25, flat='1', gate='1A', town='EE UU')
        # create a dwelling
        Dwelling.objects.create(full_address=full_address)

    def test_get_dwelling(self):
        """test dwelling obtains correctly"""
        self.assertEqual(Dwelling.objects.filter().all().count(), 1)
        # test dwelling has owner
        dwelling = Dwelling.objects.get(id=1)
        dwelling.add_owner('Tony Stark', 'tony@avengers.com', 'AnthonyEdwardStark')
        # yes it has
        self.assertEqual(dwelling,
                         DwellingOwner.objects.get(owner=Owner.objects.get(user__username='Tony Stark')).dwelling)
        # has release_date
        self.assertNotEqual(dwelling.release_date, None)
        self.assertEqual(dwelling.discharge_date, None)

    def test_add_owner(self):
        """test add owner is saved & discharge correctly"""
        # get Dwelling
        dwelling = Dwelling.objects.get(id=1)
        # no owner yet
        self.assertEqual(dwelling.get_owner(), None)
        self.assertEqual(dwelling.get_old_owners(), [])
        # add owner to dwelling
        dwelling.add_owner('Vision', 'vision@avengers.com', 'Vision the android')
        # get current resident
        owner = dwelling.get_owner()
        self.assertNotEqual(owner, None)
        self.assertEqual(owner.owner.user.username, 'Vision')
        self.assertEqual(dwelling.get_old_owners(), [])
        # add another owner and discharge the old
        dwelling.add_owner('Scarlet Witch', 'scarlet_witch@avengers.com', 'Wanda Maximoff')
        owner = dwelling.get_owner()
        self.assertNotEqual(owner, None)
        self.assertEqual(owner.owner.user.username, 'Scarlet Witch')
        self.assertNotEqual(dwelling.get_old_owners(), [])

    def test_add_resident(self):
        """test add resident is saved & discharge correctly"""
        # get Dwelling
        dwelling = Dwelling.objects.get(id=1)
        # no residents yet
        self.assertEqual(dwelling.get_resident(), None)
        self.assertEqual(dwelling.get_old_residents(), [])
        # add resident to dwelling
        dwelling.add_resident('Scarlet Witch', 'scarlet_witch@avengers.com', 'Wanda Maximoff')
        # get current resident
        resident = dwelling.get_resident()
        self.assertNotEqual(resident, None)
        self.assertEqual(resident.user.username, 'Scarlet Witch')
        self.assertEqual(dwelling.get_old_residents(), [])
        # add another resident and discharge the old
        dwelling.add_resident('Vision', 'vision@avengers.com', 'Vision the android')
        resident = dwelling.get_resident()
        self.assertNotEqual(resident, None)
        self.assertEqual(resident.user.username, 'Vision')
        self.assertNotEqual(dwelling.get_old_residents(), [])

    def test_add_water_meter(self):
        """test add water meter is saved & discharge correctly"""
        # get Dwelling
        dwelling = Dwelling.objects.get(id=1)
        # no water meters yet
        self.assertEqual(dwelling.get_water_meter(), None)
        self.assertEqual(dwelling.get_old_water_meter(), [])
        # add water meter to dwelling
        dwelling.add_water_meter('water_meter_tony_stark')
        # get current water meter
        water_meter = dwelling.get_water_meter()
        self.assertNotEqual(water_meter, None)
        self.assertEqual(water_meter.code, 'water_meter_tony_stark')
        self.assertEqual(dwelling.get_old_water_meter(), [])
        # add another water meter and discharge the old
        dwelling.add_water_meter('water_meter_created_by_vision')
        water_meter = dwelling.get_water_meter()
        self.assertNotEqual(water_meter, None)
        self.assertEqual(water_meter.code, 'water_meter_created_by_vision')
        self.assertNotEqual(dwelling.get_old_water_meter(), [])

    def test_discharge(self):
        """test dwelling is discharge correctly"""
        dwelling = Dwelling.objects.get(id=1)
        self.assertEqual(dwelling.discharge_date, None)
        dwelling.discharge()
        self.assertNotEqual(dwelling.discharge_date, None)
