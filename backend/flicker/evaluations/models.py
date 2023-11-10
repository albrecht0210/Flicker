from django.db import models
from django.contrib.auth import get_user_model

Account = get_user_model()

# Create your models here.
class Evaluation(models.Model):
    account = models.ForeignKey(Account, on_delete=models.CASCADE)

    # Uncomment after initial migration.
    criteria = models.ForeignKey('criterias.Criteria', on_delete=models.CASCADE)
    pitch = models.ForeignKey('pitches.Pitch', on_delete=models.CASCADE)

    value = models.PositiveIntegerField()
    remark = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True) 
    updated_at = models.DateTimeField(auto_now=True)
