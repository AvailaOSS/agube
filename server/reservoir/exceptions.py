class ReservoirWithoutWaterMeterError(Exception):
    """Exception raised when Reservoir has not WaterMeter yet.
    """

    def __init__(self):
        self.message = "Reservoir without WaterMeter"
        super().__init__(self.message)
