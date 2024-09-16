from django.db import models
from users.models import CustomUser

class ShippingAddress(models.Model):
    user = models.ForeignKey(CustomUser,on_delete=models.CASCADE)
    city = models.CharField(max_length=255)
    state = models.CharField(max_length=255)
    postal_code = models.CharField(max_length=255)
    country = models.CharField(max_length=255)
    is_default = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.user}-{self.address}-{self.city}-{self.country}"