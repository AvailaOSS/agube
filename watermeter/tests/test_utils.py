from datetime import datetime, timezone
from django.test import TestCase
from watermeter.utils import is_24h_old_than_now


class is_24h_old_than_now_TestCase(TestCase):

    def test_is_24h_old_than_now(self):
        """Check date is older than 24h"""
        self.assertEqual(is_24h_old_than_now(datetime.now(timezone.utc)), False)
        self.assertEqual(is_24h_old_than_now(datetime(2015, 2, 1, 15, 16, 17, 345, tzinfo= timezone.utc)), True)
