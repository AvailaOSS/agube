from datetime import datetime, timedelta, date, time
from typing import Tuple
from django.utils import dateparse, timezone as django_timezone
from agube.exceptions import DateFilterNoEndDateError, DateFilterBadFormatError, DateFilterStartGtEnd
import decimal


def is_24h_old_than_now(date):
    # type: (date | datetime) -> bool
    return (django_timezone.now() - date) > timedelta(hours=24)


def parse_query_datetime(var) -> datetime:
    # type: (date | str) -> datetime
    if var is None:
        return None
    if isinstance(var, datetime):
        return var
    if isinstance(var, date):
        return __date_to_datetime(var)
    parsed_datetime = dateparse.parse_datetime(var)
    # try date to datetime
    if parsed_datetime is None:
        return __date_to_datetime(dateparse.parse_date(var))
    return parsed_datetime


def parse_query_date(var) -> date:
    # type: (str) -> date
    if var is None:
        return None
    if isinstance(var, date):
        return var
    return dateparse.parse_date(var)


def __date_to_datetime(var) -> datetime:
    # type: (date) -> datetime
    return datetime.combine(var, time(),
                            django_timezone.get_current_timezone())


def validate_query_date_filters(
        query_start_date: str,
        query_end_date: str) -> Tuple[datetime, datetime]:

    if (query_start_date is None) and (query_end_date is None):
        return None

    if (query_start_date != None) and (query_end_date == None):
        raise DateFilterNoEndDateError

    # Parse to datetime
    start_datetime = parse_query_datetime(query_start_date)
    end_datetime = parse_query_datetime(query_end_date)

    # If after parse is None, bad format
    if (start_datetime is None
            and query_start_date != None) or (end_datetime is None):
        raise DateFilterBadFormatError

    return validate_datetime_filters(start_datetime, end_datetime)


def validate_datetime_filters(
        start_datetime: datetime,
        end_datetime: datetime) -> Tuple[datetime, datetime]:
    if end_datetime != None:
        if start_datetime != None:
            if start_datetime > end_datetime:
                raise DateFilterStartGtEnd
    else:
        if start_datetime != None:
            raise DateFilterNoEndDateError

    return start_datetime, end_datetime


def timedelta_in_days(timedelta: timedelta) -> decimal:
    return decimal.Decimal(timedelta.total_seconds()/86400)
