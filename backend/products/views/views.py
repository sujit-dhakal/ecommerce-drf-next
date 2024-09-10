from rest_framework import generics
from products.serializers.serializers import ProductSerializer
from products.models import Product

class ProductView(generics.ListAPIView):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()