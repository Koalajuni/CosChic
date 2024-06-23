"use client"
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import axios from "axios";
import useUserUID from "@/hooks/useUserUID";

const IncTestText = () => {
    const [userUid, setUserUid] = useState("");
    const userUID = useUserUID(); // USER UID 가져오는 변수
    const [userData, setUserData] = useState<any | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [cameraLoading, setCameraLoading] = useState(false); // 카메라 로딩 상태 추가
    const [cameraOn, setCamera] = useState(false);
    const [mostCommonName, setMostCommonName] = useState<string | null>(null); // 초기값 변경

    useEffect(() => {
        // User UID 가져와서 저장
        const storedUserUid = localStorage.getItem('UUID');
        console.log("Stored UUID:", storedUserUid);
        if (storedUserUid) {
            setUserUid(storedUserUid);
        }
    }, []);

    // uuid 로 유저정보 처리
    useEffect(() => {
        const fetchUserData = async () => {
            if (userUID) {
                try {
                    const response = await axios.get(`http://127.0.0.1:8000/api/v1/userdata/${userUID}`);
                    setUserData(response.data);
                } catch (err) {
                    setError('Failed to fetch user data.');
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [userUID]);

    useEffect(() => {
        if (userData) {
            console.log("This is the user response:", userData);
        }
    }, [userData]);

    // 카메라켜기
    const cameraClick = async () => {
        setCameraLoading(true); // 카메라 로딩 시작
        const newCameraOnState = !cameraOn; // 새로운 카메라 상태 계산
        setCamera(newCameraOnState); // cameraOn 상태를 토글합니다.
        console.log("Camera toggled, new state:", newCameraOnState);

        if (!cameraOn) {
            setCamera(true);
            console.log("Camera turned on");

            // Start streaming
            startStreaming();
            setTimeout(() => setCameraLoading(false), 10000);
            setTimeout(async () => {
                try {
                    console.log("Fetching most common name...");
                    const response = await axios.get(`http://127.0.0.1:8000/api/v1/get_most_common_name`);
                    console.log("Response received:", response.data);
                    if (response.data.most_common_name) {
                        setMostCommonName(response.data.most_common_name);
                        console.log("Most common name set:", response.data.most_common_name);
                    } else {
                        console.log("No most common name found in response");
                    }
                } catch (err) {
                    console.error("Failed to fetch most common name:", err);
                }
            }, 10000);

        } else {
            setCamera(false);
            setCameraLoading(false); // 카메라 끌 때 로딩 상태를 false로 설정
            console.log("Camera turned off");
        }
    };

    const startStreaming = async () => {
        const videoElement = document.getElementById('video') as HTMLVideoElement | null;
        if (videoElement) {
            videoElement.srcObject = null; // Reset any previous source object
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                videoElement.srcObject = stream;
            } catch (err) {
                console.error('Error accessing camera:', err);
            }
        }
    };

    return (
        <div className="IncTestText">
            <div className="w-full bg-white px-4">
                <div className="max-w-[1240px] mx-auto grid md:grid-cols-2">
                    <div className="mb-10 py-10 mr-16">
                        <div className="border relative rounded-lg h-[350px] flex justify-center items-center bg-white">
                            {cameraOn ? (
                                cameraLoading ? (
                                    <div className="loader"></div>
                                ) : (
                                    <img className="object-cover object-center rounded" alt="hero" src={`http://127.0.0.1:8000/api/v1/live_video`} />
                                )
                            ) : (
                                <div className="">
                                    <div className="justify-center w-40 flex flex-col items-center">
                                        <img
                                            alt="content"
                                            className="w-12"
                                            src="icons/webcam.png"
                                        />
                                        <p className="text-xs mt-4 text-center">카메라 권한을 승인해주세요</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col mt-6 justify-start">
                        <p className="p-2 md:text-5xl sm:text-4xl text-3xl font-bold md:py-4" style={{ color: '#FF6F91' }}>나랑 닮은 연예인은?</p>
                        <div className="p-2 gap-10">
                            <p>1. 인공지능 기반 얼굴 인식: 고객이 얼굴 사진을 찍거나 업로드하면,</p>
                            <p>인공지능이 얼굴 유형을 정확하게 분석합니다.</p>
                            <p>&nbsp;</p>
                            <p>2. 맞춤형 화장품 추천: </p>
                            <p>   고객의 얼굴 유형, 피부 상태, 선호하는 화장 스타일에 맞춰 최적의 화장품을 추천합니다.</p>
                        </div>
                        <div className="p-2 md:text-2xl sm:text-2xl text-2xl font-bold mt-10">
                            <p>나랑 가장 닮은 연예인은:</p>
                            {mostCommonName !== null ? (
                                <div className="mt-4">
                                    <h3>{mostCommonName}</h3>
                                </div>
                            ) : (
                                <p>Loading...</p>
                            )}
                        </div>
                        <div className="mt-2 p-2">
                            <button onClick={cameraClick} type="button" className="jusitfy-start bg-[#C598F0] w-[200px] rounded-md font-medium my-2 mx-auto py-3 text-white">
                                {cameraOn ? "카메라 끄기" : "카메라 실행"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IncTestText;
