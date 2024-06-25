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
import UserFaceDetail from '@/components/userFaceDetail';
import LoadingProcess from "@/components/loadingProcess"
import axiosInstance from '@/hooks/axiosConfig';

const TestProductPage = () => {
    const [userUid, setUserUid] = useState("");
    const [responseData, setResponseData] = useState(null);
    const [responseData2, setResponseData2] = useState(null);
    const [responseData3, setResponseData3] = useState(null);
    const [responseData4, setResponseData4] = useState(null);
    const [loading, setLoading] = useState<boolean>(false);
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

    const paramsRatio = {
        userFullEyesizeRatio: userFullEyesizeRatio,
        userFullTailEyeRatio: userFullTailEyeRatio,
        userTopLipRatio: userTopLipRatio,
        userBottomLipRatio: userBottomLipRatio,
        userRightSymmetryRatio: userRightSymmetryRatio,
        userLeftSymmertyRatio: userLeftSymmertyRatio,
        userFaceNoseHeightRatio: userFaceNoseHeightRatio,
        userFaceNoseWidthRatio: userFaceNoseWidthRatio,

        modelFullEyesizeRatio: modelFullEyesizeRatio,
        modelFullTailEyeRatio: modelFullTailEyeRatio,
        modelTopLipRatio: modelTopLipRatio,
        modelBottomLipRatio: modelBottomLipRatio,
        modelRightSymmetryRatio: modelRightSymmetryRatio,
        modelLeftSymmertyRatio: modelLeftSymmertyRatio,
        modelFaceNoseHeightRatio: modelFaceNoseHeightRatio,
        modelFaceNoseWidthRatio: modelFaceNoseWidthRatio
    };
    const [isLoading, setIsLoading] = useState(true);

    // uid 받아오는 함수
    useEffect(() => {
        // User UID 가져와서 저장
        const storedData = localStorage.getItem('userData');
        if (storedData) {
            try {
                const parsedData = JSON.parse(storedData);
                setUserUid(parsedData.UUID || null);
            } catch (error) {
                console.error('Failed to parse user data from localStorage:', error);
            } finally {
                setLoading(false);
            }
        } else {
            setLoading(false);
            console.error('No user data found in localStorage');
        }
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);


    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch beautygan org data
                const formData1 = new FormData();
                formData1.append('user_uid', userUid);
                formData1.append('user_email', userEmail);
                formData1.append('used_model_name', name);
                console.log("getting formdata", formData1)

                const beautyganResponse = await axiosInstance.post('/BG_result', formData1);
                setResponseData(beautyganResponse.data);
            } catch (error) {
                console.error('Error fetching beautygan data:', error);
            }

            try {
                // Fetch used product data
                const formData2 = new FormData();
                formData2.append('used_model_name', name);
                formData2.append('user_email', userEmail);
                const usedProductResponse = await axiosInstance.post('/used_product', formData2);
                setResponseData2(usedProductResponse.data);
            } catch (error) {
                console.error('Error fetching used product data:', error);
            }

            try {
                // Fetch other models data
                const formData3 = new FormData();
                formData3.append('models', JSON.stringify(models));
                formData3.append('user_email', userEmail);
                const otherModelsResponse = await axiosInstance.post('/other_models', formData3);
                setResponseData3(otherModelsResponse.data);
            } catch (error) {
                console.error('Error fetching other models data:', error);
            }

            try {
                // Fetch related products data
                const formData4 = new FormData();
                formData4.append('used_model_name', name);

                const relatedProductsResponse = await axiosInstance.post('/asso_product', formData4);
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
            {loading ? (
                <LoadingProcess />
            ) : (
            <div className="container mx-auto p-6">
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">가상 메이크업 시뮬레이터</h1>

                <div className="flex justify-center items-center mb-10 bg-gradient-to-r from-pink-100 to-purple-100 rounded-xl shadow-2xl overflow-hidden">
                    <div className="w-1/2 p-6 flex flex-col items-center border-r border-gray-200">
                        {responseData && responseData.org_image && (
                            <div className="relative">
                                <img src={responseData.org_image} alt="원본 사진" className="w-80 h-80 object-cover rounded-lg shadow-md" />
                                <div className="absolute top-2 left-2 bg-white rounded-full p-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                            </div>
                        )}
                        <p className="text-lg font-semibold text-gray-700 mt-4">원본 사진</p>
                    </div>

                    <div className="w-1/2 p-6 flex flex-col items-center">
                        {responseData && responseData.result_img_path && (
                            <div className="relative">
                                <img src={responseData.result_img_path} alt="화장 후 사진" className="w-80 h-80 object-cover rounded-lg shadow-md" />
                                <div className="absolute top-2 right-2 bg-white rounded-full p-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                    </svg>
                                </div>
                            </div>
                        )}
                        <p className="text-lg font-semibold text-gray-700 mt-4">화장 후 사진</p>
                    </div>
                </div>
                <h1 className="text-3xl font-semibold mb-2">My Beauty</h1>
                <section className="analysis row flex justify-start gap-8 py-8">
                    <div className="left side">
                        <div>
                            <CardBarChart eye={eyeSimilarity} nose={noseSimilarity} lips={lipSimilarity} eyebrows={eyebrowSimilarity} contour={contourSimilarity} total={allSimilarity} />
                        </div>
                        <div className="py-2">
                            <CardRadalChart eye={eyeSimilarity} nose={noseSimilarity} lips={lipSimilarity} eyebrows={eyebrowSimilarity} contour={contourSimilarity} />
                        </div>
                    </div>
                    <UserFaceDetail detailRatios={paramsRatio} />
                </section>

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

                <div>
                </div>
            </div>
            )}
            <Footer />
        </>
    );
};

export default TestProductPage;