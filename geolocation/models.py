from django.db import models


# Create your models here.
class Geolocation(models.Model):
    """A class used to represent an Map Geolocation"""
    latitude = models.DecimalField(decimal_places=5, max_digits=10)
    longitude = models.DecimalField(decimal_places=5, max_digits=10)
    zoom = models.PositiveIntegerField()
    horizontalDegree = models.IntegerField(default=0)
    verticalDegree = models.IntegerField(default=0)

    class Meta:
        db_table = 'agube_geolocation_geolocation'
