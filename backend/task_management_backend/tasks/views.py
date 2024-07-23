from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.utils import timezone
from .models import Task, TaskTitle, ToDoTask
from .serializers import TaskSerializer,TaskTitleSerializer,ToDoTaskSerializer
from users.serializers import CustomUserSerializer
from django.utils.dateparse import parse_date

class TaskListCreateView(generics.ListCreateAPIView):
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get_queryset(self):
        user = self.request.user
        queryset = Task.objects.filter(user=user)

        date = self.request.query_params.get('date')
        status = self.request.query_params.getlist('status')
        search = self.request.query_params.get('search', '')

        if date:
            try:
                parsed_date = parse_date(date)
                if parsed_date:
                    queryset = queryset.filter(start_time__date=parsed_date)
                else:
                    return queryset.none()
            except ValueError:
                return queryset.none()

        if status:
            queryset = queryset.filter(status__in=status)

        if search:
            queryset = queryset.filter(title__icontains=search) 

        return queryset

    def perform_create(self, serializer):
        user = self.request.user
        start_time = timezone.now()
        serializer.save(user=user,start_time=start_time)

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

class TaskDeleteView(generics.DestroyAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    lookup_field = 'id'

    def delete(self, request, *args, **kwargs):
        try:
            task = self.get_object()
            task.delete()
            return Response({"message":"task deleted successfully"},status=status.HTTP_204_NO_CONTENT)
        except Task.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

class TaskUpdateView(generics.UpdateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]

    def patch(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', True)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)

        if 'status' in serializer.validated_data:
            if serializer.validated_data['status'] == 'started' and instance.status == 'pending':
                instance.start_task()
            elif serializer.validated_data['status'] == 'completed' and instance.status == 'started':
                instance.complete_task()

        self.perform_update(serializer)
        return Response(serializer.data, status=status.HTTP_200_OK)

class TaskDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get_queryset(self):
        return Task.objects.filter(user=self.request.user)

    def perform_update(self, serializer):
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


class TaskTitleListView(generics.ListAPIView):
    serializer_class = TaskTitleSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return TaskTitle.objects.filter(user=self.request.user)

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        task_titles = [task['name'] for task in serializer.data]
        return Response(task_titles)
    

class TaskTitleCreateView(generics.CreateAPIView):
    serializer_class = TaskTitleSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)
    

class ToDoTaskListCreateAPIView(generics.ListCreateAPIView):
    queryset = ToDoTask.objects.all()
    serializer_class = ToDoTaskSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return ToDoTask.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class ToDoTaskRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ToDoTask.objects.all()
    serializer_class = ToDoTaskSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return ToDoTask.objects.filter(user=self.request.user)