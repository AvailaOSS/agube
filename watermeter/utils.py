import datetime
from datetime import datetime, date

from agube.utils import parse_datetime
from watermeter.models import WaterMeter, WaterMeterMeasurement


def get_watermeter_measurements_from_watermeters(watermeter_list,
                                                 start_datetime=None,
                                                 end_datetime=None):
    # type: (list[WaterMeter], datetime | date | str, datetime | date | str) -> list[WaterMeterMeasurement]
    measurement_list = []

    do_filter = False
    if start_datetime != None and end_datetime != None:
        parsed_start_datetime = parse_datetime(start_datetime)
        parsed_end_datetime = parse_datetime(end_datetime)
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
