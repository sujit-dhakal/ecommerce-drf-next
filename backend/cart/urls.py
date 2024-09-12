from django.urls import path,include
from rest_framework.routers import DefaultRouter
from cart.views.views import CartView

router = DefaultRouter()
router.register('cart',CartView,basename='cart')


urlpatterns = [
    path('',include(router.urls))
]
