from enum import Enum

from celery.execute import send_task
from django.conf import settings
from django.contrib.auth.models import User
from django.core.mail import EmailMultiAlternatives
from django.template.loader import get_template
from manager.models import Person
from validate_email import validate_email

from dwelling.exceptions import InvalidEmailError


class EmailType(Enum):
    OWNER_EMAIL = "owner_email.html"
    RESIDENT_EMAIL = "resident_email.html"


def send_user_creation_email(user: User, email_type: EmailType):
    app_name = settings.PUBLIC_APP_NAME

    # check that email is valid and has SMTP Server
    user_email = user.email
    is_valid = validate_email(user_email, check_mx=True)
    if not is_valid:
        raise InvalidEmailError(user_email)

    manager = Person.objects.get(user=user).manager

    # build template
    template = get_template(email_type.value)
    context = {
        'app_name': settings.PUBLIC_APP_NAME,
        'username': user.username,
        'first_name': user.first_name,
        'manager_name': manager.user.first_name + ' ' + manager.user.last_name,
        'redirect_to': 'http://' + settings.REDIRECT_TO + '/' + str(user.id),
        'email_contact': settings.EMAIL_HOST_USER,
    }
    content = template.render(context)

    # build email and send
    affair = 'Bienvenido a ' + app_name
    description = app_name + ' account created'
    email = EmailMultiAlternatives(
        affair,
        description,
        str(settings.EMAIL_HOST_USER),
        [user_email]
    )
    email.attach_alternative(content, 'text/html')
    email.send()


def publish_user_created(tag, manager, user, phone_number=''):
    # FIXME: publish when user is disabled
    # publish when phone of user is updated
    # publish when email of user is updated
    # contactbook.celery.new_user_published
    payload = '{"id":"' + str(manager.user_id) + \
        '","full_name":"' + user.first_name + " " + user.last_name + \
        '","extra_info":"","email":"' + user.email + \
        '","phone_number":"' + phone_number + '", "tag":"' + tag.value + '"}'
    for task_config in settings.PUBLISH_USER_TASKS:
        send_task(task_config["task"], [payload],
                  exchange=task_config["exchange"], routing_key=task_config["routing_key"])
