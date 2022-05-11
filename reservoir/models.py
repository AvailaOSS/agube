from geolocation.models import Geolocation
from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist
from django.db import models
from django.utils import timezone
from geolocation.models import Geolocation
from watermeter.models import WaterMeter


class Reservoir(models.Model):
    """A class used to represent an Reservoir"""
    geolocation: Geolocation = models.ForeignKey(Geolocation,
                                                 on_delete=models.PROTECT)
    capacity = models.DecimalField( max_digits=10, decimal_places=3)
    inlet_flow = models.DecimalField(max_digits=10, decimal_places=3)
    outlet_flow = models.DecimalField(max_digits=10, decimal_places=3)
    release_date = models.DateTimeField()
    discharge_date = models.DateTimeField(null=True)

    class Meta:
        db_table = 'agube_reservoir_reservoir'

    def save(self, *args, **kwargs):
        """save the reservoir and save release_date timezone.now()"""
        if not self.pk:
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
        # type: (Reservoir) -> ReservoirOwner
        """returns the current reservoir_owner"""
        try:
            return ReservoirOwner.objects.get(reservoir=self,
                                              discharge_date=None)
        except ObjectDoesNotExist:
            return None

    def change_current_water_meter(self, code):
        # discharge current Water Meter
        current: WaterMeter = self.get_current_water_meter()
        if current:
            current.discharge()
        # create new current Water Meter
        water_meter: WaterMeter = WaterMeter.objects.create(code=code)
        ReservoirWaterMeter.objects.create(reservoir=self,
                                           water_meter=water_meter)

    def get_current_water_meter(self) -> WaterMeter:
        try:
            return ReservoirWaterMeter.objects.get(
                reservoir=self, water_meter__discharge_date=None).water_meter
        except ObjectDoesNotExist:
            return None

    def get_historical_water_meter(self) -> WaterMeter:
        try:
            dwelling_water_meters = ReservoirWaterMeter.objects.filter(
                reservoir=self).select_related('water_meter')
            water_meters = []
            for dwelling_water_meter in dwelling_water_meters:
                water_meters.append(dwelling_water_meter.water_meter)

            return water_meters
        except ObjectDoesNotExist:
            return []

    def get_current_water_meter(self):
        # type: (Reservoir) -> WaterMeter
        try:
            return ReservoirWaterMeter.objects.get(
                reservoir=self, water_meter__discharge_date=None).water_meter
        except ObjectDoesNotExist:
            return None

    def discharge(self):
        """discharge this Reservoir"""
        self.discharge_date = timezone.now()
        self.save()


class ReservoirOwner(models.Model):
    """A class used to represent an Owner-Reservoir ManyToMany"""
    reservoir: Reservoir = models.ForeignKey(Reservoir,
                                             on_delete=models.PROTECT)
    user: User = models.ForeignKey(User, on_delete=models.PROTECT)
    release_date = models.DateTimeField()
    discharge_date = models.DateTimeField(null=True)

    class Meta:
        db_table = 'agube_reservoir_reservoir_owner'

    def save(self, *args, **kwargs):
        """save the ReservoirOwner, save release_date timezone.now()"""
        if not self.pk:
            self.release_date = timezone.now()
        super(ReservoirOwner, self).save(*args, **kwargs)

    def discharge(self):
        """discharge this reservoir owner"""
        self.discharge_date = timezone.now()
        self.save()


class ReservoirWaterMeter(models.Model):
    """A class used to represent an Reservoir Water Meter"""
    reservoir: Reservoir = models.ForeignKey(Reservoir,
                                             on_delete=models.RESTRICT)
    water_meter: WaterMeter = models.ForeignKey(WaterMeter,
                                                on_delete=models.RESTRICT)

    class Meta:
        ordering = ["water_meter__release_date"]
        db_table = 'agube_reservoir_reservoir_water_meter'
