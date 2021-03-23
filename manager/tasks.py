import json

from celery import shared_task
from celery.decorators import task
from django.contrib.auth.models import User

from manager.models import Manager, Person


@task(name="new_user_published")
def new_user_published(data):
    # TODO: check json is valid
    json_response = json.loads(data)
    user = User.objects.get(id=json_response["id"])
    manager = Manager.objects.create(user=user)
    # Important: create Person after create User
    Person.objects.create(manager=manager, user=user)