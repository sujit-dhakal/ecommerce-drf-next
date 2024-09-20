import requests
from base64 import b64decode
from django.conf import settings
from rest_framework.views import APIView
import json
from decimal import Decimal
from order.models import Order,OrderItem
from rest_framework.response import Response
from django.template.loader import render_to_string
from django.core.mail import send_mail
from django.views.decorators.csrf import csrf_exempt
from base64 import b64encode
from django.utils.decorators import method_decorator
from cart.models import CartItem
import os

def get_paypal_access_token():
    url = "https://api-m.sandbox.paypal.com/v1/oauth2/token"
    client_id = os.getenv("CLIENT_ID")
    client_secret = os.getenv("CLIENT_SECRET")
    credentials = f"{client_id}:{client_secret}"
    encoded_credentials = b64encode(credentials.encode()).decode('utf-8')

    headers = {
        "Authorization": f"Basic {encoded_credentials}",
        "Content-Type": "application/x-www-form-urlencoded",
    }
    data = {
        "grant_type": "client_credentials"
    }

    response = requests.post(url, headers=headers, data=data)
    response.raise_for_status()
    return response.json()['access_token']

@method_decorator(csrf_exempt, name="dispatch")
class CreatePayPalOrderView(APIView):
    def post(self,request):
        data = json.loads(request.body)
        items = data.get('items', [])
        total = Decimal(data.get('total'))

        access_token = get_paypal_access_token()

        url = "https://api-m.sandbox.paypal.com/v2/checkout/orders"
        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {access_token}",
        }

        payload = {
            "intent": "CAPTURE",
            "purchase_units": [
                {
                    "amount": {
                        "currency_code": "USD",
                        "value": str(total),
                        "breakdown": {
                            "item_total": {
                                "currency_code": "USD",
                                "value": str(total)
                            }
                        }
                    },
                    "items": [
                        {
                            "name": item['product']['name'],
                            "unit_amount": {
                                "currency_code": "USD",
                                "value": str(item['product']['price'])
                            },
                            "quantity": str(item['quantity'])
                        } for item in items
                    ]
                }
            ]
        }

        try:
            response = requests.post(url, headers=headers, json=payload)
            response.raise_for_status()
            return Response({
                'msg': "Created PayPal order successfully",
                'paypal_order_id': response.json().get('id')
            })
        except requests.exceptions.RequestException as e:
            return Response({"error": str(e)}, status=400)


@method_decorator(csrf_exempt, name="dispatch")
class CapturePayPalOrderView(APIView):
    def post(self, request):
        data = json.loads(request.body)
        paypal_order_id = data.get('orderID')
        items = data.get('items', [])
        total = Decimal(data.get('total'))

        if not paypal_order_id:
            return Response({"error":"PayPal Order ID is required."},status=400)

        try:
            access_token = get_paypal_access_token()

            order_url = f"https://api-m.sandbox.paypal.com/v2/checkout/orders/{paypal_order_id}"
            headers = {
                "Content-Type": "application/json",
                "Authorization": f"Bearer {access_token}",
            }

            order_response = requests.get(order_url, headers=headers)
            order_response.raise_for_status()

            capture_url = f"https://api-m.sandbox.paypal.com/v2/checkout/orders/{paypal_order_id}/capture"
            capture_response = requests.post(capture_url, headers=headers)
            capture_response.raise_for_status()
            capture_details = capture_response.json()

            order = Order.objects.create(user=request.user,total_amount=total,status='PAID')

            for item in items:
                OrderItem.objects.create( order = order,
                                        product_name = item['product']['name'] ,
                                        quantity = item['quantity'],
                                        price = Decimal(item['product']['price']))

            CartItem.objects.filter(user=request.user).delete()

            # self.send_order_receipt(order)

            return Response({
                "status": "Payment executed successfully",
                "order_id": order.id,
                "paypal_details": capture_details
            })
        except requests.exceptions.RequestException as e:
            return Response({
                "error": "Error processing PayPal payment",
                "details": str(e)
            }, status=e.response.status_code)
        except Exception as e:
            return Response({"error": f"An unexpected error occurred {e}",}, status=500)

    # def send_order_receipt(self, order):
    #     subject = f'Receipt for Order #{order.id}'
    #     message = render_to_string('email/order_receipt.html', {
    #         'order': order,
    #         'items': order.objects.all(),
    #     })
    #     send_mail(
    #         subject,
    #         message,
    #         settings.DEFAULT_FROM_EMAIL,
    #         [order.user.email],
    #         html_message=message,
    #     )

class OrderDetailView(APIView):
    def get(self, request, order_id):
        try:
            order = Order.objects.get(id=order_id, user=request.user)
            return Response({
                "id": order.id,
                "status": order.status,
                "total_amount": str(order.total_amount),
                "items": [
                    {
                        "product_name": item.product_name,
                        "quantity": item.quantity,
                        "price": str(item.price)
                    } for item in order.objects.all()
                ]
            })
        except Order.DoesNotExist:
            return Response({"error": "Order not found"}, status=404)