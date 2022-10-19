class DwellingWithoutWaterMeterError(Exception):
    """Exception raised when Dwelling has not WaterMeter yet.
    """

    def __init__(self):
        self.message = "Dwelling without WaterMeter"
        super().__init__(self.message)


class OwnerAlreadyIsResidentError(Exception):
    """Exception raised when Owner already is Resident.
    """

    def __init__(self):
        self.message = "Owner already is Resident"
        super().__init__(self.message)


class UserManagerRequiredError(Exception):
    """Exception raised when User Manager is Invalid.
    """

    def __init__(self):
        self.message = "User Manager required for this operation"
        super().__init__(self.message)


class IncompatibleUsernameError(Exception):
    """Exception raised when username not equal to owner or resident.
    """

    def __init__(self, username):
        self.message = "username " + username + " not equal to owner or resident"
        super().__init__(self.message)


class InvalidEmailError(Exception):
    """Exception raised when email invalid or does not exist.
    """

    def __init__(self, email):
        self.message = "Email: " + email + " invalid or does not exist"
        super().__init__(self.message)


class EmailValidationError(Exception):
    """Exception raised when email could not be verified.
    """

    def __init__(self, email):
        self.message = "Email: " + email + " could not be verified"
        super().__init__(self.message)
