from address.models import FullAddress
from django.db import models
from django.contrib.auth.models import User

class UserFullAddress(models.Model):
    """A class used to represent an User Full Address"""
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    full_address = models.ForeignKey(FullAddress, on_delete=models.CASCADE)
    main = models.BooleanField(default=False)

    class Meta:
        db_table = 'dwelling_user_full_address'