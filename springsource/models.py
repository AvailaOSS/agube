from django.db import models
from django.utils import timezone
from django_prometheus.models import ExportModelOperationsMixin

from comment.models import Comment
from geolocation.models import Geolocation
from manager.models import Manager


class SpringSource(ExportModelOperationsMixin('SpringSource'), models.Model):
    """A class used to represent an SpringSource"""
    manager: Manager = models.ForeignKey(Manager, on_delete=models.PROTECT)
    geolocation: Geolocation = models.ForeignKey(Geolocation, on_delete=models.PROTECT)
    release_date = models.DateTimeField()
    discharge_date = models.DateTimeField(null=True)

    class Meta:
        db_table = 'agube_springsource_springsource'

    def save(self, *args, **kwargs):
        """save the SpringSource and save release_date timezone.now()"""
        if not self.pk:
            self.release_date = timezone.now()
        super(SpringSource, self).save(*args, **kwargs)

    def add_comment(self, message):
        """add new Comment to this Reservoir"""
        return SpringSourceComment.objects.create(
            spring_source=self,
            comment=Comment.objects.create(message=message)).comment

    def discharge(self):
        """discharge this SpringSource"""
        self.discharge_date = timezone.now()
        self.save()


class SpringSourceComment(ExportModelOperationsMixin('ReservoirComment'),
                          models.Model):
    spring_source: SpringSource = models.ForeignKey(SpringSource, on_delete=models.RESTRICT)
    comment: Comment = models.ForeignKey(Comment, on_delete=models.CASCADE)

    class Meta:
        db_table = 'agube_springsource_comment'
