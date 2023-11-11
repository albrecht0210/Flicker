from django.urls import reverse
from rest_framework import serializers
from .models import Pitch

class PitchSerializer(serializers.ModelSerializer):
    # url = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Pitch
        fields = ('id', 'name', 'description', 'team')
        

    # def get_url(self, obj):
    #     request = self.context.get('request')
    #     base_url = request.build_absolute_uri(reverse('pitch-detail', kwargs={'pk': obj.id}))
        
    #     return base_url