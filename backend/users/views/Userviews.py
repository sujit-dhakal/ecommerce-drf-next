from django.shortcuts import render
from rest_framework.views import APIView
from users.services.UserService import UserService
from rest_framework.response import Response
from users.serializers import UserSerializer
from rest_framework import status

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

    def get(self,request,email,format=None):
        user = self.obj.getUserByEmail(email)
        serializer = UserSerializer(user)
        return Response(serializer.data)

    def put(self,request,email,format=None):
        self.obj.updateUser(email,**request.data)
        user = self.obj.getUserByEmail(request.data.get('email',email))
        serializer = UserSerializer(user)
        return Response(serializer.data)

    def delete(self,request,email,format=None):
        self.obj.deleteUser(email)
        return Response(status=status.HTTP_404_NOT_FOUND)