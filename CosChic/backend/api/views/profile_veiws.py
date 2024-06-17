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

