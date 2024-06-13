
from django.urls import path,include
from .views import index_views, camera_views, profile_veiws, orgImg_views

urlpatterns = [
    # 일반
    path('v1/', index_views.api_index, name='api_index'),
    # path('v1/', include('api.urls')), 

    # 카메라  views/camera_views 파일에 있는 함수 
    path('v1/camera_video_feed', camera_views.video_feed, name='camera_video_feed'),
    # 원본이미지 저장 
    path('v1/orgIMG/', orgImg_views.img_send, name='img_send'),

    #프로필뷰 
    path('v1/userdata', profile_veiws.api_userdata, name='api_userdata'),
    path('v1/product', profile_veiws.api_product, name='api_product'),
    path('v1/recommend', profile_veiws.api_recommend, name='api_recommend'),
]
