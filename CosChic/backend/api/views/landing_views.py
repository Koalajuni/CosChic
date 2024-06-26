

from django.http import StreamingHttpResponse, JsonResponse
import cv2,os
import time, uuid
import mediapipe as mp
from collections import defaultdict
from api.views.faiss_class import CosChicFaiss
import threading

# Shared storage for the detected names
session_data = defaultdict(lambda: {
    "detected_names": [],
    "stream_ended": False,
    "analyzed_name": None
})

mp_face_mesh = mp.solutions.face_mesh
drawing_spec = mp.solutions.drawing_utils.DrawingSpec(thickness=1, circle_radius=1)

def live_video(request):
    session_id = request.GET.get('session_id')
    if not session_id:
        session_id = str(uuid.uuid4())

    return StreamingHttpResponse(
        stream_with_face_mesh(session_id),
        content_type='multipart/x-mixed-replace; boundary=frame'
    )

def stream_with_face_mesh(session_id):
    cap = cv2.VideoCapture(1)
    start_time = time.time()
    duration = 5  # 5 seconds of streaming

    with mp_face_mesh.FaceMesh(
            static_image_mode=False,
            max_num_faces=1,
            min_detection_confidence=0.5) as face_mesh:

        while cap.isOpened():
            ret, frame = cap.read()
            if not ret:
                break

            # Flip the frame horizontally for a later selfie-view display
            frame = cv2.flip(frame, 1)
            
            # Convert the BGR image to RGB
            rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            
            # Process the frame with MediaPipe Face Mesh
            results = face_mesh.process(rgb_frame)

            if results.multi_face_landmarks:
                for face_landmarks in results.multi_face_landmarks:
                    mp.solutions.drawing_utils.draw_landmarks(
                        image=frame,
                        landmark_list=face_landmarks,
                        connections=mp_face_mesh.FACEMESH_TESSELATION,
                        landmark_drawing_spec=drawing_spec,
                        connection_drawing_spec=drawing_spec)

            # Encode the frame in JPEG format
            _, buffer = cv2.imencode('.jpg', frame)
            frame_bytes = buffer.tobytes()
            
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')

            if time.time() - start_time > duration:
                break

    cap.release()

    # Save the last frame
    os.makedirs(f'./media/result/{session_id}', exist_ok=True)
    frame_path = f'./media/result/{session_id}/captured_frame.jpg'
    cv2.imwrite(frame_path, frame)

    # Return a response to signal the end of the stream
    yield (b'--frame\r\n'
           b'Content-Type: application/json\r\n\r\n' + 
           JsonResponse({"status": "complete", "session_id": session_id}).content + b'\r\n')

def analyze_frame(frame_path, session_id):
    global session_data
    try:
        print(f"Starting analysis for session {session_id}")
        model = CosChicFaiss()
        faceName = model.landingpage_detect_faces(frame_path,
                                                session_id,
                                                r'./pretrained/CosChic_labels.npy',
                                                r'./pretrained/CosChic_model.bin')
        session_data[session_id]["analyzed_name"] = faceName
        print(f"Analysis completed for session {session_id}. Result: {faceName}")
    except Exception as e:
        print(f"Error in analyze_frame: {str(e)}")
        session_data[session_id]["analyzed_name"] = "Error in analysis"
    finally:
        session_data[session_id]["stream_ended"] = True


def get_most_common_name(request):
    session_id = request.GET.get('session_id')
    if not session_id:
        return JsonResponse({"status": "error", "message": "Session ID is required"}, status=400)

    frame_path = f'./media/result/{session_id}/captured_frame.jpg'
    if not os.path.exists(frame_path):
        return JsonResponse({"status": "error", "message": "No captured image found"}, status=404)

    try:
        model = CosChicFaiss()
        faceName = model.landingpage_detect_faces(frame_path,
                                                  session_id,
                                                  r'./pretrained/CosChic_labels.npy',
                                                  r'./pretrained/CosChic_model.bin')
        
        return JsonResponse({"status": "success", "most_common_name": faceName})
    except Exception as e:
        print(f"Error in analysis: {str(e)}")
        return JsonResponse({"status": "error", "message": "Analysis failed"}, status=500)