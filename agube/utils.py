from datetime import datetime, timedelta, date, time
from django.utils import dateparse, timezone as django_timezone


def is_24h_old_than_now(date):
    return (django_timezone.now() - date) > timedelta(hours=24)


def parse_datetime(var) -> datetime:
    if isinstance(var, datetime):
        return var
    if isinstance(var, date):
        return datetime.combine(var, time(), django_timezone.get_current_timezone())
    return dateparse.parse_datetime(var)
