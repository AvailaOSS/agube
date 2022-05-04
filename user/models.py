from address.models import Address
from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist
from django.db import models
from phone.models import Phone


class UserAddress(models.Model):
    """A class used to represent an User Full Address"""
    user: User = models.ForeignKey(User, on_delete=models.CASCADE)
    address: Address = models.ForeignKey(Address, on_delete=models.CASCADE)
    main = models.BooleanField(default=False)

    class Meta:
        db_table = 'agube_user_user_address'
        ordering = ['-main']


class UserPhone(models.Model):
    """A class used to represent an User Phone"""
    user: User = models.ForeignKey(User, on_delete=models.CASCADE)
    phone: Phone = models.ForeignKey(Phone, on_delete=models.CASCADE)
    main = models.BooleanField(default=False)

    class Meta:
        db_table = 'agube_user_user_phone'


def update_address_to_not_main(user_id):
    try:
        user_address: UserAddress = UserAddress.objects.get(user__id=user_id,
                                                            main=True)
        user_address.main = False
        user_address.save()
    except ObjectDoesNotExist:
        pass


def update_phone_to_not_main(user_id):
    try:
        user_phone: UserPhone = UserPhone.objects.get(user__id=user_id,
                                                      main=True)
        user_phone.main = False
        user_phone.save()
    except ObjectDoesNotExist:
        pass
