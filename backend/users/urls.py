from django.urls import path
from users.views.Userviews import UserListView,UserDetailView,UserRegisterView,UserLoginView,UserLogoutView,UserChangePassword

urlpatterns = [
    path('users/',UserListView.as_view(),name="users"),
    path('users/<str:email>/',UserDetailView.as_view(),name="users-details"),
    path('register/',UserRegisterView.as_view(),name="register"),
    path('login/',UserLoginView.as_view(),name="login"),
    path('logout/',UserLogoutView.as_view(),name="logout"),
    path('change-password/',UserChangePassword.as_view(),name="change-password")
]