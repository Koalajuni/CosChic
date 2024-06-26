"use client"
import Header from "@/components/inc_header"
import Footer from "@/components/inc_footer"
import Swal from "sweetalert2"
import { useEffect, useRef, useState } from "react"
import axios from "axios"
import LoadingProcess from "@/components/loadingProcess"
import CardSimilarModel from "@/components/card_similarModel"
import useUserUID from "@/hooks/useUserUID";
import './loading.css';
import './loading2.css';
import axiosInstance from "@/hooks/axiosConfig"
import { Model } from '@/types/model';
import Webcam from "react-webcam";



export default function Home() {

    const [userUid, setUserUid] = useState("");
    const userUID = useUserUID(); // USER UID 가져오는 변수  
    const [userData, setUserData] = useState<any | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [cameraLoading, setCameraLoading] = useState(false); // 카메라 로딩 상태 추가
    const [cameraLoading2, setCameraLoading2] = useState(false); // 카메라 로딩 상태 추가
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const webcamRef = useRef<Webcam>(null);

    useEffect(() => {
        // User UID 가져와서 저장
        const storedUserUid = localStorage.getItem('UUID');
        console.log("this is the storedUserUid", storedUserUid)
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
                    const response = await axiosInstance.get(`/userdata/${userUID}`);
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
    const baseUrl = 'http://211.216.177.2:18000/api/v1';

    const [buttonText, setButtonText] = useState("카메라 사용하기");


    const faceanalysisButtonClick = () => {
        setFaceAnalysisButtonState(prevState => !prevState);
    };

    // // 카메라켜기
    // const cameraClick = async () => {
    //     setCameraLoading(true); // 카메라 로딩 시작
    //     const newCameraOnState = !cameraOn; // 새로운 카메라 상태 계산
    //     const buttonText = newCameraOnState ? "카메라끄기" : "카메라 사용하기"; // 새로운 버튼 텍스트 계산
    //     setButtonText(buttonText);
    //     setCamera(newCameraOnState); // cameraOn 상태를 토글합니다.
    //     if (!cameraOn) {
    //         setCamera(true);
    //         setTimeout(() => setCameraLoading(false), 2000); // 예시로 2초 후에 로딩 상태를 false로 설정

    //     }
    //     else {
    //         setCamera(false);
    //         setCameraLoading(false); // 카메라 끌 때 로딩 상태를 false로 설정
    //     }
    // }

    const cameraClick = () => {
        setCamera(prev => !prev);
        setCapturedImage(null); // Clear any previously captured image
    };

    const takePhoto = () => {
        if (webcamRef.current) {
            const imageSrc = webcamRef.current.getScreenshot();
            setCapturedImage(imageSrc);
            // You can now send this image to your backend for analysis
            sendImageToBackend(imageSrc);
        }
    };

    const sendImageToBackend = async (imageSrc: string) => {
        try {
            const response = await axiosInstance.post(`/analyze_image/${userUID}`, { image: imageSrc });
            if (response.status === 200) {
                setPhotoUrl(response.data.output_image_path);
                setPhotoUrlState(true);
                setFaceAnalysisButtonState(true);
            }
        } catch (error) {
            console.error("Error sending image to backend:", error);
            Swal.fire("Error", "Failed to send image for analysis", "error");
        }
    };

    const cameraComingSoon = async () => {
        Swal.fire("준비 중인 기능", `곧 출시될 기능입니다. 이미지 업로드를 사용 부탁드려요`, "info");
    };

    // 사진찍기
    // const takePhoto = async () => {
    //     try {
    //         console.log('photoUrlState 값:', photoUrlState);
    //         console.log('cameraLoading2 값:', cameraLoading2);
    //         setCameraLoading2(true); // 카메라 로딩 시작
    //         console.log('photoUrlState 값:', photoUrlState);
    //         console.log('cameraLoading2 값:', cameraLoading2);
    //         const response = await axiosInstance.post(`/camera_take_photo/${userUID}`, {
    //             timeout: 30000,
    //         });
    //         if (response.status == 200) {
    //             // setCamera(false);
    //             setCamera(true);
    //             setPhotoUrl(response.data.output_image_path);
    //             setPhotoUrlState(prevState => !prevState);
    //             console.log('photoUrlState 값:', photoUrlState);
    //             console.log('cameraLoading2 값:', cameraLoading2);
    //             console.log(response)
    //             setFaceAnalysisButtonState(prevState => !prevState);
    //             console.log('photoUrlState 값:', photoUrlState);
    //             console.log('cameraLoading2 값:', cameraLoading2);
    //         }
    //     } catch (error) {
    //         console.error("Error taking photo:", error); // 콘솔에 상세 오류 메시지 출력
    //         Swal.fire("얼굴 인식 실패", `사진 찍는데 실패했습니다.`, "error"); // 사용자에게 오류 메시지 표시
    //     } finally {
    //         setCameraLoading2(false); // 두 번째 카메라 로딩 종료
    //     }
    // }

    // 파일 업로드
    const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const file = event.target.files[0];
            await onFileUpload(file); // 파일을 선택하자마자 업로드
        }
    };

    const onFileUpload = async (file: File) => {

        const formData = new FormData();
        formData.append('orgImage', file);

        try {
            const response = await axiosInstance.post(
                `/orgIMG/${userUID}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            console.log('File uploaded successfully:', response.data);
            // 서버 응답 형식 점검
            if (response.data && response.data.output_image_path) {
                setPhotoUrl(response.data.output_image_path);
                setPhotoUrlState(prevState => !prevState);
                setFaceAnalysisButtonState(prevState => !prevState);
            } else {
                console.error('Output image path not found in response:', response.data);
            }
        } catch (error) {
            console.error('Error uploading the file:', error);
            Swal.fire("Error", '얼굴 전체가 잘 보여야 코스칙이 분석할 수 있습니다!', "error");

        }
    };

    // 모델카드 출력 
    const showcardSign = () => {
        setShowCard(true);
    }


    const [showCard, setShowCard] = useState(false);
    const [similarModel, setFaissModels] = useState<any[]>([]);
    const [models, setModels] = useState<Model[]>([]);
    // 분석하기 버튼
    const faceanalysisButton = async () => {
        try {
            const response = await axiosInstance.get(`/face_analysis/${userUID}`);
            if (response.status === 202) {
                const data = response.data;
                const similarModelArray: any[] = Object.values(data);
                setFaissModels(similarModelArray);
                setModels(similarModelArray)
                setShowCard(true);

                Swal.fire("success", `분석에 성공했습니다.`, "success").then(() => {
                    const element = document.getElementById('similar-models');
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                    }
                });
            }
        } catch (error) {
            console.error("face analysis error:", error);
            Swal.fire("Error", `분석에 실패했습니다.`, "error");
        }
    }


    //const models = [
    // { name: "브랜드 모델 A", lips: 28, eyes: 48, contour: 78, similarity: 78, product: "A" },
    // { name: "브랜드 모델 B", lips: 30, eyes: 50, contour: 80, similarity: 75, product: "B" },
    // { name: "브랜드 모델 C", lips: 32, eyes: 52, contour: 82, similarity: 70, product: "C" },
    // 나중에 DB되면 여기다 정보 가져올겁니다.
    //];





    return (
        <>
            <Header />

            {loading ? (
                <LoadingProcess />
            ) : (
                <section className="bg-gradient-to-r from-white to-gray-100 min-h-screen py-12">
                    <form action={`${baseUrl}/sendimage/`} method="post" encType="multipart/form-data">
                        <input type="hidden" name="refId" value={refId} />
                        <div className="container mx-auto px-4">
                            <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
                                Powder Room
                            </h1>
                            <div className="flex flex-col lg:flex-row gap-8">
                                {/* Left Column - Image Input */}
                                <div className="w-full lg:w-1/2">
                                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                                        <div className="relative h-[400px] overflow-hidden flex justify-center items-center bg-gray-100">
                                            {cameraOn ? (
                                                <Webcam
                                                    audio={false}
                                                    ref={webcamRef}
                                                    screenshotFormat="image/jpeg"
                                                    videoConstraints={{ facingMode: "user" }}
                                                />
                                            ) : capturedImage ? (
                                                <img src={capturedImage} alt="Captured" className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="text-center p-8">
                                                    <img
                                                        src="./icons/webcam.png"
                                                        alt="Camera icon"
                                                        className="w-24 h-24 mx-auto mb-4 opacity-50"
                                                    />
                                                    <p className="text-gray-500 text-lg">카메라 사용해서 사진을 찍어요</p>
                                                </div>
                                            )}
                                        </div>
                                        {/* <div className="p-6">
                                            <button onClick={cameraClick} type="button">
                                                {cameraOn ? "Turn Off Camera" : "Turn On Camera"}
                                            </button>
                                            <button onClick={takePhoto} type="button" disabled={!cameraOn}>
                                                Take Photo
                                            </button>
                                        </div> */}
                                        <div className="p-6">
                                            <h4 className="text-xl font-semibold text-gray-800 mb-4">
                                                {userData ? userData.names : 'Loading...'}
                                            </h4>
                                            <div className="flex gap-4 mb-6">
                                                <button
                                                    onClick={cameraClick} // 나중에 이 부분을 실제 카메라로 바꿔주세요
                                                    type="button"
                                                    className="flex-1 bg-white hover:bg-gray-50 text-gray-800 font-medium rounded-lg text-sm px-4 py-2.5 border border-gray-300 transition duration-300 ease-in-out flex items-center justify-center"
                                                >
                                                    <img src="./icons/camera.png" alt="Camera" className="w-5 h-5 mr-2" />
                                                    {buttonText}
                                                </button>
                                                <button
                                                    onClick={takePhoto}
                                                    type="button"
                                                    className="flex-1 bg-[#8E65B7] hover:bg-[#7A52A5] text-white font-medium rounded-lg text-sm px-4 py-2.5 transition duration-300 ease-in-out flex items-center justify-center"
                                                >
                                                    <img src="./icons/capture.png" alt="Capture" className="w-5 h-5 mr-2" />
                                                    사진 촬영하기
                                                </button>
                                            </div>
                                            <div className="text-center">
                                                <p className="text-sm text-gray-500 mb-2">또는</p>
                                                <label className="cursor-pointer inline-flex items-center bg-white hover:bg-gray-50 text-gray-800 font-medium rounded-lg text-sm px-4 py-2.5 border border-gray-300 transition duration-300 ease-in-out">
                                                    <img src="./icons/upload.png" alt="Upload" className="w-5 h-5 mr-2" />
                                                    사진 업로드
                                                    <input
                                                        type="file"
                                                        className="hidden"
                                                        onChange={onFileChange}
                                                        accept="image/*"
                                                    />
                                                </label>
                                                <p className="mt-2 text-xs text-gray-500">
                                                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column - Analysis Result */}
                                <div className="w-full lg:w-1/2">
                                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                                        <div className="relative h-[400px] overflow-hidden flex justify-center items-center bg-gray-100 border-4 border-[#FF6F91]">
                                            {photoUrlState ? (
                                                cameraLoading2 ? (
                                                    <div className="loader2"></div>
                                                ) : (
                                                    <img
                                                        alt="Analyzed face"
                                                        className="object-cover object-center w-full h-full"
                                                        src={photoUrl}
                                                    />
                                                )
                                            ) : (
                                                <div className="text-center p-8">
                                                    <img
                                                        src="./icons/face-scan.png"
                                                        alt="Face scan icon"
                                                        className="w-24 h-24 mx-auto mb-4 opacity-50"
                                                    />
                                                    <p className="text-gray-500 text-lg">사진을 올린 후 얼굴 분석이 진행돼요</p>
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-6 flex justify-center">
                                            <button
                                                onClick={faceanalysisButton}
                                                type="button"
                                                className={`bg-gradient-to-r from-[#FF6F91] to-[#8E65B7] text-white font-medium rounded-full px-8 py-4 text-lg transition duration-300 ease-in-out flex items-center ${!faceAnalysisButtonState
                                                    ? 'opacity-50 cursor-not-allowed'
                                                    : 'hover:shadow-lg'
                                                    }`}
                                                disabled={!faceAnalysisButtonState}
                                            >
                                                <img src="./icons/facial-recognition.png" alt="Face analysis" className="w-6 h-6 mr-3" />
                                                AI 분석하기
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Similar Models Section */}
                            <div className="mt-16">
                                {showCard && (
                                    <div className="bg-white rounded-xl shadow-lg overflow-hidden p-6">
                                        <h2 className="text-2xl font-bold text-gray-800 mb-6">나와 유사한 모델</h2>
                                        <CardSimilarModel models={models} />
                                    </div>
                                )}
                            </div>
                            <div className="mt-4" id="similar-models"></div>
                        </div>
                    </form>
                </section>
            )}

            <Footer />
            <script src="../path/to/flowbite/dist/flowbite.min.js" async />
        </>


    )

}