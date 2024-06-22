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
                    # cv2.putText(self.image, str(idx), (x, y), cv2.FONT_HERSHEY_SIMPLEX, 0.4, (0, 0, 0), 1)  # 랜드마크 번호 표시
            # landmarks 리스트를 NumPy 배열로 변환합니다.
            landmarks_array = np.array(landmarks, dtype=np.float32)


            # 미간 비율 
            left_left_eye = landmarks_array[226, 0]
            # print("left_left_eye: ", left_left_eye)
            left_right_eye = landmarks_array[133, 0]
            # print("left_right_eye: ", left_right_eye)
            
            right_left_eye = landmarks_array[463, 0]
            # print("right_left_eye : ", right_left_eye)
            right_right_eye = landmarks_array[263, 0]
            # print("right_right_eye : ", right_right_eye)

            full_eye_distance = right_right_eye - left_left_eye
            # print("full_eye_distance : ", full_eye_distance)
            between_eye_distance = right_left_eye - left_right_eye
            # print("between_eye_distance: ", between_eye_distance)
            eye_ratio = round(abs((between_eye_distance / full_eye_distance) * 100), 2)
            print("eye_ratio : ", eye_ratio)

            # 코 비율 
            nose_top = landmarks_array[6, 1]
            # print("nose_top : ", nose_top)
            nose_bottom = landmarks_array[1, 1]
            # print("nose_bottom : ", nose_bottom)
            nose_right = landmarks_array[438, 0]
            # print("nose_right : ", nose_right)
            nose_left = landmarks_array[166, 0]
            # print("nose_left : ", nose_left)

            nose_height = nose_bottom - nose_top
            # print("nose_height: ",nose_height)
            nose_width = nose_right - nose_left
            # print("nose_width : ", nose_width)
            nose_ratio = round(abs((nose_width / nose_height) * 100), 2)
            print("nose_ratio: ", nose_ratio)

            # 입술비율 
            right_cheek = landmarks_array[367, 0]
            # print("right_cheek : ", right_cheek)
            left_cheek = landmarks_array[138, 0]
            # print("left_cheek : ", left_cheek)
            right_lip = landmarks_array[291, 0]
            # print("right_lip : ", right_lip)
            left_lip = landmarks_array[61, 0]
            # print("left_lip : ", left_lip)

            chin_width = right_cheek - left_cheek
            # print("chin_width: ", chin_width)
            lip_width = right_lip - left_lip
            # print("lip_width : ", lip_width)

            lip_ratio = round(abs((lip_width / chin_width) * 100), 2)
            print("lip_ratio : ", lip_ratio)

            # 얼굴 비율 
            right_face = landmarks_array[447, 0]
            # print("right_face : ", right_face)
            left_face = landmarks_array[227, 0]
            # print("left_face : ", left_face)
            top_face = landmarks_array[10, 1]
            # print("top_face : ", top_face)
            bottom_face = landmarks_array[152, 1]
            # print("bottom_face : ", bottom_face)

            face_width = right_face - left_face
            # print("face_width : ", face_width)
            face_height = bottom_face - top_face 
            # print("face_height : ", face_height)
            face_ratio = round(abs((face_width / face_height) * 100), 2)
            print("face_ratio: ", face_ratio)

            # 눈썹 
            right_right_eyebrow = landmarks_array[300, 0]
            # print("right_right_eyebrow : ", right_right_eyebrow)
            right_left_eyebrow = landmarks_array[285, 0]
            # print("right_left_eyebrow : ", right_left_eyebrow)
            left_left_eyebrow = landmarks_array[70, 0]
            # print("left_left_eyebrow : ", left_left_eyebrow)
            left_right_eyebrow = landmarks_array[55, 0]
            # print("left_right_eyebrow : ", left_right_eyebrow)

            full_eyebrow_distance = right_right_eyebrow - left_left_eyebrow
            # print("full_eyebrow_distance : ", full_eyebrow_distance)
            between_eyebrow_distance = right_left_eyebrow - left_right_eyebrow
            # print("between_eyebrow_distance : ", between_eyebrow_distance) 

            eyebrow_ratio = round((between_eyebrow_distance / full_eyebrow_distance)*100, 2)
            print("eyebrow_ratio : ", eyebrow_ratio)



            # 눈꼬리-눈 크기
            left_eye_top = landmarks_array[159, 1]
            # print("left_eye_top : ", left_eye_top)
            left_eye_bottom = landmarks_array[145, 1]
            # print("left_eye_bottom : ", left_eye_bottom)
            right_eye_top = landmarks_array[386, 1]
            # print("right_eye_top : ", right_eye_top)
            right_eye_bottom = landmarks_array[374, 1]
            # print("right_eye_bottom : ", right_eye_bottom)

            left_eyetail_top = landmarks_array[161, 1]
            # print("left_eyetail_top: ", left_eyetail_top)
            left_eyetail_bottom = landmarks_array[163, 1]
            # print("left_eyetail_bottom : ", left_eyetail_bottom)
            right_eyetail_top = landmarks_array[388, 1]
            # print("right_eyetail_top : ", right_eyetail_top)
            right_eyetail_bottom = landmarks_array[390, 1]
            # print("right_eyetail_bottom : ", right_eyetail_bottom)

            full_eye_size = right_eye_bottom - right_eye_top
            # print("full_eye_size: ", full_eye_size)
            tail_eye_size = right_eyetail_bottom - right_eyetail_top
            # print("tail_eye_size : ", tail_eye_size)

            full_eyesize_ratio = round((full_eye_size / face_height)*100, 2)
            print("full_eyesize_ratio : ", full_eyesize_ratio)
            full_tail_eye_ratio = round((tail_eye_size / full_eye_size)*100, 2)
            print("full_tail_eye_ratio : ", full_tail_eye_ratio)

            # 위-아래 입술 크기 
            top_top_lip = landmarks_array[0, 1]
            # print("top_top_lip : ", top_top_lip)
            top_bottom_lip = landmarks_array[12, 1]
            # print("top_bottom_lip: ", top_bottom_lip)
            bottom_top_lip = landmarks_array[14, 1]
            # print("bottom_top_lip : ", bottom_top_lip)
            bottom_bottom_lip = landmarks_array[17, 1]
            # print("bottom_bottom_lip : " , bottom_bottom_lip)

            full_lip_size = bottom_bottom_lip - top_top_lip
            # print("full_lip_size : ", full_lip_size)
            top_lip_size = top_bottom_lip - top_top_lip
            # print("top_lip_size : ", top_lip_size)
            bottom_lip_size = bottom_bottom_lip - bottom_top_lip
            # print("bottom_lip_size : ", bottom_lip_size)

            top_lip_ratio = round((top_lip_size / full_lip_size)*100, 2)
            print("top_lip_ratio : ", top_lip_ratio)
            bottom_lip_ratio = round((bottom_lip_size / full_lip_size)*100, 2)
            print("bottom_lip_ratio : ", bottom_lip_ratio)


            # 오른쪽/왼쪽 눈-얼굴 비대칭 
            middle_point = landmarks_array[6, 0]
            # print("middle_point : ", middle_point)
            right_face_point = landmarks_array[356, 0]
            # print("right_face_point : ", right_face_point)
            left_face_point = landmarks_array[127, 0]
            # print("left_face_point : ", left_face_point)
            
            # 위에서 가져옴
            # left_left_eye = landmarks_array[226, 0]
            # print("left_left_eye: ", left_left_eye)
            # left_right_eye = landmarks_array[133, 0]
            # print("left_right_eye: ", left_right_eye)
            
            # right_left_eye = landmarks_array[463, 0]
            # print("right_left_eye : ", right_left_eye)
            # right_right_eye = landmarks_array[263, 0]
            # print("right_right_eye : ", right_right_eye)

            right_face_width = right_face_point - middle_point
            # print("right_face_width : ", right_face_width)
            left_face_width = middle_point - left_face_point
            # print("left_face_width : ", left_face_width)

            right_eye_size = right_right_eye - right_left_eye
            # print("right_eye_size : ", right_eye_size)
            left_eye_size = left_right_eye - left_left_eye
            # print("left_eye_size : ", left_eye_size)

            right_symmetry_ratio = round((right_eye_size / right_face_width)*100, 2)
            print("right_symmetry_ratio : ", right_symmetry_ratio)
            left_symmetry_ratio = round((left_eye_size / left_face_width)*100, 2)
            print("left_symmetry_ratio : ", left_symmetry_ratio)

            # 얼굴-코 크기비율
            # 위에서 가져옴 
            # nose_top = landmarks_array[6, 1]
            # print("nose_top : ", nose_top)
            # nose_bottom = landmarks_array[1, 1]
            # print("nose_bottom : ", nose_bottom)
            # nose_right = landmarks_array[438, 0]
            # print("nose_right : ", nose_right)
            # nose_left = landmarks_array[166, 0]
            # print("nose_left : ", nose_left)
            # nose_height = nose_bottom - nose_top
            # print("nose_height: ",nose_height)
            # nose_width = nose_right - nose_left
            # print("nose_width : ", nose_width)

            # right_face = landmarks_array[447, 0]
            # print("right_face : ", right_face)
            # left_face = landmarks_array[227, 0]
            # print("left_face : ", left_face)
            # top_face = landmarks_array[10, 1]
            # print("top_face : ", top_face)
            # bottom_face = landmarks_array[152, 1]
            # print("bottom_face : ", bottom_face)

            # face_width = right_face - left_face
            # print("face_width : ", face_width)
            # face_height = bottom_face - top_face 
            # print("face_height : ", face_height)
            face_nose_height_ratio = round((nose_height / face_height)*100, 2)
            print("face_nose_height_ratio : ", face_nose_height_ratio)
            face_nose_width_ratio = round((nose_width / face_width)*100, 2)
            print("face_nose_width_ratio : ", face_nose_width_ratio)


        return eye_ratio, eyebrow_ratio, nose_ratio, lip_ratio, face_ratio, full_eyesize_ratio, \
            full_tail_eye_ratio, top_lip_ratio, bottom_lip_ratio, right_symmetry_ratio, left_symmetry_ratio, \
                face_nose_height_ratio, face_nose_width_ratio

    def save_image(self):
        # 이미지 저장
        cv2.imwrite(self.output_image_path, self.image)

    def process_image(self):
        eye_ratio, eyebrow_ratio, nose_ratio, lip_ratio, face_ratio, full_eyesize_ratio, full_tail_eye_ratio, \
            top_lip_ratio, bottom_lip_ratio, right_symmetry_ratio, left_symmetry_ratio, \
                face_nose_height_ratio, face_nose_width_ratio = self.detect_and_draw_landmarks()
        self.save_image()
        return eye_ratio, eyebrow_ratio, nose_ratio, lip_ratio, face_ratio, full_eyesize_ratio, \
            full_tail_eye_ratio, top_lip_ratio, bottom_lip_ratio, right_symmetry_ratio, left_symmetry_ratio, \
                face_nose_height_ratio, face_nose_width_ratio


# 사용 예제
# image_path = r'C:\Users\LeeSangWhui\Desktop\CosChic\CosChic\backend\media\model_img\deardahila_model2\deardahila_tint_4.jpg'  # 얼굴 이미지 파일 경로 설정
# output_image_path = 'output_face.png'

# detector = FaceMeshDetector(image_path, output_image_path)
# detector.process_image()


# mp_face_mesh = mp.solutions.face_mesh
# face_mesh = mp_face_mesh.FaceMesh()
# # image_path = r'C:\Users\LeeSangWhui\Desktop\CosChic\CosChic\backend\media\org_img\2024-06-19 21_09_52.jpg'
# image_path = r'C:\Users\LeeSangWhui\Desktop\CosChic\CosChic\backend\media\model_img\banilaco_model1\banilaco_lipstick_7.jpg'
# output_image_path = r'C:\Users\LeeSangWhui\Desktop\CosChic\CosChic\backend\media\mediapipe\output_face.png'


# facedetector = FaceMeshDetector(image_path, output_image_path)
# eye_ratio, nose_ratio, face_ratio, lip_ratio = facedetector.process_image()
# print(eye_ratio, nose_ratio, face_ratio, lip_ratio)