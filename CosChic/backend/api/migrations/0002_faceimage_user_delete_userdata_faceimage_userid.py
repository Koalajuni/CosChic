# Generated by Django 4.0 on 2024-06-10 07:54

import datetime
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='FaceImage',
            fields=[
                ('imageID', models.BigAutoField(primary_key=True, serialize=False)),
                ('uploadDate', models.DateTimeField(default=datetime.datetime.now)),
                ('orgImg', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('userID', models.BigAutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=100)),
                ('age', models.PositiveIntegerField()),
                ('gender', models.CharField(max_length=1)),
                ('email', models.CharField(max_length=100)),
                ('createDate', models.DateTimeField(default=datetime.datetime.now)),
                ('password', models.CharField(max_length=45)),
                ('IP', models.GenericIPAddressField()),
            ],
        ),
        migrations.DeleteModel(
            name='UserData',
        ),
        migrations.AddField(
            model_name='faceimage',
            name='userID',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.user'),
        ),
    ]
