
from django.urls import path
from . import views


urlpatterns = [
    path('v1/', views.api_index, name='api_index'),
    
]
