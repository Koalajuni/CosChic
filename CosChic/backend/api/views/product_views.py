from django.http import HttpResponse, JsonResponse, StreamingHttpResponse
from django.shortcuts import render, redirect
from django.core.paginator import Paginator
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import FileSystemStorage  # 장고 파일 처리
from api.models import UserData, Product, Recommend
from django.db.models import Q
import random, os

@csrf_exempt
def search(request):
    if request.method == 'GET':
        try:

            query = request.GET.get('query', '')
            category = request.GET.get('category', '모두')
            page = request.GET.get('page', 1)
            results_per_page = request.GET.get('results_per_page', 4)
            server_address = os.getenv('localhost:8000', 'http://127.0.0.1:8000')   #서버서 못 잡으면 local에서 잡을 수 있게끔 

            queryset = Product.objects.all()


            if category == '브랜드':
                queryset = Product.objects.filter(brandName__icontains=query)
            elif category == '상품':
                queryset = Product.objects.filter(productName__icontains=query)
            elif category == '모델':
                queryset = Product.objects.filter(modelImage__icontains=query)
            else:  # 모두 or any other category
                queryset = Product.objects.filter(
                    Q(productName__icontains=query) | Q(brandName__icontains=query)
                )

            category_mapping = {
                '0': 'Lipstick',
                '1': 'Eye',
                '2': 'Blusher/Highlight'
            }
            results = []
            for queryset in queryset.values('productUrl', 'productName', 'brandName', 'price', 'productImage', 'modelImage', 'count', 'categoryId', 'category'):

                if queryset['productImage']=="":
                    resultImage = "assets/default_search.png"
                else:
                    resultImage = f"{server_address}/media/product_img/{queryset['productImage']}"

                queryset['category'] = category_mapping.get(str(queryset['category']), '기타')
                count_value = int(queryset['count']) if queryset['count'] != '' else 0
                queryset['count'] = str(int(count_value) + random.randint(118, 289))
                queryset['productImage'] = resultImage
                queryset['modelImage'] = f"{server_address}/media/model_img/{queryset['modelImage']}"
                results.append(queryset)

            paginator = Paginator(results, results_per_page)
            try:
                page_obj = paginator.page(page)
            except PageNotAnInteger:
                page_obj = paginator.page(1)
            except EmptyPage:
                page_obj = paginator.page(paginator.num_pages)

            response_data = {
            'results': page_obj.object_list,
            'total_results': paginator.count,
            'total_pages': paginator.num_pages,
            'current_page': page_obj.number,
            }
                
        except Exception as e:
            print("The error was in exception:", str(e))
            return JsonResponse({'error': f'An error occurred during login: {str(e)}'}, status=400)
    else:
        return JsonResponse({'error': 'Invalid request method. Expected POST.'}, status=400)

    return JsonResponse(response_data, safe=False)