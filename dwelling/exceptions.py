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


class PaymasterError(Exception):
    """Exception raised when user is paymaster.
    """

    def __init__(self, username):
        self.message = "user " + username + " is paymaster."
        super().__init__(self.message)


class OwnerIsPaymasterError(Exception):
    """Exception raised when owner is paymaster.
    """

    def __init__(self, username):
        self.message = "owner " + username + " cannot be changed because is the current paymaster."
        super().__init__(self.message)


class InvalidEmailError(Exception):
    """Exception raised when email invalid or does not exist.
    """

    def __init__(self, email):
        self.message = "Email: " + email + " invalid or does not exist"
        super().__init__(self.message)
