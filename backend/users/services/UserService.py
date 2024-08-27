from users.models import CustomUser

class UserService:
    def getUsers(self):
        return CustomUser.objects.all()

    def getUserByEmail(self,email):
        try:
            return CustomUser.objects.get(email=email)
        except:
            return f"user with {email} not found."

    def updateUser(self,current_email,**kwargs):
        try:
            user = self.getUserByEmail(current_email)
            for key,value in kwargs.items():
                setattr(user,key,value)
            user.save()
        except Exception as e:
            return f"not able to update {e}"

    def deleteUser(self,email):
        try:
            user = self.getUserByEmail(email)
            user.delete()
        except:
            return f"not able to delete the user"