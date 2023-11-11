from django.urls import reverse
from rest_framework import serializers
from .models import Criteria, MeetingCriteria

class CriteriaSerializer(serializers.ModelSerializer):
    # url = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Criteria
        fields = ('id', 'name', 'description')
    
    # def get_url(self, obj):
    #     request = self.context.get('request')
    #     base_url = request.build_absolute_uri(reverse('criteria-detail', kwargs={'pk': obj.id}))
        
    #     return base_url
    
class MeetingCriteriaSerializer(serializers.ModelSerializer):
    display_criteria = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = MeetingCriteria
        fields = ('meeting', 'criteria', 'display_criteria', 'weight')

    def get_display_criteria(self, obj):
        return CriteriaSerializer(obj.criteria).data