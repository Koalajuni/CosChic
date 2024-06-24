from faiss_class import *

model = CosChicFaiss()
'C:/Users/ok/Desktop/CS/backend/faiss_class.py' 


# from rest_framework import status
# from rest_framework.decorators import api_view
# from rest_framework.response import Response
# from django.views.decorators.csrf import csrf_exempt
# from django.contrib.auth import authenticate, login
# from django.contrib.auth.hashers import make_password, check_password

import uuid
import socket
import logging
import datetime

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from faiss_class import *
from  beautygan_class import *
org_img = "C:/Users/ok/Desktop/2024-06-13 21_23_48.jpg"
ref_img = "C:/Users/ok/Desktop/CosChic/CosChic/backend/media/ref/3ce_model1/3CE_lipstick_20.jpg"
result_img = "C:/Users/ok/Desktop/CosChic/CosChic/backend/media/result"
bg = BeautyGAN()
result_img = bg.makeup(org_img,ref_img,result_img)

# model = CosChicFaiss()
# model.detect_faces('C:/Users/ok/Desktop/BT/beautygan_web/media/src/source.jpg',
#                 'C:/Users/ok/Desktop/BT/beautygan_web/train/CosChic_labels.npy',
#                 'C:/Users/ok/Desktop/BT/beautygan_web/train/CosChic_model.bin')