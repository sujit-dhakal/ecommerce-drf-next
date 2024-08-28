from users.models import CustomUser

class UserService:
    def getUsers(self):
        return CustomUser.objects.all()

    def getUserById(self,uid):
        try:
            return CustomUser.objects.get(user_id=uid)
        except:
            return f"user with {uid} not found."

    def updateUser(self,uid,**kwargs):
        try:
            user = self.getUserById(uid)
            for key,value in kwargs.items():
                setattr(user,key,value)
            user.save()
        except Exception as e:
            return f"not able to update {e}"

    def deleteUser(self,uid):
        try:
            user = self.getUserById(uid)
            user.delete()
        except:
            return f"not able to delete the user"