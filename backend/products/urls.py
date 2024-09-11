from django.urls import path
from products.views.views import ProductView

urlpatterns = [
    path('products/',ProductView.as_view(),name="products")
]
