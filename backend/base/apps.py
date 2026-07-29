from django.apps import AppConfig


class BaseConfig(AppConfig):
    name = "base"

    # how the app knows about signals
    def ready(self):
        import base.signals

        return super().ready()
