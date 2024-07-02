
from django.urls import path,include
from .views import index_views, camera_views, profile_views,auth_views,test_product_views,product_views,landing_views,contact_views
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
urlpatterns = [

    #계정 로그인/회원가입 
    path('v1/register', auth_views.register, name='register'),
    path('v1/login', auth_views.login_user, name='login_user'),

    #랜딩 페이지
    path('v1/live_video',landing_views.live_video, name='landing_video'),
    path('v1/get_most_common_name', landing_views.get_most_common_name, name="get_most_common_name"),
    

    # 일반
    path('v1/', index_views.api_index, name='api_index'),
    # path('v1/', include('api.urls')), 

    # 카메라  views/camera_views 파일에 있는 함수 
    path('v1/camera_video_feed', camera_views.video_feed, name='camera_video_feed'),
    path('v1/camera_take_photo/<str:UUID>', camera_views.take_photo, name='camera_take_photo'),
    path('v1/analyze_image/<str:UUID>', camera_views.analyze_image, name='analyze_image'),
    path('v1/get_similarCeleb', camera_views.get_similarCeleb, name='get_similarCeleb'),
    
    
    
    
    # 원본이미지 저장 
    path('v1/orgIMG/<str:UUID>', camera_views.img_send, name='img_send'),

    
    # faiss 분석
    path('v1/face_analysis/<str:UUID>', camera_views.faiss_analysis, name="faiss_analysis"),


    #프로필뷰 
    path('v1/userdata/<str:UUID>', profile_views.handle_userdata, name='handle_userData'),
    path('v1/userdata/upload/<str:UUID>', profile_views.upload_image, name='upload_image'),
    path('v1/product', profile_views.api_product, name='api_product'),
    path('v1/recommend', profile_views.api_recommend, name='api_recommend'),

    #test_product
    path('v1/used_product',test_product_views.used_product,name='used_product'),
    path('v1/BG_result',test_product_views.BG_result,name='BG_result'),
    path('v1/get_all_users', test_product_views.get_all_users, name='get_all_users'),
    path('v1/other_models', test_product_views.other_models, name='other_models'),
    path('v1/asso_product', test_product_views.asso_product, name='asso_product'),
    path('v1/LC_result', test_product_views.LC_result, name='LC_result'),

    #검색
    path('v1/search', product_views.search, name='search_query'),

    #문의 
    path('v1/send_email', contact_views.send_email, name='send_email'),

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)