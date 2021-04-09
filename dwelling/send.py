from celery.execute import send_task
from django.conf import settings
# from django.core.mail import EmailMultiAlternatives
# from django.template.loader import get_template
# from validate_email import validate_email


# def send_user_deletion_email(user: User):
# def send_user_creation_email(user: User):
# app_name = settings.PUBLIC_APP_NAME
# client = subscription_client.client
# subscription = subscription_client.subscription
# user = client.user

# # check that email is valid and has SMTP Server
# user_email = user.email
# is_valid = validate_email(user_email, check_mx=True)
# if not is_valid:
#     raise InvalidEmailError(user_email)

# # build template
# template = get_template('subscription_email.html')
# context = {
#     'app_name': settings.PUBLIC_APP_NAME,
#     'first_name': user.first_name,
#     'business_name': client.business_name,
#     'nif': client.nif,
#     'phone_number': client.phone_number,
#     'subscription_name': subscription.name,
#     'subscription_description': subscription.description,
#     'subscription_price': subscription.price,
#     'subscription_type_description': subscription.type.description,
#     'subscription_days': subscription.type.days,
#     'redirect_to': 'http://' + settings.REDIRECT_TO + '/' + str(user.id),
# }
# content = template.render(context)

# # build email and send
# affair = 'Bienvenido a ' + app_name
# description = app_name + ' subscription'
# email = EmailMultiAlternatives(
#     affair,
#     description,
#     str(settings.EMAIL_HOST_USER),
#     [user_email]
# )
# email.attach_alternative(content, 'text/html')
# email.send()


def publish_user_created(tag, manager, user, phone_number= ''):
    # FIXME: publish when user is disabled
    # publish when phone of user is updated
    # publish when email of user is updated
    # contactbook.celery.new_user_published
    payload = '{"id":"' + str(manager.user_id) + \
        '","full_name":"' + user.first_name + " " + user.last_name + \
        '","extra_info":"","email":"' + user.email + \
        '","phone_number":"' + phone_number + '", "tag":"' + tag + '"}'
    for task_config in settings.PUBLISH_USER_TASKS:
        send_task(task_config["task"], [payload],
                  exchange=task_config["exchange"], routing_key=task_config["routing_key"])
