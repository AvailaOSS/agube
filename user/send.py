from django.core.mail import EmailMultiAlternatives
from django.template.loader import get_template
from validate_email import validate_email
from dwelling.exceptions import InvalidEmailError, EmailValidationError
from django.conf import settings

from django.contrib.auth.models import User


def send_email_modification_email(user: User, old_email, new_email):
    __validate_email(old_email)
    __validate_email(new_email)

    app_name = settings.PUBLIC_APP_NAME

    OLD_EMAIL_TEMPLATE = "email_change_old_email.html"
    NEW_EMAIL_TEMPLATE = "email_change_new_email.html"

    # build templates
    # old
    old_template = get_template(OLD_EMAIL_TEMPLATE)
    old_context = {
        'app_name': app_name,
        'first_name': user.first_name,
        'new_email': new_email,
        'email_contact': settings.EMAIL_HOST_USER,
    }
    old_content = old_template.render(old_context)
    #new
    new_template = get_template(NEW_EMAIL_TEMPLATE)
    new_context = {
        'app_name': app_name,
        'first_name': user.first_name,
        'email_contact': settings.EMAIL_HOST_USER,
    }
    new_content = new_template.render(new_context)

    # build emails
    affair = 'Notificación de ' + app_name
    description = 'Modificación de cuenta'
    # old
    old_email = EmailMultiAlternatives(affair, description,
                                       str(settings.EMAIL_HOST_USER),
                                       [old_email])
    old_email.attach_alternative(old_content, 'text/html')
    #new
    new_email = EmailMultiAlternatives(affair, description,
                                       str(settings.EMAIL_HOST_USER),
                                       [new_email])
    new_email.attach_alternative(new_content, 'text/html')

    # send emails
    old_email.send()
    new_email.send()


def __validate_email(email):
    is_valid = validate_email(email,
                              check_format=True,
                              check_blacklist=True,
                              check_dns=True,
                              dns_timeout=1,
                              check_smtp=False)

    if (is_valid == None):
        raise EmailValidationError(email)
    elif not is_valid:
        raise InvalidEmailError(email)
