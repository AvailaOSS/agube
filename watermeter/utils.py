import datetime
from datetime import datetime

from agube.utils import validate_datetime_filters
from watermeter.models import WaterMeter, WaterMeterMeasurement


def get_watermeter_measurements_from_watermeters(watermeter_list,
                                                 start_datetime=None,
                                                 end_datetime=None):
    # type: (list[WaterMeter], datetime, datetime) -> list[WaterMeterMeasurement]
    measurement_list = []

    # Validate datetime filters
    start_datetime, end_datetime = validate_datetime_filters(
        start_datetime, end_datetime)

    do_filter = False
    if end_datetime != None:
        do_filter = True
    # Note: Commented filter optimization
    # Cannot assure measurements registered while watermeter was operational (release - discharge)
    for watermeter in watermeter_list:
        if (do_filter):
            # Control watermeter was present between dates
            # if watermeter.release_date > end_datetime:
            #     continue
            # if watermeter.discharge_date != None:
            #     if watermeter.discharge_date < start_datetime:
            #         continue
            measurement_list += watermeter.get_measurements_between_dates(
                start_date=start_datetime, end_date=end_datetime)
        else:
            measurement_list += watermeter.get_measurements()

    return measurement_list
