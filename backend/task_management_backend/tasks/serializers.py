from rest_framework import serializers
from .models import Task,TaskTitle

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['id', 'title','description', 'start_time','total_time_to_complete', 'end_time', 'date', 'elapsed_time', 'grouping','status']
        read_only_fields = ['user']  # Ensure user is read-only
        
class MultipleTaskUpdateSerializer(serializers.Serializer):
    tasks = TaskSerializer(many=True)

    def update(self, instance, validated_data):
        for task_data in validated_data['tasks']:
            task = Task.objects.get(pk=task_data['id'])
            for attr, value in task_data.items():
                setattr(task, attr, value)
            task.save()
        return instance


class TaskTitleSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskTitle
        fields = ['id', 'name']