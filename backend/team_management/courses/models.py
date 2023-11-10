from django.db import models
from django.contrib.auth import get_user_model

Account = get_user_model()

# Create your models here.
class Course(models.Model):
    code = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    section = models.CharField(max_length=10)

    members = models.ManyToManyField(Account)

    created_at = models.DateTimeField(auto_now_add=True) 
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ['name', 'section']

    def __str__(self):
        return "{} - {}".format(self.code, self.name)

    def get_full_name(self):
        return "{} ({})".format(self.name, self.section)