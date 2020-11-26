from django.db import models

# Create your models here.
class BackendStudent(models.Model):
    firstName = models.CharField(max_length=100)
    lastName = models.CharField(max_length=100)
    Adress = models.CharField(max_length=100)
    Phone = models.BigIntegerField()
    created_at =models.DateTimeField(auto_now=True)
