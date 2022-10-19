import pytz
from datetime import datetime, timedelta, date, time
from django.utils import dateparse
from typing import Tuple

from agube.exceptions import DateFilterNoEndDateError, DateFilterBadFormatError, DateFilterStartGtEnd


def is_24h_older_than_now(datetime):
    # type: (datetime) -> bool
    utc_tz = pytz.utc
    return (datetime.now(utc_tz) -
            datetime.astimezone(utc_tz)) >= timedelta(hours=24)


def parse_query_datetime(var, timezone=None) -> datetime:
    # type: (date | str, pytz.BaseTzInfo) -> datetime
    if var is None:
        return None
    if isinstance(var, datetime):
        return __make_aware(var, timezone)
    if isinstance(var, date):
        return __make_aware(__date_to_datetime(var), timezone)

    # parse from str
    parsed_datetime = dateparse.parse_datetime(var)
    if parsed_datetime is None:
        # try date to datetime
        parsed_date = dateparse.parse_date(var)
        if parsed_date is None:
            return None
        parsed_datetime = __date_to_datetime(parsed_date)
    return __make_aware(parsed_datetime, timezone)


def __make_aware(datetime: datetime, timezone: pytz.BaseTzInfo) -> datetime:
    if datetime.tzinfo is None and timezone != None:
        return timezone.localize(datetime)
    return datetime


def parse_query_date(var) -> date:
    # type: (str) -> date
    if var is None:
        return None
    if isinstance(var, date):
        return var
    return dateparse.parse_date(var)


def __date_to_datetime(date: date) -> datetime:
    return datetime.combine(date, time())


def validate_query_date_filters(
        query_start_date: str,
        query_end_date: str,
        timezone: pytz.BaseTzInfo = None) -> Tuple[datetime, datetime]:
    if (query_start_date is None) and (query_end_date is None):
        return None

    if (query_start_date != None) and (query_end_date == None):
        raise DateFilterNoEndDateError

    # Parse to datetime
    from_datetime = parse_query_datetime(query_start_date, timezone)
    until_datetime = parse_query_datetime(query_end_date, timezone)

    # If after parse is None, bad format
    if (from_datetime is None
        and query_start_date != None) or (until_datetime is None):
        raise DateFilterBadFormatError

    return validate_datetime_filters(from_datetime, until_datetime)


def validate_datetime_filters(
        from_datetime: datetime,
        until_datetime: datetime) -> Tuple[datetime, datetime]:
    if until_datetime != None:
        if from_datetime != None:
            if from_datetime > until_datetime:
                raise DateFilterStartGtEnd
    else:
        if from_datetime != None:
            raise DateFilterNoEndDateError

    return from_datetime, until_datetime


def timedelta_in_days(timedelta: timedelta):
    return timedelta.total_seconds() / 86400
