from unittest import result
from django.http import HttpResponse, JsonResponse, StreamingHttpResponse
from django.shortcuts import render, redirect
# 나중에 클라이언트에서 데이터가 들어올 떄, POST의 원하는 함수를 허용
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import FileSystemStorage  # 장고 파일 처리
import cv2
import datetime
import os 
from api.models import UserData, Product, Recommend
from .mediapipe_class import FaceMeshDetector
from .faiss_class import CosChicFaiss
from django.core.files.base import ContentFile
import base64


global eye_ratio
global eyebrow_ratio
global nose_ratio
global face_ratio
global lip_ratio
global full_eyesize_ratio
global full_tail_eye_ratio
global top_lip_ratio
global bottom_lip_ratio
global right_symmetry_ratio
global left_symmetry_ratio
global face_nose_height_ratio
global face_nose_width_ratio

eye_ratio = 0
eyebrow_ratio = 0
nose_ratio = 0
face_ratio = 0
lip_ratio = 0
full_eyesize_ratio = 0
full_tail_eye_ratio = 0
top_lip_ratio = 0
bottom_lip_ratio = 0
right_symmetry_ratio = 0
left_symmetry_ratio = 0
face_nose_height_ratio = 0
face_nose_width_ratio = 0


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
    url = f'http://211.216.177.2:18000/media/org_img/' + orgImg + ".jpg"
    return url


def video_feed(request):
    print("someone requested the video_feed")
    return StreamingHttpResponse(
        stream(),
        content_type='multipart/x-mixed-replace; boundary=frame')


def stream():

    cap = cv2.VideoCapture(1)
    
    while True:
        ret, frame = cap.read()
        frame = cv2.flip(frame,1)
        if not ret:
            print("cant find the camera")
            break


        image_bytes = cv2.imencode('.jpg', frame)[1].tobytes()
        yield (b'--frame\r\n'
               b'Content-type:image/jpeg\r\n\r\n' + image_bytes + b'\r\n')

    cap.release()
    cv2.destroyAllWindows()

@csrf_exempt
def take_photo(request, UUID):
    global eye_ratio, eyebrow_ratio, nose_ratio, lip_ratio, face_ratio, full_eyesize_ratio, \
            full_tail_eye_ratio, top_lip_ratio, bottom_lip_ratio, right_symmetry_ratio, left_symmetry_ratio, \
                face_nose_height_ratio, face_nose_width_ratio  # 전역 변수 선언
    if request.method == 'POST':
        print("someone requested the take_photo")
        # POST 요청으로부터 UUID 가져오기
        uuid = UUID
        print(f"uuid 받음 : {uuid}" )
        
        cap = cv2.VideoCapture(0)
        ret, frame = cap.read()
        frame = cv2.flip(frame, 1) # 좌우반전
        if not ret:
            return JsonResponse({'error' : '사진 찍는데 실패했습니다.'}, status = 500)
        imagePath = f'./media/org_img/{nowString}.jpg'
        cv2.imwrite(imagePath, frame) #카메라 영상 저장
        cap.release()
        cv2.destroyAllWindows()
        url = api_sendimage(nowString)
        # 이미지를 db에 저장
        # 유저 객체 가져오기
        try:
            user = UserData.objects.get(UUID=uuid)
        except UserData.DoesNotExist:
            return JsonResponse({'error': '해당 UUID를 가진 유저가 없습니다.'}, status=404)
        
        # 유저 객체의 org_image 필드 업데이트
        user.orgImage = imagePath  
        user.save()
        output_image = f'./media/mediapipe/output_{nowString}.jpg' 
        # FaceMeshDetector로 이미지 처리
        detector = FaceMeshDetector(imagePath, output_image)
        eye_ratio, eyebrow_ratio, nose_ratio, lip_ratio, face_ratio, full_eyesize_ratio, \
            full_tail_eye_ratio, top_lip_ratio, bottom_lip_ratio, right_symmetry_ratio, left_symmetry_ratio, \
                face_nose_height_ratio, face_nose_width_ratio = detector.process_image()
        print("얼굴분석정보:", eye_ratio, eyebrow_ratio, nose_ratio, lip_ratio, face_ratio, full_eyesize_ratio, \
            full_tail_eye_ratio, top_lip_ratio, bottom_lip_ratio, right_symmetry_ratio, left_symmetry_ratio, \
                face_nose_height_ratio, face_nose_width_ratio)
        output_image_path = f'http://211.216.177.2:18000/media/mediapipe/output_{nowString}.jpg' 
        # JSON 응답에 output_image_path 포함
        return JsonResponse({"message": "Image processed successfully", 'imagePath': imagePath, "output_image_path": output_image_path}, status=200)
        
    

        


