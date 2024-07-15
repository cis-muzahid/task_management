from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import (
    UserListCreateView, 
    UserRetrieveUpdateDestroyView, 
    UserRegistrationView, 
    UserLoginView, 
    UserLogoutView,
    PasswordResetView,
    PasswordResetConfirmView,
    ChangePasswordView,
    UpdateAlertTimeView,
)

urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='user-register'),
    path('login/', UserLoginView.as_view(), name='user-login'),
    path('logout/', UserLogoutView.as_view(), name='user-logout'),
    path('password-reset/', PasswordResetView.as_view(), name='password-reset'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token-refresh'),
    path('reset-password-confirm/<uid>/<token>/', PasswordResetConfirmView.as_view(), name='password-reset-confirm'),
    path('change-password/', ChangePasswordView.as_view(), name='change-password'),
    path('update-alert-time/', UpdateAlertTimeView.as_view(), name='update-alert-time'),  # New endpoint
    path('', UserListCreateView.as_view(), name='user-list-create'),
    path('<int:pk>/', UserRetrieveUpdateDestroyView.as_view(), name='user-detail'),
]
