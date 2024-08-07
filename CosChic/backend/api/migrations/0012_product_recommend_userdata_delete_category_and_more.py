# Generated by Django 4.0 on 2024-06-11 09:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0011_userdata1'),
    ]

    operations = [
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('productUrl', models.CharField(max_length=255)),
                ('productName', models.CharField(max_length=100)),
                ('brandName', models.CharField(max_length=100)),
                ('price', models.CharField(max_length=100)),
                ('productImage', models.CharField(max_length=255)),
                ('modelImage', models.CharField(max_length=255)),
                ('count', models.CharField(max_length=100)),
                ('categoryId', models.CharField(max_length=20)),
                ('category', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Recommend',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('recDate', models.CharField(max_length=50)),
                ('recDescription', models.CharField(max_length=255)),
                ('makeupTip', models.CharField(max_length=255)),
                ('recImage', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='UserData',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('names', models.CharField(max_length=100)),
                ('age', models.CharField(max_length=10)),
                ('gender', models.CharField(max_length=10)),
                ('email', models.CharField(max_length=100)),
                ('createDate', models.CharField(max_length=50)),
                ('password', models.CharField(max_length=100)),
                ('IP', models.CharField(max_length=20)),
                ('uploadDate', models.CharField(max_length=50)),
                ('orgImage', models.CharField(max_length=255)),
            ],
        ),
        migrations.DeleteModel(
            name='Category',
        ),
        migrations.RemoveField(
            model_name='faceimage',
            name='userID',
        ),
        migrations.DeleteModel(
            name='UserData1',
        ),
        migrations.DeleteModel(
            name='FaceImage',
        ),
        migrations.DeleteModel(
            name='Users',
        ),
    ]
