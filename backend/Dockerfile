# Backend Dockerfile
# Use the official Python image as a parent image
FROM python:3.10-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Create a directory for the app
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libpq-dev \
    gcc \
    --no-install-recommends && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Copy the Django project into the Docker image
COPY . /app/

# Expose the port on which the app will run
EXPOSE 8000

# Run Gunicorn server
# CMD ["gunicorn", "--bind", "0.0.0.0:8000", "task_management_backend.wsgi:application"]
