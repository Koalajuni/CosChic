from unittest import result
from django.http import HttpResponse, JsonResponse, StreamingHttpResponse
from django.shortcuts import render, redirect
# 나중에 클라이언트에서 데이터가 들어올 떄, POST의 원하는 함수를 허용
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import FileSystemStorage  # 장고 파일 처리
import cv2
import datetime

now = datetime.datetime.now()
nowString = now.strftime('%Y-%m-%d %H_%M_%S')

@csrf_exempt
def api_sendimage(fileName):
    orgImg = fileName

    print("send image")

    fs = FileSystemStorage(
        location=f'media/org_img',
        base_url=f'media/org_img'
    )
    url = f'http://localhost:8000/media/org_img/' + orgImg + ".jpg"
    return url


def video_feed(request):
    print("someone requested the video_feed")
    return StreamingHttpResponse(
        stream(),
        content_type='multipart/x-mixed-replace; boundary=frame')


def stream():

    cap = cv2.VideoCapture(0)
    
    while True:
        ret, frame = cap.read()
        frame = cv2.flip(frame,1)
        if not ret:
            print("cant find the camera")
            break

        ######### 인공지능 돌아가는 부분 #############

        # todo: Dlib, Faiss 코드 돌아가는 곳

        ##########################################

        image_bytes = cv2.imencode('.jpg', frame)[1].tobytes()
        yield (b'--frame\r\n'
               b'Content-type:image/jpeg\r\n\r\n' + image_bytes + b'\r\n')

    cap.release()
    cv2.destroyAllWindows()

@csrf_exempt
def take_photo(request):
    if request.method == 'POST':
        print("someone requested the take_photo")
        cap = cv2.VideoCapture(0)
        ret, frame = cap.read()
        frame = cv2.flip(frame, 1) # 좌우반전
        if not ret:
            return JsonResponse({'error' : '사진 찍는데 실패했습니다.'}, status = 500)
        imagePath = f'./media/org_img/{nowString}.jpg'
        cv2.imwrite(imagePath, frame) #카메라 영상 저장
        
        cap.release()
        cv2.destroyAllWindows()
<<<<<<< HEAD
        url = api_sendimage(nowString)
        
        return JsonResponse({'message': '사진이 정상적으로 저장되었습니다.', 'imagePath': imagePath, "url" : url})
=======
>>>>>>> 047e09328a5a851d1c49e1842dbdc852c9fafaab

    

@csrf_exempt
def img_send(request):
    if request.method == 'POST':
        print('Request method:', request.method)
        print('FILES:', request.FILES)
        orgImage = request.FILES.get('orgImage')

        if orgImage:
            # Save the uploaded image to the media directory
            file_path = f'./media/org_img/{nowString}.jpg'
            with open(file_path, 'wb+') as destination:
                for chunk in orgImage.chunks():
                    destination.write(chunk)

            url = f'http://localhost:8000/media/org_img/{nowString}.jpg'

<<<<<<< HEAD
            # db 에 사진 저장 

            # 미디어 파이프 처리 -> url2 

            # 출력되는건 url2 로 출력 


            return JsonResponse({"message": "Image uploaded successfully", "url": url}, status=201)
=======
            return JsonResponse({"message": "Image uploaded successfully", "file_path": file_path}, status=201)
>>>>>>> 047e09328a5a851d1c49e1842dbdc852c9fafaab
        else:
            return JsonResponse({"error": "No image uploaded"}, status=400)
    
    return JsonResponse({"error": "Invalid request method"}, status=405)
