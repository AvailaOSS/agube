from django.apps import AppConfig


class WatermeterConfig(AppConfig):
    name = 'watermeter'

    def ready(self):
        import watermeter.signals
