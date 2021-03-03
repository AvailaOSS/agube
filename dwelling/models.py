from address.models import FullAddress
from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist
from django.db import models
from django.utils import timezone
from login.models import UserAddress

from dwelling.exceptions import NullIbanError


class Payment(models.Model):
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

    def save(self, *args, **kwargs):
        """save the payment and check if type is bank iban cannot be null"""
        if self.payment_type == Payment.PaymentType.BANK:
            if not self.iban:
                raise NullIbanError(Payment.PaymentType.BANK)
        super(Payment, self).save(*args, **kwargs)

    class Meta:
        db_table = 'payment'


class Dwelling(models.Model):
    """A class used to represent an Owner Dwelling"""
    full_address = models.ForeignKey(FullAddress, on_delete=models.PROTECT)
    payment = models.ForeignKey(Payment, on_delete=models.PROTECT)
    release_date = models.DateTimeField()
    discharge_date = models.DateTimeField(null=True)

    class Meta:
        db_table = 'dwelling'

    def save(self, *args, **kwargs):
        """save the dwelling and save release_date datetime.now()"""
        self.release_date = timezone.now()
        super(Dwelling, self).save(*args, **kwargs)

    def change_current_owner_user(self, user):
        """dwelling add owner

        Parameters
        ----------
        user : django.contrib.auth.models.User
            user saved in database"""
        owner = self.get_current_owner()
        if owner:
            owner.discharge()
        DwellingOwner.objects.create(user=user, dwelling=self)

    def change_current_owner(self, username, first_name, last_name, email):
        """dwelling add owner

        Parameters
        ----------
        user : django.contrib.auth.models.User
            user saved in database"""
        owner = self.get_current_owner()
        if owner:
            owner.discharge()
        new_user_owner = User.objects.create(
            username=username,
            first_name=first_name,
            last_name=last_name,
            email=email)
        DwellingOwner.objects.create(user=new_user_owner, dwelling=self)

    def get_current_owner(self):
        """returns the current owner in the dwelling"""
        try:
            return DwellingOwner.objects.get(dwelling=self, discharge_date=None)
        except ObjectDoesNotExist:
            return None

    def change_current_resident_user(self, user):
        """dwelling add resident and discharge the others

        Parameters
        ----------
        user : django.contrib.auth.models.User
            user saved in database"""
        resident = self.get_current_resident()
        if resident:
            resident.discharge()
        DwellingResident.objects.create(user=user, dwelling=self)

    def change_current_resident(self, username, first_name, last_name, email):
        """dwelling add resident and discharge the others

        Parameters
        ----------
        user : django.contrib.auth.models.User
            user saved in database"""
        resident = self.get_current_resident()
        if resident:
            resident.discharge()
        new_user_resident = User.objects.create(
            username=username,
            first_name=first_name,
            last_name=last_name,
            email=email)
        DwellingResident.objects.create(user=new_user_resident, dwelling=self)

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
