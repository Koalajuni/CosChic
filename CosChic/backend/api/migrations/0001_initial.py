# Generated by Django 4.0 on 2024-06-10 06:34

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='UserData',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=100)),
                ('age', models.PositiveIntegerField()),
                ('gender', models.CharField(max_length=1)),
                ('email', models.CharField(max_length=100)),
                ('createDate', models.DateTimeField(default=datetime.datetime.now)),
                ('password', models.CharField(max_length=45)),
                ('IP', models.GenericIPAddressField()),
            ],
        ),
    ]