# SIGNAL DISPATCHER - NOTIFY WHEN ACTIONS ACCUR ELSEWHERE IN THE FRAMWORK
# COMBINED SENDERS AND RECEVIVERS
# kwargs - Key Word Arguments
from django.db.models.signals import pre_save
from django.contrib.auth.models import User


def updateUser(sender, instance, **kwargs):
    user = instance

    if user.email != "":
        user.username = user.email


pre_save.connect(updateUser, sender=User)
