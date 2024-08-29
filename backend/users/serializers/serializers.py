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
    """Serializer for the Custom User model used for crud operations"""
    class Meta:
        model = CustomUser
        fields = ['user_id','email',"first_name","last_name","is_active","is_staff","is_superuser"]

class UserRegistrationSerializer(serializers.ModelSerializer):
    """ Serializer for user registration. It is used for validating the user provided data and creating the user. """
    password = serializers.CharField(style={'input_type':'password'},write_only=True)
    password2 = serializers.CharField(style={'input_type':'password'},write_only=True)
    user_id = serializers.ReadOnlyField()
    class Meta:
        model = CustomUser
        fields = ['user_id','email',"first_name","last_name","username","password","password2"]

    def validate(self, attrs):
        """ function to validate the password. """
        if attrs['password'] != attrs['password2']:
            raise ValidationError("password do not match")
        return attrs

    def create(self, validated_data):
        """ function to create the user. """
        validated_data.pop("password2")
        user = CustomUser.objects.create_user(**validated_data)
        self.send_verification_email(user)
        return user

    def send_verification_email(self,user):
        """ function to send email for the user verification """
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
    """ serializer for handling user login. It is used for validating the user with email and password """
    email = serializers.EmailField()
    password = serializers.CharField(style={'input_type':'password'})

    def validate(self, attrs):
        """ function to validate the user with email and password. """
        user = authenticate(email=attrs['email'],password=attrs['password'])
        if user is None:
            raise ValidationError("Invalid credentials or your email is not active.")
        return user

class UserChangePasswordSerializer(serializers.Serializer):
    """ serializer for handling the change password of the user. It is used for validating the user and change their password."""
    new_password = serializers.CharField(style={'input_type':'password'})
    new_password_confirm = serializers.CharField(style={'input_type':'password'})

    class Meta:
        fields = ['new_password','new_password_confirm']

    def validate(self, attrs):
        """ function to validate the user and change their password"""
        user = self.context.get('user')
        password1 = attrs['new_password']
        password2 = attrs['new_password_confirm']
        if password1 != password2:
            raise ValidationError("password doesn't match")
        user.set_password(password1)
        user.save()
        return attrs

class SendResetPasswordEmailSerializer(serializers.Serializer):
    """ serializer for sending reset password link to the user. It is used for validating the user with the email address
    and send reset password link to their email"""
    email = serializers.EmailField()
    class Meta:
        fields = ['email']

    def validate(self, attrs):
        """ function to validate the email of the user and send reset password link to their email. """
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
    """ serializer for handling the reset password of the user. It is used for validating the user and reseting the password. """
    new_password = serializers.CharField(style={'input_type':'password'})
    new_password_confirm = serializers.CharField(style={'input_type':'password'})

    class Meta:
        fields = ['new_password','new_password_confirm']

    def validate(self, attrs):
        """ function to validate the user and reset the password """
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