from django.test import TestCase
from django.contrib.auth import get_user_model
from users.services.UserService import UserService
import uuid
class UserServiceTests(TestCase):
    """
    Test case for the UserService class.

    This test case includes tests for retrieving, updating, and deleting users using the UserService.
    """
    def setUp(self):
        """
        Set up test data and service instance.

        This method initializes a UserService instance and creates a sample user for use in the tests.
        """
        User = get_user_model()
        self.service = UserService()
        self.user1 = User.objects.create_user(
            email='test123@example.com',
            first_name='Test',
            last_name='User1',
            is_active=True
        )

    def test_get_users(self):
        """
        Test retrieving all users.

        This test verifies that the `getUsers` method of UserService returns all users, and checks
        that the sample user is included in the returned result.
        """
        users = self.service.getUsers()
        self.assertEqual(users.count(),1)
        user_ids = [user.user_id for user in users]
        self.assertIn(self.user1.user_id,user_ids)

    def test_get_users_no_users(self):
        """
        Test retrieving users no users when there is no users in the database.

        This method verifies that the `getUsers` method of UserService returns an empty queryset when no users exists.
        """
        self.user1.delete()
        users = self.service.getUsers()
        self.assertEqual(users.count(),0)

    def test_get_user_valid_id(self):
        """
        Test retrieving a single user by ID.

        This test checks that the `getUserById` method returns the correct user when provided with a valid user ID.
        """
        user = self.service.getUserById(self.user1.user_id)
        self.assertEqual(user.user_id,self.user1.user_id)
        self.assertEqual(user.email, self.user1.email)

    def test_get_user_with_invalid_id(self):
        """
        Test retriving a single user by invalid ID.

        This test checks that the `getUserById` method returns an error when given a invalid user ID.
        """
        invalid_id = uuid.uuid4()
        user = self.service.getUserById(invalid_id)
        self.assertEqual(user,f'user with {invalid_id} not found.')

    def test_update_user_success(self):
        """
        Test updating a user's email.

        This test ensures that the `updateUser` method correctly updates the user's email address.
        """
        self.service.updateUser(self.user1.user_id,email="test12@gmail.com")
        self.user1.refresh_from_db()
        self.assertEqual('test12@gmail.com',self.user1.email)

    def test_update_user_not_found(self):
        """
        Test updaing a user with invalid ID.

        This test ensures that the `updateUser` method returns an error when given a invalid user ID.
        """
        invalid_id = uuid.uuid4()
        user = self.service.updateUser(invalid_id,email="abc@abc.com")
        self.assertEqual(user,"not able to update")

    def test_update_user_no_change(self):
        """
        Test updating a user with no changes.

        This test ensures that the `updateUser` method returns the same user with no changes.
        """
        original_user = get_user_model().objects.get(user_id=self.user1.user_id)
        self.service.updateUser(self.user1.user_id)
        self.assertEqual(original_user.first_name, self.user1.first_name)

    def test_delete_user_success(self):
        """
        Test deleting a user.

        This test verifies that the `deleteUser` method removes the user from the database successfully.
        """
        self.service.deleteUser(self.user1.user_id)
        self.assertFalse(get_user_model().objects.filter(user_id=self.user1.user_id).exists())

    def test_delete_user_not_found(self):
        """
        Test deleting a user.

        This test verifies that the `deleteUser` method returns an error when given a invalid user ID.
        """
        invalid_id = uuid.uuid4()
        result = self.service.deleteUser(invalid_id)
        self.assertEqual(result,"not able to delete the user")