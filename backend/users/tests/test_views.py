from rest_framework.test import APITestCase, APIClient
from users.models import CustomUser
from django.urls import reverse
from rest_framework import status


class UserListViewTestCase(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.url = reverse('users')

        self.user1 = CustomUser.objects.create_user(email='user1@example.com',password='abc',username="abc")
        self.user2 = CustomUser.objects.create_user(email='user2@example.com',password='abc',username="abc1")

    def test_get_all_users(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code,status.HTTP_200_OK)
        self.assertEqual(len(response.data),2)
from rest_framework.test import APITestCase, APIClient
from users.models import CustomUser
from django.urls import reverse
from rest_framework import status


class UserListViewTestCase(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.url = reverse('users')

        self.user1 = CustomUser.objects.create_user(email='user1@example.com',password='abc',username="abc")
        self.user2 = CustomUser.objects.create_user(email='user2@example.com',password='abc',username="abc1")

    def test_get_all_users(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code,status.HTTP_200_OK)
        self.assertEqual(len(response.data),2)