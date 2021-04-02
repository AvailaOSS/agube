import json

from celery.decorators import task
from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist

from manager.models import Manager, Person


@task(autoretry_for=(ObjectDoesNotExist,), retry_backoff=True, name="agube.celery.new_user_published", queue='agube', exchange='agube_exchange')
def new_user_published(data):
    # TODO: check json is valid
    json_response = json.loads(data)
    user = User.objects.get(id=json_response["id"])
    manager = Manager.objects.create(user=user)
    # Important: create Person after create User
    Person.objects.create(manager=manager, user=user)