@csrf_exempt
def img_send(request, UUID):
    global eye_ratio, eyebrow_ratio, nose_ratio, lip_ratio, face_ratio, full_eyesize_ratio, \
            full_tail_eye_ratio, top_lip_ratio, bottom_lip_ratio, right_symmetry_ratio, left_symmetry_ratio, \
                face_nose_height_ratio, face_nose_width_ratio  # 전역 변수 선언
    try:
        if request.method == 'POST':
            print('Request method:', request.method)
            print('FILES:', request.FILES)
            orgImage = request.FILES.get('orgImage')
            uuid = UUID
            print(f"uuid 받음 : {uuid}" )
            if orgImage:
                # Save the uploaded image to the media directory
                url = f'./media/org_img/{nowString}.jpg'
                with open(url, 'wb+') as destination:
                    for chunk in orgImage.chunks():
                        destination.write(chunk)

                # 이미지를 db에 저장
                # 유저 객체 가져오기
                try:
                    user = UserData.objects.get(UUID=uuid)
                except UserData.DoesNotExist:
                    return JsonResponse({'error': '해당 UUID를 가진 유저가 없습니다.'}, status=404)
                
                # 유저 객체의 org_image 필드 업데이트
                user.orgImage = url  
                user.save()

                output_image = f'./media/mediapipe/output_{nowString}.jpg' 
            
                # FaceMeshDetector로 이미지 처리
                detector = FaceMeshDetector(url, output_image)
                eye_ratio, eyebrow_ratio, nose_ratio, lip_ratio, face_ratio, full_eyesize_ratio, \
                full_tail_eye_ratio, top_lip_ratio, bottom_lip_ratio, right_symmetry_ratio, left_symmetry_ratio, \
                face_nose_height_ratio, face_nose_width_ratio = detector.process_image()
                # print("얼굴분석정보(eye_ratio, nose_ratio, face_ratio, lip_ratio):", eye_ratio, nose_ratio, face_ratio, lip_ratio)
                output_image_path = f'http://211.216.177.2:18000/media/mediapipe/output_{nowString}.jpg' 
                # JSON 응답에 output_image_path 포함
                return JsonResponse({"message": "Image processed successfully", "output_image_path": output_image_path}, status=201)
            else:
                return JsonResponse({"error": "No image uploaded"}, status=400)
        
        return JsonResponse({"error": "Invalid request method"}, status=405)
        
    except Exception as e:
        print(f"Error processing request: {e}")
    return JsonResponse({"error": str(e)}, status=500)


