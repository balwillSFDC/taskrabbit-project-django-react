from http import client
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.conf import settings
from rest_framework.authtoken.models import Token
from datetime import datetime
import re

################################
# Models
################################

class User(AbstractUser):
    pass



class Service(models.Model): 
    service = models.CharField(verbose_name="Service", max_length=100, unique=True)
    description = models.CharField(verbose_name="Description", max_length=500, blank=True, null=True)
    rate = models.DecimalField(verbose_name="Rate", max_digits=5, decimal_places=2)
    picture = models.URLField(verbose_name='Picture', blank=True, null=True)
    slug = models.SlugField(verbose_name='Slug')

    def __str__(self):
        return f"{self.service}"



class Profile(models.Model):
    choices= [
            ('client', 'Client'),
            ('provider', 'Provider')
        ]
    user = models.OneToOneField(User, on_delete=models.CASCADE, default=1)
    type = models.CharField(max_length=50, choices=choices)
    bio = models.CharField(max_length=250, blank=True, null=True)
    specializations = models.ManyToManyField(Service, verbose_name="Specializations", blank=True, null=True)
    profile_pic = models.URLField(verbose_name="Profile Picture", blank=True, null=True, default='https://thumbs.dreamstime.com/b/default-profile-picture-avatar-photo-placeholder-vector-illustration-default-profile-picture-avatar-photo-placeholder-vector-189495158.jpg')

    def __str__(self):
        return f"{self.type} | {self.user.username}"


class Availability(models.Model):
    status_choices = [
        ('available', 'Available'),
        ('booked', 'Booked')
    ]

    status = models.CharField(verbose_name="Status", max_length=50, choices=status_choices)
    date = models.DateField(verbose_name='Date')
    start_time = models.TimeField(verbose_name='Start Time')
    end_time = models.TimeField(verbose_name='End Time')
    provider = models.ForeignKey(Profile, verbose_name="Provider", on_delete=models.CASCADE)

    def is_closed(self):
        return True if datetime(self.date.year, self.date.month, self.date.day) < datetime.now() else False 

    def __str__(self):
        return f"{self.provider.user.username} is available between {self.start_time} and {self.end_time} on {self.date}"


class Session(models.Model): 
    status_choices = [
        ('booked', 'Booked'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled')
    ]

    createdDate = models.DateTimeField(auto_now_add=True)
    estimated_hours = models.PositiveIntegerField(verbose_name="Estimated Hours Needed")
    service = models.ForeignKey(Service, verbose_name="Service", on_delete=models.DO_NOTHING)
    client = models.ForeignKey(Profile, verbose_name="Client", related_name="client_sessions", on_delete=models.CASCADE)
    provider = models.ForeignKey(Profile, verbose_name="Provider", related_name="provider_sessions", on_delete=models.CASCADE)
    status = models.CharField("Status", choices=status_choices, max_length=50)
    availability = models.ForeignKey(Availability, verbose_name="Availability", on_delete=models.CASCADE)

    def __str__(self): 
        return f"{self.client} booked {self.provider} for {self.estimated_hours} hours on {self.availability.date}"


################################
# Signals
################################

# Everytime a User is created, create a Profile object for that user
@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created: 
        Token.objects.create(user=instance)
