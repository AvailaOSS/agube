from django.db import models
from django_prometheus.models import ExportModelOperationsMixin


class Phone(ExportModelOperationsMixin('Phone'), models.Model):
    phone_number = models.TextField()

    class Meta:
        ordering = ["phone_number"]
        db_table = 'agube_phone_phone'
