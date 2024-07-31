from django.urls import path
from .views import ( TaskListCreateView, TaskDetailView, MultipleTaskUpdateView, TaskStartStopView,
                    TaskDeleteView,TaskUpdateView,TaskTitleListView, TaskTitleCreateView,
                    ToDoTaskRetrieveUpdateDestroyAPIView, ToDoTaskListCreateAPIView, TitleTaskListView , TaskTitleUpdateView, TaskTitleDeleteView,
                    SetDefaultTaskTitleView)


urlpatterns = [
    path('task-list-create/', TaskListCreateView.as_view(), name='task-list-create'),
    path('task-delete/<int:id>/', TaskDeleteView.as_view(), name='task-delete'),
    path('<int:pk>/', TaskDetailView.as_view(), name='task-detail'),
    path('batch-update/', MultipleTaskUpdateView.as_view(), name='task-batch-update'),
    path('start-stop/', TaskStartStopView.as_view(), name='task-start-stop'),
    path('tasks-update/<int:pk>/', TaskUpdateView.as_view(), name='task-update'),
    path('task-titles/', TaskTitleListView.as_view(), name='tasktitle-list'),
    path('task-titles-list/', TitleTaskListView.as_view(), name='tasktitle-list'),
    path('task-title-create/', TaskTitleCreateView.as_view(), name='tasktitle-create'),

    path('todo-list-create/', ToDoTaskListCreateAPIView.as_view(), name='task-list-create'),
    path('todo-retrieve-delete-update/<int:pk>/', ToDoTaskRetrieveUpdateDestroyAPIView.as_view(), name='task-retrieve-update-destroy'),

    path('task-title-update/<int:pk>/', TaskTitleUpdateView.as_view(), name='tasktitle-update'),
    path('task-title-delete/<int:pk>/', TaskTitleDeleteView.as_view(), name='tasktitle-delete'),

    path('set-default-title/<int:id>/', SetDefaultTaskTitleView.as_view(), name='set_default_task_title'),

]
