from dwelling.models import Dwelling
from watermeter.models import WaterMeter
from address.models import FullAddress
from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist
from django.db import models
from django.utils import timezone


class Reservoir(models.Model):
    """A class used to represent an Reservoir"""
    full_address = models.ForeignKey(FullAddress, on_delete=models.PROTECT)
    capacity = models.DecimalField(decimal_places=3, max_digits=8)
    inlet_flow = models.DecimalField(decimal_places=3, max_digits=8)
    outlet_flow = models.DecimalField(decimal_places=3, max_digits=8)
    release_date = models.DateTimeField()
    discharge_date = models.DateTimeField(null=True)

    class Meta:
        db_table = 'agube_reservoir_reservoir'

    def save(self, *args, **kwargs):
        """save the reservoir and save release_date timezone.now()"""
        self.release_date = timezone.now()
        super(Reservoir, self).save(*args, **kwargs)

    def change_current_owner(self, user):
        """reservoir add owner

        Parameters
        ----------
        user : django.contrib.auth.models.User
            user saved in database"""
        owner = self.get_current_owner()
        if owner:
            owner.discharge()
        ReservoirOwner.objects.create(user=user, reservoir=self)

    def get_current_owner(self):
        """returns the current reservoir_owner"""
        try:
            return ReservoirOwner.objects.get(reservoir=self, discharge_date=None)
        except ObjectDoesNotExist:
            return None

    def change_current_water_meter(self, code):
        # discharge current Water Meter
        current = self.get_current_water_meter()
        if current:
            current.discharge()
        # create new current Water Meter
        water_meter = WaterMeter.objects.create(code=code)
        ReservoirWaterMeter.objects.create(
            reservoir=self, water_meter=water_meter)

    def get_current_water_meter(self):
        try:
            return ReservoirWaterMeter.objects.get(reservoir=self, water_meter__discharge_date=None).water_meter
        except ObjectDoesNotExist:
            return None

    def discharge(self):
        """discharge this Reservoir"""
        self.discharge_date = timezone.now()
        self.save()


class ReservoirOwner(models.Model):
    """A class used to represent an Owner-Reservoir ManyToMany"""
    reservoir = models.ForeignKey(Reservoir, on_delete=models.PROTECT)
    user = models.ForeignKey(User, on_delete=models.PROTECT)
    release_date = models.DateTimeField()
    discharge_date = models.DateTimeField(null=True)

    class Meta:
        db_table = 'agube_reservoir_reservoir_owner'

    def save(self, *args, **kwargs):
        """save the ReservoirOwner, save release_date timezone.now()"""
        self.release_date = timezone.now()
        super(ReservoirOwner, self).save(*args, **kwargs)

    def discharge(self):
        """discharge this reservoir owner"""
        self.discharge_date = timezone.now()
        self.save()


class ReservoirWaterMeter(models.Model):
    """A class used to represent an Reservoir Water Meter"""
    reservoir = models.ForeignKey(Reservoir, on_delete=models.RESTRICT)
    water_meter = models.ForeignKey(WaterMeter, on_delete=models.RESTRICT)

    class Meta:
        ordering = ["water_meter__release_date"]
        db_table = 'agube_reservoir_reservoir_water_meter'
