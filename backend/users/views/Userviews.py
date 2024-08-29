from django.shortcuts import render
from rest_framework.views import APIView
from users.services.UserService import UserService
from rest_framework.response import Response
from users.serializers.serializers import UserSerializer,UserChangePasswordSerializer,UserLoginSerializer,UserRegistrationSerializer,SendResetPasswordEmailSerializer,UserResetPasswordSerializer
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.utils.http import urlsafe_base64_decode
from users.models import CustomUser
from django.contrib.auth.tokens import default_token_generator

class UserListView(APIView):
    """ view for listing all the users. """
    def __init__(self):
        self.obj = UserService()

    def get(self,request,format=None):
        """ function to get all the users"""
        users = self.obj.getUsers()
        serializer = UserSerializer(users,many=True)
        return Response(serializer.data)

class UserDetailView(APIView):
    """ view for retriving, updating and deleting a specific user. """
    def __init__(self):
        self.obj = UserService()

    def get(self,request,uid,format=None):
        """ function to handle get request to retrive a specific user. """
        user = self.obj.getUserById(uid)
        serializer = UserSerializer(user)
        return Response(serializer.data)

    def put(self,request,uid,format=None):
        """ function to handle put request to update a sepcific user. """
        self.obj.updateUser(uid,**request.data)
        user = self.obj.getUserById(request.data.get('user_id',uid))
        serializer = UserSerializer(user)
        return Response(serializer.data)

    def delete(self,request,uid,format=None):
        """ function to handle delete request to delete a specific user. """
        self.obj.deleteUser(uid)
        return Response({
            'msg':f'user with uid: {uid} deleted successfully'
        })

class UserRegisterView(APIView):
    """ view for user registration. """
    def post(self,request,format=None):
        """ function to handle post request to register a user. """
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
        return Response({
            'msg':'failed to create user'
        })

class VerifyEmailView(APIView):
    """ view for verifying email address of a user. """
    def get(self,request,uid,token,format=None):
        """ function to handle get request to verify the email address of a user. """
        try:
            user_id = urlsafe_base64_decode(uid).decode()
            user = CustomUser.objects.get(user_id=user_id)
        except:
            user = None
        if user is not None and default_token_generator.check_token(user,token):
            user.is_active = True
            user.save()
            return Response({
                'msg': 'Email successfully verified'
            })
        else:
             return Response({
                'msg': 'Email verification failed'
            })


class UserLoginView(APIView):
    """ view for user login. """
    def post(self,request,format=None):
        """ function to handle post request to login user and generate access and refresh token. """
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.validated_data
            refresh = RefreshToken.for_user(user)
            return Response({
                'access': str(refresh.access_token),
                'refresh': str(refresh),
            }
            )
        return Response({
            'msg':'not able to login'
        })

class UserLogoutView(APIView):
    """ view for user logout """
    def post(self,request,format=None):
        """ function to handle post request to logout the user by blacklisting the refresh token."""
        refresh_token = request.data.get("refresh")
        if not refresh_token:
            return Response({
                'msg':'no refresh token'
            })
        try:
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({
                'msg':'logout successful'
            })
        except Exception as e:
            return Response({
                'msg': f'{e}'
            })
class UserChangePassword(APIView):
    """ view for changing password of the user."""
    permission_classes = [IsAuthenticated]
    def post(self,request,format=None):
        """ function to handle post request to change the password of the user. """
        serializer = UserChangePasswordSerializer(data=request.data,context={'user':request.user})
        if serializer.is_valid(raise_exception=True):
            return Response({
                'msg':'Password changed'
            })
        return Response({
            'msg':'not able to change password'
        })

class SendPasswordResetEmailView(APIView):
    """ view for sending the passoword reset link to the user email. """
    def post(self,request,format=None):
        """ function to handle the post request to send password reset link to the user email."""
        serializer = SendResetPasswordEmailSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            return Response(            {
                'msg':'SendPasswordResetEmailView success'
            })
        return Response(
            {
                'msg':'SendPasswordResetEmailView failed'
            }
        )
class UserResetPasswordView(APIView):
    """ view for reset the password of the user. """
    def post(self,request,uid,token,format=None):
        """ function to handle the post request to reset the password of the user. """
        serializer = UserResetPasswordSerializer(data=request.data,context={'uid':uid,'token':token})
        if serializer.is_valid(raise_exception=True):
            return Response({
                'msg':'password reset successful'
            })
        return Response({
                'msg':'password reset unsuccessful'
            })