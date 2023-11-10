from rest_framework import serializers
from .models import Course
from django.urls import reverse

class CourseSerializer(serializers.ModelSerializer):
    url = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Course
        fields = ('url', 'code', 'name', 'section')
    
    def get_url(self, obj):
        request = self.context.get('request')
        base_url = request.build_absolute_uri(reverse('course-detail', kwargs={'pk': obj.id}))
        
        return base_url