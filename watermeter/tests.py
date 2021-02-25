from datetime import timedelta

from address.models import Address, FullAddress
from django.test import TestCase
from django.utils import timezone
from dwelling.models import Dwelling

from watermeter.models import WaterMeter, WaterMeterMeasurement


class WaterMeterTestCase(TestCase):

    def setUp(self):
        # create address
        address = Address.objects.create(street='Stark Industries', is_external=False)
        full_address = FullAddress.objects.create(address=address, number=25, flat='1', gate='1A', town='EE UU')
        # create a dwelling
        dwelling = Dwelling.objects.create(full_address=full_address,
                                           release_date=timezone.now())
        # create a water meter
        WaterMeter.objects.create(dwelling=dwelling, code='water_meter_tony_stark')

    def test_get_water_meter(self):
        """test water_meter obtains correctly"""
        water_meter = WaterMeter.objects.get(id=1)
        self.assertEqual(water_meter, WaterMeter.objects.get(code='water_meter_tony_stark'))
        self.assertEqual(water_meter.code, 'water_meter_tony_stark')
        self.assertLessEqual(water_meter.release_date, timezone.now())
        self.assertEqual(water_meter.discharge_date, None)

    def test_add_measurement(self):
        """test water_meter add measurement correctly"""
        water_meter = WaterMeter.objects.get(id=1)
        self.assertEqual(WaterMeterMeasurement.objects.filter().all().count(), 0)
        # add measurement
        water_meter.add_measurement(1.0)
        self.assertEqual(WaterMeterMeasurement.objects.filter().all().count(), 1)
        # add measurement
        tomorrow = timezone.now() + timedelta(days=1)
        water_meter.add_measurement(1.2, date=tomorrow)
        self.assertEqual(WaterMeterMeasurement.objects.filter().all().count(), 2)
        # get measurements
        measurements = water_meter.get_measurements()
        self.assertEqual(len(measurements), 2)
        self.assertEqual(measurements[len(measurements) - 1].date, tomorrow)

    def test_discharge(self):
        """test water_meter discharge correctly"""
        water_meter = WaterMeter.objects.get(id=1)
        self.assertEqual(water_meter.discharge_date, None)
        water_meter.discharge()
        self.assertNotEqual(water_meter.discharge_date, None)
