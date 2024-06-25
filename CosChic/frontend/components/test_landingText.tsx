// "use client"
// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import axiosInstance from '@/hooks/axiosConfig';


// const IncTestText = () => {
//     const [sessionId, setSessionId] = useState("");
//     const [cameraOn, setCamera] = useState(false);
//     const [analyzedName, setAnalyzedName] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [streamProgress, setStreamProgress] = useState(0);
//     const videoRef = useRef(null);

//     useEffect(() => {
//         if (cameraOn) {
//             const timer = setInterval(() => {
//                 setStreamProgress((prevProgress) => {
//                     if (prevProgress >= 100) {
//                         clearInterval(timer);
//                         return 100;
//                     }
//                     return prevProgress + 2; // Increase by 2% every 100ms
//                 });
//             }, 100);

//             return () => clearInterval(timer);
//         }
//     }, [cameraOn]);

//     const cameraClick = async () => {
//         setLoading(true);
//         setStreamProgress(0);
//         setCamera(true);
//         setAnalyzedName(null);

//         try {
//             const response = await fetch('http://211.216.177.2:18000/api/v1/live_video');
//             const reader = response.body.getReader();
//             const stream = new ReadableStream({
//                 async start(controller) {
//                     while (true) {
//                         const { done, value } = await reader.read();
//                         if (done) break;
//                         controller.enqueue(value);
//                     }
//                     controller.close();
//                     setLoading(false);
//                 }
//             });

//             const videoStream = stream.pipeThrough(new TransformStream({
//                 transform(chunk, controller) {
//                     if (chunk.includes('Content-Type: application/json')) {
//                         const jsonData = JSON.parse(new TextDecoder().decode(chunk.slice(chunk.indexOf('{'))));
//                         setSessionId(jsonData.session_id);
//                         setCamera(false);
//                     } else {
//                         controller.enqueue(chunk);
//                     }
//                 }
//             }));

//             if (videoRef.current) {
//                 videoRef.current.srcObject = videoStream;
//                 videoRef.current.play();
//             }
//         } catch (error) {
//             console.error("Error capturing video:", error);
//             setLoading(false);
//             setCamera(false);
//         }
//     };

//     const analyzeClick = async () => {
//         if (!sessionId) {
//             console.error("No session ID available");
//             return;
//         }

//         setLoading(true);
//         try {
//             const response = await axiosInstance.get(`/get_most_common_name`, {
//                 params: { session_id: sessionId }
//             });
//             if (response.data.status === "success") {
//                 setAnalyzedName(response.data.most_common_name);
//             } else {
//                 console.error("Analysis failed");
//             }
//         } catch (error) {
//             console.error("Error analyzing image:", error);
//         }
//         setLoading(false);
//     };

//     return (
//         <div className="IncTestText">
//             <div className="w-full bg-white px-4">
//                 <div className="max-w-[1240px] mx-auto grid md:grid-cols-2">
//                     <div className="mb-10 py-10 mr-16">
//                         <div className="border relative rounded-lg h-[350px] flex justify-center items-center bg-white overflow-hidden">
//                             {cameraOn ? (
//                                 <video ref={videoRef} className="object-cover object-center rounded" />
//                             ) : sessionId ? (
//                                 <img
//                                     className="object-cover object-center rounded"
//                                     alt="captured_image"
//                                     src={`http://127.0.0.1:8000/media/result/${sessionId}/captured_frame.jpg`}
//                                 />
//                             ) : (
//                                 <div className="justify-center w-40 flex flex-col items-center">
//                                     <img
//                                         alt="content"
//                                         className="w-12"
//                                         src="icons/webcam.png"
//                                     />
//                                     <p className="text-xs mt-4 text-center">카메라를 활성화하세요</p>
//                                 </div>
//                             )}
//                             {cameraOn && (
//                                 <div className="absolute bottom-0 left-0 w-full h-2 bg-gray-200">
//                                     <div
//                                         className="h-full bg-blue-500 transition-all duration-100 ease-linear"
//                                         style={{ width: `${streamProgress}%` }}
//                                     ></div>
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                     <div className="flex flex-col mt-6 justify-start">
//                         <p className="p-2 md:text-5xl sm:text-4xl text-3xl text-black font-bold md:py-4" style={{ color: '#FF6F91' }}>나랑 닮은 연예인은?</p>
//                         <div className="p-2 gap-10">
//                             <p>1. 인공지능 기반 얼굴 인식: 고객이 얼굴 사진을 찍거나 업로드하면,</p>
//                             <p>인공지능이 얼굴 유형을 정확하게 분석합니다.</p>
//                             <p>&nbsp;</p>
//                             <p>2. 맞춤형 화장품 추천: </p>
//                             <p>   고객의 얼굴 유형, 피부 상태, 선호하는 화장 스타일에 맞춰 최적의 화장품을 추천합니다.</p>
//                         </div>
//                         <div className="p-2 md:text-2xl sm:text-2xl text-2xl font-bold mt-10">
//                             <p>나랑 가장 닮은 연예인은:</p>
//                             {analyzedName && <h3>{analyzedName}</h3>}
//                         </div>
//                         <div className="mt-2 p-2">
//                             <button onClick={cameraClick} disabled={loading} type="button" className="jusitfy-start bg-[#C598F0] w-[200px] rounded-md font-medium my-2 mx-auto py-3 text-white">
//                                 {cameraOn ? "촬영 중..." : "카메라 실행"}
//                             </button>
//                             <button onClick={analyzeClick} disabled={!sessionId || loading} type="button" className="jusitfy-start bg-[#FF6F91] w-[200px] rounded-md font-medium my-2 mx-auto py-3 text-white">
//                                 분석하기
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default IncTestText;