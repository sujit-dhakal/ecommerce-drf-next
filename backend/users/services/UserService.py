from users.models import CustomUser

class UserService:
    """
    A service class for managing CustomUser objects.

    This class provides methods for retriving, updating and deleting CustomUser instances.
    """
    def getUsers(self):
        """
        Retrive all CustomUser instances.

        Returns:
            QuerySet: A QuerySet containing all CustomUser objects.
        """
        return CustomUser.objects.all()

    def getUserById(self,uid):
        """
        Retrive a CustomUser instance by its user_id.

        Args:
            uid(str): The user_id of the CustomUser to retrive.

        Returns:
            CustomUser: The CustomUser instance if found.
            str: An error message if the user is not found.
        """
        try:
            return CustomUser.objects.get(user_id=uid)
        except:
            return f"user with {uid} not found."

    def updateUser(self,uid,**kwargs):
        """
        Update a CustomUser instance with the provided attributes.

        Args:
            uid(str): The user_id of the CustomUser to update.
            **kwargs: Arbitary keyword arguments representing attributes to update.

        Returns:
            None: If the update is successful.
            str: An error message if the update fails.
        """
        try:
            user = self.getUserById(uid)
            for key,value in kwargs.items():
                setattr(user,key,value)
            user.save()
        except Exception as e:
            return f"not able to update"

    def deleteUser(self,uid):
        """
        Delete a CustomUser instance.

        Args:
            uid(str): The user_id of the CustomUser to delete.

        Returns:
            None: If the deletion is successful.
            str: An error message if the deletion fails.
        """
        try:
            user = self.getUserById(uid)
            user.delete()
        except:
            return f"not able to delete the user"