"use client"
import Header from "@/components/inc_header"
import Footer from "@/components/inc_footer"
import Swal from "sweetalert2"
import { useEffect, useState } from "react"
import axios from "axios"
import LoadingProcess from "@/components/loadingProcess"
import CardSimilarModel from "@/components/card_similarModel"



export default function Home() {

    const [userUid, setUserUid] = useState("");

    useEffect(() => {
        // User UID 가져와서 저장
        const storedUserUid = localStorage.getItem('UUID');
        console.log(storedUserUid)
        if (storedUserUid) {
            setUserUid(storedUserUid);
        }
        console.log(storedUserUid)
    }, []);



    const [loading, setLoading] = useState(false);
    const [cameraOn, setCamera] = useState(false);
    const [cnt, setCnt] = useState(0);  // 상태를 바꾸기 위해 useState을 사용해야 한다. 
    const [refModel, setRefModel] = useState(null);
    const isFaceAnalysisButtonDisabled = !cameraOn;
    // const [selfRef, setSelRef] = ("");
    const [refImage, setRefImage] = useState(-1);
    const [refId, setRefId] = useState(-1);
    const baseUrl = 'http://127.0.0.1:8000/api';

    const [buttonText, setButtonText] = useState("카메라 사용하기");

    const models = [
        { name: "브랜드 모델 A", lips: 28, eyes: 48, contour: 78, similarity: 78, product: "A" },
        { name: "브랜드 모델 B", lips: 30, eyes: 50, contour: 80, similarity: 75, product: "B" },
        { name: "브랜드 모델 C", lips: 32, eyes: 52, contour: 82, similarity: 70, product: "C" },
        // 나중에 DB되면 여기다 정보 가져올겁니다.
    ];

    const cameraClick = () => {
        const newCameraOnState = !cameraOn; // 새로운 카메라 상태 계산
        const buttonText = newCameraOnState ? "카메라끄기" : "카메라 사용하기"; // 새로운 버튼 텍스트 계산
        setButtonText(buttonText);
        setCamera(newCameraOnState); // cameraOn 상태를 토글합니다.
        if (!cameraOn) {
            setCamera(true);
        }
        else {
            setCamera(false);
        }


        const isFaceAnalysisButtonDisabled = !cameraOn;
        const buttonStyles = isFaceAnalysisButtonDisabled
            ? "text-gray-500 bg-gray-200 cursor-not-allowed hover:bg-gray-200 focus:ring-0 focus:outline-none" // Disabled styles
            : "text-gray-900 bg-white hover:bg-gray-100";
    }

    const takePhoto = async () => {
        try {
            const response = await axios.post(`${baseUrl}/v1/camera_take_photo`, {
                timeout: 30000,
            });
            if (response.status == 200) {
                // setCamera(false);
                setCamera(true);
                console.log(response)
            }
        } catch (error) {
            console.error("Error taking photo:", error); // 콘솔에 상세 오류 메시지 출력
            Swal.fire("Error", `사진 찍는데 실패했습니다.`, "error"); // 사용자에게 오류 메시지 표시
        }
    }


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
                                        {cameraOn ?
                                            (<img className="object-cover object-center rounded" alt="hero" src={`${baseUrl}/v1/camera_video_feed`} />)
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
                                    <h4 className="title-font text-2xl font-small text-gray-900 mt-6 mb-3">홍길동</h4>
                                    <div className="relative mb-4 flex">
                                        <button onClick={cameraClick} type="button" className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-3.5 py-2.5 text-left inline-flex items-center w-full dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700">
                                            <img src="./icons/camera.png" alt="Icon" className="w-10 h- me-4 -ms-1" />
                                            {buttonText}
                                        </button>
                                    </div>
                                    <div>
                                        <p className="mb-6 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">또는</p>
                                    </div>
                                    <div className="relative mb-0 flex">
                                        {/* <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">사진 업로드</label> */}
                                        {/* <input type="file" accept="image/png, image/gif, image/jpeg" name="name" className="flex-1 bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out mr-2" /> */}
                                        <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file" />
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
                                    <div className="relative rounded-lg w-476 h-[350px] overflow-hidden flex justify-center items-center bg-black bg-opacity-50">
                                        <img
                                            alt="content"
                                            className="object-cover object-center w-3/4 "
                                            src="https://cdn.pixabay.com/photo/2015/03/08/09/30/head-663997_1280.jpg"
                                        /></div>
                                    <div className="h-20"></div>
                                    <div className="relative mb-4 flex">
                                        <button
                                            onClick={takePhoto}
                                            type="button"
                                            className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-12 py-8 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700"
                                            disabled={isFaceAnalysisButtonDisabled}
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
                            <CardSimilarModel models={models} />
                        </div>
                    </form>
                </section>
            }

            <Footer />
            <script src="../path/to/flowbite/dist/flowbite.min.js"></script>
        </>


    )

}