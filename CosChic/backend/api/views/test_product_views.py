from uuid import UUID
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login
from django.contrib.auth.hashers import make_password, check_password
from api.models import UserData
from api.models import Product
from django.db import connection


##0620 11:11 backup
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .beautygan_class import *
from django.conf import settings
from os.path import join
import os
import json

# UUID를 기반으로 데이터를 조회하는 함수 => 다른함수 안에서 사용 
def get_user_data_by_email(email):
    print("get_user_data_by_uuid")
    # print(u_uid)
    try:

        print("user email = ", email)
        user_data = UserData.objects.get(email=email)
        print(f"Processed user_uid: '{email}'")

        # print(str(user_data.query))
        print("userdata :",user_data)
        response_data = {
            'orgImage': user_data.orgImage,
            'UUID': user_data.UUID,
        }
        return response_data
        # return "ok"
    except UserData.DoesNotExist:
        return None

# 특정 정보를 기반으로 데이터를 조회하는 함수 => 다른함수 안에서 사용
def get_product_data_by_brandname(brand_name):
    # print("get_product_data_brandname")
    # print(brand_name)
    try:
        # brandname를 기반으로 Product 조회
        brand_name = brand_name.strip()
        # print("brand_name = ", brand_name)
        # 브랜드 이름을 가지고 있는 모든 데이터 조회
        all_brand =Product.objects.filter(brandName=brand_name)
        brand_data_list = []
        # print(str(user_data.query))
        # print("all_brand :",all_brand)
        for brand in all_brand:
            if brand.productImage == " ":
                full_product_image_url = 'assets/default_search.png'
            else:
                full_product_image_url = f'http://localhost:8000/media/product_img/{brand.productImage}'

            brand_data_list.append({
                    'productUrl': brand.productUrl,
                    'productName': brand.productName,
                    'brandName': brand.brandName,
                    'price': brand.price,
                    'productImage': full_product_image_url,
                    # 'modelImage': brand.modelImage,
                    'count': brand.count,
                    'categoryId': brand.categoryId,
                    # 'category': brand.category,   
                })
        # print(brand_data_list)
        return brand_data_list
        # return "ok"
    except Product.DoesNotExist:
        return None

# BeautyGan 결과 함수
@csrf_exempt
def BG_result(request):
    if request.method == 'POST':
        try:
            # 클라이언트로부터 전달받은 UUID 지금은 email
            email = request.POST.get('user_email')
            used_model_name = request.POST.get('used_model_name')
            print(f"Received UUID from client: {email}")

            # UUID를 기반으로 데이터 조회
            user_data = get_user_data_by_email(email)

            # print(user_data)
            # 받고 나서 인공지능과 데이터베이스 처리 원래는 데이터 베이스에서 경로를 가져온다
            # 현재 uid로 조회가 되지 않아 로컬 경로를 직접 쓴다
            # org_img = "C:/Users/ok/Desktop/2024-06-13 21_23_48.jpg"
            org_img = user_data['orgImage']
            print('org_img', org_img)

            ref_img_list = os.listdir(f"./media/model_img/{used_model_name}")
            print('ref_img_list', ref_img_list)
            ref_img  = ref_img_list[0]
            print('ref_img', ref_img)
            ref_img = f'./media/model_img/{used_model_name}/{ref_img}'
            print('ref_img_path ', ref_img)
            result_img = "./media/result"
            # imagePath = f'./media/org_img/{nowString}.jpg'
            # media_url = settings.MEDIA_URL
            # print(media_url)
            bg = BeautyGAN()
            print("beautygan ended successfully")
            result_img = bg.makeup(org_img,ref_img,result_img) # = > #result_img(경로) 반환
            # print('bg_result',result_img)
            # result_img = result_img.split('/')[7] + '/' + result_img.split('/')[8] + '/' + result_img.split('/')[9]
            full_url = 'http://localhost:8000' + '/' + result_img
            org_url = 'http://localhost:8000' + '/' + org_img
            
            print(full_url)
            result_data = {
                'result_img_path': full_url,
                'org_image' : org_url,
                # 'recommand_ item' :recommand_item,

            }
            if not user_data:
                return JsonResponse({'error': 'User data not found for the given UUID.'}, status=404)
            
            return JsonResponse(result_data, status=200)
        
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    else:
        return JsonResponse({'error': 'Only POST requests are allowed.'}, status=405)

# 모든 사용자 데이터를 조회하는 함수
@csrf_exempt
def get_all_users(request):
    if request.method == 'GET':
        try:
            # UserData 모델의 모든 객체를 조회
            all_users = UserData.objects.filter(UUID="e5ad94b1-0cf2-4e65-85ee-6eb6103d3c02")
            print(all_users)
            # 모든 사용자 데이터를 리스트로 변환
            users_data = []
            for user in all_users:
                users_data.append({
                    'names': user.names,
                    'age': user.age,
                    'gender': user.gender,
                    'email': user.email,
                    'createDate': user.createDate,
                    'password': user.password,
                    'IP': user.IP,
                    'uploadDate': user.uploadDate,
                    'orgImage': user.orgImage,
                    'UUID': user.UUID,
                })

            # 클라이언트에게 JSON 응답 반환
            return JsonResponse(users_data, safe=False, status=200)

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    else:
        return JsonResponse({'error': 'Only GET requests are allowed.'}, status=405)

