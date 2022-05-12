from django.db import models

from dwelling.models import Dwelling, DwellingResident
from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist
from django.db import models
from django.utils import timezone
from manager.models import Manager


class Owner(models.Model):
    """A class used to represent an Owner-Dwelling ManyToMany"""
    dwelling: Dwelling = models.ForeignKey(Dwelling, on_delete=models.PROTECT)
    user: User = models.ForeignKey(User, on_delete=models.PROTECT)
    release_date = models.DateTimeField()
    discharge_date = models.DateTimeField(null=True)

    class Meta:
        db_table = 'agube_owner_owner'

    def save(self, *args, **kwargs):
        """save the DwellingOwner, save release_date timezone.now()"""
        if not self.pk:
            self.release_date = timezone.now()
        super(Owner, self).save(*args, **kwargs)

    def discharge(self):
        """discharge this owner"""
        self.discharge_date = timezone.now()
        self.save()

        isOwnerInOtherDwelling = Owner.objects.filter(
            user=self.user, discharge_date__isnull=True).count()
        if isOwnerInOtherDwelling > 0:
            return

        isResidentInOtherDwelling = DwellingResident.objects.filter(
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
