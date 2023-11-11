from django.db import models

# Create your models here.
class Activity(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    submission_status = models.BooleanField(default=False)
    due_date = models.DateTimeField(null=True)
    
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('in_progress', 'In Progress'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    )

    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    course = models.PositiveIntegerField(null=True, blank=True)
    service = models.PositiveBigIntegerField(null=True, blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True) 
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title