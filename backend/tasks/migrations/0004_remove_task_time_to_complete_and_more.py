# Generated by Django 5.0.6 on 2024-07-17 13:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tasks', '0003_task_status'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='task',
            name='time_to_complete',
        ),
        migrations.AddField(
            model_name='task',
            name='total_time_to_complete',
            field=models.PositiveIntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='task',
            name='status',
            field=models.CharField(choices=[('started', 'started'), ('completed', 'completed'), ('pending', 'pending')], default='pending', max_length=20),
        ),
    ]