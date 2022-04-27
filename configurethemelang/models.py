from django.db import models
from manager.models import Manager
# Create your models here.
class ConfigureThemeLang(models.Model):
    """A class used to represent an Map ConfigureThemeLang"""
    manager: Manager = models.ForeignKey(Manager, on_delete=models.RESTRICT, unique=False)
    mode = models.TextField()
    lang = models.TextField()
    

    class Meta:
        db_table = 'agube_configurethemelang_configurethemelang'