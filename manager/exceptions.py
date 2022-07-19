class ManagerLimitExceeded(Exception):
    """Exception raised when Manager limit dwelling has been Exceeded.
    """
    def __init__(self):
        self.message = "Manager has been exceeded the limit of Dwellings"
        super().__init__(self.message)

