import requests
from rest_framework import serializers, status
from rest_framework_simplejwt.tokens import RefreshToken
from django.urls import reverse
from .models import Activity

class ActivitySerializer(serializers.ModelSerializer):
    url = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Activity
        fields = ('url', 'title', 'description', 'submission_status', 'due_date', 'course', 'service')

    def get_url(self, obj):
        request = self.context.get('request')
        base_url = request.build_absolute_uri(reverse('activity-detail', kwargs={'pk': obj.id}))
        
        return base_url
    