from django.db import models


class Address(models.Model):
    is_external = models.BooleanField(default=False)
    city = models.TextField()
    country = models.TextField()
    city_district = models.TextField()
    municipality = models.TextField()
    postcode = models.TextField()
    province = models.TextField()
    state = models.TextField()
    village = models.TextField(null=True, blank=True)
    road = models.TextField(null=True, blank=True)

    class Meta:
        ordering = ["country", "state", "city"]
        db_table = 'agube_address_address'
