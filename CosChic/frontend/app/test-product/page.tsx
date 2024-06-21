"use client";
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
import styles from '@/styles/CardRelatedProduct.module.css';
import axios from "axios";
import { useUserEmail } from '@/hooks/useUserEmail';

const TestProductPage = () => {
    const [userUid, setUserUid] = useState("");
    const [responseData, setResponseData] = useState(null);
    const [responseData2, setResponseData2] = useState(null);
    const [responseData3, setResponseData3] = useState(null);
    const [responseData4, setResponseData4] = useState(null);
    const userUID = useUserUID(); // USER UID 가져오는 변수  
    const userEmail = useUserEmail(); // USER Email 가져오는 변수 
    const params = useSearchParams();
    const name = params.get("name")?.trim();
    const url = params.get("url");
    const modelNum = params.get("modelNum");
    const models = [];
    params.forEach((value, key) => {
        if (/^model\d+$/.test(key)) { models.push(value); }
    });
    const lipSimilarity = params.get("lips");
    const eyeSimilarity = params.get("eyes");
    const eyebrowSimilarity = params.get("eyebrow");
    const noseSimilarity = params.get("nose");
    const contourSimilarity = params.get("contour");
    const allSimilarity = params.get("sim");

    const userFullEyesizeRatio = params.get("ufeye");
    const userFullTailEyeRatio = params.get("uteye");
    const userTopLipRatio = params.get("utlip");
    const userBottomLipRatio = params.get("ublip");
    const userRightSymmetryRatio = params.get("ursym");
    const userLeftSymmertyRatio = params.get("ulsym");
    const userFaceNoseHeightRatio = params.get("ufnh");
    const userFaceNoseWidthRatio = params.get("ufnw");

    const modelFullEyesizeRatio = params.get("mfeye");
    const modelFullTailEyeRatio = params.get("mteye");
    const modelTopLipRatio = params.get("mtlip");
    const modelBottomLipRatio = params.get("mblip");
    const modelRightSymmetryRatio = params.get("mrsym");
    const modelLeftSymmertyRatio = params.get("mlsym");
    const modelFaceNoseHeightRatio = params.get("mfnh");
    const modelFaceNoseWidthRatio = params.get("mfnw");

    // uid 받아오는 함수
    useEffect(() => {
        // User UID 가져와서 저장
        const storedUserUid = localStorage.getItem('UUID');
        if (storedUserUid) {
            setUserUid(storedUserUid);
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch beautygan org data
                const formData1 = new FormData();
                formData1.append('user_uid', userUid);
                formData1.append('user_email', userEmail);
                formData1.append('used_model_name', name);

                const beautyganResponse = await axios.post('http://127.0.0.1:8000/api/v1/BG_result', formData1);
                setResponseData(beautyganResponse.data);
            } catch (error) {
                console.error('Error fetching beautygan data:', error);
            }

            try {
                // Fetch used product data
                const formData2 = new FormData();
                formData2.append('used_model_name', name);
                formData2.append('user_email', userEmail);

                const usedProductResponse = await axios.post('http://127.0.0.1:8000/api/v1/used_product', formData2);
                setResponseData2(usedProductResponse.data);
            } catch (error) {
                console.error('Error fetching used product data:', error);
            }

            try {
                // Fetch other models data
                const formData3 = new FormData();
                formData3.append('models', JSON.stringify(models));
                formData3.append('user_email', userEmail);

                const otherModelsResponse = await axios.post('http://127.0.0.1:8000/api/v1/other_models', formData3);
                setResponseData3(otherModelsResponse.data);
            } catch (error) {
                console.error('Error fetching other models data:', error);
            }

            try {
                // Fetch related products data
                const formData4 = new FormData();
                formData4.append('used_model_name', name);

                const relatedProductsResponse = await axios.post('http://127.0.0.1:8000/api/v1/asso_product', formData4);
                setResponseData4(relatedProductsResponse.data);
                console.log("this is how the brand related will appear", relatedProductsResponse.data)
            } catch (error) {
                console.error('Error fetching related products data:', error);
            }
        };

        if (userUid && name) {
            fetchData();
        }
    }, [userUid, name]);

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

    return (
        <>
            <Header />
            <div className="container mx-auto p-6">
                <h1 className="text-3xl font-bold mb-4">가상화장</h1>
                <div className="flex justify-center mb-20">
                    <div>
                        {responseData && responseData.org_image && (
                            <img src={responseData.org_image} alt="원본 사진" className="w-60 h-60 rounded-md mr-40" />
                        )}
                        <p>원본 사진</p>
                    </div>
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
                        {responseData4 && responseData4.map((product, index) => (
                            <div key={index} className="hover:shadow-xl inline-block px-3">
                                <CardRelatedProduct product={product} name={name} />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex gap-4 content-between py-4">
                    <CardBarChart eye={eyeSimilarity} nose={noseSimilarity} lips={lipSimilarity} eyebrows={eyebrowSimilarity} contour={contourSimilarity} total={allSimilarity} />
                    <CardRadalChart eye={eyeSimilarity} nose={noseSimilarity} lips={lipSimilarity} eyebrows={eyebrowSimilarity} contour={contourSimilarity} />
                </div>
                <div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default TestProductPage;