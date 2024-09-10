from django.urls import path
from users.views.Userviews import UserListView,UserDetailView,UserRegisterView,UserLoginView,UserLogoutView,UserChangePassword,SendPasswordResetEmailView,UserResetPasswordView,VerifyEmailView,EmailAlreadyExists,UserNameAlreadyExists,UserProfile
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('users/',UserListView.as_view(),name="users"),
    path('users/<str:uid>/',UserDetailView.as_view(),name="users-details"),
    path('register/',UserRegisterView.as_view(),name="register"),
    path('login/',UserLoginView.as_view(),name="login"),
    path('logout/',UserLogoutView.as_view(),name="logout"),
    path('change-password/',UserChangePassword.as_view(),name="change-password"),
    path('reset-password-email/',SendPasswordResetEmailView.as_view(),name="reset-password-email"),
    path('reset-password/<str:uid>/<str:token>/',UserResetPasswordView.as_view(),name="rest-password"),
    path('email-verify/<str:uid>/<str:token>/',VerifyEmailView.as_view(),name='email-verify'),
    path('token/refresh/',TokenRefreshView.as_view(),name='token_refresh'),
    path('check-email/<str:email>/',EmailAlreadyExists.as_view(),name="check-email"),
    path('check-username/<str:name>/',UserNameAlreadyExists.as_view(),name="check-name"),
    path('user-profile/',UserProfile.as_view(),name="user-profile")
]