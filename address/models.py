from django.db import models


class Address(models.Model):
    town = models.TextField()
    street = models.TextField()
    is_external = models.BooleanField(default=False)

    class Meta:
        ordering = ["town", "street"]
        db_table = 'agube_address_address'


class FullAddress(models.Model):
    address: Address = models.ForeignKey(Address, on_delete=models.CASCADE)
    number = models.PositiveIntegerField(null=True, blank=True)
    flat = models.TextField(null=True, blank=True)
    gate = models.TextField(null=True, blank=True)

    class Meta:
        ordering = ["address__town", "address__street", "number"]
        db_table = 'agube_address_full_address'
