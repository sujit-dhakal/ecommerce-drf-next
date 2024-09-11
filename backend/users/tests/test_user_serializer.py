from rest_framework.test import APITestCase
from users.serializers.serializers import UserSerializer
import uuid

class UserSerializerTestCase(APITestCase):
    """
    Test case for UserSerializer class.

    This test includes tests for UserSerializer.
    """
    def setUp(self):
        """
        Setup user test data.

        This method sets the user test data.
        """
        self.data = {
            'email':'test@test.com',
            'first_name':'test',
            'last_name':'test',
            'is_active': False,
            'is_staff': False,
            'is_superuser': False
        }

    def test_user_serializer_valid_data(self):
        """
        Test to validate UserSerializer.

        This test verifies that the serialized data is valid.
        """
        serializer = UserSerializer(data=self.data)
        self.assertTrue(serializer.is_valid())

    def test_user_serializer_invalid_data(self):
        """
        Test to validate UserSerializer.

        This test verifies that the serialized data is invalid.
        """
        self.data.pop('email')
        serializer = UserSerializer(data=self.data)
        self.assertFalse(serializer.is_valid())

    def test_user_serializer_read_only_user_id(self):
        """
        Test to validate UserSerializer.

        This test verifies that the user_id is read only field.
        """
        self.data['user_id'] = uuid.uuid4()
        serializer = UserSerializer(data=self.data)
        self.assertTrue(serializer.is_valid())
        user = serializer.save()
        self.assertNotEqual(str(user.user_id),self.data['user_id'])
from rest_framework.test import APITestCase
from users.serializers.serializers import UserSerializer
import uuid

class UserSerializerTestCase(APITestCase):
    """
    Test case for UserSerializer class.

    This test includes tests for UserSerializer.
    """
    def setUp(self):
        """
        Setup user test data.

        This method sets the user test data.
        """
        self.data = {
            'email':'test@test.com',
            'first_name':'test',
            'last_name':'test',
            'is_active': False,
            'is_staff': False,
            'is_superuser': False
        }

    def test_user_serializer_valid_data(self):
        """
        Test to validate UserSerializer.

        This test verifies that the serialized data is valid.
        """
        serializer = UserSerializer(data=self.data)
        self.assertTrue(serializer.is_valid())

    def test_user_serializer_invalid_data(self):
        """
        Test to validate UserSerializer.

        This test verifies that the serialized data is invalid.
        """
        self.data.pop('email')
        serializer = UserSerializer(data=self.data)
        self.assertFalse(serializer.is_valid())

    def test_user_serializer_read_only_user_id(self):
        """
        Test to validate UserSerializer.

        This test verifies that the user_id is read only field.
        """
        self.data['user_id'] = uuid.uuid4()
        serializer = UserSerializer(data=self.data)
        self.assertTrue(serializer.is_valid())
        user = serializer.save()
        self.assertNotEqual(str(user.user_id),self.data['user_id'])