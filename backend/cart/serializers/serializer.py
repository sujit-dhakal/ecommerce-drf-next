from rest_framework import serializers
from cart.models import CartItem
from products.serializers.serializers import ProductSerializer


class CartItemSerializers(serializers.ModelSerializer):
    product = ProductSerializer()
    total_price = serializers.SerializerMethodField()
    class Meta:
        model = CartItem
        fields = ['id','product','quantity','total_price']

    def get_total_price(self,obj):
        return obj.quantity*obj.product.price