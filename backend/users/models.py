from django.db import models
from users.managers import CustomUserManager
from django.contrib.auth.models import AbstractBaseUser,PermissionsMixin


class CustomUser(AbstractBaseUser,PermissionsMixin):
    firstName = models.CharField(max_length=100,blank=False)
    middleName = models.CharField(max_length=100,blank=True)
    lastName = models.CharField(max_length=100,blank=False)
    email = models.EmailField(unique=True,blank=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email