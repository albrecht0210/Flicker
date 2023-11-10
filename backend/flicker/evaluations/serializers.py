from django.urls import reverse
from rest_framework import serializers
from .models import Evaluation

class EvaluationSerializer(serializers.ModelSerializer):
    url = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Evaluation
        fields = ('url', 'account', 'criteria', 'pitch', 'value', 'remark')

    def get_url(self, obj):
        request = self.context.get('request')
        base_url = request.build_absolute_uri(reverse('evaluation-detail', kwargs={'pk': obj.id}))
        
        return base_url