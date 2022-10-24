from django.conf import settings
from django.contrib.auth.models import User
from django.core.mail import EmailMultiAlternatives
from django.template.loader import get_template
from enum import Enum
from validate_email import validate_email

from dwelling.exceptions import InvalidEmailError, EmailValidationError
from manager.models import Manager
from person.models import Person


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
