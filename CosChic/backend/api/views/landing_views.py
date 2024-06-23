from django.http import StreamingHttpResponse,JsonResponse
import cv2
import time
import mediapipe as mp
from collections import Counter
import threading
from api.views.faiss_class import CosChicFaiss

# Shared storage for the detected names
detected_names = []

def live_video(request):
    print("someone requested the video_feed")
    return StreamingHttpResponse(
        stream(),
        content_type='multipart/x-mixed-replace; boundary=frame')

def stream():
    global detected_names
    detected_names.clear()  # Clear previous detections
    predictorPath = "/model/dlib/shape_predictor_5_face_landmarks.dat"
    cap = cv2.VideoCapture(1)
    cap.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
    cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)

    start_time = time.time()
    end_time = start_time + 5

    mp_face_mesh = mp.solutions.face_mesh
    drawing_spec = mp.solutions.drawing_utils.DrawingSpec(thickness=1, circle_radius=1)
    model = CosChicFaiss()
    last_frame = None

    with mp_face_mesh.FaceMesh(
            static_image_mode=False,
            max_num_faces=1,
            min_detection_confidence=0.5) as face_mesh:

        frame_count = 0
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

            frame_count += 1
            if frame_count % 3 != 0:
                continue

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
        faceName = model.landingpage_detect_faces(last_frame,
                                                  r'./pretrained/CosChic_labels.npy',
                                                  r'./pretrained/CosChic_model.bin')
        detected_names.append(faceName)

def get_most_common_name(request):
    global detected_names
    most_common_name = Counter(detected_names).most_common(1)[0][0] if detected_names else "unknown"
    print("most_common_name", most_common_name)
    return JsonResponse({"most_common_name": most_common_name})