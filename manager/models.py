from django.contrib.auth.models import User
from django.db import models
from django.utils import timezone
from django.core.exceptions import ObjectDoesNotExist


class Manager(models.Model):
    user: User = models.OneToOneField(User,
                                      primary_key=True,
                                      on_delete=models.RESTRICT)

    class Meta:
        db_table = 'agube_manager_manager'

    def save(self, *args, **kwargs):
        __default_max_daily_consumption = 1000
        __default_hook_price = 100
        """save the Manager and create default config"""
        super(Manager, self).save(*args, **kwargs)
        self.create_configuration(__default_max_daily_consumption,
                                  __default_hook_price)

    def create_configuration(self, max_daily_consumption, hook_price):
        """create Manager Configuration and discharge others"""
        # discharge old configurations
        for configuration in ManagerConfiguration.objects.filter(
                discharge_date__isnull=True).filter(manager=self):
            configuration.discharge()
        return ManagerConfiguration.objects.create(
            manager=self,
            max_daily_consumption=max_daily_consumption,
            hook_price=hook_price)


class ManagerConfiguration(models.Model):
    manager: Manager = models.ForeignKey(Manager,
                                         on_delete=models.RESTRICT,
                                         unique=False)
    max_daily_consumption = models.DecimalField(decimal_places=3, max_digits=8)
    hook_price = models.DecimalField(decimal_places=2, max_digits=8)
    release_date = models.DateTimeField()
    discharge_date = models.DateTimeField(null=True)

    class Meta:
        db_table = 'agube_manager_configuration'

    def save(self, *args, **kwargs):
        """save the Manager and discharge old configurations"""
        if not self.pk:
            self.release_date = timezone.now()
        super(ManagerConfiguration, self).save(*args, **kwargs)

    def discharge(self):
        """discharge this Configuration"""
        self.discharge_date = timezone.now()
        self.save()


class Person(models.Model):
    manager: Manager = models.ForeignKey(Manager, on_delete=models.RESTRICT)
    user: User = models.OneToOneField(User, on_delete=models.RESTRICT)

    class Meta:
        db_table = 'agube_manager_person'

    def get_config(self):
        from userconfig.models import UserConfig
        try:
            return UserConfig.objects.get(person=self)
        except ObjectDoesNotExist:
            return None