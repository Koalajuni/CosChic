from unittest import result
from django.http import HttpResponse, JsonResponse, StreamingHttpResponse
from django.shortcuts import render, redirect
# 나중에 클라이언트에서 데이터가 들어올 떄, POST의 원하는 함수를 허용
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import FileSystemStorage  # 장고 파일 처리
import cv2


def api_index(request):
    return HttpResponse("ChicBytes API v1.0")


@csrf_exempt
def api_sendimage(request):
    origImg = ''
    refImge = './media/ref'
    print("someone Sent a post api")
    if request.method != 'POST':
        return HttpResponse(f"잘못된 정보입니다: {request.method}")

    refId = request.POST.get('refId', '')

    fs = FileSystemStorage(
        location=f'media/source',
        base_url=f'media/source'
    )

    # 파일 받아오기
    try:
        myImage = request.FILES['myImage']
        # print("파일이름:", myImage.name)
        # 파일 저장
        saveFile = fs.save(myImage.name, myImage)
        # print(saveFile)
        origImg = './media/source' + saveFile
    except:
        print("error")

    resultImage = makeup(origImg, refImge)
    print("생성된 결과:", resultImage)

    sendOrg = "http://localhost:8000" + \
        origImg.split('.')[1] + "." + origImg.split('.')[2]
    sendRef = "http://localhost:8000" + \
        refImge.split('.')[1] + "." + refImge.split('.')[2]
    sendResult = "http://localhost:8000" + \
        resultImage.split('.')[1] + "." + resultImage.split('.')[2]

    url = f'http://localhost:11000/result?org={sendOrg}&ref{sendRef}&rst={sendResult}'

    return redirect(url)


def video_feed(request):
    print("someone requested the video_feed")
    return StreamingHttpResponse(
        stream(),
        content_type='multipart/x-mixed-replace; boundary=frame')


def stream():
    # predictorPath = "web/shape_predictor_68_face_landmarks.dat"

    # faceDetect = FaceDetector(
    #     detectorPath="", predictorpath=predictorPath)

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
