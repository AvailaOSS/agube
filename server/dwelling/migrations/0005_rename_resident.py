# Generated by Django 3.1.5 on 2022-05-12 16:25

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ('dwelling', '0004_moved_owner_to_his_own_module'),
    ]

    operations = [
        migrations.AlterModelTable(
            name='dwellingresident',
            table='agube_resident_resident',
        ),
    ]
