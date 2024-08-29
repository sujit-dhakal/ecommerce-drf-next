from users.models import CustomUser

class UserService:
    """ user service class for retriving users and retriving, updating and deleting a specific user. """
    def getUsers(self):
        """ function to get all the users. """
        return CustomUser.objects.all()

    def getUserById(self,uid):
        """ function to get a specific user."""
        try:
            return CustomUser.objects.get(user_id=uid)
        except:
            return f"user with {uid} not found."

    def updateUser(self,uid,**kwargs):
        """ function to update a specific user. """
        try:
            user = self.getUserById(uid)
            for key,value in kwargs.items():
                setattr(user,key,value)
            user.save()
        except Exception as e:
            return f"not able to update {e}"

    def deleteUser(self,uid):
        """" function to delete a specific user. """
        try:
            user = self.getUserById(uid)
            user.delete()
        except:
            return f"not able to delete the user"