from django.db import models
from geolocation.models import Geolocation


class Address(models.Model):
    is_external = models.BooleanField(default=False)
    geolocation: Geolocation = models.ForeignKey(Geolocation,
                                                 on_delete=models.CASCADE)
    city = models.TextField()
    country = models.TextField()
    city_district = models.TextField()
    municipality = models.TextField()
    postcode = models.TextField()
    province = models.TextField()
    state = models.TextField()
    village = models.TextField(null=True, blank=True)
    road = models.TextField(null=True, blank=True)
    number = models.PositiveIntegerField(null=True, blank=True)
    flat = models.TextField(null=True, blank=True)
    gate = models.TextField(null=True, blank=True)

    class Meta:
        ordering = ["id","country", "state", "city"]
        db_table = 'agube_address_address'
