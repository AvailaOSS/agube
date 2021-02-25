from phone.models import Phone
from address.models import FullAddress
from django.db import models
from django.contrib.auth.models import User

class UserAddress(models.Model):
    """A class used to represent an User Full Address"""
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    full_address = models.ForeignKey(FullAddress, on_delete=models.CASCADE)
    main = models.BooleanField(default=False)

    class Meta:
        db_table = 'user_address'

class UserPhone(models.Model):
    """A class used to represent an User Phone"""
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    phone = models.ForeignKey(Phone, on_delete=models.CASCADE)
    main = models.BooleanField(default=False)

    class Meta:
        db_table = 'user_phone'
