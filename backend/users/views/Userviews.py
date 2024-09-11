from rest_framework.views import APIView
from users.services.UserService import UserService
from rest_framework.response import Response
from users.serializers.serializers import UserSerializer,UserChangePasswordSerializer,UserLoginSerializer,UserRegistrationSerializer,SendResetPasswordEmailSerializer,UserResetPasswordSerializer,UserProfileSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.utils.http import urlsafe_base64_decode
from users.models import CustomUser
from django.contrib.auth.tokens import default_token_generator
from rest_framework.views import status
from django.shortcuts import redirect
from rest_framework import generics

class UserListView(APIView):
    """
    API view to list all users.

    This view handles GET requests to retrieve a list of all users.
    """
    def __init__(self):
        """Initialize the UserListView with a UserService instance."""
        self.obj = UserService()

    def get(self,request):
        """
        Handle GET requests to retrieve all users.

        Args:
            request (Request): The request object.

        Returns:
            Response: The response containing the serialized user data.
        """
        users = self.obj.getUsers()
        serializer = UserSerializer(users,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)

class UserDetailView(APIView):
    """
    API view to retrieve, update, or delete a specific user.

    This view handles GET, PUT, and DELETE requests for a single user based on their UID.
    """
    def __init__(self):
        """Initialize the UserListView with a UserService instance."""
        self.obj = UserService()

    def get(self,request,uid):
        """
        Handle GET requests to retrieve a specific user.

        Args:
            request (Request): The request object.
            uid (str): The UID of the user to retrieve.

        Returns:
            Response: The response containing the serialized user data.
        """
        user = self.obj.getUserById(uid)
        serializer = UserSerializer(user)
        return Response(serializer.data,status=status.HTTP_200_OK)

    def put(self,request,uid):
        """
        Handle PUT requests to update a specific user.

        Args:
            request (Request): The request object containing update data.
            uid (str): The UID of the user to update.

        Returns:
            Response: The response containing the updated user data.
        """
        self.obj.updateUser(uid,**request.data)
        user = self.obj.getUserById(request.data.get('user_id',uid))
        serializer = UserSerializer(user)
        return Response(serializer.data,status=status.HTTP_200_OK)

    def delete(self,request,uid):
        """
        Handle DELETE requests to delete a specific user.

        Args:
            request (Request): The request object.
            uid (str): The UID of the user to delete.

        Returns:
            Response: The response indicating the user has been deleted.
        """
        self.obj.deleteUser(uid)
        return Response({
            'msg':f'user with uid: {uid} deleted successfully'
        },status=status.HTTP_200_OK)

class UserRegisterView(APIView):
    """
    API view to handle user registration.

    This view handles POST requests to create a new user.
    """
    def post(self,request):
        """
        Handle POST requests to register a new user.

        Args:
            request (Request): The request object containing registration data.

        Returns:
            Response: The response containing the serialized user data.
        """
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({
                'msg':'created user successfully'
            },status=status.HTTP_200_OK)
        return Response({
            'msg':'failed to create user'
        },status=status.HTTP_400_BAD_REQUEST)

class VerifyEmailView(APIView):
    """
    API view to handle email verification.

    This view handles GET requests to verify a user's email using a token.
    """
    def get(self,request,uid,token):
        """
        Handle GET requests to verify a user's email.

        Args:
            request (Request): The request object.
            uid (str): The encoded UID of the user.
            token (str): The token for email verification.

        Returns:
            Response: The response indicating whether the email was successfully verified.
        """
        try:
            user_id = urlsafe_base64_decode(uid).decode()
            user = CustomUser.objects.get(user_id=user_id)
        except:
            user = None
        if user is not None and default_token_generator.check_token(user,token):
            user.is_active = True
            user.save()
            return redirect("http://localhost:3000/accounts/verify")
        else:
             return Response({
                'msg': 'Email verification failed'
            })


class UserLoginView(APIView):
    """
    API view to handle user login.

    This view handles POST requests to authenticate a user and return JWT tokens.
    """
    def post(self,request):
        """
        Handle POST requests to log a user in.

        Args:
            request (Request): The request object containing login data.
            format (str, optional): Format suffix.

        Returns:
            Response: The response containing the JWT access and refresh tokens.
        """
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.validated_data
            refresh = RefreshToken.for_user(user)
            return Response({
                'access': str(refresh.access_token),
                'refresh': str(refresh),
            },
            status=status.HTTP_200_OK
            )
        return Response({
            'msg':'not able to login'
        })

class UserLogoutView(APIView):
    """
    API view to handle user logout.

    This view handles POST requests to log a user out by blacklisting the refresh token.
    """
    def post(self,request,format=None):
        """
        Handle POST requests to log a user out.

        Args:
            request (Request): The request object containing the refresh token.
            format (str, optional): Format suffix.

        Returns:
            Response: The response indicating whether the logout was successful.
        """
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
            },status=status.HTTP_200_OK)
        except Exception as e:
            return Response({
                'msg': f'{e}'
            })
class UserChangePassword(APIView):
    """
    API view to handle password change requests.

    This view handles POST requests to change a user's password.
    """
    permission_classes = [IsAuthenticated]
    def post(self,request,format=None):
        """
        Handle POST requests to change the user's password.

        Args:
            request (Request): The request object containing the new passwords.
            format (str, optional): Format suffix.

        Returns:
            Response: The response indicating whether the password change was successful.
        """
        serializer = UserChangePasswordSerializer(data=request.data,context={'user':request.user})
        if serializer.is_valid(raise_exception=True):
            return Response({
                'msg':'Password changed'
            })
        return Response({
            'msg':'not able to change password'
        })

class SendPasswordResetEmailView(APIView):
    """
    API view to handle sending password reset emails.

    This view handles POST requests to send a password reset link to the user's email.
    """
    def post(self,request,format=None):
        """
        Handle POST requests to send a password reset email.

        Args:
            request (Request): The request object containing the user's email.
            format (str, optional): Format suffix.

        Returns:
            Response: The response indicating whether the email was sent successfully.
        """
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
    """
    API view to handle resetting a user's password.

    This view handles POST requests to reset a user's password using a token.
    """
    def post(self,request,uid,token,format=None):
        """
        Handle POST requests to reset the user's password.

        Args:
            request (Request): The request object containing the new passwords.
            uid (str): The encoded UID of the user.
            token (str): The token for password reset.
            format (str, optional): Format suffix.

        Returns:
            Response: The response indicating whether the password reset was successful.
        """
        serializer = UserResetPasswordSerializer(data=request.data,context={'uid':uid,'token':token})
        if serializer.is_valid(raise_exception=True):
            return Response({
                'msg':'password reset successful'
            })
        return Response({
                'msg':'password reset unsuccessful'
            })

class EmailAlreadyExists(APIView):
    def get(self,request,email):
        if email and CustomUser.objects.filter(email=email).exists():
            return Response({
                'email': 'user with this email already exists.',
                'status': 400
            })
        else:
            return Response(status=status.HTTP_200_OK)

class UserNameAlreadyExists(APIView):
    def get(self,request,name):
        if name and CustomUser.objects.filter(username=name).exists():
            return Response({
                'username': 'username already exists.',
                'status':400
            })
        else:
            return Response(status=status.HTTP_200_OK)

class UserProfile(generics.RetrieveAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user