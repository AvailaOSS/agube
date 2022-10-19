import pytz
from datetime import datetime, timedelta, date
from django.test import TestCase
from django.utils import timezone

from agube.exceptions import DateFilterNoEndDateError, DateFilterBadFormatError, DateFilterStartGtEnd
from agube.utils import is_24h_older_than_now, parse_query_date, parse_query_datetime, validate_datetime_filters, \
    validate_query_date_filters


class UtilsTestCase(TestCase):
    utc_tz = pytz.utc
    madrid_tz = pytz.timezone('Europe/Madrid')

    def test_is_24h_old_than_now(self):
        """Check date is older than 24h"""
        self.assertEqual(is_24h_older_than_now(timezone.now()), False)

        # 2015-02-01 15:16:17.345
        unaware_datetime = datetime(2015, 2, 1, 15, 16, 17, 345)
        utc_datetime = self.utc_tz.localize(unaware_datetime)
        self.assertEqual(is_24h_older_than_now(utc_datetime), True)

        # Europe/Madrid
        now_madrid = datetime.now(self.madrid_tz)
        self.assertEqual(is_24h_older_than_now(now_madrid), False)

        # Yesterday
        yestereday_madrid = now_madrid - timedelta(hours=24)
        self.assertEqual(is_24h_older_than_now(yestereday_madrid), True)

    def test_parse_query_datetime(self):
        """Parse query datetime (str|date|datetime) to datetime"""
        # 2022-02-22 22:22:22.222
        datetime_string = '2022-02-22 22:22:22.222'
        datetime_obj = datetime(2022, 2, 22, 22, 22, 22, 222000)
        self.assertEqual(parse_query_datetime(datetime_string), datetime_obj,
                         True)

        # aware
        datetime_string = '2022-02-22T22:22:22.222Z'
        # madrid +1h in february
        datetime_obj = self.madrid_tz.localize(
            datetime(2022, 2, 22, 23, 22, 22, 222000))
        self.assertEqual(parse_query_datetime(datetime_string, self.madrid_tz),
                         datetime_obj, True)

        # parse dates to datetimes for timezone
        date_string = '2022-02-22'
        # utc -1h
        datetime_obj = self.utc_tz.localize(datetime(2022, 2, 21, 23, 0, 0))
        self.assertEqual(parse_query_datetime(date_string, self.madrid_tz),
                         datetime_obj, True)

    def test_parse_query_date(self):
        date_string = '2022-02-22'
        date_obj = date(2022, 2, 22)
        self.assertEqual(parse_query_date(date_string), date_obj, True)

    def test_validate_date_filters(self):
        date_from_string = '2022-02-01'
        date_to_string = '2022-02-05'

        from_datetime = datetime(2022, 2, 1)
        until_datetime = datetime(2022, 2, 5)

        expected_result = from_datetime, until_datetime

        # from before to
        self.assertEqual(
            validate_query_date_filters(date_from_string, date_to_string),
            expected_result, True)

        # exceptions
        with self.assertRaises(DateFilterBadFormatError):
            validate_query_date_filters('2022x02-02', date_to_string)

        with self.assertRaises(DateFilterStartGtEnd):
            validate_query_date_filters(date_to_string, date_from_string)

        with self.assertRaises(DateFilterNoEndDateError):
            validate_query_date_filters(date_to_string, None)
