import cv2
import mediapipe as mp

class FaceMeshDetector:
    def __init__(self, url, output_image_path):
        self.image_path = url
        self.output_image_path = output_image_path

        # MediaPipe FaceMesh 초기화
        self.mp_face_mesh = mp.solutions.face_mesh
        self.face_mesh = self.mp_face_mesh.FaceMesh()

        # OpenCV 이미지 불러오기
        self.image = cv2.imread(self.image_path)
        self.image = cv2.resize(self.image, None, fx=2, fy=2, interpolation=cv2.INTER_LINEAR)  # 이미지를 2배로 확대
        self.image_rgb = cv2.cvtColor(self.image, cv2.COLOR_BGR2RGB)

    def detect_and_draw_landmarks(self):
        # 얼굴 특성 추출
        results = self.face_mesh.process(self.image_rgb)

        # 랜드마크 그리기 및 번호 표시
        if results.multi_face_landmarks:
            for face_landmarks in results.multi_face_landmarks:
                for idx, landmark in enumerate(face_landmarks.landmark):
                    x = int(landmark.x * self.image.shape[1])
                    y = int(landmark.y * self.image.shape[0])
                    cv2.circle(self.image, (x, y), 4, (0, 255, 0), -1)  # 랜드마크를 초록색 점으로 표시
                    # cv2.putText(self.image, str(idx), (x, y), cv2.FONT_HERSHEY_SIMPLEX, 0.4, (0, 0, 0), 1)  # 랜드마크 번호 표시

    def save_image(self):
        # 이미지 저장
        cv2.imwrite(self.output_image_path, self.image)

    def process_image(self):
        self.detect_and_draw_landmarks()
        self.save_image()

# 사용 예제
#image_path = './dataset/news-p.v1.20230904.10764d99a04c4179b78e566767e218e7_P1.jpg'  # 얼굴 이미지 파일 경로 설정
#output_image_path = 'output_face.png'

#detector = FaceMeshDetector(image_path, output_image_path)
#detector.process_image()
