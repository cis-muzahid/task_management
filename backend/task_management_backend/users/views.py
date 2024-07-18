from django.contrib.auth import get_user_model, authenticate, login, logout
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_str, force_bytes
from django.core.mail import send_mail
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
import jwt
from django.conf import settings

from .serializers import (
    CustomUserSerializer, 
    UserRegistrationSerializer, 
    UserLoginSerializer,
    ChangePasswordSerializer, 
    PasswordResetSerializer, 
    PasswordResetConfirmSerializer,
    CustomUserAlertTimeSerializer
)


class UserListCreateView(generics.ListCreateAPIView):
    """
    get:
    Return a list of all the existing users.

    post:
    Create a new user instance.
    """
    queryset = get_user_model().objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [IsAuthenticated]  # Requires authentication

class UserRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    """
    get:
    Retrieve a user instance.

    put:
    Update a user instance.

    delete:
    Delete a user instance.
    """
    queryset = get_user_model().objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [IsAuthenticated]  # Requires authentication

class UserRegistrationView(generics.CreateAPIView):
    """
    post:
    Create a new user instance.
    """
    permission_classes=[AllowAny]
    serializer_class = UserRegistrationSerializer

class UserLoginView(APIView):
    """
    post:
    Log in a user and return a token.
    """
    permission_classes=[AllowAny]
    def post(self, request, *args, **kwargs):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user_id': user.id,
            }, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserLogoutView(APIView):
    """
    post:
    Log out a user.
    """
    permission_classes = [IsAuthenticated]
    def post(self, request, *args, **kwargs):
        try:
            breakpoint()
            refresh_token = request.data.get('refresh')
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"message": "Logout successful"}, status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class PasswordResetView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request, *args, **kwargs):
        serializer = PasswordResetSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            user_model = get_user_model()
            try:
                user = user_model.objects.get(email=email)
            except user_model.DoesNotExist:
                return Response({"detail": "User with this email does not exist"}, status=status.HTTP_400_BAD_REQUEST)

            token = default_token_generator.make_token(user)
            uid = urlsafe_base64_encode(force_bytes(user.pk))
            reset_link = f'http://localhost:8000/api/users/reset-password-confirm/{uid}/{token}/'
            send_mail(
                'Password Reset Request',
                f'Click the link to reset your password: {reset_link}',
                'admin@yourdomain.com',
                [email],
                fail_silently=False,
            )
            return Response({"message": "Password reset link has been sent"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PasswordResetConfirmView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request, uid, token, *args, **kwargs):
        serializer = PasswordResetConfirmSerializer(data=request.data)
        if serializer.is_valid():
            try:
                uid = force_str(urlsafe_base64_decode(uid))
                user = get_user_model().objects.get(pk=uid)
            except (TypeError, ValueError, OverflowError, get_user_model().DoesNotExist):
                return Response({"detail": "Invalid token or UID"}, status=status.HTTP_400_BAD_REQUEST)
            
            if default_token_generator.check_token(user, token):
                new_password = serializer.validated_data['new_password']
                user.set_password(new_password)
                user.save()
                return Response({"message": "Password has been reset successfully"}, status=status.HTTP_200_OK)
            return Response({"detail": "Invalid token"}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request, *args, **kwargs):
        serializer = ChangePasswordSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            user = request.user
            if not user.check_password(serializer.validated_data['current_password']):
                return Response({"current_password": "Current password is incorrect"}, status=status.HTTP_400_BAD_REQUEST)
            
            user.set_password(serializer.validated_data['new_password'])
            user.save()
            return Response({"message": "Password has been changed successfully"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 


class GetOrUpdateAlertTimeView(APIView):
    """
    post:
    Update the default alert time for the user.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user 
        serializer = CustomUserAlertTimeSerializer(user)
        return Response(serializer.data)
    
    def put(self, request):
        user = request.user 
        serializer = CustomUserAlertTimeSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    """
    get:
    Retrieve a user instance.

    put:
    Update a user instance.

    patch:
    Partially update a user instance (e.g., update default_alert_time).

    delete:
    Delete a user instance.
    """
    queryset = get_user_model().objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [IsAuthenticated]  # Requires authentication
    
    def get_object(self):
        return self.request.user
    
    def patch(self, request, *args, **kwargs):
        user = self.get_object()
        default_alert_time = request.data.get('default_alert_time')

        if default_alert_time is not None:
            if not isinstance(default_alert_time, int) or default_alert_time <= 0:
                return Response({"default_alert_time": "Must be a positive integer."}, status=status.HTTP_400_BAD_REQUEST)
            user.default_alert_time = default_alert_time
            user.save()
            return Response({"message": "Default alert time updated successfully"}, status=status.HTTP_200_OK)

        return Response({"detail": "No fields to update."}, status=status.HTTP_400_BAD_REQUEST)
