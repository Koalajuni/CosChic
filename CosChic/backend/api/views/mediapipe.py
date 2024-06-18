import cv2
import mediapipe as mp
import numpy as np

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
            landmarks = []
            for face_landmarks in results.multi_face_landmarks:
                for idx, landmark in enumerate(face_landmarks.landmark):
                    landmarks.append((landmark.x, landmark.y, landmark.z))
                    x = int(landmark.x * self.image.shape[1])
                    y = int(landmark.y * self.image.shape[0])
                    cv2.circle(self.image, (x, y), 4, (0, 255, 0), -1)  # 랜드마크를 초록색 점으로 표시
            # landmarks 리스트를 NumPy 배열로 변환합니다.
            landmarks_array = np.array(landmarks, dtype=np.float32)

            # 필요한 랜드마크 인덱스를 정의합니다.
            # 눈
            # left_eye = [133, 173, 157, 158, 159, 160, 161, 246, 33, 130, 7, 163, 144, 145, 153, 154, 155]
            # right_eye = [362, 382, 381, 380, 374, 373, 390, 249, 359, 263, 466, 388, 387, 386, 385, 384, 398]


            # # 코
            # nose_tip = [168, 245, 128, 114, 217, 198, 209, 49, 64, 98, 97, 2, 326, 327, 278, 360, 420, 399, 351]

            # # 입
            # top_lip = [61, 185, 40, 39, 37, 0, 267, 270]
            # bottom_lip = [146, 91, 181, 84, 17, 314, 405, 321]

            # # 눈썹
            # left_eyebrow = [336, 296, 334, 293, 276, 283, 282, 295, 285]
            # right_eyebrow = [107, 66, 105, 63, 70, 53, 52, 65, 66]

            # # 얼굴 윤곽
            # face_contour = [10, 338, 297, 332, 284, 251, 389, 356, 454, 323, 361, 288, 397, 365, 379, 378, 400,
            #     377, 152, 148, 176, 149, 150, 136, 172, 58, 132, 93, 234, 127, 162, 21, 54, 103, 67, 109, 10]

            # # print(landmarks_array)
            #         # cv2.putText(self.image, str(idx), (x, y), cv2.FONT_HERSHEY_SIMPLEX, 0.4, (0, 0, 0), 1)  # 랜드마크 번호 표시

            # 미간 비율 
            left_left_eye = landmarks_array[226, 0]
            left_right_eye = landmarks_array[133, 0]
            
            right_left_eye = landmarks_array[463, 0]
            right_right_eye = landmarks_array[263, 0]

            full_eye_distance = right_right_eye - left_left_eye
            between_eye_distance = right_left_eye - left_right_eye
            eye_ratio = round(abs((between_eye_distance / full_eye_distance) * 100), 2)

            # 코 비율 
            nose_top = landmarks_array[6, 1]
            nose_bottom = landmarks_array[1, 1]
            nose_right = landmarks_array[438, 0]
            nose_left = landmarks_array[166, 0]

            nose_height = nose_top - nose_bottom
            nose_width = nose_right - nose_left
            nose_ratio = round(abs((nose_width / nose_height) * 100), 2)

            # 입술비율 
            right_cheek = landmarks_array[367, 0]
            left_cheek = landmarks_array[138, 0]
            right_lip = landmarks_array[291, 0]
            left_lip = landmarks_array[61, 0]

            chin_width = right_cheek - left_cheek
            lip_width = right_lip - left_lip

            lip_ratio = round(abs((lip_width / chin_width) * 100), 2)

            # 얼굴 비율 
            right_face = landmarks_array[447, 0]
            left_face = landmarks_array[227, 0]
            top_face = landmarks_array[10, 1]
            bottom_face = landmarks_array[152, 1]

            face_width = right_face - left_face
            face_height = top_face - bottom_face

            face_ratio = round(abs((face_width / face_height) * 100), 2)

        return eye_ratio, nose_ratio, face_ratio, lip_ratio

    def save_image(self):
        # 이미지 저장
        cv2.imwrite(self.output_image_path, self.image)

    def process_image(self):
        eye_ratio, nose_ratio, face_ratio, lip_ratio = self.detect_and_draw_landmarks()
        self.save_image()
        return eye_ratio, nose_ratio, face_ratio, lip_ratio

# 사용 예제
#image_path = './dataset/news-p.v1.20230904.10764d99a04c4179b78e566767e218e7_P1.jpg'  # 얼굴 이미지 파일 경로 설정
#output_image_path = 'output_face.png'

#detector = FaceMeshDetector(image_path, output_image_path)
#detector.process_image()
