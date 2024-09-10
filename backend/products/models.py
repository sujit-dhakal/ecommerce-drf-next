from django.db import models
from users.models import CustomUser



class Category(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class Product(models.Model):
    category = models.ForeignKey(Category,on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(decimal_places=2,max_digits=5)
    stock = models.IntegerField()

    def __str__(self):
        return self.name