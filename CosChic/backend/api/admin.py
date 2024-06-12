from django.contrib import admin

# Register your models here.
from .models import UserData, Product, Recommend

admin.site.register(UserData)
admin.site.register(Product)
admin.site.register(Recommend)