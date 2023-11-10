from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class Account(AbstractUser):
    username = models.CharField(max_length=50, unique=True)
    email = models.EmailField(unique=True)
    
    avatar = models.ImageField(upload_to='static', null=True, blank=True)

    # Uncomment after initial migration.
    services = models.ManyToManyField('services.Service', through='services.Connection')

    def get_role(self):
        if self.is_superuser:
            return 'Admin'
        elif self.is_staff:
            return 'Teacher'
        else:
            return 'Student'