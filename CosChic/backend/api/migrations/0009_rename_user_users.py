# Generated by Django 4.0 on 2024-06-10 18:15

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_rename_name_user_names'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='User',
            new_name='Users',
        ),
    ]
