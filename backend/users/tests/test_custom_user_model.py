from django.test import TestCase
from django.contrib.auth import get_user_model

class UsersManagersTests(TestCase):
    """
    Test case for testing custom user model managers.

    This test case includes tests for creating a regular user and a superuser.
    """
    def test_create_user(self):
        """
        Test the creation of a regular user.

        This test verifies that a user can be created with the correct email and that the
        default values for `is_active`, `is_staff`, and `is_superuser` are correctly set.
        """
        User = get_user_model()
        user = User.objects.create(email="test@example.com",password="abc@123")
        self.assertEqual(user.email,"test@example.com")
        self.assertFalse(user.is_active)
        self.assertFalse(user.is_staff)
        self.assertFalse(user.is_superuser)

    def test_create_superuser(self):
        """
        Test the creation of a superuser.

        This test verifies that a superuser can be created with the correct email and that the
        values for `is_active`, `is_staff`, and `is_superuser` are correctly set.
        """
        User = get_user_model()
        user = User.objects.create_superuser(email="test@example.com",password="abc@123")
        self.assertEqual(user.email,"test@example.com")
        self.assertFalse(user.is_active)
        self.assertTrue(user.is_staff)
        self.assertTrue(user.is_superuser)