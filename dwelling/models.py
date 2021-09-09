from address.models import FullAddress
from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist
from django.db import models
from django.utils import timezone
from login.models import UserAddress
from manager.models import Manager
from watermeter.models import WaterMeter

from dwelling.exceptions import OwnerAlreadyIsResidentError


class Dwelling(models.Model):
    """A class used to represent an Dwelling"""
    manager: Manager = models.ForeignKey(Manager, on_delete=models.PROTECT)
    full_address: FullAddress = models.ForeignKey(FullAddress,
                                                  on_delete=models.PROTECT)
    release_date = models.DateTimeField()
    discharge_date = models.DateTimeField(null=True)

    class Meta:
        db_table = 'agube_dwelling_dwelling'

    def save(self, *args, **kwargs):
        """save the dwelling and save release_date timezone.now()"""
        if not self.pk:
            self.release_date = timezone.now()
        super(Dwelling, self).save(*args, **kwargs)

    def change_current_owner(self, user: User):
        """dwelling add owner

        Parameters
        ----------
        user : django.contrib.auth.models.User
            user saved in database"""
        owner = self.get_current_owner()
        if owner:
            owner.discharge()
        DwellingOwner.objects.create(user=user, dwelling=self)

    def get_current_owner(self):
        # type: (Dwelling) -> DwellingOwner
        """returns the current owner in the dwelling"""
        try:
            return DwellingOwner.objects.get(dwelling=self,
                                             discharge_date=None)
        except ObjectDoesNotExist:
            return None

    def change_current_resident(self, user):
        """dwelling add resident and discharge the others

        Parameters
        ----------
        user : django.contrib.auth.models.User
            user saved in database"""
        resident = self.get_current_resident()
        if resident:
            resident.discharge()
        DwellingResident.objects.create(user=user, dwelling=self)

    def get_current_resident(self):
        # type: (Dwelling) -> DwellingResident
        """returns the current resident in the dwelling"""
        try:
            return DwellingResident.objects.get(dwelling=self,
                                                discharge_date=None)
        except ObjectDoesNotExist:
            return None

    def change_current_water_meter(self, code: str):
        # discharge current Water Meter
        current = self.get_current_water_meter()
        if current:
            current.discharge()
        # create new current Water Meter
        water_meter: WaterMeter = WaterMeter.objects.create(code=code)
        DwellingWaterMeter.objects.create(dwelling=self,
                                          water_meter=water_meter)

    def get_current_water_meter(self) -> WaterMeter:
        try:
            return DwellingWaterMeter.objects.get(
                dwelling=self, water_meter__discharge_date=None).water_meter
        except ObjectDoesNotExist:
            return None

    def set_owner_as_resident(self):
        owner = self.get_current_owner()
        resident = self.get_current_resident()
        if resident and owner.user == resident.user:
            raise OwnerAlreadyIsResidentError()
        self.change_current_resident(owner.user)

    def discharge(self):
        """discharge this Dwelling"""
        self.discharge_date = timezone.now()
        self.save()


class DwellingOwner(models.Model):
    """A class used to represent an Owner-Dwelling ManyToMany"""
    dwelling: Dwelling = models.ForeignKey(Dwelling, on_delete=models.PROTECT)
    user: User = models.ForeignKey(User, on_delete=models.PROTECT)
    release_date = models.DateTimeField()
    discharge_date = models.DateTimeField(null=True)

    class Meta:
        db_table = 'agube_dwelling_owner'

    def save(self, *args, **kwargs):
        """save the DwellingOwner, save release_date timezone.now()"""
        if not self.pk:
            self.release_date = timezone.now()
        super(DwellingOwner, self).save(*args, **kwargs)

    def discharge(self):
        """discharge this owner"""
        self.discharge_date = timezone.now()
        self.user.is_active = False
        self.user.save()
        self.save()


class DwellingResident(models.Model):
    """A class used to represent an Resident-Dwelling ManyToMany"""
    dwelling: Dwelling = models.ForeignKey(Dwelling, on_delete=models.PROTECT)
    user: User = models.ForeignKey(User, on_delete=models.PROTECT)
    release_date = models.DateTimeField()
    discharge_date = models.DateTimeField(null=True)

    class Meta:
        db_table = 'agube_dwelling_resident'

    def save(self, *args, **kwargs):
        """save the DwellingResident, save release_date timezone.now()"""
        if not self.pk:
            self.release_date = timezone.now()
        super(DwellingResident, self).save(*args, **kwargs)
        self.__add_main_address()

    def __add_main_address(self):
        """resident add main address and set others as not main"""
        try:
            for older in UserAddress.objects.filter(user=self.user):
                older.main = False
                older.save()
        except ObjectDoesNotExist:
            pass
        UserAddress.objects.create(user=self.user,
                                   full_address=self.dwelling.full_address,
                                   main=True)

    def discharge(self):
        """discharge this resident"""
        self.discharge_date = timezone.now()
        # if user is Owner do not disable user account
        dwelling: Dwelling = Dwelling.objects.get(id=self.dwelling.id)
        current_owner = dwelling.get_current_owner().user
        if self.user != current_owner:
            self.user.is_active = False
            self.user.save()
        self.save()


class DwellingWaterMeter(models.Model):
    """A class used to represent an Dwelling Water Meter"""
    dwelling: Dwelling = models.ForeignKey(Dwelling, on_delete=models.RESTRICT)
    water_meter: WaterMeter = models.ForeignKey(WaterMeter,
                                                on_delete=models.RESTRICT)

    class Meta:
        ordering = ["water_meter__release_date"]
        db_table = 'agube_dwelling_dwelling_water_meter'
