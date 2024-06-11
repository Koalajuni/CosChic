from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt

from api.models import UserData, Product, Recommend

##########################################################
# userdata api
##########################################################
@csrf_exempt
def api_userdata(request):
    datas = UserData.objects.all()

    sendData = []
    for data in datas:
        sendData.append({
            "id" : data.id,
            "names" : data.names,
            "age" : data.age,
            "gender" : data.gender,
            "email" : data.email,
            "createData" : data.createDate,
            "password" : data.password,
            "IP" : data.IP,
            "uploadDate" : data.uploadDate,
            "orgImage" : data.orgImage,

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

