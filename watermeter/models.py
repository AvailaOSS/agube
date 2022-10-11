from django.db import models
from django.utils import dateparse, timezone
from datetime import date, datetime, timedelta
from django_prometheus.models import ExportModelOperationsMixin

from watermeter.exceptions import (WaterMeterDisabledError, WaterMeterMeasurementAlreadyExpiredToUpdateError,
                                   WaterMeterMeasurementInFutureError)
from agube.utils import is_24h_older_than_now


class WaterMeter(ExportModelOperationsMixin('WaterMeter'), models.Model):
    """A class used to represent an Water Meter"""
    code = models.TextField()
    release_date = models.DateTimeField()
    discharge_date = models.DateTimeField(null=True)

    class Meta:
        ordering = ["release_date"]
        db_table = 'agube_watermeter_water_meter'

    def save(self, *args, **kwargs):
        """save the water meter and save release_date datetime.now()"""
        if not self.pk:
            self.release_date = timezone.now()
        super(WaterMeter, self).save(*args, **kwargs)

    def add_measurement(self, measurement, measurement_date: datetime =timezone.now()):
        # type: (WaterMeter, float, datetime) -> WaterMeterMeasurement
        """water meter add measurement

        Parameters
        ----------
        measurement : float
            measurement read from the water meter
        date : datetime
            date of read measurement"""
        if self.discharge_date:
            raise WaterMeterDisabledError()
        if measurement_date > timezone.now():
            raise WaterMeterMeasurementInFutureError()
        return WaterMeterMeasurement.objects.create(water_meter=self,
                                                    measurement=measurement,
                                                    date=measurement_date)

    def get_measurements_chunk(self, chunk=5, before_date=timezone.now()):
        # type: (int, timezone) -> list[WaterMeterMeasurement]
        """get list of water meter measurements"""
        return list(
            WaterMeterMeasurement.objects.filter(
                water_meter=self,
                date__lte=before_date).order_by('-date')[:chunk])

    def get_measurements_between_dates(self, end_date, start_date=None):
        # type: (date | datetime, date | datetime) -> list[WaterMeterMeasurement]
        """get list of water meter measurements between dates"""
        if start_date is None:
            return list(
            WaterMeterMeasurement.objects.filter(
                water_meter=self,
                date__lt=end_date).order_by('-date'))
        return list(
            WaterMeterMeasurement.objects.filter(
                water_meter=self,
                date__gte=start_date,
                date__lt=end_date).order_by('-date'))

    def get_measurements(self):
        # type: (WaterMeter) -> list[WaterMeterMeasurement]
        """get list of water meter measurements"""
        return list(
            WaterMeterMeasurement.objects.filter(
                water_meter=self).order_by('-date'))

    def get_last_measurement(self, before_date=timezone.now()):
        """get most recent measurement before given date"""
        chunk = self.get_measurements_chunk(1, before_date)
        if len(chunk):
            return chunk[0]
        else:
            return None

    def discharge(self):
        """discharge this water meter"""
        self.discharge_date = timezone.now()
        self.save()


class WaterMeterMeasurement(ExportModelOperationsMixin('WaterMeterMeasurement'), models.Model):
    """A class used to represent an Water Meter Measurement"""
    measurement = models.DecimalField(decimal_places=3, max_digits=12)
    date = models.DateTimeField()
    water_meter: WaterMeter = models.ForeignKey(WaterMeter,
                                                on_delete=models.PROTECT)
    average_daily_flow = models.DecimalField(decimal_places=3, max_digits=12, default=0)

    class Meta:
        ordering = ["-date"]
        db_table = 'agube_watermeter_water_meter_measurement'

    def __str__(self):
        return str(self.id) + " " + str(self.measurement) + " " + str(self.average_daily_flow) + " " + str(self.date) + " " + str(self.water_meter.id)

    def save(self, *args, **kwargs):
        """Before save the Measurement, compute the difference with the previous measurement"""
        if self.id:
            last_measurement = self.water_meter.get_last_measurement()
            if last_measurement and is_24h_older_than_now(last_measurement.date):
                raise WaterMeterMeasurementAlreadyExpiredToUpdateError()
            if self.date > timezone.now():
                raise WaterMeterMeasurementInFutureError()

        # set average daily flow
        self.calculate_average_daily_flow()
        super(WaterMeterMeasurement, self).save(*args, **kwargs)

    def calculate_average_daily_flow(self):
        """Compute the diff with the previous measurement"""
        from agube.utils import timedelta_in_days
        from decimal import Decimal

        previous_measurement = self.water_meter.get_last_measurement(self.date - timedelta(minutes=1))
        if previous_measurement:
            #1 m3 == 1000 L
            m3L = 1000.0
            lapsed_days = timedelta_in_days(self.date - previous_measurement.date)
            self.average_daily_flow = Decimal(round(((float(self.measurement) - float(previous_measurement.measurement)) / lapsed_days) * m3L, 3))
        # else will put 0 as default
