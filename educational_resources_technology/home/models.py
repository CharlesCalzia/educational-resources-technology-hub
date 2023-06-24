from django.db import models
from django.dispatch import receiver
from admin_extra_buttons.api import (
    ExtraButtonsMixin,
    button,
    confirm_action,
    link,
    view,
)
from admin_extra_buttons.utils import HttpResponseRedirectToReferrer
import os
import environ

env = environ.Env()

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
environ.Env.read_env(os.path.join(BASE_DIR, ".env"))


# Create your models here.


class Resource(models.Model):
    title = models.CharField(max_length=50, unique=True)
    description = models.TextField()
    image = models.ImageField(upload_to=env("RESOURCES_IMAGES_PATH"), max_length=200)
    file = models.FileField(upload_to=env("RESOURCES_FILES_PATH"), max_length=200)
    slug = models.URLField(max_length=100, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title


@receiver(models.signals.post_delete, sender=Resource)
def auto_delete_file_on_delete(sender, instance, **kwargs):
    if instance.file:
        if os.path.isfile(instance.file.path):
            os.remove(instance.file.path)

    if instance.image:
        if os.path.isfile(instance.image.path):
            os.remove(instance.image.path)


class Wifi(models.Model):
    name = models.CharField(max_length=50)
    password = models.CharField(max_length=50)
    # interface = models.ArrayField(choices=['wlan0', 'eth0'], default='wlan0')

    def __str__(self):
        return self.name
