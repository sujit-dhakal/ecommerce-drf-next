from cart.serializers.serializer import CartItemSerializers
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets
from cart.models import CartItem
from rest_framework.decorators import action
from products.models import Product
from rest_framework.response import Response

class CartView(viewsets.ModelViewSet):
    serializer_class = CartItemSerializers
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return CartItem.objects.filter(user=self.request.user)

    @action(detail=False,methods=['GET'])
    def total_sum(self,request):
        items_in_cart = self.get_queryset()
        sum_of_items = sum(item.quantity*item.product.price for item in items_in_cart)
        return Response(sum_of_items)


    @action(detail=False,methods=['POST'])
    def add_to_cart(self,request):
        product_id = request.data.get('product_id')
        quantity = request.data.get('quantity')
        product = Product.objects.get(id=product_id)
        cart_item,created = CartItem.objects.get_or_create(
            user=request.user,
            product=product,
            defaults={'quantity':quantity}
        )
        if not created:
            cart_item.quantity += quantity
            cart_item.save()

        serializer = CartItemSerializers(cart_item)
        return Response(serializer.data)

    @action(detail=False,methods=['POST'])
    def update_quantity(self,request):
        product_id = request.data.get('product_id')
        new_quantity = request.data.get('quantity')
        product = Product.objects.get(id=product_id)
        try:
            cart_item = CartItem.objects.get(user=request.user,product=product)
            cart_item.quantity = new_quantity
            cart_item.save()
            return Response("updated")
        except CartItem.DoesNotExist:
            return Response("Cart item doesn't exists")

    @action(detail=False,methods=['DELETE'])
    def remove_item_from_cart(self,request):
        product_id = request.data.get('product_id')
        product = Product.objects.get(id=product_id)
        try:
            cart_item = CartItem.objects.get(user=request.user,product=product)
            cart_item.delete()
            return Response("deleted")
        except CartItem.DoesNotExist:
            return Response("Cart item doesn't exists")