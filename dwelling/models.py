import calendar
import datetime
from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist
from django.db import models
from django.utils import timezone
from django_prometheus.models import ExportModelOperationsMixin
from agube.utils import parse_query_datetime

from comment.models import Comment
from geolocation.models import Geolocation
from manager.models import Manager
from watermeter.models import WaterMeter

from dwelling.exceptions import DwellingWithoutWaterMeterError, OwnerAlreadyIsResidentError
from watermeter.utils import get_watermeter_measurements_from_watermeters


class Dwelling(ExportModelOperationsMixin('Dwelling'), models.Model):
    """A class used to represent a Dwelling"""
    manager: Manager = models.ForeignKey(Manager, on_delete=models.PROTECT)
    geolocation: Geolocation = models.ForeignKey(Geolocation,
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
        user : django.contrib.auth.models.User saved in database"""
        owner = self.get_current_owner()
        if owner:
            owner.discharge()

        from owner.models import Owner
        Owner.objects.create(user=user, dwelling=self)

    def get_current_owner(self):
        from owner.models import Owner

        # type: (Dwelling) -> Owner
        """returns the current owner in the dwelling"""
        try:
            return Owner.objects.get(dwelling=self, discharge_date=None)
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
        from resident.models import Resident
        Resident.objects.create(user=user, dwelling=self)

    def get_current_resident(self):
        from resident.models import Resident

        # type: (Dwelling) -> DwellingResident
        """returns the current resident in the dwelling"""
        try:
            return Resident.objects.get(dwelling=self, discharge_date=None)
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

    def get_historical_water_meter(self) -> WaterMeter:
        try:
            dwelling_water_meters = DwellingWaterMeter.objects.filter(
                dwelling=self).select_related('water_meter')
            water_meters = []
            for dwelling_water_meter in dwelling_water_meters:
                water_meters.append(dwelling_water_meter.water_meter)

            return water_meters
        except ObjectDoesNotExist:
            return []

    def set_owner_as_resident(self):
        owner = self.get_current_owner()
        resident = self.get_current_resident()
        if resident and owner.user == resident.user:
            raise OwnerAlreadyIsResidentError()
        self.change_current_resident(owner.user)

    def add_comment(self, message):
        """add new Comment to this Dwelling"""
        return DwellingComment.objects.create(dwelling=self, comment=Comment.objects.create(message=message)).comment

    def discharge(self):
        """discharge this Dwelling"""
        self.discharge_date = timezone.now()
        self.save()

    def get_month_consumption(self, date):
        # type: (Dwelling, datetime.date | datetime.datetime) -> int
        # Get dwelling water meter historical
        watermeter_list = self.get_historical_water_meter()
        if watermeter_list == []:
            raise DwellingWithoutWaterMeterError()
        # Get measurement list filtered between dates
        month_start = datetime.date(date.year, date.month, 1)
        month_end = datetime.date(
            date.year, date.month,
            calendar.monthrange(month_start.year, month_start.month)[1])
        measurement_list = get_watermeter_measurements_from_watermeters(
            watermeter_list,
            start_datetime=parse_query_datetime(month_start),
            end_datetime=parse_query_datetime(month_end))
        # Compute consumption
        month_consumption = 0
        if measurement_list != []:
            for measurement in measurement_list:
                month_consumption += measurement.measurement_diff

        return round(month_consumption)

    def get_last_month_consumption(self):
        now = timezone.now()
        return self.get_month_consumption(now -
                                          datetime.timedelta(days=now.day))

    def get_last_month_max_consumption(self):
        now = timezone.now()
        month_last_day = now - datetime.timedelta(days=now.day)
        month_days = calendar.monthrange(month_last_day.year,
                                         month_last_day.month)[1]
        return month_days * self.get_max_daily_consumption(month_last_day)

    def get_max_daily_consumption(self, date):
        return self.manager.get_closest_config(date).max_daily_consumption


class DwellingWaterMeter(ExportModelOperationsMixin('DwellingWaterMeter'),
                         models.Model):
    """A class used to represent a Dwelling Water Meter"""
    dwelling: Dwelling = models.ForeignKey(Dwelling, on_delete=models.RESTRICT)
    water_meter: WaterMeter = models.ForeignKey(WaterMeter,
                                                on_delete=models.RESTRICT)

    class Meta:
        ordering = ["-water_meter__release_date"]
        db_table = 'agube_dwelling_dwelling_water_meter'


class DwellingComment(ExportModelOperationsMixin('DwellingComment'), models.Model):
    dwelling: Dwelling = models.ForeignKey(Dwelling, on_delete=models.RESTRICT)
    comment: Comment = models.ForeignKey(Comment, on_delete=models.CASCADE)

    class Meta:
        db_table = 'agube_dwelling_comment'