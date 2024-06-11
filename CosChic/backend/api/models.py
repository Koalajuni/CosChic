from django.db import models
# Create your models here.

class UserData(models.Model):
    names = models.CharField(max_length=100)
    age = models.CharField(max_length=10)
    gender = models.CharField(max_length=10)
    email = models.CharField(max_length=100)
    createDate = models.CharField(max_length=50)
    password = models.CharField(max_length=100)
    IP = models.CharField(max_length=20)
    uploadDate = models.CharField(max_length=50)
    orgImage = models.CharField(max_length=255)
    def __str__(self):
        return self.names


class Product(models.Model):
    productUrl = models.CharField(max_length=255)
    productName = models.CharField(max_length=100)
    brandName = models.CharField(max_length=100)
    price = models.CharField(max_length=100)
    productImage = models.CharField(max_length=255)
    modelImage = models.CharField(max_length=255)
    count = models.CharField(max_length=100)
    categoryId = models.CharField(max_length=20)
    category = models.CharField(max_length=100)
    def __str__(self):
        return self.productName

class Recommend(models.Model):
    recDate = models.CharField(max_length=50)
    recDescription = models.CharField(max_length=255)
    makeupTip = models.CharField(max_length=255)
    recImage = models.CharField(max_length=255)
    def __str__(self):
        return self.recDate
