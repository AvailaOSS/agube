from datetime import datetime, timezone

from address.models import FullAddress
from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist
from django.db import models
from login.models import UserAddress


# TODO: move the responsibility to View instead of here
class Dwelling(models.Model):
    """A class used to represent an Owner Dwelling"""
    full_address = models.ForeignKey(FullAddress, on_delete=models.PROTECT)
    release_date = models.DateTimeField()
    discharge_date = models.DateTimeField(null=True)

    class Meta:
        db_table = 'dwelling'

    def save(self, *args, **kwargs):
        """save the dwelling and save release_date datetime.now()"""
        self.release_date = datetime.now().replace(tzinfo=timezone.utc)
        super(Dwelling, self).save(*args, **kwargs)

    def add_owner(self, user):
        """dwelling add owner

        Parameters
        ----------
        user : django.contrib.auth.models.User
            user saved in database"""
        owner = self.get_owner()
        if owner:
            owner.discharge()
        DwellingOwner.objects.create(user=user, dwelling=self)

    def add_resident(self, user):
        """dwelling add resident and discharge the others

        Parameters
        ----------
        user : django.contrib.auth.models.User
            user saved in database"""
        resident = self.get_resident()
        if resident:
            resident.discharge()
        DwellingResident.objects.create(user=user, dwelling=self)

    def get_owner(self):
        """returns the current resident in the dwelling"""
        try:
            return DwellingOwner.objects.get(dwelling=self, discharge_date=None)
        except ObjectDoesNotExist:
            return None

    def get_resident(self):
        """returns the current resident in the dwelling"""
        try:
            return DwellingResident.objects.get(dwelling=self, discharge_date=None)
        except ObjectDoesNotExist:
            return None


class DwellingOwner(models.Model):
    """A class used to represent an Owner-Dwelling ManyToMany"""
    dwelling = models.ForeignKey(Dwelling, on_delete=models.PROTECT)
    user = models.ForeignKey(User, on_delete=models.PROTECT)
    release_date = models.DateTimeField()
    discharge_date = models.DateTimeField(null=True)

    def save(self, *args, **kwargs):
        """save the DwellingOwner, save release_date datetime.now()"""
        self.release_date = datetime.now().replace(tzinfo=timezone.utc)
        super(DwellingOwner, self).save(*args, **kwargs)

    def discharge(self):
        """discharge this resident"""
        self.discharge_date = datetime.now().replace(tzinfo=timezone.utc)
        self.save()

    class Meta:
        db_table = 'owner'


class DwellingResident(models.Model):
    """A class used to represent an Owner-Dwelling ManyToMany"""
    dwelling = models.ForeignKey(Dwelling, on_delete=models.PROTECT)
    user = models.ForeignKey(User, on_delete=models.PROTECT)
    release_date = models.DateTimeField()
    discharge_date = models.DateTimeField(null=True)

    def save(self, *args, **kwargs):
        """save the DwellingOwner, save release_date datetime.now()"""
        self.release_date = datetime.now().replace(tzinfo=timezone.utc)
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
        UserAddress.objects.create(
            user=self.user, full_address=self.dwelling.full_address, main=True)

    def discharge(self):
        """discharge this resident"""
        self.discharge_date = datetime.now().replace(tzinfo=timezone.utc)
        self.save()

    class Meta:
        db_table = 'resident'
