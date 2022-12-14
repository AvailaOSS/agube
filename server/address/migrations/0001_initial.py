# Generated by Django 3.1.5 on 2022-05-04 11:01

from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Address',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_external', models.BooleanField(default=False)),
                ('city', models.TextField()),
                ('country', models.TextField()),
                ('city_district', models.TextField()),
                ('municipality', models.TextField()),
                ('postcode', models.TextField()),
                ('province', models.TextField()),
                ('state', models.TextField()),
                ('village', models.TextField(blank=True, null=True)),
                ('road', models.TextField(blank=True, null=True)),
            ],
            options={
                'db_table': 'agube_address_address',
                'ordering': ['country', 'state', 'city'],
            },
        ),
    ]
