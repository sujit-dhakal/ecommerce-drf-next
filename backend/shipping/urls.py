from django.urls import path,include
from rest_framework.routers import DefaultRouter
from shipping.views.views import ShippingAddressViewset

router = DefaultRouter()
router.register('shipping-address',ShippingAddressViewset)

urlpatterns = [
    path('',include(router.urls))
]
