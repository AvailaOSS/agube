from address.models import FullAddress
from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist
from django.db import models
from django.utils import timezone
from phone.models import Phone


class Manager(models.Model):
    user = models.OneToOneField(
        User, primary_key=True, on_delete=models.RESTRICT)

    class Meta:
        db_table = 'manager'

    def save(self, *args, **kwargs):
        __default_max_daily_consumption = 1000
        __default_hook_price = 100
        """save the Manager and create default config"""
        super(Manager, self).save(*args, **kwargs)
        self.create_default_configuration(
            __default_max_daily_consumption, __default_hook_price)

    def create_default_configuration(self, max_daily_consumption, hook_price):
        """create default Manager Configuration"""
        configuration = ManagerConfiguration.objects.create(
            manager=self, max_daily_consumption=max_daily_consumption)
        configuration.create_hook(hook_price)


class ManagerConfiguration(models.Model):
    manager = models.OneToOneField(Manager, on_delete=models.RESTRICT)
    max_daily_consumption = models.DecimalField(decimal_places=3, max_digits=8)

    class Meta:
        db_table = 'manager_configuration'

    def save(self, *args, **kwargs):
        """save the Manager and create default config"""
        super(ManagerConfiguration, self).save(*args, **kwargs)

    def create_hook(self, hook_price):
        """create hook and discharge the old"""
        current = self.get_current_hook()
        if current:
            current.discharge()
        hook_price = HookPrice.objects.create(
            manager_configuration=self, hook_price=hook_price)

    def get_current_hook(self):
        """get current hook"""
        try:
            return HookPrice.objects.get(manager_configuration=self, discharge_date=None)
        except ObjectDoesNotExist:
            return None

    @property
    def hook_price(self):
        return self.get_current_hook()


class HookPrice(models.Model):
    manager_configuration = models.ForeignKey(
        ManagerConfiguration, on_delete=models.RESTRICT)
    hook_price = models.DecimalField(decimal_places=2, max_digits=8)
    release_date = models.DateTimeField()
    discharge_date = models.DateTimeField(null=True)

    class Meta:
        db_table = 'hook_price'

    def save(self, *args, **kwargs):
        """save the Hook and save release_date timezone.now()"""
        self.release_date = timezone.now()
        super(HookPrice, self).save(*args, **kwargs)

    def discharge(self):
        """discharge this Hook"""
        self.discharge_date = timezone.now()
        self.save()


class Person(models.Model):
    manager = models.ForeignKey(Manager, on_delete=models.RESTRICT)
    user = models.OneToOneField(User, on_delete=models.RESTRICT)

    class Meta:
        db_table = 'person'


class UserAddress(models.Model):
    """A class used to represent an User Full Address"""
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    full_address = models.ForeignKey(FullAddress, on_delete=models.CASCADE)
    main = models.BooleanField(default=False)

    class Meta:
        db_table = 'user_address'


class UserPhone(models.Model):
    """A class used to represent an User Phone"""
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    phone = models.ForeignKey(Phone, on_delete=models.CASCADE)
    main = models.BooleanField(default=False)

    class Meta:
        db_table = 'user_phone'


def update_address_to_not_main(user_id):
    try:
        user_address = UserAddress.objects.get(user__id=user_id, main=True)
        user_address.main = False
        user_address.save()
    except ObjectDoesNotExist:
        pass


def update_phone_to_not_main(user_id):
    try:
        user_phone = UserPhone.objects.get(user__id=user_id, main=True)
        user_phone.main = False
        user_phone.save()
    except ObjectDoesNotExist:
        pass
