from django.urls import reverse
from rest_framework import serializers
from .models import AIFeedback

class AIFeedbackSerializer(serializers.ModelSerializer):
    url = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = AIFeedback
        fields = ('url', 'pitch', 'feedback')

    def get_url(self, obj):
        request = self.context.get('request')
        base_url = request.build_absolute_uri(reverse('feedback-detail', kwargs={'pk': obj.id}))
        
        return base_url
    