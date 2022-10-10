from django.test import TestCase
from django.utils import timezone

from datetime import datetime, timedelta
import pytz

from agube.utils import is_24h_older_than_now


class UtilsTestCase(TestCase):

    def test_is_24h_old_than_now(self):
        """Check date is older than 24h"""
        self.assertEqual(is_24h_older_than_now(timezone.now()), False)

        utc_tz = pytz.timezone('UTC')
        # 2015-02-01 15:16:17.345
        unaware_datetime = datetime(2015, 2, 1, 15, 16, 17, 345)
        utc_datetime = utc_tz.localize(unaware_datetime)
        self.assertEqual(is_24h_older_than_now(utc_datetime), True)

        # Europe/Madrid
        tz_madrid = pytz.timezone('Europe/Madrid')
        now_madrid = datetime.now(tz_madrid)
        self.assertEqual(is_24h_older_than_now(now_madrid), False)

        # Yesterday
        yestereday_madrid = now_madrid - timedelta(hours=24)
        self.assertEqual(is_24h_older_than_now(yestereday_madrid), True)
