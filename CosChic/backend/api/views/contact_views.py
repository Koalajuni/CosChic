import os
import cv2
import uuid
import time
from django.core.mail import send_mail
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json
from api.models import Feedback 

@csrf_exempt
def send_email(request):
    if request.method == 'POST':
        try:
            print("Request body:", request.body)
            data = json.loads(request.body.decode('utf-8'))
            email = data.get('email')
            subject = data.get('subject')
            message = data.get('message')

            if not email or not subject or not message:
                return JsonResponse({'error': 'Missing required fields (email, subject, message)'}, status=400)

            # Save feedback to the database
            feedback = Feedback(
                feedbackEmail=email,
                feedbackTitle=subject,
                feedbackMessage=message
            )
            feedback.save()
            return JsonResponse({'success': 'Message saved successfully!'}, status=200)

        except json.JSONDecodeError as e:
            print(f"JSON decode error: {str(e)}")
            return JsonResponse({'error': 'Invalid JSON data received'}, status=400)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)
