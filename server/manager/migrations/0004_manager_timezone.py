# Generated by Django 3.1.5 on 2022-10-10 15:56

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ('manager', '0003_managermessage'),
    ]

    operations = [
        migrations.AddField(
            model_name='manager',
            name='timezone',
            field=models.TextField(default='Europe/Madrid', max_length=32),
        ),
    ]
