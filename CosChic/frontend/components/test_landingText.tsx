"use client"
import React, { useState, useEffect, useRef } from 'react';
import Webcam from 'react-webcam';
import axiosInstance from '@/hooks/axiosConfig';

const IncTestText = () => {
    const [cameraOn, setCamera] = useState(false);
    const [analyzedName, setAnalyzedName] = useState(null);
    const [loading, setLoading] = useState(false);
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const webcamRef = useRef<Webcam | null>(null);

    const cameraClick = () => {
        setCamera(prev => !prev);
        setCapturedImage(null);
        setAnalyzedName(null);
    };

    const captureImage = () => {
        if (webcamRef.current) {
            const imageSrc = webcamRef.current.getScreenshot();
            setCapturedImage(imageSrc);
            setCamera(false);
        } else {
            console.error("Webcam not available");
        }
    };

    const analyzeClick = async () => {
        if (!capturedImage) {
            console.error("No image captured");
            return;
        }
        setLoading(true);
        try {
            // Convert base64 image to blob
            const response = await axiosInstance.post(`/get_similarCeleb`, { image: capturedImage });
            if (response.data) {
                setAnalyzedName(response.data.most_similar_celebrity);
            } else {
                console.error("Analysis failed");
            }
        } catch (error) {
            console.error("Error analyzing image:", error);
        }
        setLoading(false);
    };

    return (
        <div className="IncTestText">
            <div className="w-full bg-white px-4">
                <div className="max-w-[1240px] mx-auto grid md:grid-cols-2">
                    <div className="mb-10 py-10 mr-16">
                        <div className="border relative rounded-lg h-[350px] flex justify-center items-center bg-white overflow-hidden">
                            {cameraOn ? (
                                <Webcam
                                    audio={false}
                                    ref={webcamRef}
                                    screenshotFormat="image/jpeg"
                                    className="object-cover object-center rounded"
                                />
                            ) : capturedImage ? (
                                <img
                                    src={capturedImage}
                                    alt="captured_image"
                                    className="object-cover object-center rounded"
                                />
                            ) : (
                                <div className="justify-center w-40 flex flex-col items-center">
                                    <img
                                        alt="content"
                                        className="w-12"
                                        src="icons/webcam.png"
                                    />
                                    <p className="text-xs mt-4 text-center">카메라를 활성화하세요</p>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col mt-6 justify-start">
                        <p className="p-2 md:text-5xl sm:text-4xl text-3xl text-black font-bold md:py-4" style={{ color: '#FF6F91' }}>나랑 닮은 연예인은?</p>
                        <div className="p-2 gap-10">
                            <p>1. 인공지능 기반 얼굴 인식: 고객이 얼굴 사진을 찍거나 업로드하면,</p>
                            <p>인공지능이 얼굴 유형을 정확하게 분석합니다.</p>
                            <p>&nbsp;</p>
                            <p>2. 맞춤형 화장품 추천: </p>
                            <p>   고객의 얼굴 유형, 피부 상태, 선호하는 화장 스타일에 맞춰 최적의 화장품을 추천합니다.</p>
                        </div>
                        <div className="p-2 md:text-2xl sm:text-2xl text-2xl font-bold mt-10">
                            <p>나랑 가장 닮은 연예인은:</p>
                            {analyzedName && <h3>{analyzedName}</h3>}
                        </div>
                        <div className="mt-2 p-2">
                            <button onClick={cameraClick} disabled={loading} type="button" className="jusitfy-start bg-[#C598F0] w-[200px] rounded-md font-medium my-2 gap-4 mx-auto py-3 text-white">
                                {cameraOn ? "카메라 끄기" : "카메라 켜기"}
                            </button>
                            {cameraOn && (
                                <button onClick={captureImage} disabled={loading} type="button" className="jusitfy-start bg-[#8E65B7] w-[200px] rounded-md font-medium my-2 mx-auto py-3 text-white">
                                    사진 찍기
                                </button>
                            )}
                            <button onClick={analyzeClick} disabled={!capturedImage || loading} type="button" className="jusitfy-start bg-[#FF6F91] w-[200px] rounded-md font-medium my-2 mx-auto py-3 text-white">
                                {loading ? "분석 중..." : "분석하기"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IncTestText;