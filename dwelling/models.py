from address.models import FullAddress
from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist
from django.db import models
from django.utils import timezone
from login.models import UserAddress

from dwelling.exceptions import NullIbanError


class Dwelling(models.Model):
    """A class used to represent an Owner Dwelling"""
    full_address = models.ForeignKey(FullAddress, on_delete=models.PROTECT)
    release_date = models.DateTimeField()
    discharge_date = models.DateTimeField(null=True)

    class Meta:
        db_table = 'dwelling'

    def save(self, *args, **kwargs):
        """save the dwelling and save release_date datetime.now()"""
        self.release_date = timezone.now()
        super(Dwelling, self).save(*args, **kwargs)

    def change_current_owner(self, user):
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
        """returns the current owner in the dwelling"""
        try:
            return DwellingOwner.objects.get(dwelling=self, discharge_date=None)
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
        """returns the current resident in the dwelling"""
        try:
            return DwellingResident.objects.get(dwelling=self, discharge_date=None)
        except ObjectDoesNotExist:
            return None

    def change_current_water_meter(self, code):
        from watermeter.models import WaterMeter

        # discharge current Water Meter
        current = self.get_current_water_meter()
        if current:
            current.discharge()
        # create new current Water Meter
        WaterMeter.objects.create(dwelling=self, code=code)

    def get_current_water_meter(self):
        from watermeter.models import WaterMeter
        try:
            return WaterMeter.objects.get(dwelling=self, discharge_date=None)
        except ObjectDoesNotExist:
            return None

    def add_paymaster(self, payment_type, iban, user_paymaster):
        return Paymaster.objects.create(
            dwelling=self, payment_type=payment_type, iban=iban, user=user_paymaster)

    def get_current_paymaster(self):
        try:
            return Paymaster.objects.get(dwelling=self, discharge_date=None)
        except ObjectDoesNotExist:
            return None


class Paymaster(models.Model):
    class PaymentType(models.TextChoices):
        BANK = "BANK"
        CASH = "CASH"
        EXEMPT = "EXEMPT"

    payment_type = models.TextField(
        choices=PaymentType.choices,
        default=PaymentType.BANK
    )
    iban = models.TextField(null=True)
    user = models.ForeignKey(User, on_delete=models.PROTECT)
    dwelling = models.ForeignKey(Dwelling, on_delete=models.PROTECT)
    release_date = models.DateTimeField()
    discharge_date = models.DateTimeField(null=True)

    def save(self, *args, **kwargs):
        """save the paymaster and check if type is bank iban cannot be null"""
        self.release_date = timezone.now()
        if self.payment_type == Paymaster.PaymentType.BANK:
            if not self.iban:
                raise NullIbanError(Paymaster.PaymentType.BANK)
        super(Paymaster, self).save(*args, **kwargs)

    @property
    def username(self):
        return self.user.username

    class Meta:
        db_table = 'paymaster'


class DwellingOwner(models.Model):
    """A class used to represent an Owner-Dwelling ManyToMany"""
    dwelling = models.ForeignKey(Dwelling, on_delete=models.PROTECT)
    user = models.ForeignKey(User, on_delete=models.PROTECT)
    release_date = models.DateTimeField()
    discharge_date = models.DateTimeField(null=True)

    def save(self, *args, **kwargs):
        """save the DwellingOwner, save release_date datetime.now()"""
        self.release_date = timezone.now()
        super(DwellingOwner, self).save(*args, **kwargs)

    def discharge(self):
        """discharge this resident"""
        self.discharge_date = timezone.now()
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
        UserAddress.objects.create(
            user=self.user, full_address=self.dwelling.full_address, main=True)

    def discharge(self):
        """discharge this resident"""
        self.discharge_date = timezone.now()
        self.save()

    class Meta:
        db_table = 'resident'
