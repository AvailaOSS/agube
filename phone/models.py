from django.db import models


class Phone(models.Model):
    phone_number = models.TextField()

    class Meta:
        ordering = ["phone_number"]
        db_table = 'agube_phone_phone'
