from unittest import result
from django.http import HttpResponse, JsonResponse, StreamingHttpResponse
from django.shortcuts import render, redirect
# 나중에 클라이언트에서 데이터가 들어올 떄, POST의 원하는 함수를 허용
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import FileSystemStorage  # 장고 파일 처리
import cv2, time
import datetime
import os 
from api.models import UserData, Product, Recommend
from .mediapipe_class import FaceMeshDetector
from .faiss_class import CosChicFaiss
import mediapipe as mp
from collections import Counter


def live_video(request):
    print("someone requested the video_feed")
    return StreamingHttpResponse(
        stream(),
        content_type='multipart/x-mixed-replace; boundary=frame')

def stream():
    predictorPath = "/model/dlib/shape_predictor_5_face_landmarks.dat"

    cap = cv2.VideoCapture(1)
    cap.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
    cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)

    start_time = time.time()
    end_time = start_time + 5 

    last_frame = None


    mp_face_mesh = mp.solutions.face_mesh
    drawing_spec = mp.solutions.drawing_utils.DrawingSpec(thickness=1, circle_radius=1)
    model = CosChicFaiss()
    detected_names = []

    with mp_face_mesh.FaceMesh(
            static_image_mode=False,
            max_num_faces=1,
            min_detection_confidence=0.5) as face_mesh:

        frame_count = 0
        start_time = time.time()
        while cap.isOpened():
            ret, frame = cap.read()
            frame = cv2.flip(frame, 1)
            if not ret:
                print("Can't find the camera")
                break

            last_frame = frame.copy()

            elapsed_time = time.time() - start_time
            if elapsed_time > 5:
                break

            # 이름이랑 얼굴이 동시에 나오기 때문에 성능을 높이기 위해
            frame_count += 1
            if frame_count % 3 != 0:  # 매 3 Frame 마다 예측
                continue

            # Faiss 분석
            # faceName = model.landingpage_detect_faces(frame,
            # r'./pretrained/CosChic_labels.npy',  # pre-train 모델경로 맞게 수정 
            # r'./pretrained/CosChic_model.bin')
            # detected_names.append(faceName)
            # cv2.putText(frame, faceName, (50,50), cv2.FONT_HERSHEY_SIMPLEX, fontScale = 1, color = (255,111,145), thickness = 2, lineType = cv2.LINE_AA)

            rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            result = face_mesh.process(rgb_frame)

            if result.multi_face_landmarks:
                for face_landmarks in result.multi_face_landmarks:
                    mp.solutions.drawing_utils.draw_landmarks(
                        image=frame,
                        landmark_list=face_landmarks,
                        connections=mp_face_mesh.FACEMESH_TESSELATION,
                        landmark_drawing_spec=drawing_spec,
                        connection_drawing_spec=drawing_spec)

            image_bytes = cv2.imencode('.jpg', frame)[1].tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + image_bytes + b'\r\n')

    cap.release()
    cv2.destroyAllWindows()

    if last_frame is not None:
            # Perform Faiss analysis on the last frame
            faceName = model.landingpage_detect_faces(last_frame,
            r'./pretrained/CosChic_labels.npy',
            r'./pretrained/CosChic_model.bin')
            # detected_names.append(faceName)

            # # Return the most common detected name
            # most_common_name = Counter(detected_names).most_common(1)[0][0] if detected_names else "unknown"
            # print("most_common_name",most_common_name)
    #         yield JsonResponse({"most_common_name": faceName})
    # else:
    #     yield JsonResponse({"most_common_name": "unknown"})

            return JsonResponse({"most_common_name": faceName})