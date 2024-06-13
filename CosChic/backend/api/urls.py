
from django.urls import path,include
from .views import index_views, camera_views, profile_veiws, auth_views

urlpatterns = [

    #계정 로그인/회원가입 
    path('v1/register', auth_views.register, name='register'),

    # 일반
    path('v1/', index_views.api_index, name='api_index'),
    # path('v1/', include('api.urls')), 

    # 카메라  views/camera_views 파일에 있는 함수 
    path('v1/camera_video_feed', camera_views.video_feed, name='camera_video_feed'),
    path('v1/camera_take_photo', camera_views.take_photo, name='camera_take_photo'),

    #프로필뷰 
    path('v1/userdata', profile_veiws.api_userdata, name='api_userdata'),
    path('v1/product', profile_veiws.api_product, name='api_product'),
    path('v1/recommend', profile_veiws.api_recommend, name='api_recommend'),
]
