from django.contrib.auth import authenticate, get_user_model
from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from users.models import CustomUser
from tasks.models import TaskTitle
class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ['id', 'username', 'email', 'default_alert_time', 'groups', 'user_permissions']
        read_only_fields = ['groups', 'user_permissions']


class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = get_user_model()
        fields = ['email', 'password', 'password2']

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Passwords must match."})
        return attrs

    def create(self, validated_data):
        email = validated_data['email']
        password = validated_data['password']
        
        user = get_user_model().objects.create_user(
            username=email,
            email=email,
            password=password,
            default_alert_time=10  # Set default alert time to 10
        )

        # Predefined task titles
        task_titles = [
            'Feature Development',
            'Bug Fixing',
            'Code Review',
            'Meetings',
            'Testing',
            'Documentation',
            'Deployment and Maintenance',
            'Collaboration and Communication'
        ]

        # Create TaskTitle instances for the new user
        for title in task_titles:
            # Check if the TaskTitle with the same name already exists for the user
            if not TaskTitle.objects.filter(user=user, name=title).exists():
                TaskTitle.objects.create(user=user, name=title)

        return user


class CustomUserAlertTimeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['default_alert_time']

from rest_framework_simplejwt.tokens import RefreshToken

class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True)

    def validate(self, data):
        user = authenticate(username=data['username'], password=data['password'])
        if user is None:
            raise serializers.ValidationError("Invalid credentials")
        return {'user': user}

class PasswordResetSerializer(serializers.Serializer):
    email = serializers.EmailField()

class PasswordResetConfirmSerializer(serializers.Serializer):
    uid = serializers.CharField()
    token = serializers.CharField()
    new_password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    new_password2 = serializers.CharField(write_only=True, required=True)

    def validate(self, attrs):
        if attrs['new_password'] != attrs['new_password2']:
            raise serializers.ValidationError({"new_password": "Passwords must match."})
        return attrs
    
class ChangePasswordSerializer(serializers.Serializer):
    current_password = serializers.CharField(write_only=True, required=True)
    new_password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    new_password2 = serializers.CharField(write_only=True, required=True)

    def validate(self, attrs):
        if attrs['new_password'] != attrs['new_password2']:
            raise serializers.ValidationError({"new_password": "Passwords must match."})
        return attrs