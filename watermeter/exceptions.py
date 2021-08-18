class WaterMeterDisabledError(Exception):
    """Exception raised for errors in the water meter disabled.
    """
    def __init__(self):
        self.message = "Can't update Water Meter if it is disabled"
        super().__init__(self.message)
