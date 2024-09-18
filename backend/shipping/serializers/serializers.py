from rest_framework import serializers
from shipping.models import ShippingAddress

class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        fields = ['city','country','state','postal_code','is_default']

    def create(self,validated_data):
        if validated_data.get('is_default'):
            ShippingAddress.objects.filter(user=validated_data['user'],is_default=True).update(is_default=False)
        return super().create(validated_data)

    def update(self,instance,validated_data):
        if validated_data.get('is_default'):
            ShippingAddress.objects.filter(user=instance.user,is_default=True).update(is_default=False)
        return super().update(instance, validated_data)