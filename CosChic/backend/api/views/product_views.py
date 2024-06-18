from django.http import HttpResponse, JsonResponse, StreamingHttpResponse
from django.shortcuts import render, redirect
# 나중에 클라이언트에서 데이터가 들어올 떄, POST의 원하는 함수를 허용
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import FileSystemStorage  # 장고 파일 처리
from api.models import UserData, Product, Recommend
from django.db.models import Q
import random

@csrf_exempt
def search(request):
    if request.method == 'GET':
        print("someone requested the search get")
        try:
            print("this is the query request:", request)
            query = request.GET.get('query', '')
            category = request.GET.get('category', '모두')
            print("category,",category)
            print("query", query)

            if category == '브랜드':
                products = Product.objects.filter(brandName__icontains=query)
            elif category == '상품':
                products = Product.objects.filter(productName__icontains=query)
            elif category == '모델':
                products = Product.objects.filter(modelImage__icontains=query)
            else:  # 모두 or any other category
                products = Product.objects.filter(
                    Q(productName__icontains=query) | Q(brandName__icontains=query)
                )

            category_mapping = {
                '0': 'Lipstick',
                '1': 'Eye',
                '2': 'Blusher/Highlight'
            }
            countShow = random.randint(1128,2890)
            results = []
            for product in products.values('productUrl', 'productName', 'brandName', 'price', 'productImage', 'modelImage', 'count', 'categoryId', 'category'):
                product['category'] = category_mapping.get(str(product['category']), '기타')
                count_value = int(product['count']) if product['count'] != '' else 0
                product['count'] = str(int(count_value) + random.randint(118, 289))
                results.append(product)
                
        except Exception as e:
            print("The error was in exception:", str(e))
            return JsonResponse({'error': f'An error occurred during login: {str(e)}'}, status=400)
    else:
        return JsonResponse({'error': 'Invalid request method. Expected POST.'}, status=400)

    return JsonResponse(results, safe=False)