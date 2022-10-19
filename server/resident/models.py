from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist
from django.db import models
from django.utils import timezone
from django_prometheus.models import ExportModelOperationsMixin

from manager.models import Manager
from user.models import UserGeolocation


class Resident(ExportModelOperationsMixin('Reservoir'), models.Model):
    """A class used to represent an Resident-Dwelling ManyToMany"""
    from dwelling.models import Dwelling
    dwelling: Dwelling = models.ForeignKey(Dwelling, on_delete=models.PROTECT)
    user: User = models.ForeignKey(User, on_delete=models.PROTECT)
    release_date = models.DateTimeField()
    discharge_date = models.DateTimeField(null=True)

    class Meta:
        db_table = 'agube_resident_resident'

    def save(self, *args, **kwargs):
        """save the DwellingResident, save release_date timezone.now()"""
        if not self.pk:
            self.release_date = timezone.now()
        super(Resident, self).save(*args, **kwargs)
        self.__add_main_geolocation()

    def __add_main_geolocation(self):
        """resident add main geolocation and set others as not main"""
        try:
            for older in UserGeolocation.objects.filter(user=self.user):
                older.main = False
                older.save()
        except ObjectDoesNotExist:
            pass
        UserGeolocation.objects.create(user=self.user,
                                       geolocation=self.dwelling.geolocation,
                                       main=True)

    def discharge(self):
        """discharge this resident"""
        self.discharge_date = timezone.now()
        self.save()

        from owner.models import Owner
        isOwnerInOtherDwelling = Owner.objects.filter(
            user=self.user, discharge_date__isnull=True).count()
        if isOwnerInOtherDwelling > 0:
            return

        isResidentInOtherDwelling = Resident.objects.filter(
            user=self.user, discharge_date__isnull=True).count()
        if isResidentInOtherDwelling > 0:
            return

        try:
            Manager.objects.get(user=self.user)
            return
        except ObjectDoesNotExist:
            pass

        # In any other case
        self.user.is_active = False
        self.user.save()
