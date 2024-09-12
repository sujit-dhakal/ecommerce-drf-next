from rest_framework import generics
from products.serializers.serializers import ProductSerializer
from products.models import Product
from products.filter import ProductFilter
from django_filters import rest_framework as filters

class ProductView(generics.ListAPIView):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = ProductFilter

class ProductDetailView(generics.RetrieveAPIView):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()
    lookup_field = 'id'