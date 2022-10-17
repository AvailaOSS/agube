class DateFilterNoEndDateError(Exception):
    """Exception raised when an end date was not passed to filter by date
    """

    def __init__(self):
        self.message = "An end date must be passed to filter by date"
        super().__init__(self.message)


class DateFilterBadFormatError(Exception):
    """Exception raised when date filter(s) have an incorrect format
    """

    def __init__(self):
        self.message = "Date filter(s) have an incorrect format"
        super().__init__(self.message)


class DateFilterStartGtEnd(Exception):
    """Exception raised when start date filter is after end date filter
    """

    def __init__(self):
        self.message = "Start date filter cannot be after end date filter"
        super().__init__(self.message)