from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import make_password
from api.models import UserData
import uuid
import socket
import logging
import datetime

########### 회원가입 때 사용할 함수 ########### 
def get_ip_address():
    hostname = socket.gethostname()
    IPAddr = socket.gethostbyname(hostname)
    return IPAddr

# Register REST API 
@csrf_exempt
@api_view(['POST'])
def register(request):
    logging.info("Someone requested the register")
    if request.method != 'POST':
        return Response({'error': '잘못된 정보입니다: {request.method}'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

    try:
        userIpNum = get_ip_address()
        user_uuid = uuid.uuid4()
        dateCreated = datetime.datetime.now().strftime("%Y-%m-%d-%H:%M:%S")
        email = request.data.get('email', '')
        password = make_password(request.data.get('password', ''))
        if not email or not password:
            return Response({'error': 'Email and password are required.'}, status=status.HTTP_400_BAD_REQUEST)
        
        user_data = UserData(
            email=email,
            password=password,
            IP=userIpNum,
            createDate=dateCreated,
            UUID=user_uuid
        )
        
        # Save the instance to the database
        user_data.save()

        # Return success response with relevant data (e.g., user ID)
        return Response({'message': 'Registration successful!', 'user_id': str(user_uuid)}, status=status.HTTP_201_CREATED)

    except Exception as e:
        logging.error(f"Error during registration: {e}")
        return Response({'error': 'An error occurred during registration.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


################################################

