from django.db import models
from django.utils import dateparse, timezone
from datetime import date, datetime, timedelta
from django_prometheus.models import ExportModelOperationsMixin

from watermeter.exceptions import (WaterMeterDisabledError, WaterMeterMeasurementAlreadyExpiredToUpdateError,
                                   WaterMeterMeasurementInFutureError)
from agube.utils import is_24h_old_than_now


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

    def add_measurement(self, measurement, date=timezone.now()):
        # type: (WaterMeter, float, timezone) -> WaterMeterMeasurement
        """water meter add measurement

        Parameters
        ----------
        measurement : str
            measurement read from the water meter
        date : datetime
            date of read measurement"""
        if self.discharge_date:
            raise WaterMeterDisabledError()
        if dateparse.parse_datetime(date) > timezone.now():
            raise WaterMeterMeasurementInFutureError()
        return WaterMeterMeasurement.objects.create(water_meter=self,
                                                    measurement=measurement,
                                                    date=date)

    def get_measurements_chunk(self, chunk=5, before_date=timezone.now()):
        # type: (int, timezone) -> list[WaterMeterMeasurement]
        """get list of water meter measurements"""
        return list(
            WaterMeterMeasurement.objects.filter(
                water_meter=self,
                date__lte=before_date).order_by('-date')[:chunk])

    def get_measurements_between_dates(self, start_date, end_date):
        # type: (date, date) -> list[WaterMeterMeasurement]
        """get list of water meter measurements between dates"""
        return list(
            WaterMeterMeasurement.objects.filter(
                water_meter=self,
                date__gte=start_date,
                date__lte=end_date).order_by('-date'))

    def get_measurements(self):
        # type: (WaterMeter) -> list[WaterMeterMeasurement]
        """get list of water meter measurements"""
        return list(
            WaterMeterMeasurement.objects.filter(
                water_meter=self).order_by('-date'))

    def get_last_measurement(self, before_date=timezone.now()):
        """get the previous measurement"""
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
    measurement_diff = models.DecimalField(decimal_places=3, max_digits=12, default=0)
    date = models.DateTimeField()
    water_meter: WaterMeter = models.ForeignKey(WaterMeter,
                                                on_delete=models.PROTECT)

    class Meta:
        ordering = ["-date"]
        db_table = 'agube_watermeter_water_meter_measurement'

    def __str__(self):
        return str(self.id) + " " + str(self.measurement) + " " + str(self.measurement_diff) + " " + str(self.date) + " " + str(self.water_meter.id)

    def save(self, *args, **kwargs):
        """Before save the Measurement, compute the difference with the previous measurement"""
        if self.id:
            persistant_measure = self.water_meter.get_last_measurement()
            if persistant_measure and is_24h_old_than_now(persistant_measure.date):
                raise WaterMeterMeasurementAlreadyExpiredToUpdateError()
            if self.date > timezone.now():
                raise WaterMeterMeasurementInFutureError()
        self.compute_diff()
        super(WaterMeterMeasurement, self).save(*args, **kwargs)

    def compute_diff(self):
        """Compute the diff with the previous measurement"""
        __date = self.date
        if not isinstance(__date, datetime):
            __date = dateparse.parse_datetime(self.date)

        prev = self.water_meter.get_last_measurement(__date - timedelta(minutes=1))
        if prev:
            #1 m3 == 1000 L
            m3L = 1000

            lapsed_days = (__date - prev.date).days
            if lapsed_days == 0:
                lapsed_days = 1
            self.measurement_diff = round(((float(self.measurement) - float(prev.measurement)) * m3L) / lapsed_days)
        # else will put 0 as default
