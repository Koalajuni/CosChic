from django.http import HttpResponse, JsonResponse, StreamingHttpResponse
from django.shortcuts import render, redirect
# 나중에 클라이언트에서 데이터가 들어올 떄, POST의 원하는 함수를 허용
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import FileSystemStorage  # 장고 파일 처리
from api.models import UserData, Product, Recommend

@csrf_exempt
def search(request):
    query = request.GET.get('query', '')
    category = request.GET.get('category', '모두')

    if category == '브랜드':
        products = Product.objects.filter(brandName__icontains=query)
    elif category == '상품':
        products = Product.objects.filter(productName__icontains=query)
    elif category == '모델':
        pass
    else:  # 모두 or any other category
        products = Product.objects.filter(
            Q(productName__icontains=query) | Q(brandName__icontains=query)
        )

    product_list = list(products.values())
    return JsonResponse(product_list, safe=False)