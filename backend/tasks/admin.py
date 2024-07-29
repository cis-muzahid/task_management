from django.contrib import admin
from tasks.models import Task, TaskTitle, ToDoTask


admin.site.register(Task)
admin.site.register(TaskTitle)
admin.site.register(ToDoTask)

