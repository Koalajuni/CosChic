# Generated by Django 4.0 on 2024-06-13 20:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0023_alter_userdata_orgimage'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userdata',
            name='orgImage',
            field=models.CharField(blank=True, default='', max_length=255),
        ),
    ]