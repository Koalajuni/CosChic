# Generated by Django 4.0 on 2024-06-13 09:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0019_alter_userdata_uuid'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userdata',
            name='UUID',
            field=models.CharField(max_length=255),
        ),
    ]
