from geolocation.models import Geolocation
from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist
from django.db import models
from phone.models import Phone


class UserGeolocation(models.Model):
    """A class used to represent an User Geolocation"""
    user: User = models.ForeignKey(User, on_delete=models.CASCADE)
    geolocation: Geolocation = models.ForeignKey(Geolocation,
                                                 on_delete=models.CASCADE)
    main = models.BooleanField(default=False)

    class Meta:
        db_table = 'agube_user_user_geolocation'
        ordering = ['-main']


class UserPhone(models.Model):
    """A class used to represent an User Phone"""
    user: User = models.ForeignKey(User, on_delete=models.CASCADE)
    phone: Phone = models.ForeignKey(Phone, on_delete=models.CASCADE)
    main = models.BooleanField(default=False)

    class Meta:
        db_table = 'agube_user_user_phone'


def update_geolocation_to_not_main(user_id):
    try:
        user_geolocation: UserGeolocation = UserGeolocation.objects.get(
            user__id=user_id, main=True)
        user_geolocation.main = False
        user_geolocation.save()
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
