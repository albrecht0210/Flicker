from django.urls import reverse
from rest_framework import serializers
from .models import Service, Connection

class ServiceSerializer(serializers.ModelSerializer):
    url = serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        model = Service
        fields = ('url', 'name', 'identifier', 'callback_url')

    def get_url(self, obj):
        request = self.context.get('request')
        base_url = request.build_absolute_uri(reverse('service-detail', kwargs={'pk': obj.id}))
        
        return base_url


class ConnectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Connection
        fields = '__all__'