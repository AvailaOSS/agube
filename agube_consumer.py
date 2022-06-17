from enum import Enum
from mq.consumer import MqConsumer

# Set the project environment for this file
from sys import path
from os import environ
import django

path.append('agube.settings.py')
environ.setdefault('DJANGO_SETTINGS_MODULE', 'agube.settings')
django.setup()

from django.conf import settings as django_settings
from agube.tasks import new_user_published


class RoutingKeys(Enum):
    NEW_SUBSCRIPTION = 'subscription.new-user'

    @classmethod
    def list(cls):
        return list(map(lambda c: c.value, cls))


def main() -> None:
    print("{0} : {1} MQ Consumer".format(django_settings.PUBLIC_APP_NAME,
                                         'agube'))

    consumer = MqConsumer(django_settings.MQ_BROKER_URL,
                          django_settings.MQ_EXCHANGE)
    binding_keys = RoutingKeys.list()
    consumer.start_consuming(on_message, binding_keys=binding_keys)


def on_message(routing_key: str, message_body: bytes):
    message_encoding = 'utf-8'

    print(" [x] New message with topic: '{0}'.".format(routing_key))

    switch = {
        RoutingKeys.NEW_SUBSCRIPTION.value:
        new_user_published(message_body.decode(message_encoding))
    }
    switch.get(routing_key)


if __name__ == "__main__":
    main()
