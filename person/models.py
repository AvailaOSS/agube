from django.db import models
from django.contrib.auth.models import User
from manager.models import Manager
from django.core.exceptions import ObjectDoesNotExist


def person_directory_path(instance, filename):
    # file will be uploaded to MEDIA_ROOT/person/media/person_<id>/photos/<filename>
    return 'person/{0}/photo/{1}'.format(instance.user.id,
                                                       filename)


class Person(models.Model):
    """A class used to represent an Person"""
    manager: Manager = models.ForeignKey(Manager, on_delete=models.RESTRICT)
    user: User = models.OneToOneField(User, on_delete=models.RESTRICT)
    photo = models.ImageField(null=True, upload_to=person_directory_path)

    class Meta:
        db_table = 'agube_person_person'

    def save(self, *args, **kwargs):
        try:
            this = Person.objects.get(id=self.id)
            if this.photo != self.photo:
                this.photo.delete(save=False)
        except:
            pass  # when new photo then we do nothing, normal case
        super().save(*args, **kwargs)

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