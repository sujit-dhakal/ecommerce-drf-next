from django.db import models
from django.contrib.auth.models import AbstractUser
from users.managers import CustomUserManager
from django.utils.translation import gettext_lazy as _
import uuid

class CustomUser(AbstractUser):
    user_id = models.UUIDField(default=uuid.uuid4,editable=False,primary_key=True)
    email = models.EmailField(_("email address"), unique=True)
    is_superuser = models.BooleanField(default=False)
    is_active = models.BooleanField(_("active"),default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    objects = CustomUserManager()

    def __str__(self):
        return self.email