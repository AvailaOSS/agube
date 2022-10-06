from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.exceptions import ObjectDoesNotExist
from manager.models import ManagerConfiguration

from watermeter.send import MeasurementEditedEmailType, send_email_measurement, MeasurementEmailType
from watermeter.models import WaterMeterMeasurement
from dwelling.models import DwellingWaterMeter
from resident.models import Resident
from agube.utils import is_24h_old_than_now


@receiver(post_save, sender=WaterMeterMeasurement)
def measure_update(sender, created, instance, **kwargs):
    watermeter_measurement: WaterMeterMeasurement = WaterMeterMeasurement.objects.get(id=instance.id)

    # Check if measurement is last and recent (24h)
    if watermeter_measurement != watermeter_measurement.water_meter.get_last_measurement() or is_24h_old_than_now(watermeter_measurement.date):
        return

    # Check if watermeter is from a Dwelling
    dwelling_water_meter: DwellingWaterMeter
    try:
        dwelling_water_meter = DwellingWaterMeter.objects.get(
            water_meter=watermeter_measurement.water_meter)
    except ObjectDoesNotExist:
        return

    # Check if dwelling has a resident
    resident: Resident = dwelling_water_meter.dwelling.get_current_resident()
    if (resident == None):
        return

    manager_configuration: ManagerConfiguration = dwelling_water_meter.dwelling.manager.get_closest_config(watermeter_measurement.date)

    if created:
        # Select template
        if (watermeter_measurement.average_daily_flow > manager_configuration.max_daily_consumption):
            email_template = MeasurementEmailType.EXCESIVE_MEASUREMENT_EMAIL.value
        else:
            email_template = MeasurementEmailType.CORRECT_MEASUREMENT_EMAIL.value
    else:
        # Select template
        if (watermeter_measurement.average_daily_flow > manager_configuration.max_daily_consumption):
            email_template = MeasurementEditedEmailType.EXCESIVE_MEASUREMENT_EMAIL.value
        else:
            email_template = MeasurementEditedEmailType.CORRECT_MEASUREMENT_EMAIL.value

    # Send measurement notification email
    send_email_measurement(user=resident.user,
                            watermeter_measurement=watermeter_measurement,
                            manager_configuration=manager_configuration,
                            email_template=email_template)
