from django.contrib.auth.models import User
from django.db import models


class Address(models.Model):
    town = models.TextField()
    street = models.TextField()
    is_external = models.BooleanField(default=False)

    class Meta:
        ordering = ["town", "street"]
        db_table = 'dwelling_address'


class FullAddress(models.Model):
    address = models.ForeignKey(Address, on_delete=models.CASCADE)
    number = models.PositiveIntegerField()
    flat = models.TextField(null=True)
    gate = models.TextField(null=True)

    class Meta:
        ordering = ["address__town", "address__street", "number"]
        db_table = 'dwelling_full_address'


class UserFullAddress(models.Model):
    # TODO: move this to login app
    """A class used to represent an User Full Address"""
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    full_address = models.ForeignKey(FullAddress, on_delete=models.CASCADE)
    main = models.BooleanField(default=False)

    class Meta:
        db_table = 'dwelling_user_full_address'
