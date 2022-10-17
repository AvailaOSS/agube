from weakref import proxy

from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist
from django.db import models
from django_prometheus.models import ExportModelOperationsMixin
from manager.models import Manager


def person_directory_path(instance, filename):
    # file will be uploaded to MEDIA_ROOT/person/<person_id>/photos/<filename>
    return 'person/{0}/photo/{1}'.format(instance.id, filename)


class Person(ExportModelOperationsMixin('Person'), models.Model):
    """A class used to represent a Person"""
    manager: Manager = models.ForeignKey(Manager, on_delete=models.RESTRICT)
    user: User = models.OneToOneField(User, on_delete=models.RESTRICT)
    photo = models.ImageField(null=True, upload_to=person_directory_path)

    class Meta:
        proxy: True
        db_table = 'agube_person_person'

    def save(self, *args, **kwargs):
        try:
            # FIXME: use self instead of this
            this = Person.objects.get(id=self.id)
            if this.photo:
                this.photo.delete(save=False)
        except:
            pass  # when new photo then we do nothing, normal case
        super().save(*args, **kwargs)

    def get_config(self):
        try:
            return PersonConfig.objects.get(person=self)
        except ObjectDoesNotExist:
            return None


class PersonConfig(ExportModelOperationsMixin('PersonConfig'), models.Model):
    """A class used to represent a Person Config"""
    person: Person = models.OneToOneField(
        Person,
        on_delete=models.CASCADE,
        primary_key=True,
    )
    mode = models.TextField()
    lang = models.TextField()

    class Meta:
        db_table = 'agube_person_config'
