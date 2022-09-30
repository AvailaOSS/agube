class UserGeolocationError(Exception):
    """Exception raised when User Geolocation cannot be found.
    """

    def __init__(self):
        self.message = "Cannot find User Geolocation"
        super().__init__(self.message)


class UserGeolocationMainUpdateError(Exception):
    """Exception raised when main User Geolocation cannot be updated.
    """

    def __init__(self):
        self.message = "Cannot update main User Geolocation"
        super().__init__(self.message)

class UserGeolocationMainDeleteError(Exception):
    """Exception raised when main User Geolocation cannot be deleted.
    """

    def __init__(self):
        self.message = "Cannot delete main User Geolocation"
        super().__init__(self.message)