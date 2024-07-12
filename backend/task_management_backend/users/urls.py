from django.urls import path
from .views import (
    UserListCreateView, 
    UserRetrieveUpdateDestroyView, 
    UserRegistrationView, 
    UserLoginView, 
    UserLogoutView,
    PasswordResetView,
    PasswordResetConfirmView,
)

urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='user-register'),
    path('login/', UserLoginView.as_view(), name='user-login'),
    path('logout/', UserLogoutView.as_view(), name='user-logout'),
    path('password-reset/', PasswordResetView.as_view(), name='password-reset'),
    path('reset-password-confirm/<uid>/<token>/', PasswordResetConfirmView.as_view(), name='password-reset-confirm'),
    path('', UserListCreateView.as_view(), name='user-list-create'),
    path('<int:pk>/', UserRetrieveUpdateDestroyView.as_view(), name='user-detail'),
]
