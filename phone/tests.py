from django.test import TestCase

from phone.models import Phone


class PhoneTestCase(TestCase):
    def setUp(self):
        Phone.objects.create(phone_number='999999999')

    def test_get_phone(self):
        """test phone obtains correctly"""
        phone = Phone.objects.get(id=1)
        self.assertEqual(phone.phone_number, '999999999')
