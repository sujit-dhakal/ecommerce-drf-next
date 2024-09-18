from django.urls import path
from order.views.views import CreatePayPalOrderView,CapturePayPalOrderView,OrderDetailView

urlpatterns = [
    path('create-paypal-order/',CreatePayPalOrderView.as_view(),name="create-paypal-order"),
    path('capture-paypal-order/',CapturePayPalOrderView.as_view(),name="capture-paypal-order"),
    path('order-details/',OrderDetailView.as_view(),name="order-details"),
]