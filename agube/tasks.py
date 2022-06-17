import json

from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist

from manager.models import Manager
from person.models import Person
from person.models import PersonConfig
from phone.models import Phone
from user.models import UserPhone

def new_user_published(data):
    # TODO: check json is valid
    json_response = json.loads(data)
    user = User.objects.get(id=json_response["id"])
    # Create UserPhone
    new_phone = Phone.objects.create(
        phone_number=json_response["phone_number"])
    UserPhone.objects.create(user=user, phone=new_phone, main=True)
    # Create Manager
    manager = Manager.objects.create(user=user)
    # Important: create Person after create User
    person = Person.objects.create(manager=manager, user=user)
    PersonConfig.objects.create(person=person, mode='dark', lang='es')
