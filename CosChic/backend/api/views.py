################# 일반 Import ######################
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt


################# API 모델 Import ##################

# from .models import RefModels


###################################################


def api_index(request):
    return HttpResponse("ChicBytes API v1.0")
