class WaterMeterDisabledError(Exception):
    """Exception raised for errors in the water meter disabled.
    """
    def __init__(self):
        self.message = "Can't update Water Meter if it is disabled"
        super().__init__(self.message)

class WaterMeterMeasurementInFutureError(Exception):
    """Exception raised when the measure is in the future.
    """
    def __init__(self):
        self.message = "Measures connot be in the future"
        super().__init__(self.message)

class WaterMeterMeasurementAlreadyExpiredToUpdateError(Exception):
    """Exception raised when the measure cannot be updated if is older than 24h
    """
    def __init__(self):
        self.message = "Measures cannot be updated because is older than 24h"
        super().__init__(self.message)
