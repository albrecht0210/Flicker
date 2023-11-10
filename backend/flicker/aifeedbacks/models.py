from django.db import models

# Create your models here.
class AIFeedback(models.Model):
    # Add after makemigrations
    pitch = models.ForeignKey('pitches.Pitch', on_delete=models.CASCADE)
    feedback = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True) 
    updated_at = models.DateTimeField(auto_now=True)