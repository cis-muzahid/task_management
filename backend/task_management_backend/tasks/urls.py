from django.urls import path
from .views import TaskListCreateView, TaskDetailView, MultipleTaskUpdateView, TaskStartStopView, TaskDeleteView,TaskUpdateView

urlpatterns = [
    path('task-list-create/', TaskListCreateView.as_view(), name='task-list-create'),
    path('task-delete/<int:id>/', TaskDeleteView.as_view(), name='task-delete'),
    path('<int:pk>/', TaskDetailView.as_view(), name='task-detail'),
    path('batch-update/', MultipleTaskUpdateView.as_view(), name='task-batch-update'),
    path('start-stop/', TaskStartStopView.as_view(), name='task-start-stop'),
    path('tasks-update/<int:pk>/', TaskUpdateView.as_view(), name='task-update'),

]
