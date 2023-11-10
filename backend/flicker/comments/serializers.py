from django.urls import reverse
from rest_framework import serializers
from .models import Comment

class CommentSerializer(serializers.ModelSerializer):
    url = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Comment
        fields = ('account', 'meeting', 'team', 'everyteam')

    def get_url(self, obj):
        request = self.context.get('request')
        base_url = request.build_absolute_uri(reverse('comment-detail', kwargs={'pk': obj.id}))
        
        return base_url