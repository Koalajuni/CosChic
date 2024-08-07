# Generated by Django 4.0 on 2024-06-12 20:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0013_userdata_uuid'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userdata',
            name='age',
            field=models.CharField(blank=True, default='12', max_length=10),
        ),
        migrations.AlterField(
            model_name='userdata',
            name='gender',
            field=models.CharField(blank=True, default=None, max_length=10),
        ),
        migrations.AlterField(
            model_name='userdata',
            name='names',
            field=models.CharField(blank=True, default='홍길동', max_length=100),
        ),
        migrations.AlterField(
            model_name='userdata',
            name='orgImage',
            field=models.CharField(blank=True, default=None, max_length=255),
        ),
        migrations.AlterField(
            model_name='userdata',
            name='uploadDate',
            field=models.CharField(blank=True, default=None, max_length=50),
        ),
    ]
