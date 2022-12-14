# Generated by Django 3.1.5 on 2022-10-06 08:45

import django.db.models.deletion
import django_prometheus.models
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ('comment', '0001_comments_for_dwellings'),
        ('reservoir', '0003_comments_for_dwellings'),
    ]

    operations = [
        migrations.CreateModel(
            name='ReservoirComment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('comment', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='comment.comment')),
                (
                'reservoir', models.ForeignKey(on_delete=django.db.models.deletion.RESTRICT, to='reservoir.reservoir')),
            ],
            options={
                'db_table': 'agube_reservoir_comment',
            },
            bases=(django_prometheus.models.ExportModelOperationsMixin('ReservoirComment'), models.Model),
        ),
    ]
