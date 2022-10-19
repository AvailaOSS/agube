from django.test import TestCase
from django.utils import dateparse

from watermeter.models import WaterMeter


class WaterMeterMeasurementTestCase(TestCase):

    def setUp(self):
        lion = WaterMeter.objects.create(code="lion")
        self.assertEqual(lion.get_last_measurement(), None)
        lion.add_measurement(100.00, dateparse.parse_datetime("2022-07-18 10:16:01+0000"))

    def test_calculate_average_daily_consumption(self):
        """Compute average daily consumption from previous measurement"""
        lion = WaterMeter.objects.get(code="lion")
        # check that setUp works!
        previous = lion.get_last_measurement()
        self.assertNotEqual(previous, None)
        self.assertEqual(previous.measurement, 100.00)
        self.assertEqual(previous.average_daily_flow, 0)

        # 2 days later
        measurement = 110.00
        previous = lion.add_measurement(measurement, dateparse.parse_datetime("2022-07-20 10:16:01+0000"))
        self.assertEqual(len(lion.get_measurements()), 2)
        self.assertEqual(previous.measurement, measurement)
        self.assertEqual(previous.average_daily_flow, 5000)

        # 1 day 4h later = 1.25 days
        measurement = 111.0
        previous = lion.add_measurement(measurement, dateparse.parse_datetime("2022-07-21 16:16:01+0000"))
        self.assertEqual(len(lion.get_measurements()), 3)
        self.assertEqual(float(previous.measurement), measurement)
        self.assertEqual(float(previous.average_daily_flow), 800.0)

        # 15 days later
        measurement = 128.64
        lion.add_measurement(measurement, dateparse.parse_datetime("2022-08-5 16:16:01+0000"))
        self.assertEqual(len(lion.get_measurements()), 4)
        previous = lion.get_last_measurement()
        self.assertEqual(float(previous.measurement), measurement)
        self.assertEqual(float(previous.average_daily_flow), 1176.0)

        # old measurement, 1 day 3 hours later after 1st measurement = 1.125 days
        measurement = 101.125
        current = lion.add_measurement(measurement, dateparse.parse_datetime("2022-07-19 13:16:01+0000"))
        self.assertEqual(len(lion.get_measurements()), 5)
        previous = lion.get_last_measurement(current.date)
        self.assertEqual(float(previous.measurement), measurement)
        self.assertEqual(float(previous.average_daily_flow), 1000.0)
