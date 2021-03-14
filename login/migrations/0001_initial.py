# Generated by Django 3.1.5 on 2021-03-14 14:03

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('address', '0001_initial'),
        ('phone', '0001_initial'),
        ('auth', '0012_alter_user_first_name_max_length'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Manager',
            fields=[
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.RESTRICT, primary_key=True, serialize=False, to='auth.user')),
            ],
            options={
                'db_table': 'manager',
            },
        ),
        migrations.CreateModel(
            name='UserPhone',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('main', models.BooleanField(default=False)),
                ('phone', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='phone.phone')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'user_phone',
            },
        ),
        migrations.CreateModel(
            name='UserAddress',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('main', models.BooleanField(default=False)),
                ('full_address', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='address.fulladdress')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'user_address',
            },
        ),
        migrations.CreateModel(
            name='Person',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('manager', models.ForeignKey(on_delete=django.db.models.deletion.RESTRICT, to='login.manager')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.RESTRICT, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'person',
            },
        ),
        migrations.CreateModel(
            name='ManagerConfiguration',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('max_daily_consumption', models.DecimalField(decimal_places=3, max_digits=8)),
                ('manager', models.OneToOneField(on_delete=django.db.models.deletion.RESTRICT, to='login.manager')),
            ],
            options={
                'db_table': 'manager_configuration',
            },
        ),
        migrations.CreateModel(
            name='HookPrice',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('hook_price', models.DecimalField(decimal_places=2, max_digits=8)),
                ('release_date', models.DateTimeField()),
                ('discharge_date', models.DateTimeField(null=True)),
                ('manager_configuration', models.ForeignKey(on_delete=django.db.models.deletion.RESTRICT, to='login.managerconfiguration')),
            ],
            options={
                'db_table': 'hook_price',
            },
        ),
    ]