@csrf_exempt
def faiss_analysis(request, UUID):
    global eye_ratio, eyebrow_ratio, nose_ratio, lip_ratio, face_ratio, full_eyesize_ratio, \
            full_tail_eye_ratio, top_lip_ratio, bottom_lip_ratio, right_symmetry_ratio, left_symmetry_ratio, \
                face_nose_height_ratio, face_nose_width_ratio  # 전역 변수 선언
    if request.method == 'GET':
        print("request faiss analysis")
        uuid = UUID
        print(f"uuid 받음 : {uuid}" )

        # 유저 사진 가져오기
        # 유저 객체 가져오기
        try:
            user = UserData.objects.get(UUID=uuid)
        except UserData.DoesNotExist:
            return JsonResponse({'error': '해당 UUID를 가진 유저가 없습니다.'}, status=404)
        
        userImage = user.orgImage
        print(userImage)
        
        # faiss 분석
        model = CosChicFaiss()
        faceList = model.detect_faces(userImage,
                        r'./pretrained/CosChic_labels.npy',  # pre-train 모델경로 맞게 수정 
                        r'./pretrained/CosChic_model.bin')
        # 중복제거 
        faceList = set(faceList)
        faceList = list(faceList)
        # print(faceList)
        
        modelNum = len(faceList)
        allmodelNames = ','.join(f'{element}' for element in faceList)
        print("allmodelNames: ", allmodelNames)

        jsonData = {}
        # jsonData["model_num"] = len(faceList)
        for i in range(len(faceList)):
            # 파일이 들어있는 폴더 경로
            modelFolderPath = f'./media/model_img/{faceList[i]}'

            # 모델의 첫번째 사진
            images = os.listdir(modelFolderPath)
            firstImage = images[0]
            # print(firstImage)
            modelPhotoUrl = f'http://211.216.177.2:18000/media/model_img/{faceList[i]}/{firstImage}' 

            # print(modelFolderPath +"/"+ firstImage)
            # 모델사진 FaceMeshDetector로 이미지 처리
            output_image = f'./media/mediapipe/output_{nowString}.jpg' 
            detector = FaceMeshDetector(modelFolderPath +"/"+ firstImage, output_image)
            model_eye_ratio, model_eyebrow_ratio, model_nose_ratio, model_lip_ratio, model_face_ratio, model_full_eyesize_ratio, \
            model_full_tail_eye_ratio, model_top_lip_ratio, model_bottom_lip_ratio, model_right_symmetry_ratio, model_left_symmetry_ratio, \
                model_face_nose_height_ratio, model_face_nose_width_ratio = detector.process_image()
            # print("모델의얼굴분석정보(eye_ratio, nose_ratio, face_ratio, lip_ratio):", model_eye_ratio, model_nose_ratio, model_face_ratio, model_lip_ratio)
            

            lipsSimilarity = abs(100 - (abs(lip_ratio - model_lip_ratio)* 5))
            eyeSimilarity = abs(100 - (abs(eye_ratio - model_eye_ratio) * 20))
            noseSimilarity = abs(100 - (abs(nose_ratio - model_nose_ratio)))
            contourSimilarity = abs(100 - (abs(face_ratio - model_face_ratio)))
            eyebrowSimilarity = abs(100 - (abs(eyebrow_ratio - model_eyebrow_ratio)*20))
            final_similarity = (lipsSimilarity + eyeSimilarity + eyebrowSimilarity + contourSimilarity + noseSimilarity) / 5
            # 아래 유사도 수치 mediapipe로 계산해서 수정하면 됩니다.
            data = {
                "modelName" : faceList[i],
                "lips" : round(lipsSimilarity, 1),
                "eyes" : round(eyeSimilarity, 1),
                "eyebrow" : round(eyebrowSimilarity, 1),
                "nose" : round(noseSimilarity, 1),
                "contour" : round(contourSimilarity, 1),
                "similarity" : round(final_similarity, 1),
                "product" : "product",
                "photoUrl" : modelPhotoUrl,
                "modelNum" : modelNum,
                "allModelNames" : allmodelNames, 

                "userFullEyesizeRatio" : full_eyesize_ratio,
                "userFullTailEyeRatio" : full_tail_eye_ratio,
                "userTopLipRatio" : top_lip_ratio,
                "userBottomLipRatio" : bottom_lip_ratio,
                "userRightSymmetryRatio" : right_symmetry_ratio,
                "userLeftSymmertyRatio" : left_symmetry_ratio,
                "userFaceNoseHeightRatio" : face_nose_height_ratio,
                "userFaceNoseWidthRatio" : face_nose_width_ratio,

                "modelFullEyesizeRatio" : model_full_eyesize_ratio,
                "modelFullTailEyeRatio" : model_full_tail_eye_ratio,
                "modelTopLipRatio" : model_top_lip_ratio,
                "modelBottomLipRatio" : model_bottom_lip_ratio,
                "modelRightSymmetryRatio" : model_right_symmetry_ratio,
                "modelLeftSymmertyRatio" : model_left_symmetry_ratio,
                "modelFaceNoseHeightRatio" : model_face_nose_height_ratio,
                "modelFaceNoseWidthRatio" : model_face_nose_width_ratio
            }
            jsonData[f"model_{i+1}"] = data
        print(jsonData)


        return JsonResponse(jsonData, status=202)
    
