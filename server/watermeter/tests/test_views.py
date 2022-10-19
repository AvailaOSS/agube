from rest_framework import status
from rest_framework.test import APITestCase

from address.models import Address
from agube.tests.utils import AuthTestSimulator
from dwelling.models import Dwelling, DwellingWaterMeter
from geolocation.models import Geolocation
from manager.models import Manager
from watermeter.models import WaterMeter
from watermeter.serializers import WaterMeterMeasurementSerializer


class WaterMeterMeasurementViewTestCase(AuthTestSimulator, APITestCase):
    base_url = AuthTestSimulator.base_url + '/water-meter/'

    def setUp(self):
        self.simulate_auth()
        lion = WaterMeter.objects.create(code="lion")
        data = {
            'measurement': '99.00',
            'date': '2022-07-20 10:16:01+0000'
        }
        WaterMeterMeasurementSerializer(data=data).self_create(lion)

    def test_get_getWaterMeterMeasurements(self):
        # prepare url
        lion = WaterMeter.objects.get(code="lion")
        url = self.base_url + str(lion.id) + '/measurement'

        # assertion
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data.get('results')), 1)

        # assertion data with water_meter not in dwelling
        measure = response.data.get('results')[0]
        self.assertEqual(float(measure['measurement']), 99.00)
        self.assertEqual(float(measure['average_daily_flow']), 0.00)
        self.assertEqual(float(measure['max_daily_consumption']), 0.00)
        self.assertEqual(measure['date'], "2022-07-20T10:16:01Z")

        # move the water_meter into dwelling
        address = Address.objects.get_or_create(
            is_external=False,
            city='city',
            country='country',
            city_district='city_district',
            municipality='municipality',
            postcode='postcode',
            province='province',
            state='state',
            village='village',
            road='road',
        )[0]
        geolocation = Geolocation.objects.create(
            address=address,
            latitude=5.5,
            longitude=5.5,
            zoom=5,
            horizontal_degree=5,
            vertical_degree=5,
            number=1,
            flat=2,
            gate=1)
        geolocation.save()

        manager = Manager.objects.get(user_id=self.admin.id)

        dwelling = Dwelling.objects.create(
            manager=manager,
            geolocation=geolocation)
        DwellingWaterMeter.objects.create(dwelling=dwelling, water_meter=lion)

        # now it must be linked with max_daily_consumption
        response = self.client.get(url, format='json')
        measure = response.data.get('results')[0]
        self.assertEqual(float(measure['measurement']), 99.00)
        self.assertEqual(float(measure['average_daily_flow']), 0.00)
        self.assertEqual(float(measure['max_daily_consumption']), 1000.0)
        self.assertEqual(measure['date'], "2022-07-20T10:16:01Z")

    def test_post_addWaterMeterMeasurement(self):
        """
        Ensure new measurement creation.
        """
        # prepare url
        lion = WaterMeter.objects.get(code="lion")
        url = self.base_url + str(lion.id) + '/measurement'

        # expected data
        expected_measurement = 100.0
        data = {"measurement": expected_measurement, "date": "2022-07-23T10:08:28.828Z"}

        # assertion
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(lion.get_measurements()), 2)
        self.assertEqual(lion.get_last_measurement().measurement, expected_measurement)
        self.assertEqual(float(lion.get_last_measurement().average_daily_flow), 333.916)

        # expected data
        expected_measurement = float(101.53)
        data = {"measurement": expected_measurement, "date": "2022-07-30T15:10:27.828Z"}

        # assertion
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(lion.get_measurements()), 3)
        self.assertEqual(float(lion.get_last_measurement().measurement), expected_measurement)
        self.assertEqual(float(lion.get_last_measurement().average_daily_flow), 212.214)
