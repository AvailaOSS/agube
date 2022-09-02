from enum import Enum

from django.conf import settings
from django.contrib.auth.models import User
from django.core.mail import EmailMultiAlternatives
from django.template.loader import get_template
from manager.models import Manager
from person.models import Person
from validate_email import validate_email

from dwelling.exceptions import InvalidEmailError, EmailValidationError


class EmailType(Enum):
    OWNER_EMAIL = "owner_email.html"
    RESIDENT_EMAIL = "resident_email.html"


def send_user_creation_email(user: User, email_type: EmailType):
    app_name = settings.PUBLIC_APP_NAME

    # validate email
    user_email = user.email
    is_valid = validate_email(user_email,
                              check_format=True,
                              check_blacklist=True,
                              check_dns=True,
                              dns_timeout=1,
                              check_smtp=False)
    if (is_valid == None):
        raise EmailValidationError(user_email)
    elif not is_valid:
        raise InvalidEmailError(user_email)

    manager = Person.objects.get(user=user).manager

    # build template
    template = get_template(email_type.value)
    context = {
        'app_name': settings.PUBLIC_APP_NAME,
        'app_url': settings.PUBLIC_APP_URL,
        'activation_code': user.username,
        'first_name': user.first_name,
        'manager_name': manager.user.first_name + ' ' + manager.user.last_name,
        'email_contact': settings.EMAIL_HOST_USER,
    }
    content = template.render(context)

    # build email and send
    affair = 'Bienvenido a ' + app_name
    description = app_name + ' account created'
    email = EmailMultiAlternatives(affair, description,
                                   str(settings.EMAIL_HOST_USER), [user_email])
    email.attach_alternative(content, 'text/html')
    email.send()


def publish_user_created(tag,
                         manager: Manager,
                         user: User,
                         phone_number: str = ''):
    # FIXME: publish when user is disabled
    # publish when phone of user is updated
    # publish when email of user is updated
    # contactbook.celery.new_user_published
    payload = '{"id":"' + str(manager.user_id) + \
        '","full_name":"' + user.first_name + " " + user.last_name + \
        '","extra_info":"","email":"' + user.email + \
        '","phone_number":"' + phone_number + '", "tag":"' + tag.value + '"}'
    from mq.publisher import MqPublisher

    publisher = MqPublisher(settings.MQ_BROKER_URL, settings.MQ_EXCHANGE)
    publisher.publish('agube.new-user', bytes(payload, 'utf-8'))
