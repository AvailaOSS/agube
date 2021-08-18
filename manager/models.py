from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist
from django.db import models
from django.utils import timezone


class Manager(models.Model):
    user = models.OneToOneField(
        User, primary_key=True, on_delete=models.RESTRICT)

    class Meta:
        db_table = 'agube_manager_manager'

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
        db_table = 'agube_manager_configuration'

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
        db_table = 'agube_manager_hook_price'

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
        db_table = 'agube_manager_person'
