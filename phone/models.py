from django.contrib.auth.models import User
from django.db import models


class Phone(models.Model):
    phone_number = models.TextField()

    class Meta:
        ordering = ["phone_number"]
        db_table = 'dwelling_phone'


class UserPhone(models.Model):
    # TODO: move this to login app
    """A class used to represent an User Phone"""
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    phone = models.ForeignKey(Phone, on_delete=models.CASCADE)
    main = models.BooleanField(default=False)

    class Meta:
        db_table = 'dwelling_user_phone'
