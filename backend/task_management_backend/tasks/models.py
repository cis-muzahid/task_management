from django.db import models
from django.db import models
from django.conf import settings
from django.utils import timezone


class TaskTitle(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    def __str__(self):
        return self.name

class Task(models.Model):
    CHOICES = {
        ('pending','pending'),
        ('started','started'),
        ('completed','completed')
    }
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.CharField(max_length=255,blank=True, null=True)
    start_time = models.DateTimeField(blank=True, null=True)
    end_time = models.DateTimeField(blank=True, null=True)
    date = models.DateField(blank=True, null=True)
    total_time_to_complete = models.PositiveIntegerField(blank=True, null=True)
    elapsed_time = models.DurationField(blank=True, null=True)
    status = models.CharField(max_length=20, choices=CHOICES, default='pending')
    grouping = models.CharField(max_length=255,blank=True, null=True)

    def __str__(self):
        return self.title
    
    def start_task(self):
        """Mark the task as started and set the start time."""
        if self.status == 'pending':
            self.status = 'started'
            self.start_time = timezone.now()
            self.save()

    def complete_task(self):
        """Mark the task as completed, set the end time and calculate elapsed time."""
        if self.status == 'started':
            self.status = 'completed'
            self.end_time = timezone.now()
            self.elapsed_time = self.end_time - self.start_time
            self.save()



class ToDoTask(models.Model):
    STATUS_CHOICES = [
        ('PENDING', 'Pending'),
        ('IN_PROGRESS', 'In Progress'),
        ('COMPLETED', 'Completed'),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='tasks')
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    due_date = models.DateTimeField(blank=True, null=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='PENDING')

    def __str__(self):
        return self.title