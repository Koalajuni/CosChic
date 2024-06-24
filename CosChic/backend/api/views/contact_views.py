from django.core.mail import send_mail
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse


@csrf_exempt
def send_email(request):
     if request.method == 'POST':
        try:
            email = request.data.get('email')
            subject = request.data.get('subject')
            message = request.data.get('message')
            
            send_mail(
                subject=f'Contact Form: {subject}',
                message=f'You have received a new message from {email}:\n\n{message}',
                from_email=email,
                recipient_list=['chicbytesai@gmail.com'],
            )
            
            return JsonResponse({'success': 'Message sent successfully!'}, status=200)
        except Exception as e:
            print("The error was in exception:", str(e))
            return JsonResponse({'error': f'An error occurred during email send: {str(e)}'}, status=400)
