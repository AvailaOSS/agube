from django.core.mail import EmailMultiAlternatives
from django.template.loader import get_template
from django.conf import settings
from enum import Enum

from django.contrib.auth.models import User
from watermeter.models import WaterMeterMeasurement
from manager.models import ManagerConfiguration, ManagerMessage


class MeasurementEmailType(Enum):
    CORRECT_MEASUREMENT_EMAIL = "measurement_under_limit_email.html"
    EXCESIVE_MEASUREMENT_EMAIL = "measurement_over_limit_email.html"


class MeasurementEditedEmailType(Enum):
    CORRECT_MEASUREMENT_EMAIL = "measurement_edited_under_limit_email.html"
    EXCESIVE_MEASUREMENT_EMAIL = "measurement_edited_over_limit_email.html"


def send_email_measurement(user: User,
                           watermeter_measurement: WaterMeterMeasurement,
                           manager_configuration: ManagerConfiguration,
                           email_template: MeasurementEmailType):

    app_name = settings.PUBLIC_APP_NAME

    # manager message
    manager_message : ManagerMessage = ManagerMessage.objects.get(manager=manager_configuration.manager)
    p_string = '<p>{0}</p>'
    message = p_string.format(str(manager_message.message) if manager_message.is_active and manager_message.message else '')

    # build template
    template = get_template(email_template)
    context = {
        'app_name': app_name,
        'user_first_name': user.first_name,
        'watermeter_code': watermeter_measurement.water_meter.code,
        'measurement_date': watermeter_measurement.date.strftime('%d-%m-%Y'),
        'watermeter_measurement': str(watermeter_measurement.measurement).replace(".",","),
        'measurement_difference': str(watermeter_measurement.measurement_diff).replace(".",","),
        'max_daily_consumption': str(manager_configuration.max_daily_consumption).replace(".",","),
        'manager_message' : message,
        'email_contact': settings.EMAIL_HOST_USER,
    }
    content = template.render(context)

    # build email and send
    affair = 'Notificación de ' + app_name
    description = 'Nueva lectura de contador'
    email = EmailMultiAlternatives(affair, description,
                                   str(settings.EMAIL_HOST_USER), [user.email])
    email.attach_alternative(content, 'text/html')
    email.send()
