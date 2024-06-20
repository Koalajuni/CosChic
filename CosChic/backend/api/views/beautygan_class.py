import dlib
import matplotlib.pyplot as plt
import numpy as np
from PIL import Image
from datetime import datetime
import tensorflow.compat.v1 as tf

tf.disable_v2_behavior()

class BeautyGAN:
    def __init__(self):
        # 학습된 모델 불러오기
        self.detector = dlib.get_frontal_face_detector()
        self.sp = dlib.shape_predictor('./pretrained/shape_predictor_5_face_landmarks.dat')
        self.sess = tf.Session()
        self.sess.run(tf.global_variables_initializer())
        self.saver = tf.train.import_meta_graph('./pretrained/model.meta')
        self.saver.restore(self.sess, tf.train.latest_checkpoint('./pretrained'))
        self.graph = tf.get_default_graph()

        # BeautyGAN X, Y, Xs 설정
        self.X = self.graph.get_tensor_by_name('X:0') # 소스
        self.Y = self.graph.get_tensor_by_name('Y:0') # 레퍼런스
        self.Xs = self.graph.get_tensor_by_name('generator/xs:0') # 화장 한 결과값

    # 전처리(실수 : -1~1)
    def preprocess(self, img):
        return img.astype(np.float32) / 127.5 - 1.

    # 복원(0~255)
    def postprocess(self, img):
        return ((img + 1.) * 127.5).astype(np.uint8)

    # 이미지를 넣으면 수평에 맞는 이미지 추출
    def face_align(self, img):
        dets = self.detector(img, 1)
        objs = dlib.full_object_detections()

        for detection in dets:
            s = self.sp(img, detection)
            objs.append(s)

        # 얼굴추출
        faces = dlib.get_face_chips(img, objs, size=256, padding=0.35)
        return faces

    def makeup(self, src_path, ref_path, save_path):
        # 원본이미지
        org_img = dlib.load_rgb_image(src_path)

        # 화장할 레퍼런스 이미지
        ref_img = dlib.load_rgb_image(ref_path)

        # 얼굴 추출
        org_face = self.face_align(org_img)
        ref_face = self.face_align(ref_img)

        src_img = org_face[0]
        ref_img = ref_face[0]

        # 전처리
        X_img = self.preprocess(src_img)
        X_img = np.expand_dims(X_img, axis=0)

        Y_img = self.preprocess(ref_img)
        Y_img = np.expand_dims(Y_img, axis=0)

        # GAN동작
        output = self.sess.run(self.Xs, feed_dict={
            self.X: X_img,
            self.Y: Y_img
        })

        # 결과 확인
        # 복원
        result_img = self.postprocess(output[0])
        # 파일로 저장
        saveImg = Image.fromarray(result_img)
        now = datetime.now()
        today = now.strftime('%Y%m%d')
        
        # 현재 저장경로 설정에 문제가 있습니다.
        save_path = save_path.replace('\\', '/')
        saveImg.save(f'{save_path}/{today}_rst.jpg')
        return f'{save_path}/{today}_rst.jpg'

# 테스트
# bg = BeautyGAN()
# src_path = './media/source/1.jpg'
# ref_path = './media/ref/1.jpg'
# save_path = './media/result'
# save_file = bg.makeup(src_path, ref_path, save_path)
# print('화장결과 :', save_file) 



