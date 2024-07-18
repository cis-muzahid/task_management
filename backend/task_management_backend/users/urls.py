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
    GetOrUpdateAlertTimeView,
)

urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='user-register'),
    path('login/', UserLoginView.as_view(), name='user-login'),
    path('logout/', UserLogoutView.as_view(), name='user-logout'),
    path('password-reset/', PasswordResetView.as_view(), name='password-reset'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token-refresh'),
    path('reset-password-confirm/<uid>/<token>/', PasswordResetConfirmView.as_view(), name='password-reset-confirm'),
    path('change-password/', ChangePasswordView.as_view(), name='change-password'),
    path('get-or-update-alert-time/', GetOrUpdateAlertTimeView.as_view(), name='get-or-update-alert-time'),
    path('', UserListCreateView.as_view(), name='user-list-create'),
    path('update-or-get-user/', UserRetrieveUpdateDestroyView.as_view(), name='user-detail'),
]
