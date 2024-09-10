from rest_framework import serializers
from users.models import CustomUser
from rest_framework.exceptions import ValidationError
from django.contrib.auth import authenticate
from django.contrib.auth.tokens import PasswordResetTokenGenerator,default_token_generator
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.core.mail import send_mail
import os
from django.urls import reverse
class UserSerializer(serializers.ModelSerializer):
    """
    Serializer for the CustomUser model.

    This serializer is used for the CRUD operations on the CustomUser model.
    It includes basic user informations and permissions.

    Meta:
        model(CustomUser): The CustomUser model to serialize.
        fields(list): Fields to include in the serialization.
    """
    class Meta:
        model = CustomUser
        fields = '__all__'

class UserRegistrationSerializer(serializers.ModelSerializer):
    """
    Serializer for user registration.

    This serializer is used to handle the creation of a new user, including
    password confirmation and sending a verification email.

    Attributes:
        password (CharField): Write-only field for the user's password.
        password2 (CharField): Write-only field for confirming the user's password.
        user_id (ReadOnlyField): Read-only field for the user's ID.

    Meta:
        model (CustomUser): The CustomUser model to serialize.
        fields (list): Fields to include in the serialization.
    """
    password = serializers.CharField(style={'input_type':'password'},write_only=True)
    confirm_password = serializers.CharField(style={'input_type':'password'},write_only=True)
    user_id = serializers.ReadOnlyField()
    class Meta:
        model = CustomUser
        fields = ['user_id','email',"first_name","last_name","username","password","confirm_password"]

    def validate(self, attrs):
        """
        Validate that the passwords match.

        Args:
            attrs (dict): The validated data.

        Raises:
            ValidationError: If the passwords do not match.

        Returns:
            dict: The validated data.
        """
        if attrs['password'] != attrs['confirm_password']:
            raise ValidationError("password do not match")
        return attrs

    def create(self, validated_data):
        """
        Create a new user and send a verification email.

        Args:
            validated_data (dict): The validated data.

        Returns:
            CustomUser: The created user instance.
        """
        validated_data.pop("confirm_password")
        user = CustomUser.objects.create_user(**validated_data)
        self.send_verification_email(user)
        return user

    def send_verification_email(self,user):
        """
        Send an email to verify the user's email address.

        Args:
            user (CustomUser): The user instance to send the verification email to.
        """
        token = default_token_generator.make_token(user)
        uid = urlsafe_base64_encode(force_bytes(user.user_id))
        verification_link = reverse('email-verify', kwargs={'uid':uid,'token':token})
        verification_url = f"http://127.0.0.1:8000{verification_link}".strip()
        send_mail(
            "Verify your email",
            verification_url,
             os.getenv('EMAIL_HOST_USER'),
            [user.email],
            fail_silently=False
        )


class UserLoginSerializer(serializers.Serializer):
    """
    Serializer for user login.

    This serializer is used to authenticate a user with their email and password.

    Attributes:
        email (EmailField): The email of the user.
        password (CharField): The password of the user.
    """
    email = serializers.EmailField()
    password = serializers.CharField(style={'input_type':'password'})

    def validate(self, attrs):
        """
        Validate the user's credentials.

        Args:
            attrs (dict): The validated data.

        Raises:
            ValidationError: If the credentials are invalid.

        Returns:
            CustomUser: The authenticated user instance.
        """
        user = authenticate(email=attrs['email'],password=attrs['password'])
        if user is None:
            raise ValidationError("Invalid credentials or your email is not active.")
        return user

class UserChangePasswordSerializer(serializers.Serializer):
    """
    Serializer for changing the user's password.

    This serializer is used to change a user's password, requiring the new password to be confirmed.

    Attributes:
        new_password (CharField): The new password.
        new_password_confirm (CharField): Confirmation of the new password.

    Meta:
        fields (list): Fields to include in the serialization.
    """
    new_password = serializers.CharField(style={'input_type':'password'})
    new_password_confirm = serializers.CharField(style={'input_type':'password'})

    class Meta:
        fields = ['new_password','new_password_confirm']

    def validate(self, attrs):
        """
        Validate that the new passwords match and save the new password.

        Args:
            attrs (dict): The validated data.

        Raises:
            ValidationError: If the new passwords do not match.

        Returns:
            dict: The validated data.
        """
        user = self.context.get('user')
        password1 = attrs['new_password']
        password2 = attrs['new_password_confirm']
        if password1 != password2:
            raise ValidationError("password doesn't match")
        user.set_password(password1)
        user.save()
        return attrs

class SendResetPasswordEmailSerializer(serializers.Serializer):
    """
    Serializer for sending a password reset email.

    This serializer is used to send an email with a password reset link to the user.

    Attributes:
        email (EmailField): The email of the user.

    Meta:
        fields (list): Fields to include in the serialization.
    """
    email = serializers.EmailField()
    class Meta:
        fields = ['email']

    def validate(self, attrs):
        """
        Validate the email and send a password reset email if the user exists.

        Args:
            attrs (dict): The validated data.

        Raises:
            ValidationError: If the email is not associated with a registered user.

        Returns:
            dict: The validated data.
        """
        email = attrs['email']
        if CustomUser.objects.filter(email=email).exists():
            user = CustomUser.objects.get(email=email)
            uid = urlsafe_base64_encode(force_bytes(user.user_id))
            token = PasswordResetTokenGenerator().make_token(user)
            link = 'http://127.0.0.1:8000/reset-password/' + uid + '/' + token
            send_mail(
                "Reset Password",
                link,
                os.getenv('EMAIL_HOST_USER'),
                [email],
                fail_silently=False
            )
        else:
            raise ValidationError("You are not a registered user.")
        return attrs

class UserResetPasswordSerializer(serializers.Serializer):
    """
    Serializer for resetting the user's password.

    This serializer is used to reset a user's password by validating the password reset token and saving the new password.

    Attributes:
        new_password (CharField): The new password.
        new_password_confirm (CharField): Confirmation of the new password.

    Meta:
        fields (list): Fields to include in the serialization.
    """
    new_password = serializers.CharField(style={'input_type':'password'})
    new_password_confirm = serializers.CharField(style={'input_type':'password'})

    class Meta:
        fields = ['new_password','new_password_confirm']

    def validate(self, attrs):
        """
        Validate the reset token and the new passwords.

        Args:
            attrs (dict): The validated data.

        Raises:
            ValidationError: If the token is invalid or the passwords do not match.

        Returns:
            dict: The validated data.
        """
        uid = self.context.get('uid')
        token = self.context.get('token')
        id = urlsafe_base64_decode(uid).decode()
        print(id)
        user = CustomUser.objects.get(user_id=id)
        print(user)
        if not PasswordResetTokenGenerator().check_token(user,token):
            raise ValidationError("Token is not valid or expired")
        password1 = attrs['new_password']
        password2 = attrs['new_password_confirm']
        if password1 != password2:
            raise ValidationError("password doesn't match")
        user.set_password(password1)
        user.save()
        return attrs

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['username','first_name','last_name']