# 혹시나 모를 faiss 작동 함수
@csrf_exempt
def recommand_model (request):
    # if request.method == 'POST':
        
    #     # 특정 사용자의 uid 정보 가져오기
    #     user_uid = request.POST.get('user_uid')
    #     data = {'UUID': '{user_uid}'}
    #     print(data)
    #     # 모델 리스트 파이스로 불러오기
    #     model = CosChicFaiss()
        
    #     # 각각 uid에 맞는 데이터를 데이터 베이스에서 가져오기
    #     org_img ="C:/Users/ok/Desktop/CS/backend/media/org/source.jpg" # 여기원래 data 기반 org 경로
    #     label_path = "C:/Users/ok/Desktop/CS/backend/pretrained/CosChic_labels.npy"
    #     model_path = "C:\Users\ok\Desktop\CS\backend\pretrained\CosChic_model.bin"
        
    #     # 인공지능 모델 적용 후 결과값은 리스트로 변환
    #     similarity_list = model.detect_faces(org_img,label_path,model_path)
    #     print(similarity_list)

    #     brand_list = [] 
    #     for i in range(len(similarity_list)):
        
    #         brand_list = brand_list.appned(similarity_list[i].split('_')[0])
    #     print(brand_list)
        

    #     products = Product.objects.filter(brandName__in=brand_list)
        
    #     data_form = []
    #     for product in products:
    #         data_form.append({
    #             'productUrl': product.productUrl,
    #             'productName': product.productName,
    #             'brandName': product.brandName,
    #             'price': product.price,
    #             'productImage': product.productImage,
    #             'modelImage': product.modelImage,
    #             'count': product.count,
    #             'categoryId': product.categoryId,
    #             'category': product.category,
    #         })
        
    #     return JsonResponse(data_form, safe=False)
    # else:
    #     return JsonResponse({'error': 'Invalid request method'}, status=400)
    pass

# 사용된 제품 (상품명,상품 url,사진 경로,상품 가격 등
@csrf_exempt
def used_product (request):
    if request.method == 'POST':
        try:
            used_model_name = request.POST.get('used_model_name')
            user_email = request.POST.get('user_email')
            # print(f"Received used_model_name from client: {used_model_name}")

            # ModelList 중 첫번째를 기반으로 데이터 조회(상품명,상품 url,사진 경로,상품 가격 등)
            brand_name = used_model_name.split('_')[0]
            print('used_brand_name' ,brand_name)
            if brand_name =='holikaeyeshadow':
                brand_name = brand_name[:6]
            print('used_brand_name' ,brand_name)
            # 조회 함수에 넣기(첫번째 상품을 사용했다고 가정)
            
            result_data = get_product_data_by_brandname(brand_name)[0]
            result_data['productImage'] =  result_data['productImage']
            print(result_data)
            if not used_model_name:
                return JsonResponse({'error': 'used_model_name not found for the given condition.'}, status=404)
            
            return JsonResponse(result_data, status=200)
        
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Only POST requests are allowed.'}, status=405)

# 다른 유사 모델
@csrf_exempt
def other_models (request):
    if request.method == 'POST':
    #     print("other_models")
    #     ModelLists= request.POST.get('models')
    #     print(ModelLists)
        try:
            # 클라이언트로부터 전달받은 모델리스트
            modelstring = request.POST.get('models')
            print(f"Received other_modelstring from client: {modelstring}")
            if not modelstring:
                return JsonResponse({'error': 'modelstring not found for the given condition.'}, status=404)

            # Correctly parse the JSON string to a list
            ModelList = json.loads(modelstring)
            print(f"Parsed ModelList: {ModelList}")

            model_data = []
            for model in ModelList:
                # Trim any extra spaces
                model = model.strip()
                # 파일이 들어있는 폴더 경로
                modelFolderPath = f'./media/model_img/{model}'

                if os.path.exists(modelFolderPath):
                    # 모델의 첫번째 사진
                    images = os.listdir(modelFolderPath)
                    if images:
                        firstImage = images[0]
                        modelPhotoUrl = f'http://localhost:8000/media/model_img/{model}/{firstImage}' 

                        model_data.append({
                            'names': model,
                            'modelPhotoUrl': modelPhotoUrl,
                        })
                else:
                    print(f"Folder path does not exist: {modelFolderPath}")

            return JsonResponse(model_data, safe=False, status=200)
        
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Failed to parse JSON.'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Only POST requests are allowed.'}, status=405)

# 관련 브랜드 상품 (몇개 조회할건지 상의 )
@csrf_exempt
def asso_product (request):
    if request.method == 'POST':
        try:
            used_model_name = request.POST.get('used_model_name')
            # print('asoo_used_model',used_model_name)
            user_email = request.POST.get('user_email')
            # print(f"Received used_model_name from client: {used_model_name}")
            specific_brand_name = used_model_name.split('_')[0]
            # print(specific_brand_name)
            # specific_brand_name 기반으로 특정 브랜드의 다른 상품 데이터 조회
            asso_product_data = get_product_data_by_brandname(specific_brand_name)[:8]
            if not used_model_name:
                return JsonResponse({'error': 'specific_used_model_name not found for the given condition.'}, status=404)
            
            return JsonResponse(asso_product_data,safe=False, status=200)
        
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Only POST requests are allowed.'}, status=405)