@csrf_exempt
def analyze_image(request, UUID):
    global eye_ratio, eyebrow_ratio, nose_ratio, lip_ratio, face_ratio, full_eyesize_ratio, \
            full_tail_eye_ratio, top_lip_ratio, bottom_lip_ratio, right_symmetry_ratio, left_symmetry_ratio, \
                face_nose_height_ratio, face_nose_width_ratio  # Global variable declaration

    try:
        if request.method == 'POST':
            print('Request method:', request.method)
            uuid = UUID
            print(f"uuid 받음 : {uuid}")
            image_data = request.POST.get('image')
            
            if image_data:
                # Generate timestamp
                now = datetime.datetime.now()
                nowString = now.strftime('%Y-%m-%d %H_%M_%S')

                # Convert base64 image to file
                format, imgstr = image_data.split(';base64,')
                ext = format.split('/')[-1]
                image_file = ContentFile(base64.b64decode(imgstr), name=f'image.{ext}')
                
                # Save the uploaded image to the media directory
                url = f'./media/org_img/{nowString}.jpg'
                with open(url, 'wb+') as destination:
                    destination.write(image_file.read())

                # Save image to db
                try:
                    user = UserData.objects.get(UUID=uuid)
                except UserData.DoesNotExist:
                    return JsonResponse({'error': '해당 UUID를 가진 유저가 없습니다.'}, status=404)
                
                # Update user's org_image field
                user.orgImage = url  
                user.save()

                output_image = f'./media/mediapipe/output_{nowString}.jpg' 
            
                # Process image with FaceMeshDetector
                detector = FaceMeshDetector(url, output_image)
                eye_ratio, eyebrow_ratio, nose_ratio, lip_ratio, face_ratio, full_eyesize_ratio, \
                full_tail_eye_ratio, top_lip_ratio, bottom_lip_ratio, right_symmetry_ratio, left_symmetry_ratio, \
                face_nose_height_ratio, face_nose_width_ratio = detector.process_image()

                output_image_path = f'http://211.216.177.2:18000/media/mediapipe/output_{nowString}.jpg' 
                
                # Include output_image_path in JSON response
                return JsonResponse({
                    "message": "Image processed successfully", 
                    "output_image_path": output_image_path,
                    "analysis_results": {
                        "eye_ratio": eye_ratio,
                        "eyebrow_ratio": eyebrow_ratio,
                        "nose_ratio": nose_ratio,
                        "lip_ratio": lip_ratio,
                        "face_ratio": face_ratio,
                        "full_eyesize_ratio": full_eyesize_ratio,
                        "full_tail_eye_ratio": full_tail_eye_ratio,
                        "top_lip_ratio": top_lip_ratio,
                        "bottom_lip_ratio": bottom_lip_ratio,
                        "right_symmetry_ratio": right_symmetry_ratio,
                        "left_symmetry_ratio": left_symmetry_ratio,
                        "face_nose_height_ratio": face_nose_height_ratio,
                        "face_nose_width_ratio": face_nose_width_ratio
                    }
                }, status=200)
            else:
                return JsonResponse({"error": "No image data received"}, status=400)
        
        return JsonResponse({"error": "Invalid request method"}, status=405)
        
    except Exception as e:
        print(f"Error processing request: {e}")
        return JsonResponse({"error": str(e)}, status=500)
    

