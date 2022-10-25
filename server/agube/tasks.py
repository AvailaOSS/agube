from django.contrib.auth.models import User
from django.db import transaction

from manager.models import Manager
from person.models import Person
from person.models import PersonConfig
from phone.models import Phone
from user.models import UserPhone

def create_manager(user: User, phone_number: str = None):
    with transaction.atomic():
        if phone_number:
            # Create UserPhone
            new_phone = Phone.objects.create(phone_number=phone_number)
            UserPhone.objects.create(user=user, phone=new_phone, main=True)
        # Create Manager
        manager = Manager.objects.create(user=user)
        # Important: create Person after create User
        person = Person.objects.create(manager=manager, user=user)
        PersonConfig.objects.create(person=person, mode='light', lang='es')
