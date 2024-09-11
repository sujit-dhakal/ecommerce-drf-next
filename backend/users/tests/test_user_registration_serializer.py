from rest_framework.test import APITestCase
from users.serializers.serializers import UserRegistrationSerializer


class UserRegistrationSerializerTestCase(APITestCase):
    def setUp(self):
        self.data = {
            'email':'test@test.com',
            'first_name':'test',
            'last_name':'test',
            'username':'test_test',
            'password':'test@123',
            'confirm_password':'test@123'
        }
    def test_user_register_serializer_valid_data(self):
        serializer = UserRegistrationSerializer(data=self.data)
        self.assertTrue(serializer.is_valid())

    def test_user_register_serializer_invalid_data(self):
        self.data.pop('email')
        serializer = UserRegistrationSerializer(data=self.data)
        self.assertFalse(serializer.is_valid())

    def test_password_fields_are_write_only(self):
        serializer = UserRegistrationSerializer(data=self.data)
        self.assertTrue(serializer.is_valid())
        self.assertNotIn('password',serializer.data)
        self.assertNotIn('confirm_password',serializer.data)
from rest_framework.test import APITestCase
from users.serializers.serializers import UserRegistrationSerializer


class UserRegistrationSerializerTestCase(APITestCase):
    def setUp(self):
        self.data = {
            'email':'test@test.com',
            'first_name':'test',
            'last_name':'test',
            'username':'test_test',
            'password':'test@123',
            'confirm_password':'test@123'
        }
    def test_user_register_serializer_valid_data(self):
        serializer = UserRegistrationSerializer(data=self.data)
        self.assertTrue(serializer.is_valid())

    def test_user_register_serializer_invalid_data(self):
        self.data.pop('email')
        serializer = UserRegistrationSerializer(data=self.data)
        self.assertFalse(serializer.is_valid())

    def test_password_fields_are_write_only(self):
        serializer = UserRegistrationSerializer(data=self.data)
        self.assertTrue(serializer.is_valid())
        self.assertNotIn('password',serializer.data)
        self.assertNotIn('confirm_password',serializer.data)