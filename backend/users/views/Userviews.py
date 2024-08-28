from django.shortcuts import render
from rest_framework.views import APIView
from users.services.UserService import UserService
from rest_framework.response import Response
from users.serializers.serializers import UserSerializer,UserChangePasswordSerializer,UserLoginSerializer,UserRegistrationSerializer,SendResetPasswordEmailSerializer,UserResetPasswordSerializer
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken

class UserListView(APIView):
    def __init__(self):
        self.obj = UserService()

    def get(self,request,format=None):
        users = self.obj.getUsers()
        serializer = UserSerializer(users,many=True)
        return Response(serializer.data)

class UserDetailView(APIView):
    def __init__(self):
        self.obj = UserService()

    def get(self,request,uid,format=None):
        user = self.obj.getUserById(uid)
        serializer = UserSerializer(user)
        return Response(serializer.data)

    def put(self,request,uid,format=None):
        self.obj.updateUser(uid,**request.data)
        user = self.obj.getUserById(request.data.get('user_id',uid))
        serializer = UserSerializer(user)
        return Response(serializer.data)

    def delete(self,request,uid,format=None):
        self.obj.deleteUser(uid)
        return Response(status=status.HTTP_404_NOT_FOUND)

class UserRegisterView(APIView):
    def post(self,request,format=None):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
        return Response({
            'msg':'failed to create user'
        })

class UserLoginView(APIView):
    def post(self,request,format=None):
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
    def post(self,request,format=None):
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
    permission_classes = [IsAuthenticated]
    def post(self,request,format=None):
        serializer = UserChangePasswordSerializer(data=request.data,context={'user':request.user})
        if serializer.is_valid(raise_exception=True):
            return Response({
                'msg':'Password changed'
            })
        return Response({
            'msg':'not able to change password'
        })

class SendPasswordResetEmailView(APIView):
    def post(self,request,format=None):
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
    def post(self,request,uid,token,format=None):
        serializer = UserResetPasswordSerializer(data=request.data,context={'uid':uid,'token':token})
        if serializer.is_valid(raise_exception=True):
            return Response({
                'msg':'password reset successful'
            })
        return Response({
                'msg':'password reset unsuccessful'
            })


class UserVerifyAccount(APIView):
    pass