from django.db import models
from django.utils import timezone
from django_prometheus.models import ExportModelOperationsMixin


class Comment(ExportModelOperationsMixin('Comment'), models.Model):
    message = models.TextField()
    created = models.DateTimeField()

    class Meta:
        db_table = 'agube_comment'

    def save(self, *args, **kwargs):
        """ On save, update timestamps """
        if not self.id:
            self.created = timezone.now()
        return super(Comment, self).save(*args, **kwargs)
