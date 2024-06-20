from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from datetime import datetime 
import json


from api.models import UserData, Product, Recommend


##########################################################
# userdata api
##########################################################
@csrf_exempt
def handle_userdata(request, UUID):
    print("someone requestsed the get_userData, UID:",UUID)

    # GET으로 해서 프로필 정보 불러가기 
    if request.method == 'GET':
        try:
            user = UserData.objects.get(UUID=UUID)
            user_data = {
                'email': user.email,
                'names': user.names,
                'age': user.age,
                'gender': user.gender,
                # 'createDate': user.createDate,
                # 'IP': user.IP,
                # 'uploadDate': user.uploadDate,
                'orgImage': user.orgImage,
                'profileImage':f'http://127.0.0.1:8000/{user.profileImage}' if user.profileImage else None,
            }
            return JsonResponse(user_data, safe=False,
                            json_dumps_params={"ensure_ascii" : False},
                            status=200)
        except UserData.DoesNotExist:
            return JsonResponse({'error': 'User not found'}, status=404)

    elif request.method == 'PUT':
        try:
            user = UserData.objects.get(UUID=UUID)
            data = json.loads(request.body)
            print("this is the data:", data)
            # Update user data
            uploadDate = datetime.now().strftime("%Y-%m-%d-%H:%M:%S")
            user.email = data.get('email', user.email)
            user.names = data.get('names', user.names)
            user.age = data.get('age', user.age)
            user.gender = data.get('gender', user.gender)
            user.uploadDate = data.get('uploadData',uploadDate)
            # user.orgImage = data.get('orgImage', user.orgImage)
            user.save()
            return JsonResponse({'message': 'User data updated successfully'}, status=200)
        except UserData.DoesNotExist:
            return JsonResponse({'error': 'User not found'}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    else:
        return JsonResponse({'error': '잘못된 정보입니다: {request.method}'},status = 404)
    


@csrf_exempt
def upload_image(request, UUID):
    try:
        if request.method == 'POST':
            profileimage = request.FILES.get('profileImage')
            UUID=UUID
            print(f"uuid 받음 : {UUID}" )
            if profileimage:
                nowString = datetime.now().strftime('%Y%m%d%H%M%S')
                # Save the uploaded image to the media directory
                url = f'media/profile_img/{nowString}.jpg'
                with open(url, 'wb+') as destination: 
                    for chunk in profileimage.chunks():
                        destination.write(chunk)

                # 이미지를 db에 저장
                # 유저 객체 가져오기
                try:
                    user = UserData.objects.get(UUID=UUID)
                except UserData.DoesNotExist:
                    return JsonResponse({'error': '해당 UUID를 가진 유저가 없습니다.'}, status=404)
                
                # 유저 객체의 profile_img 필드 업데이트
                user.profileImage = url  
                user.save()

                output_image_url = f'http://127.0.0.1:8000/{user.profileImage}'
                return JsonResponse({ 'imagepath':user.profileImage, "output_image_path": output_image_url}, status=200)
        return JsonResponse({'error': "Invalid request method"}, status=405)

    except Exception as e:
        print(f"Error processing request: {e}")
        return JsonResponse({'error': '서버 오류가 발생했습니다.'}, status=500)


##########################################################
# product api
##########################################################
@csrf_exempt
def api_product(request):
    datas = Product.objects.all()

    sendData = []
    for data in datas:
        sendData.append({
            "id" : data.id,
            "productUrl" : data.productUrl,
            "productName" : data.productName,
            "brandName" : data.brandName,
            "price" : data.price,
            "productImage" : data.productImage,
            "modelImage" : data.modelImage,
            "count" : data.count,
            "categoryId" : data.categoryId,
            "category" : data.category
        })

    data = {
        "refModel" : sendData,
        "code" : 1,
    }

    return JsonResponse(sendData,
                        safe=False,
                        json_dumps_params={"ensure_ascii" : False},
                        status=200)


##########################################################
# reconmmend api
##########################################################
@csrf_exempt
def api_recommend(request):
    datas = Recommend.objects.all()

    sendData = []
    for data in datas:
        sendData.append({
            "id" : data.id,
            "recDate" : data.recDate,
            "recDescription" : data.recDescription,
            "makeupTip" : data.makeupTip,
            "recImage" : data.recImage
        })

    data = {
        "refModel" : sendData,
        "code" : 1,
    }

    return JsonResponse(sendData,
                        safe=False,
                        json_dumps_params={"ensure_ascii" : False},
                        status=200)

