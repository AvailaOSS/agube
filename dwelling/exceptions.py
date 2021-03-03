class NullIbanError(Exception):
    """Exception raised when iban is null.
    """

    def __init__(self, payment_type):
        self.message = "If payment type is " + payment_type + " iban is required"
        super().__init__(self.message)


class IncompatibleUsernameError(Exception):
    """Exception raised when username not equal to owner or resident.
    """

    def __init__(self, username):
        self.message = "username " + username + " not equal to owner or resident"
        super().__init__(self.message)
