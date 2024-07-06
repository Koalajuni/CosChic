"use client"
import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import axiosInstance from '@/hooks/axiosConfig';

interface Celebrity {
    name: string;
    similarity: number;
    celebImage: string;
    userImage: string;
}

const IncTestText = () => {
    const [cameraOn, setCamera] = useState(false);
    const [analyzedCelebrity, setAnalyzedCelebrity] = useState<Celebrity | null>(null);
    const [loading, setLoading] = useState(false);
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const webcamRef = useRef<Webcam | null>(null);
    const [showStyleAnalysisPrompt, setShowStyleAnalysisPrompt] = useState(false);

    const cameraClick = () => {
        setCamera(prev => !prev);
        setCapturedImage(null);
        setAnalyzedCelebrity(null);
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
            const response = await axiosInstance.post(`/get_similarCeleb`, { image: capturedImage });
            if (response.data) {
                setAnalyzedCelebrity({
                    name: response.data.most_similar_celebrity,
                    similarity: Math.round(response.data.similarity_score),
                    celebImage: response.data.celebrity_image,
                    userImage: response.data.user_image, // This should be the modified user image from the backend
                });
                setShowStyleAnalysisPrompt(true);
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
                    {/* Left column - webcam/image capture */}
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
                        {analyzedCelebrity && showStyleAnalysisPrompt && (
                            <div className="mt-8 flex flex-col items-center animate-pulse">
                                <svg className="w-20 h-20 text-[#FF6F91]" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                    <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                                </svg>
                                <p className="mt-2 text-lg font-semibold text-[#FF6F91]">나에게 맞는 스타일 분석</p>
                            </div>
                        )}
                    </div>

                    {/* Right column - celebrity match section */}
                    <div className="flex flex-col mt-6 justify-start">
                        <h2 className="p-2 md:text-5xl sm:text-4xl text-3xl font-bold md:py-4" style={{ color: '#FF6F91' }}>나랑 닮은 연예인은?</h2>

                        {analyzedCelebrity ? (
                            <div className="mt-6 bg-white rounded-lg shadow-lg overflow-hidden">
                                <div className="flex">
                                    <div className="w-1/2 p-2">
                                        <img
                                            src={analyzedCelebrity.userImage}
                                            alt="Your photo"
                                            className="w-full h-64 object-cover rounded"
                                        />
                                        <p className="text-center mt-2 font-semibold">You</p>
                                    </div>
                                    <div className="w-1/2 p-2">
                                        <img
                                            src={analyzedCelebrity.celebImage}
                                            alt={analyzedCelebrity.name}
                                            className="w-full h-64 object-cover rounded"
                                        />
                                        <p className="text-center mt-2 font-semibold">{analyzedCelebrity.name}</p>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="font-bold text-2xl text-[#C598F0] mb-2">나와 이정도로 비슷해요</h3>
                                    <div className="mt-4 bg-gray-200 rounded-full">
                                        <div
                                            className="bg-pink-500 text-xs font-medium text-white text-center p-2 leading-none rounded-full"
                                            style={{ width: `${analyzedCelebrity.similarity}%` }}
                                        >
                                            {analyzedCelebrity.similarity}%
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="mt-6 p-6 bg-gray-100 rounded-lg">
                                <p className="text-center text-[#C598F0]">
                                    "카메라로 얼굴을 찍은 후 나의 얼굴과 가장 닮은 연예인을 찾아봐요!"
                                </p>
                            </div>
                        )}

                        <div className="mt-6 p-2 flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={cameraClick}
                                disabled={loading}
                                className="bg-[#C598F0] rounded-md font-medium py-3 px-6 text-white transition duration-300 ease-in-out hover:bg-[#B080D0]"
                            >
                                {cameraOn ? "카메라 끄기" : "카메라 켜기"}
                            </button>
                            {cameraOn && (
                                <button
                                    onClick={captureImage}
                                    disabled={loading}
                                    className="bg-[#8E65B7] rounded-md font-medium py-3 px-6 text-white transition duration-300 ease-in-out hover:bg-[#7A51A3]"
                                >
                                    사진 찍기
                                </button>
                            )}
                            <button
                                onClick={analyzeClick}
                                disabled={!capturedImage || loading}
                                className="bg-[#FF6F91] rounded-md font-medium py-3 px-6 text-white transition duration-300 ease-in-out hover:bg-[#FF5A7D]"
                            >
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