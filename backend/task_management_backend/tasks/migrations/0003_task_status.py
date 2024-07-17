# Generated by Django 5.0.6 on 2024-07-17 07:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tasks', '0002_rename_name_task_title_task_description_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='task',
            name='status',
            field=models.CharField(choices=[('pending', 'pending'), ('completed', 'completed'), ('started', 'started')], default='pending', max_length=20),
        ),
    ]