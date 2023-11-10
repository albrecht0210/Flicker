from rest_framework import serializers
from django.urls import reverse
from .models import Team
from courses.serializers import CourseSerializer

class TeamSerializer(serializers.ModelSerializer):
    url = serializers.SerializerMethodField(read_only=True)
    course_display = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Team
        fields = ('url', 'name', 'description', 'max_members', 'course', 'course_display')
        extra_kwargs = {
            'course': {'write_only': True},
        }
    
    def get_url(self, obj):
        request = self.context.get('request')
        base_url = request.build_absolute_uri(reverse('team-detail', kwargs={'pk': obj.id}))
        
        return base_url
    
    def get_course_display(self, obj):
        return CourseSerializer(obj.course, context = self.context).data
    