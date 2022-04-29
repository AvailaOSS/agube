from django.db import models
from manager.models import Manager
# Create your models here.
class UserConfig(models.Model):
    """A class used to represent an Map User config"""
    manager: Manager = models.ForeignKey(Manager, on_delete=models.RESTRICT,db_constraint=False)
    mode = models.TextField()
    lang = models.TextField()
    

    class Meta:
        db_table = 'agube_userconfig_userconfig'