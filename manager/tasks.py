from manager.models import Manager
from celery import shared_task
from celery.decorators import task
from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist
import json


@task(name="new_user_published")
def new_user_published(data):
    # TODO: check json is valid
    json_response = json.loads(data)
    Manager.objects.create(user=User.objects.get(id=json_response["id"]))
