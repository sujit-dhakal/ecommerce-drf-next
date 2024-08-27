from django.urls import path
from users.views.Userviews import UserListView,UserDetailView

urlpatterns = [
    path('users/',UserListView.as_view(),name="users"),
    path('users/<str:email>/',UserDetailView.as_view(),name="users-details")
]