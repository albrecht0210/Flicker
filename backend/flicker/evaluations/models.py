from django.db import models
from django.contrib.auth import get_user_model

Account = get_user_model()

# Create your models here.
class Evaluation(models.Model):
    account = models.ForeignKey(Account, on_delete=models.CASCADE)

    # Uncomment after initial migration.
    pitch = models.ForeignKey('pitches.Pitch', on_delete=models.CASCADE)
    evaluated_criterias = models.ManyToManyField('criterias.MeetingCriteria', through='criterias.EvaluationCriteria')

    remark = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True) 
    updated_at = models.DateTimeField(auto_now=True)
