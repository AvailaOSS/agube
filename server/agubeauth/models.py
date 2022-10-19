from django.db import models


# Create your models here.
def validate(username):
    res = False
    if (username.find(" ") != -1):
        res = True
    return res
