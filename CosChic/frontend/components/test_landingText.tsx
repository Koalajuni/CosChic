"use client"

import Swal from "sweetalert2"
import { useEffect, useState } from "react"
import axios from "axios"
import useUserUID from "@/hooks/useUserUID";


const IncTestText = () => {
    const [userUid, setUserUid] = useState("");
    const userUID = useUserUID(); // USER UID 가져오는 변수  
    const [userData, setUserData] = useState<any | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [cameraLoading, setCameraLoading] = useState(false); // 카메라 로딩 상태 추가
    const [cameraLoading2, setCameraLoading2] = useState(false); // 카메라 로딩 상태 추가

    useEffect(() => {
        // User UID 가져와서 저장
        const storedUserUid = localStorage.getItem('UUID');
        console.log(storedUserUid)
        if (storedUserUid) {
            setUserUid(storedUserUid);
        }
        console.log(storedUserUid)
    }, []);

    // uuid 로 유저정보 처리
    useEffect(() => {
        const fetchUserData = async () => {
            // console.log("fetching UserData:", userUID)
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



    // const [loading, setLoading] = useState(false);
    const [cameraOn, setCamera] = useState(false);
    const [cnt, setCnt] = useState(0);  // 상태를 바꾸기 위해 useState을 사용해야 한다. 
    // const [refModel, setRefModel] = useState(null);
    // const isFaceAnalysisButtonDisabled = !cameraOn;
    const [faceAnalysisButtonState, setFaceAnalysisButtonState] = useState(false);
    const [photoUrl, setPhotoUrl] = useState('');
    const [photoUrlState, setPhotoUrlState] = useState(false);
    const [refModel, setRefModel] = useState(null);
    const isFaceAnalysisButtonDisabled = !cameraOn;
    // const [selfRef, setSelRef] = ("");
    // const [refImage, setRefImage] = useState(-1);
    const [refId, setRefId] = useState(-1);
    const baseUrl = 'http://127.0.0.1:8000/api';

    const [buttonText, setButtonText] = useState("카메라 사용하기");


    const faceanalysisButtonClick = () => {
        setFaceAnalysisButtonState(prevState => !prevState);
    };

    // 카메라켜기
    const cameraClick = async () => {
        setCameraLoading(true); // 카메라 로딩 시작
        const newCameraOnState = !cameraOn; // 새로운 카메라 상태 계산
        const buttonText = newCameraOnState ? "카메라끄기" : "카메라 사용하기"; // 새로운 버튼 텍스트 계산
        setButtonText(buttonText);
        setCamera(newCameraOnState); // cameraOn 상태를 토글합니다.
        if (!cameraOn) {
            setCamera(true);
            setTimeout(() => setCameraLoading(false), 2000); // 예시로 2초 후에 로딩 상태를 false로 설정

        }
        else {
            setCamera(false);
            setCameraLoading(false); // 카메라 끌 때 로딩 상태를 false로 설정
        }
    }

    // 사진찍기
    const takePhoto = async () => {
        try {
            console.log('photoUrlState 값:', photoUrlState);
            console.log('cameraLoading2 값:', cameraLoading2);
            setCameraLoading2(true); // 카메라 로딩 시작
            console.log('photoUrlState 값:', photoUrlState);
            console.log('cameraLoading2 값:', cameraLoading2);
            const response = await axios.post(`${baseUrl}/v1/camera_take_photo/${userUID}`, {
                timeout: 30000,
            });
            if (response.status == 200) {
                // setCamera(false);
                setCamera(true);
                setPhotoUrl(response.data.output_image_path);
                setPhotoUrlState(prevState => !prevState);
                console.log('photoUrlState 값:', photoUrlState);
                console.log('cameraLoading2 값:', cameraLoading2);
                console.log(response)
                setFaceAnalysisButtonState(prevState => !prevState);
                console.log('photoUrlState 값:', photoUrlState);
                console.log('cameraLoading2 값:', cameraLoading2);
            }
        } catch (error) {
            console.error("Error taking photo:", error); // 콘솔에 상세 오류 메시지 출력
            Swal.fire("얼굴 인식 실패", `사진 찍는데 실패했습니다.`, "error"); // 사용자에게 오류 메시지 표시
        } finally {
            setCameraLoading2(false); // 두 번째 카메라 로딩 종료
        }
    }


    return (
        <div className="IncTestText">
            <div className="w-full bg-white px-4">
                <div className="max-w-[1240px] mx-auto grid md:grid-cols-2">
                    {/* <img className="w-[500px] mx-auto my-4" src="/assets/image/image.svg" alt='.' /> */}
                    <div className="mb-10 py-10 mr-16">
                        <div className="border relative rounded-lg h-[350px] flex justify-center items-center bg-white">
                            {cameraOn ? (
                                cameraLoading ? (
                                    <div className="loader"></div> // 로딩화면
                                ) : (<img className="object-cover object-center rounded" alt="hero" src={`${baseUrl}/v1/camera_video_feed`} />)
                            )

                                :
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

                            }
                            {/* {cameraOn ? (<div>

                            </div>) : (
                                <button
                                    onClick={cameraClick}
                                    type="button"
                                    className="absolute text-gray-900 bg-white bg-opacity-90 hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-3.5 py-2.5 text-left inline-flex items-center w-1/2 justify-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700"
                                >
                                    <img src="./icons/camera.png" alt="Icon" className="w-10 h-10 me-4 -ms-1" />
                                    {buttonText}
                                </button>
                            )
                            } */}
                        </div>
                    </div>
                    <div className="flex flex-col mt-6 justify-start">
                        {/* <h1 className="text-[#8E65B7] font-bold p-2">인공지능을 통해 고객의 얼굴 유형에 맞춤형 화장품과 뷰티 스타일을 추천해주는 혁신적인 웹!!!</h1> */}
                        <p className="p-2 md:text-5xl sm:text-4xl text-3xl font-bold md:py-4" style={{ color: '#FF6F91' }}>나랑 닮은 연예인은?</p>
                        <div className="p-2 gap-10">
                            <p>1. 인공지능 기반 얼굴 인식: 고객이 얼굴 사진을 찍거나 업로드하면,</p>
                            <p>인공지능이 얼굴 유형을 정확하게 분석합니다.</p>
                            <p>&nbsp;</p>
                            <p>2. 맞춤형 화장품 추천: </p>
                            <p>   고객의 얼굴 유형, 피부 상태, 선호하는 화장 스타일에 맞춰 최적의 화장품을 추천합니다.</p>
                        </div>
                        <div className="p-2 md:text-2xl sm:text-2xl text-2xl font-bold mt-10 ">
                            <p>나랑 가장 닮은 연예인은:</p>
                        </div>
                        <div className="mt-2 p-2">
                            <button onClick={cameraClick} type="button" className="jusitfy-start bg-[#C598F0] w-[200px] rounded-md font-medium my-2 mx-auto py-3 text-white">
                                카메라 실행
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default IncTestText;
