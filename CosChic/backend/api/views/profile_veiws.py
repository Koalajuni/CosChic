from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt

def api_test_profile(request):
    return HttpResponse("ChicBytes API v1.0")
