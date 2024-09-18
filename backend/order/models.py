from django.db import models
from users.models import CustomUser

class Order(models.Model):
    ORDER_STATUS_CHOICES = [
        ('PENDING', 'Pending'),
        ('PAID', 'Paid'),
        ('SHIPPED', 'Shipped'),
    ]
    user = models.ForeignKey(CustomUser,on_delete=models.CASCADE,related_name="items")
    total_amount = models.DecimalField(max_digits=10,decimal_places=2)
    status = models.CharField(choices=ORDER_STATUS_CHOICES,max_length=10,default='PENDING')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
       return  f"{self.user}-{self.status}"

class OrderItem(models.Model):
    order = models.ForeignKey(Order,on_delete=models.CASCADE)
    product_name = models.CharField(max_length=255)
    quantity = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10,decimal_places=2)

    def __str__(self):
        return f"{self.order}-{self.product_name}"