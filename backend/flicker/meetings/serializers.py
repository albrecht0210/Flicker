from django.urls import reverse
from rest_framework import serializers
from .models import Meeting

class FillMeetingSerializer(serializers.ModelSerializer):

    class Meta:
        model = Meeting
        fields = ('name', 'description', 'course', 'status')

class MeetingSerializer(serializers.ModelSerializer):
    url = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Meeting
        fields = ('url', 'id', 'name', 'description', 'teacher_weight_score', 
                  'student_weight_score', 'mode', 'status', 'course')
    
    def get_url(self, obj):
        request = self.context.get('request')
        base_url = request.build_absolute_uri(reverse('meeting-detail', kwargs={'pk': obj.id}))
        
        return base_url
    