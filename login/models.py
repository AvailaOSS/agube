from address.models import FullAddress
from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist
from django.db import models
from phone.models import Phone


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


def update_address_to_not_main(user_id):
    try:
        user_address = UserAddress.objects.get(user__id=user_id, main=True)
        user_address.main = False
        user_address.save()
    except ObjectDoesNotExist:
        pass


def update_phone_to_not_main(user_id):
    try:
        user_phone = UserPhone.objects.get(user__id=user_id, main=True)
        user_phone.main = False
        user_phone.save()
    except ObjectDoesNotExist:
        pass
