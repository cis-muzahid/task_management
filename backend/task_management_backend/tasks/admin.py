from django.contrib import admin
from tasks.models import Task, TaskTitle


admin.site.register(Task)
admin.site.register(TaskTitle)