@csrf_exempt
def get_similarCeleb(request):
    global eye_ratio, eyebrow_ratio, nose_ratio, lip_ratio, face_ratio, full_eyesize_ratio, \
            full_tail_eye_ratio, top_lip_ratio, bottom_lip_ratio, right_symmetry_ratio, left_symmetry_ratio, \
                face_nose_height_ratio, face_nose_width_ratio  # 전역 변수 선언
    if request.method == 'POST':
        
        image_data = request.POST.get('image')
            
        if image_data:
            # Generate timestamp
            now = datetime.datetime.now()
            nowString = now.strftime('%Y-%m-%d %H_%M_%S')

            # Convert base64 image to file
            format, imgstr = image_data.split(';base64,')
            ext = format.split('/')[-1]
            image_file = ContentFile(base64.b64decode(imgstr), name=f'image.{ext}')
            
            # Save the uploaded image to the media directory
            url = f'./media/org_img/{nowString}.jpg'
            with open(url, 'wb+') as destination:
                destination.write(image_file.read())

            output_image = f'./media/mediapipe/output_{nowString}.jpg' 
        
            # Process image with FaceMeshDetector
            detector = FaceMeshDetector(url, output_image)
            eye_ratio, eyebrow_ratio, nose_ratio, lip_ratio, face_ratio, full_eyesize_ratio, \
            full_tail_eye_ratio, top_lip_ratio, bottom_lip_ratio, right_symmetry_ratio, left_symmetry_ratio, \
            face_nose_height_ratio, face_nose_width_ratio = detector.process_image()

            output_image_path = f'http://211.216.177.2:18000/media/mediapipe/output_{nowString}.jpg' 
            
            # lipsSimilarity = abs(100 - (abs(lip_ratio - model_lip_ratio)* 5))
            # eyeSimilarity = abs(100 - (abs(eye_ratio - model_eye_ratio) * 20))
            # noseSimilarity = abs(100 - (abs(nose_ratio - model_nose_ratio)))
            # contourSimilarity = abs(100 - (abs(face_ratio - model_face_ratio)))
            # eyebrowSimilarity = abs(100 - (abs(eyebrow_ratio - model_eyebrow_ratio)*20))
            # final_similarity = (lipsSimilarity + eyeSimilarity + eyebrowSimilarity + contourSimilarity + noseSimilarity) / 5
            final_similarity = (eye_ratio + nose_ratio + lip_ratio + face_ratio + eyebrow_ratio) / 5

        
        
        print("request faiss analysis")
        # 유저 사진 가져오기
        # 유저 객체 가져오기
        userImage = url
        print(userImage)
        
        # faiss 분석
        model = CosChicFaiss()
        similarFace = model.landingpage_detect_faces(userImage,
                        r'./pretrained/Similarlabels.npy',  # pre-train 모델경로 맞게 수정 
                        r'./pretrained/SimilarFace_20240702.bin')
        
        base_url ="http://211.216.177.2:18000/media/similarCeleb"

        similarFaceDir = os.path.join("./media/similarCeleb", similarFace)
        try:
            files = os.listdir(similarFaceDir)
            if files:
                celebrityImage = f"{base_url}/{similarFace}/{files[0]}"
            else:
                celebrityImage = output_image_path
        except FileNotFoundError:
            celebrityImage = output_image_path

        print("similarFace:", similarFace)
        jsonData ={"most_similar_celebrity":similarFace,"celebrity_image":celebrityImage, "user_image":output_image_path, "similarity_score":final_similarity}
        return JsonResponse(jsonData, status=202)