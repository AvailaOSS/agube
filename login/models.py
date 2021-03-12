from address.models import FullAddress
from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist
from django.db import models
from phone.models import Phone


class Manager(models.Model):
    user = models.OneToOneField(User, primary_key=True, on_delete=models.RESTRICT)

    class Meta:
        db_table = 'manager'


class ManagerConfiguration(models.Model):
    manager = models.OneToOneField(Manager, on_delete=models.RESTRICT)
    max_daily_consumption = models.DecimalField(decimal_places=3, max_digits=8)
    hook_price = models.DecimalField(decimal_places=2, max_digits=8)

    class Meta:
        db_table = 'manager_configuration'


class HookPrice(models.Model):
    manager_configuration = models.ForeignKey(
        ManagerConfiguration, on_delete=models.RESTRICT)
    hook_price = models.DecimalField(decimal_places=2, max_digits=8)
    date = models.DateTimeField()
    enabled = models.BooleanField(default=False)

    class Meta:
        db_table = 'hook_price'


class Person(models.Model):
    manager = models.ForeignKey(Manager, on_delete=models.RESTRICT)
    user = models.OneToOneField(User, on_delete=models.RESTRICT)

    class Meta:
        db_table = 'person'


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
