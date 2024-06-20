"use client"
import UserProfileImage from '@/components/userProfileImage';
import React, { useState, useEffect } from 'react';
import ProductDetails from '@/components/productDetails';
import SimilarModels from '@/components/similarModels';
import Header from '@/components/inc_header';
import Footer from '@/components/inc_footer';
import useUserUID from "@/hooks/useUserUID";
import { useSearchParams } from "next/navigation";
import CardBarChart from '@/components/card_barChart';
import CardRadalChart from '@/components/card_radalChart';
import CardRelatedProduct from '@/components/card_relatedProduct';
import styles from '@/styles//CardRelatedProduct.module.css';
import axios from "axios";


const TestProductPage = () => {

    const [userUid, setUserUid] = useState("");
    const [responseData, setResponseData] = useState(null);
    const [responseData2, setResponseData2] = useState(null);
    const [responseData3, setResponseData3] = useState(null);
    const [responseData4, setResponseData4] = useState(null);
    const userUID = useUserUID(); // USER UID 가져오는 변수  
    const params = useSearchParams();
    const name = params.get("name");
    const url = params.get("url");
    const modelNum = params.get("modelNum");
    const models = [];
    params.forEach((value, key) => {
        if (/^model\d+$/.test(key)) {models.push(value);}});
    const lipSimilarity = params.get("lips");
    const eyeSimilarity = params.get("eyes");
    const eyebrowSimilarity = params.get("eyebrow");
    const noseSimilarity = params.get("nose");
    const contourSimilarity = params.get("contour");
    const allSimilarity = params.get("sim");

    const userFullEyesizeRatio = params.get("ufeye")
    const userFullTailEyeRatio = params.get("uteye")
    const userTopLipRatio = params.get("utlip")
    const userBottomLipRatio = params.get("ublip")
    const userRightSymmetryRatio = params.get("ursym")
    const userLeftSymmertyRatio = params.get("ulsym")
    const userFaceNoseHeightRatio = params.get("ufnh")
    const userFaceNoseWidthRatio = params.get("ufnw")

    const modelFullEyesizeRatio = params.get("mfeye")
    const modelFullTailEyeRatio = params.get("mteye")
    const modelTopLipRatio = params.get("mtlip")
    const modelBottomLipRatio = params.get("mblip")
    const modelRightSymmetryRatio = params.get("mrsym")
    const modelLeftSymmertyRatio = params.get("mlsym")
    const modelFaceNoseHeightRatio = params.get("mfnh")
    const modelFaceNoseWidthRatio = params.get("mfnw")
    // const allModelNames = params.get("allModelNames");
    // 모델들을 담을 배열
    // const models = [];
    // let i = 1;
    // while (true) {
    //     const modelName = params.get(`model${i}`);
    //     if (!modelName) break;
    //     models.push({ "name": modelName });
    //     i++;
    // }

    // uid 받아오는 함수
    useEffect(() => {
        // User UID 가져와서 저장
        const storedUserUid = localStorage.getItem('UUID');
        // console.log(storedUserUid)
        if (storedUserUid) {
            setUserUid(storedUserUid);
        }
        // console.log(storedUserUid)
    }, []);

    // beautygan org 추가하기
    useEffect(() => {
        if (userUid) {
            console.log("Sending UUID to server:", userUid); // UUID가 제대로 출력되는지 확인
            const formData = new FormData();
            formData.append('user_uid', userUid);
            // UUID 가 django에서 조회가 되지 않아 특정 이메일을 직접 문자열로 넣어줍니다.
            formData.append('user_email', "mc@test.com");
            formData.append('used_model_name', name);

            axios.post('http://127.0.0.1:8000/api/v1/BG_result', formData)
                .then(response => {
                    console.log('BG_Success:', response.data);
                    setResponseData(response.data); // 서버 응답 데이터 저장
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    }, [userUid]);

    // 사용한 제품 (하나의 모델만 받는다면 그모델만) name 변수
    useEffect(() => {
        if (name) {
            console.log("Sending used_model_name to server:", name);
            const formData = new FormData();
            // UUID 가 django에서 조회가 되지 않아 특정 이메일을 직접 문자열로 넣어줍니다.
            formData.append('used_model_name', name);
            formData.append('user_email', "mc@test.com");
            console.log("checking used_model_name_formData to server:", name);

            axios.post('http://127.0.0.1:8000/api/v1/used_product', formData)
                .then(response => {
                    console.log('used_model_Success:', response.data);
                    setResponseData2(response.data);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    }, [name]);

    // 다른 모델 정보
    useEffect(() => {
        if (models) {
            console.log("Sending models to server:", models);

            const formData = new FormData();
            // models.forEach((item, index) => {
            //     formData.append(`models[${index}]`, item);
            // });
            formData.append('models', [models]);
            // UUID 가 django에서 조회가 되지 않아 특정 이메일을 직접 문자열로 넣어줍니다.
            formData.append('user_email', "mc@test.com");

            console.log("Checking models formData to server:", formData);
            axios.post('http://127.0.0.1:8000/api/v1/other_models', formData)
                .then(response => {
                    console.log('other_models_Success:', response.data);
                    setResponseData3(response.data);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    }, []);

    // 관련 상품 (이 함수 또한 name 변수)
    useEffect(() => {
        if (name) {
            console.log("sending Specific Brand Data", name)
            const formData = new FormData()
            formData.append('used_model_name', name)

            axios.post('http://127.0.0.1:8000/api/v1/asso_product', formData)
                .then(response => {
                    console.log('asso_product_Success:', response.data);
                    setResponseData(response.data); // 서버 응답 데이터 저장
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    }, [name])

    // GPT 코드 칸












// 테스트용 코드
// if (responseData3 && Array.isArray(responseData3)) {
//     responseData3.forEach((item, index) => {
//         if (item.modelPhotoUrl) {
//             console.log(`modelPhotoUrl at index ${index}:`, item.modelPhotoUrl);
//         } else {
//             console.log(`No modelPhotoUrl found at index ${index}`);
//         }
//     });
// } else {
//     console.log('responseData3 is not an array or is undefined');
// }
// if (responseData3 && responseData3.modelPhotoUrl) {
//     console.log('modelPhotoUrl:', responseData3.modelPhotoUrl);
// } else {
//     console.log('No modelPhotoUrl found in responseData3');
// }

    


    const userProfileImage = 'https://via.placeholder.com/150';
    const userResembleModels = [
        { name: '모델 A', similarity: 87, image: 'https://via.placeholder.com/100' },
        { name: '모델 B', similarity: 63, image: 'https://via.placeholder.com/100' },
        { name: '모델 C', similarity: 43, image: 'https://via.placeholder.com/100' },
        { name: '모델 D', similarity: 23, image: 'https://via.placeholder.com/100' },
        { name: '모델 E', similarity: 23, image: 'https://via.placeholder.com/100' }
    ];

    const productData = { 
        name: '에뛰드',
        price: 15000,
        url: 'https://example.com',
        image: 'https://via.placeholder.com/150',
        brandName: '브랜드 A'
    };

    return (
        <>
            <Header />
            <div className="container mx-auto p-6">
                <h1 className="text-3xl font-bold mb-4">가상화장</h1>
                <div className="flex justify-center mb-20">
                    <UserProfileImage src={userProfileImage} />
                    <div>
                        {responseData && responseData.result_img_path && (
                            <img src={responseData.result_img_path} alt="화장 후 사진" className="w-60 h-60 rounded-md" />
                        )}
                        <p>화장 후 사진</p>
                    </div>
                </div>

                <ProductDetails product={responseData2} />
                
                <h2 className="text-xl font-semibold mb-2">GPT 설명</h2>
                <div className="p-4 bg-gray-200 rounded-md">
                    GPT가 설명하는 칸입니다. 여기서는 화장품 또는 위에 GAN이 설명할 칸이라고 생각해주시면 되겠습니다.
                    {/* <p>name: {name}</p>
                    <p>url: {url}</p>
                    <p>modelNum: {modelNum}</p>
                    <p>allModelNames: </p> */}
                    <ul>
                        {/* {models.map((model, index) => (
                            <li key={index}>{model.name}</li>
                        ))} */}
                    </ul>
                    <p>lipSimilarity: {lipSimilarity}</p>
                    <p>eyeSimilarity: {eyeSimilarity}</p>
                    <p>eyebrowSimilarity: {eyebrowSimilarity}</p>
                    <p>noseSimilarity: {noseSimilarity}</p>
                    <p>contourSimilarity: {contourSimilarity}</p>
                    <p>allSimilarity: {allSimilarity}</p>

                    <p>userFullEyesizeRatio: {userFullEyesizeRatio}</p>
                    <p>userFullTailEyeRatio: {userFullTailEyeRatio}</p>
                    <p>userTopLipRatio: {userTopLipRatio}</p>
                    <p>userBottomLipRatio: {userBottomLipRatio}</p>
                    <p>userRightSymmetryRatio: {userRightSymmetryRatio}</p>
                    <p>userLeftSymmertyRatio: {userLeftSymmertyRatio}</p>
                    <p>userFaceNoseHeightRatio: {userFaceNoseHeightRatio}</p>
                    <p>userFaceNoseWidthRatio: {userFaceNoseWidthRatio}</p>

                    <p>modelFullEyesizeRatio: {modelFullEyesizeRatio}</p>
                    <p>modelFullTailEyeRatio: {modelFullTailEyeRatio}</p>
                    <p>modelTopLipRatio: {modelTopLipRatio}</p>
                    <p>modelBottomLipRatio: {modelBottomLipRatio}</p>
                    <p>modelRightSymmetryRatio: {modelRightSymmetryRatio}</p>
                    <p>modelLeftSymmertyRatio: {modelLeftSymmertyRatio}</p>
                    <p>modelFaceNoseHeightRatio: {modelFaceNoseHeightRatio}</p>
                    <p>modelFaceNoseWidthRatio: {modelFaceNoseWidthRatio}</p>

                </div>
                <h2 className="text-xl font-semibold mt-4 mb-4">추가로 비슷한 모델</h2>
                <div>
                    {responseData3 && Array.isArray(responseData3) ? (
                        <SimilarModels models={responseData3} />
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
                <h2 className="text-xl font-semibold mt-6 mb-4">관련 브랜드 상품</h2>
                <div className={`flex overflow-x-scroll py-3 ${styles['hide-scroll-bar']}`}>
                    <div className="flex flex-nowrap lg:ml-40 md:ml-20 ml-10">
                        {models.map((model, index) => (
                            <div key={index} className="hover:shadow-xl inline-block px-3">
                                <CardRelatedProduct />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex gap-4 content-between py-4">
                    <CardBarChart />
                    <CardRadalChart />
                </div>
                <div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default TestProductPage;
