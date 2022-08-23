from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.exceptions import ObjectDoesNotExist
from manager.models import ManagerConfiguration

from watermeter.send import send_email_measurement
from watermeter.models import WaterMeterMeasurement
from dwelling.models import DwellingWaterMeter
from owner.models import Owner


@receiver(post_save, sender=WaterMeterMeasurement)
def measure_update(sender, created, instance, **kwargs):
    if created:
        watermeter_measurement: WaterMeterMeasurement = instance
