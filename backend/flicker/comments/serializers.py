from django.urls import reverse
from rest_framework import serializers
from .models import Comment

class CommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comment
        fields = ('account_id', 'meeting_id', 'comment', 'team')
