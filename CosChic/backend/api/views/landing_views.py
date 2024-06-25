from django.http import StreamingHttpResponse, JsonResponse
import cv2
import time
import mediapipe as mp
from collections import Counter
from api.views.faiss_class import CosChicFaiss

# Shared storage for the detected names
detected_names = []
stream_ended = False
analyzed_name = None

def live_video(request):
    global stream_ended, analyzed_name
    stream_ended = False
    analyzed_name = None
    print("Someone requested the video_feed")
    return StreamingHttpResponse(
        stream(),
        content_type='multipart/x-mixed-replace; boundary=frame')

def stream():
    global detected_names, stream_ended, analyzed_name
    detected_names.clear()  # Clear previous detections
    cap = cv2.VideoCapture(0)  # Use 0 for default camera
    cap.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
    cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)

    start_time = time.time()
    stream_duration = 5  # Stream for 5 seconds

    mp_face_mesh = mp.solutions.face_mesh
    drawing_spec = mp.solutions.drawing_utils.DrawingSpec(thickness=1, circle_radius=1)

    with mp_face_mesh.FaceMesh(
            static_image_mode=False,
            max_num_faces=1,
            min_detection_confidence=0.5) as face_mesh:

        while cap.isOpened():
            ret, frame = cap.read()
            if not ret:
                print("Can't find the camera")
                break

            frame = cv2.flip(frame, 1)

            elapsed_time = time.time() - start_time
            if elapsed_time > stream_duration:
                break

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

    # Call analysis function after stream ends
    analyze_frame(frame)
    stream_ended = True

def analyze_frame(frame):
    global analyzed_name
    model = CosChicFaiss()
    faceName = model.landingpage_detect_faces(frame,
                                              r'./pretrained/CosChic_labels.npy',
                                              r'./pretrained/CosChic_model.bin')
    analyzed_name = faceName
    print(f"Analyzed name: {analyzed_name}")

def get_most_common_name(request):
    global stream_ended, analyzed_name
    if not stream_ended:
        return JsonResponse({"status": "processing", "message": "Video stream is still in progress"})

    if analyzed_name:
        return JsonResponse({"status": "success", "most_common_name": analyzed_name})
    else:
        return JsonResponse({"status": "error", "message": "No face detected or analysis failed"})
