class UsernameValidationError(Exception):
    """Exception raised when username could not be verified.
    """

    def __init__(self, username):
        self.message = "Username: " + username + " could not be verified"
        super().__init__(self.message)
