from django.db import models

# Create your models here.
class Activity(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    submission_status = models.BooleanField(default=False)
    due_date = models.DateTimeField(null=True)
    
    course = models.PositiveIntegerField(null=True, blank=True)
    service = models.PositiveBigIntegerField(null=True, blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True) 
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title