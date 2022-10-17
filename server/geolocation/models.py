from address.models import Address
from django.db import models
from django_prometheus.models import ExportModelOperationsMixin


class Geolocation(ExportModelOperationsMixin('Geolocation'), models.Model):
    """A class used to represent an Map Geolocation"""
    address: Address = models.ForeignKey(Address, on_delete=models.CASCADE)
    latitude = models.DecimalField(decimal_places=15, max_digits=18)
    longitude = models.DecimalField(decimal_places=15, max_digits=18)
    zoom = models.PositiveIntegerField()
    horizontal_degree = models.IntegerField(default=0)
    vertical_degree = models.IntegerField(default=0)
    number = models.PositiveIntegerField(null=True, blank=True)
    flat = models.TextField(null=True, blank=True)
    gate = models.TextField(null=True, blank=True)

    class Meta:
        ordering = ["number"]
        db_table = 'agube_geolocation_geolocation'
