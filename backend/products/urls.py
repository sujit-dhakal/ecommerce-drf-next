from django.urls import path
from products.views.views import ProductView,ProductDetailView

urlpatterns = [
    path('products/',ProductView.as_view(),name="products"),
    path('product/<int:id>',ProductDetailView.as_view(),name="product-details")
]
