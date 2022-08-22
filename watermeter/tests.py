from django.test import TestCase
from watermeter.models import WaterMeter

class WaterMeterMeasurementTestCase(TestCase):

    def setUp(self):
        lion = WaterMeter.objects.create(code="lion")
        self.assertEqual(lion.get_last_measurement(), None)
        lion.add_measurement(100.00, "2022-07-18 10:16:01+0000")

    def test_compute_diff(self):
        """Compute the diff with the previous measurement"""
        lion = WaterMeter.objects.get(code="lion")
        # check that setUp works!
        prev = lion.get_last_measurement()
        self.assertNotEqual(prev, None)
        self.assertEqual(prev.measurement, 100.00)
        self.assertEqual(prev.measurement_diff, 0)

        # create new measures
        measure = 110.00
        prev = lion.add_measurement(measure, "2022-07-20 10:16:01+0000")
        self.assertEqual(len(lion.get_measurements()), 2)
        self.assertEqual(prev.measurement, measure)
        self.assertEqual(prev.measurement_diff, 5000)

        measure = 110.334
        prev = lion.add_measurement(measure, "2022-07-21 10:16:01+0000")
        self.assertEqual(len(lion.get_measurements()), 3)
        self.assertEqual(float(prev.measurement), measure)
        self.assertEqual(float(prev.measurement_diff), 334)

        measure = 110.54
        prev = lion.add_measurement(measure, "2022-07-22 10:16:01+0000")
        self.assertEqual(len(lion.get_measurements()), 4)
        self.assertEqual(float(prev.measurement), measure)
        self.assertEqual(float(prev.measurement_diff), 206.0)

        measure = 120.78
        lion.add_measurement(measure, "2022-08-21 10:00:01+0000")
        self.assertEqual(len(lion.get_measurements()), 5)
        prev = lion.get_last_measurement()
        self.assertEqual(float(prev.measurement), measure)
        self.assertEqual(float(prev.measurement_diff), 353.0)

        # back to the future! ¡The date is in the past!
        measure = 100.78
        current = lion.add_measurement(measure, "2022-07-19 12:00:01+0000")
        self.assertEqual(len(lion.get_measurements()), 6)
        prev = lion.get_last_measurement(current.date)
        self.assertEqual(float(prev.measurement), measure)
        self.assertEqual(float(prev.measurement_diff), 780.0)