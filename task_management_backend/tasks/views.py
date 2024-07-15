from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.utils import timezone
from .models import Task
from .serializers import TaskSerializer
from users.serializers import CustomUserSerializer

class TaskListCreateView(generics.ListCreateAPIView):
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get_queryset(self):
        # Ensure that only tasks for the authenticated user are returned
        return Task.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        # Ensure that the task is assigned to the authenticated user
        user = self.request.user
        serializer.save(user=user)

class TaskDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get_queryset(self):
        # Ensure that only tasks for the authenticated user are returned
        return Task.objects.filter(user=self.request.user)

    def perform_update(self, serializer):
        # Ensure that the task is assigned to the authenticated user
        user = self.request.user
        serializer.save(user=user)

class MultipleTaskUpdateView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def put(self, request, *args, **kwargs):
        tasks_data = request.data.get('tasks', [])
        user = request.user

        for task_data in tasks_data:
            try:
                task = Task.objects.get(id=task_data['id'], user=user)
                serializer = TaskSerializer(task, data=task_data, partial=True)
                if serializer.is_valid():
                    serializer.save()
                else:
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            except Task.DoesNotExist:
                return Response({"detail": f"Task with id {task_data['id']} does not exist."}, status=status.HTTP_404_NOT_FOUND)

        return Response({"message": "Tasks updated successfully"}, status=status.HTTP_200_OK)

class TaskStartStopView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def post(self, request, *args, **kwargs):
        user = request.user
        action = request.data.get('action')
        task_id = request.data.get('task_id')

        if action == 'start':
            # Stop any running tasks for the user
            Task.objects.filter(user=user, end_time__isnull=True).update(end_time=timezone.now())

            # Start the new task
            try:
                task = Task.objects.get(id=task_id, user=user)
                task.start_time = timezone.now()
                task.end_time = None
                task.save()
                return Response({"message": "Task started successfully"}, status=status.HTTP_200_OK)
            except Task.DoesNotExist:
                return Response({"detail": "Task does not exist."}, status=status.HTTP_404_NOT_FOUND)

        elif action == 'stop':
            try:
                task = Task.objects.get(id=task_id, user=user, end_time__isnull=True)
                task.end_time = timezone.now()
                task.save()
                return Response({"message": "Task stopped successfully"}, status=status.HTTP_200_OK)
            except Task.DoesNotExist:
                return Response({"detail": "No running task found with the given ID."}, status=status.HTTP_404_NOT_FOUND)

        else:
            return Response({"detail": "Invalid action. Use 'start' or 'stop'."}, status=status.HTTP_400_BAD_REQUEST)
