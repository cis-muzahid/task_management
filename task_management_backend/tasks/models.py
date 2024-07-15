from django.db import models
from django.db import models
from django.conf import settings

class Task(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    date = models.DateField()
    elapsed_time = models.DurationField()
    grouping = models.CharField(max_length=255)

    def __str__(self):
        return self.name
