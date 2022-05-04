from django.db import models
from django.contrib.auth.models import User
from manager.models import Manager
from django.core.exceptions import ObjectDoesNotExist


class Person(models.Model):
    """A class used to represent an Person"""
    manager: Manager = models.ForeignKey(Manager, on_delete=models.RESTRICT)
    user: User = models.OneToOneField(User, on_delete=models.RESTRICT)

    class Meta:
        db_table = 'agube_person_person'

    def get_config(self):
        try:
            return PersonConfig.objects.get(person=self)
        except ObjectDoesNotExist:
            return None


class PersonConfig(models.Model):
    """A class used to represent an Person Config"""
    person: Person = models.OneToOneField(
        Person,
        on_delete=models.CASCADE,
        primary_key=True,
    )
    mode = models.TextField()
    lang = models.TextField()

    class Meta:
        db_table = 'agube_person_config'