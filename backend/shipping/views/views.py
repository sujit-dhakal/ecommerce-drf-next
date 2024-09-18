from rest_framework import viewsets
from shipping.models import ShippingAddress
from shipping.serializers.serializers import ShippingAddressSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response

class ShippingAddressViewset(viewsets.ModelViewSet):
    serializer_class = ShippingAddressSerializer
    queryset = ShippingAddress.objects.all()
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return ShippingAddress.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=False,methods=['GET'])
    def get_by_is_default(self,request):
        default_address = ShippingAddress.objects.filter(user=self.request.user,is_default=True).first()
        serializer = self.get_serializer(default_address,many=False)
        return Response(serializer.data)