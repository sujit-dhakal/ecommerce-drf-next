from django.contrib.auth.models import BaseUserManager
class CustomUserManager(BaseUserManager):
    """
    Custom manager for the Custom User Model.

    This manager provides methods for creating users and superusers.
    """

    def create_user(self, email, password=None, **extra_fields):
        """
        Create and save a user.

        Args:
            email(str): The email address of the user.
            password(str,optional): The password for the user. Defaults to None.
            **kwargs: Additional fields to be set on the user model.

        Returns:
            CustomUser: The created user instance.

        Raises:
            ValueError: If the email is not provided.
        """
        if not email:
            raise ValueError("Users must have an email address")

        user = self.model(
            email=self.normalize_email(email),
            **extra_fields
        )
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email,password=None, **extra_fields):
        """
        Create and save a superuser.

        Args:
            email(str): The email address of the superuser.
             password(str,optional): The password for the user. Defaults to None.
            **extra_fields: Additional fields to be set on the user model.

        Returns:
            CustomUser: The created user instance.

        Raises:
            ValueError: If the email is not provided.
        """
        user = self.create_user(
            email,
            password=password,
            **extra_fields
        )
        user.is_active=True
        user.is_staff = True
        user.is_superuser = True
        user.save()
        return user