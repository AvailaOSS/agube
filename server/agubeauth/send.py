from django.conf import settings
from django.contrib.auth.models import User
from django.core.mail import EmailMultiAlternatives
from django.template.loader import get_template


def send_reset_password_email(user: User):
    app_name = settings.PUBLIC_APP_NAME

    # build template
    template = get_template("reset_password_email.html")
    context = {
        'app_name': settings.PUBLIC_APP_NAME,
        'activation_code': user.username,
        'first_name': user.first_name,
        'email_contact': settings.EMAIL_HOST_USER,
    }
    content = template.render(context)

    # build email and send
    affair = 'Bienvenido a ' + app_name
    description = app_name + ' account created'
    email = EmailMultiAlternatives(affair, description,
                                   str(settings.EMAIL_HOST_USER), [user.email])
    email.attach_alternative(content, 'text/html')
    email.send()
