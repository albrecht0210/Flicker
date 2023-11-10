from django.urls import reverse
from rest_framework import serializers
from .models import Criteria, MeetingCriteria

class CriteriaSerializer(serializers.ModelSerializer):
    url = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Criteria
        fields = ('url', 'id', 'name', 'description')
    
    def get_url(self, obj):
        request = self.context.get('request')
        base_url = request.build_absolute_uri(reverse('criteria-detail', kwargs={'pk': obj.id}))
        
        return base_url
    
class MeetingCriteriaSerializer(serializers.ModelSerializer):
    criteria = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = MeetingCriteria
        fields = ('meeting', 'criteria', 'weight')

    def get_criteria(self, obj):
        return CriteriaSerializer(obj.criteria).data