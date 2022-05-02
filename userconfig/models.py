from django.db import models
from manager.models import Person


# Create your models here.
class UserConfig(models.Model):
    """A class used to represent an User config"""
    person: Person = models.OneToOneField(
        Person,
        on_delete=models.CASCADE,
        primary_key=True,
    )
    mode = models.TextField()
    lang = models.TextField()

    class Meta:
        db_table = 'agube_userconfig_userconfig'