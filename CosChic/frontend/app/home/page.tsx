"use client"
import Header from "@/components/inc_header"
import Footer from "@/components/inc_footer"
import Swal from "sweetalert2"
import { useEffect, useState } from "react"
import axios from "axios"
import LoadingProcess from "@/components/loadingProcess"
import CardSimilarModel from "@/components/card_similarModel"
import useUserUID from "@/hooks/useUserUID";
import './loading.css';
import './loading2.css';


export default function Home() {

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

        // const isFaceAnalysisButtonDisabled = !cameraOn;
        // const buttonStyles = isFaceAnalysisButtonDisabled
        //     ? "text-gray-500 bg-gray-200 cursor-not-allowed hover:bg-gray-200 focus:ring-0 focus:outline-none" // Disabled styles
        //     : "text-gray-900 bg-white hover:bg-gray-100";
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
            const response = await axios.post(
                `${baseUrl}/v1/orgIMG/${userUID}`,
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
    const [models, setModels] = useState<any[] | null>(null);
    // 분석하기 버튼
    const faceanalysisButton = async () => {
        try {
            const response = await axios.get(`${baseUrl}/v1/face_analysis/${userUID}`);
            if (response.status === 202) {
                const data = response.data;
                const similarModelArray: any[] = Object.values(data);
                setFaissModels(similarModelArray);
                setModels(similarModelArray)
                setShowCard(true);

                Swal.fire("success", `분석에 성공했습니다.`, "success");
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

            {loading ?
                <LoadingProcess /> :
                <section className="text-gray-600 body-font">
                    <form action="http://localhost:8000/api/v1/sendimage/" method="post" encType="multipart/form-data">
                        <input type="hidden" name="refId" value={refId} />
                        <div className="mb-2 px-4">
                            <h1 className="text-2xl font-semibold text-gray-600 mb-2 pl-4">
                                Face Analysis
                            </h1>
                        </div>
                        <div className="container px-5 py-5 mx-auto">
                            <div className="flex flex-wrap -mx-4 -mb-10 text-center">
                                <div className="sm:w-1/2 mb-10 px-4">
                                    <div className="relative rounded-lg h-[350px] overflow-hidden flex justify-center items-center bg-black bg-opacity-50">
                                        {cameraOn ? (
                                            cameraLoading ? (
                                                <div className="loader"></div> // 로딩화면
                                            ) : (<img className="object-cover object-center rounded" alt="hero" src={`${baseUrl}/v1/camera_video_feed`} />)
                                        )

                                            :
                                            (<img
                                                alt="content"
                                                className="object-cover object-center w-3/4 filter blur-md"
                                                src="https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202306/04/138bdfca-3e86-4c09-9632-d22df52a0484.jpg"
                                            />
                                            )
                                        }
                                        {cameraOn ? (<div>

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
                                        }
                                    </div>
                                    <h4 className="title-font text-2xl font-small text-gray-900 mt-6 mb-3">{userData ? userData.names : 'Loading...'}</h4>
                                    <div className="relative mb-4 flex">
                                        <div className="flex w-1/2 pr-2">
                                            <button onClick={cameraClick} type="button" className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-3.5 py-2.5 text-left inline-flex items-center w-full dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700">
                                                <img src="./icons/camera.png" alt="Icon" className="w-10 h- me-4 -ms-1" />
                                                {buttonText}
                                            </button>
                                        </div>
                                        <div className="flex w-1/2 pl-2">
                                            <button onClick={takePhoto} type="button" className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-3.5 py-2.5 text-left inline-flex items-center w-full dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700">
                                                <img src="./icons/camera.png" alt="Icon" className="w-10 h- me-4 -ms-1" />
                                                사진찍기
                                            </button>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="mb-6 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">또는</p>
                                    </div>
                                    <div className="relative mb-0 flex">
                                        {/* <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">사진 업로드</label> */}
                                        {/* <input type="file" accept="image/png, image/gif, image/jpeg" name="name" className="flex-1 bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out mr-2" /> */}
                                        <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file" onChange={onFileChange} />
                                    </div>
                                    <div>
                                        <p className="mb-6 text-sm text-gray-500 dark:text-gray-300" id="file_input_help"> SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                    </div>

                                    {/* <button type="submit" href="image_result.html" className="flex mx-auto mt-6 text-white bg-indigo-500 border-0 py-2 px-5 focus:outline-none hover:bg-indigo-600 rounded">사진등록</button> */}
                                </div>
                                <div className="sm:w-1/2 mb-10 px-4 flex flex-col justify-center items-center">
                                    {/* <div className="rounded-lg h-[450px] overflow-hidden">
                                            <img alt="content" className="object-cover object-center w-full" src={refImage} />
                                    </div> */}
                                    <div className="relative border border-[#FF6F91] rounded-lg w-full h-[350px] overflow-hidden flex justify-center items-center bg-gray-600 bg-opacity-50">
                                        {photoUrlState ? (
                                            cameraLoading2 ? (
                                                <div className="loader2"></div> // 로딩화면
                                            ) :
                                                (<img
                                                    alt="content"
                                                    className="object-cover object-center w-5/6 h-5/6 "
                                                    src={photoUrl}
                                                />)) :
                                            (
                                                <div className="flex items-center justify-center w-full h-full bg-gray-450 rounded sm:w-96 dark:bg-gray-600">
                                                    <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                                        <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                                                    </svg>
                                                </div>
                                            )
                                        }
                                    </div>
                                    <div className="h-20"></div>
                                    <div className="relative mb-4 flex">
                                        <button
                                            onClick={faceanalysisButton}
                                            type="button"
                                            className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-12 py-8 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700"
                                            disabled={!faceAnalysisButtonState}
                                        >
                                            <img src="./icons/facial-recognition.png" alt="Icon" className="w-10 h-8 me-2 -ms-1" />
                                            얼굴 분석하기
                                        </button>
                                    </div>
                                    <div className="h-20"></div>
                                    {/* <select onChange={chgRefName} name="model" id="lang" className="w-full h-[50px] bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                                        {refModel.map((data, index) => (
                                            <option value={index} key={data.id}>{data.name}</option>
                                        )

                                        )}
                                    </select>
                                    <button onClick={messageClick} className="flex mx-auto mt-6 text-white bg-indigo-500 border-0 py-2 px-5 focus:outline-none hover:bg-indigo-600 rounded">모델적용</button> */}
                                </div>
                            </div>
                        </div>
                        <div>
                            {showCard && <CardSimilarModel models={models} />}
                        </div>
                    </form>
                </section>
            }


            <Footer />
            <script src="../path/to/flowbite/dist/flowbite.min.js"></script>
        </>


    )

}