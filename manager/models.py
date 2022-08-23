from django.contrib.auth.models import User
from django.db import models
from django.utils import timezone
from django_prometheus.models import ExportModelOperationsMixin
from django.db.models import Q


class Manager(ExportModelOperationsMixin('Manager'), models.Model):
    user: User = models.OneToOneField(User,
                                      primary_key=True,
                                      on_delete=models.RESTRICT)
    dwelling_limit = models.PositiveIntegerField(default=5)

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

    def has_exceeded_limit(self):
        from dwelling.models import Dwelling
        return Dwelling.objects.filter(manager=self).count() >= self.dwelling_limit

    def get_closest_config(self, date):
        return ManagerConfiguration.objects.filter(
            Q(manager=self, release_date__lte=date, discharge_date__gte=date) | Q(manager=self, release_date__gte=date, discharge_date__isnull=True)
        ).first()


class ManagerConfiguration(ExportModelOperationsMixin('ManagerConfiguration'), models.Model):
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
