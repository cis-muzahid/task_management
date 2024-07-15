from django.urls import path
from .views import TaskListCreateView, TaskDetailView, MultipleTaskUpdateView, TaskStartStopView

urlpatterns = [
    path('', TaskListCreateView.as_view(), name='task-list-create'),
    path('<int:pk>/', TaskDetailView.as_view(), name='task-detail'),
    path('batch-update/', MultipleTaskUpdateView.as_view(), name='task-batch-update'),
    path('start-stop/', TaskStartStopView.as_view(), name='task-start-stop'),
]
