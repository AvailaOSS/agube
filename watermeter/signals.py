import datetime
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.exceptions import ObjectDoesNotExist
from manager.models import ManagerConfiguration

from watermeter.send import send_email_measurement, MeasurementEmailType
from watermeter.models import WaterMeterMeasurement
from dwelling.models import DwellingWaterMeter
from resident.models import Resident


@receiver(post_save, sender=WaterMeterMeasurement)
def measure_update(sender, created, instance, **kwargs):
    if created:
        watermeter_measurement: WaterMeterMeasurement = WaterMeterMeasurement.objects.get(
            id=instance.id)

        # Check if measurement is last and recent (24h)
        if watermeter_measurement != watermeter_measurement.water_meter.get_last_measurement(
        ) or (datetime.datetime.now(datetime.timezone.utc) - watermeter_measurement.date) > datetime.timedelta(hours=24):
            return

        # Check if watermeter is from a Dwelling
        dwelling_water_meter: DwellingWaterMeter
        try:
            dwelling_water_meter = DwellingWaterMeter.objects.get(
                water_meter=watermeter_measurement.water_meter)
        except ObjectDoesNotExist:
            return

        # Check if dwelling has a resident
        resident: Resident = dwelling_water_meter.dwelling.get_current_resident(
        )
        if (resident == None):
            return

        manager_configuration: ManagerConfiguration = ManagerConfiguration.objects.get(
            manager=dwelling_water_meter.dwelling.manager)

        # Select template
        if (watermeter_measurement.measurement_diff >
                manager_configuration.max_daily_consumption):
            email_template = MeasurementEmailType.EXCESIVE_MEASUREMENT_EMAIL.value
        else:
            email_template = MeasurementEmailType.CORRECT_MEASUREMENT_EMAIL.value

        # Send measurement notification email
        send_email_measurement(user=resident.user,
                               watermeter_measurement=watermeter_measurement,
                               manager_configuration=manager_configuration,
                               email_template=email_template)
