from datetime import datetime, date, time, timezone
from django.utils import dateparse
import datetime


def is_24h_old_than_now(date):
    return (datetime.datetime.now(datetime.timezone.utc) - date) > datetime.timedelta(hours=24)


def get_watermeter_measurements_from_watermeters(
        watermeter_list,
        start_datetime=None,
        end_datetime=None):
    measurement_list = []

    do_filter = False
    if start_datetime != None and end_datetime != None:
        parsed_start_datetime = __parse_datetime(start_datetime)
        parsed_end_datetime = __parse_datetime(end_datetime)
        do_filter = True
    else:
        if (start_datetime != None) != (end_datetime != None):
            raise Exception("all/none filters must be given")

    for watermeter in watermeter_list:
        if (do_filter):
            # Control watermeter was present between dates
            if watermeter.release_date > parsed_end_datetime:
                continue
            if watermeter.discharge_date != None:
                if watermeter.discharge_date < parsed_start_datetime:
                    continue
            measurement_list += watermeter.get_measurements_between_dates(
                start_datetime, end_datetime)
        else:
            measurement_list += watermeter.get_measurements()

    return measurement_list


def __parse_datetime(var) -> datetime:
    if isinstance(var, datetime):
        return var
    if isinstance(var, date):
        return datetime.combine(var, time(), timezone.utc)
    return dateparse.parse_datetime(datetime)
