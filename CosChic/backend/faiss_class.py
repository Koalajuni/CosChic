import os
import numpy as np
from PIL import Image
import faiss
import face_recognition

class CosChicPreprocessing:
    def __init__(self, dataset_path):
        self.dataset_path = dataset_path
        self.dataset_imgs = self.read_file(dataset_path)
        self.faceEncode = []
        self.img_paths = []

    def read_file(self, path):
        img_path = []
        for paths, subdirs, files in os.walk(path):
            for name in files:
                img_path.append(os.path.join(paths, name))
        return img_path

    def preprocess_images(self):
        for path_img in self.dataset_imgs:
            img = face_recognition.load_image_file(path_img)
            img_faces = face_recognition.face_locations(img)
            for i, face_loc in enumerate(img_faces):
                top, right, bottom, left = face_loc
                top = max(0, top - 20)
                right = min(img.shape[1], right + 20)
                bottom = min(img.shape[0], bottom + 20)
                left = max(0, left - 20)
                face_img = img[top:bottom, left:right]
                pil_img = Image.fromarray(face_img)
                pil_img.save(path_img)
                print("얼굴 저장 완료:", path_img)

    def encode_faces(self):
        for path in self.dataset_imgs:
            path = path.replace('\\', '/')
            img = face_recognition.load_image_file(path)
            face_encodings = face_recognition.face_encodings(img)
            if len(face_encodings) > 0:
                face_encode = face_encodings[0]
                self.faceEncode.append(face_encode)
                self.img_paths.append(path)
            else:
                os.remove(path)
                print("얼굴이 검출되지 않아 파일을 삭제했습니다:", path)
        print('검출된 얼굴은 총 {}개 입니다.'.format(len(self.faceEncode)))

    def train_index(self):
        train_labels = np.array([img.split('/')[-2] for img in self.img_paths])
        faceEncode = np.array(self.faceEncode, dtype=np.float32)
        np.save('/content/drive/MyDrive/datasets/CosChic_data/CosChic_labels.npy', train_labels)
        face_index = faiss.IndexFlatL2(128)
        face_index.add(faceEncode)
        faiss.write_index(face_index, "/content/drive/MyDrive/datasets/CosChic_data/CosChic_model.bin")
        print("인덱스 학습이 완료되었습니다.")

    def detect_faces(self, img_path):
        img = face_recognition.load_image_file(img_path)
        test_face = face_recognition.face_locations(img)
        top, right, bottom, left = test_face[0]
        top = top - 20
        right = right + 20
        bottom = bottom + 20
        left = left - 20
        face_cut = img[top:bottom, left:right]
        pil_img = Image.fromarray(face_cut)
        pil_img.save('./test.jpg')
        img = face_recognition.load_image_file('./test.jpg')
        test_en = face_recognition.face_encodings(img)[0]
        test_en = np.array(test_en, dtype=np.float32).reshape(-1, 128)
        distance, result = face_index.search(test_en, k=5)
        label = [train_labels[i] for i in result[0]]
        face_rst = most_frequent(label)
        return face_rst[0]

# 예시 사용법
preprocessor = CosChicPreprocessing('/content/drive/MyDrive/datasets/CosChic_data/dataset')
preprocessor.preprocess_images()
preprocessor.encode_faces()
preprocessor.train_index()
preprocessor.detect_faces('/content/drive/MyDrive/datasets/beautygan_web/media/src/source.jpg')
