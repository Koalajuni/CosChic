
from django.conf import settings
import os
from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from api.models import UserData

@csrf_exempt
def img_send(request):
    if request.method == 'POST':
        print('Request method:', request.method)
        print('FILES:', request.FILES)
        orgImage = request.FILES.get('orgImage')

        if orgImage:
            # Save the uploaded image to the media directory
            with open(os.path.join(settings.MEDIA_ROOT, orgImage.name), 'wb+') as destination:
                for chunk in orgImage.chunks():
                    destination.write(chunk)

            # Save only the file path to the database
            user_data = UserData(orgImage=os.path.join(settings.MEDIA_URL, orgImage.name))
            user_data.save()
            return JsonResponse({"message": "Image uploaded successfully"}, status=201)
        else:
            return JsonResponse({"error": "No image uploaded"}, status=400)
    
    return JsonResponse({"error": "Invalid request method"}, status=405)
