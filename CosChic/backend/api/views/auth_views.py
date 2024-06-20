from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login
from django.contrib.auth.hashers import make_password, check_password
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
    print("Someone requested the register")
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
        user_data.save()

        return Response({'UUID': str(user_uuid)}, status=status.HTTP_201_CREATED)

    except Exception as e:
        logging.error(f"Error during registration: {e}")
        return Response({'error': 'An error occurred during registration.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

################################################
################################################




########### 로그인할 때 사용할 함수 ########### 
def custom_authenticate(email, password):
    print("Trying custom_authenticate")
    try:
        user = UserData.objects.get(email=email)
        print("Checking password for", password, " and ", user.password)
        if check_password(password, user.password):
            print("Password is correct")
            return user
        else:
            print("Wrong password")
            return None
    except UserData.DoesNotExist:
        return None

@api_view(['POST'])
def login_user(request):
    print("Someone requested the login API")
    if request.method == 'POST':
        try:
            email = request.data.get('email')
            password = request.data.get('password')
            print("Email and password passed is:", email, password)
            if not email or not password:
                return Response({'error': 'Email and password are required.'}, status=status.HTTP_400_BAD_REQUEST)

            print("Trying custom_authenticate")
            user = custom_authenticate(email=email, password=password)
            if user is not None:
                print("User is not none so we print:", user)
                return Response( {'UUID': user.UUID, 'email':user.email}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Invalid email or password.'}, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            print("The error was in exception:", str(e))
            return Response({'error': f'An error occurred during login: {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({'error': 'Invalid request method. Expected POST.'}, status=status.HTTP_400_BAD_REQUEST)