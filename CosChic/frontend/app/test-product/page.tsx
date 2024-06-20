"use client"
import UserProfileImage from '@/components/userProfileImage';
import React, { useState, useEffect } from 'react';
import ProductDetails from '@/components/productDetails';
import SimilarModels from '@/components/similarModels';
import Header from '@/components/inc_header';
import Footer from '@/components/inc_footer';
import useUserUID from "@/hooks/useUserUID";
import { useSearchParams } from "next/navigation";
<<<<<<< HEAD
import axios from 'axios';
// 0620 11:11 backup
=======
import CardBarChart from '@/components/card_barChart';
import CardRadalChart from '@/components/card_radalChart';
import CardRelatedProduct from '@/components/card_relatedProduct';
import styles from '@/styles//CardRelatedProduct.module.css';
import axios from "axios";


>>>>>>> aa1b4f189de7dfa00066f3caf8f5794bc99748c4
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
        if (/^model\d+$/.test(key)) { models.push(value); }
    });
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

<<<<<<< HEAD
// beautygan org 추가하기
useEffect(() => {
    if (userUid) {
        console.log("Sending UUID to server:", userUid); // UUID가 제대로 출력되는지 확인
        const formData = new FormData();
        formData.append('user_uid', userUid);
        // UUID 가 django에서 조회가 되지 않아 특정 이메일을 직접 문자열로 넣어줍니다.
        formData.append('user_email', "mc@test.com");
        formData.append('used_model_name',name)
        axios.post('http://127.0.0.1:8000/api/v1/BG_result', formData)
            .then(response => {
                console.log('Success:', response.data);
                setResponseData(response.data); // 서버 응답 데이터 저장
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
}, [userUid]);

// 사용한 제품 (하나의 모델만 받는다면 그모델만) name 변수
useEffect(() => {
    if (name)  {
        console.log("Sending used_model_name to server:", name);
        const formData = new FormData();
        // UUID 가 django에서 조회가 되지 않아 특정 이메일을 직접 문자열로 넣어줍니다.
        formData.append('used_model_name', name);
        formData.append('user_email', "mc@test.com");
        console.log("checking used_model_name_formData to server:", name);
        
        axios.post('http://127.0.0.1:8000/api/v1/used_product', formData)
            .then(response => {
                console.log('used_product_Success:', response.data);
                setResponseData2(response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
}, [name]);
=======
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

            axios.post('http://127.0.0.1:8000/api/v1/BG_result', formData)
                .then(response => {
                    console.log('Success:', response.data);
                    setResponseData(response.data); // 서버 응답 데이터 저장
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    }, [userUid]);
>>>>>>> aa1b4f189de7dfa00066f3caf8f5794bc99748c4

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
                    console.log('Success:', response.data);
                    setResponseData2(response.data);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    }, [name]);

<<<<<<< HEAD
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
=======
    // 다른 모델 정보
    useEffect(() => {
        if (models) {
            console.log("Sending models to server:", models);
>>>>>>> aa1b4f189de7dfa00066f3caf8f5794bc99748c4

            const formData = new FormData();
            // models.forEach((item, index) => {
            //     formData.append(`models[${index}]`, item);
            // });
            formData.append('models', [models]);
            // UUID 가 django에서 조회가 되지 않아 특정 이메일을 직접 문자열로 넣어줍니다.
            formData.append('user_email', "mc@test.com");

<<<<<<< HEAD
        axios.post('http://127.0.0.1:8000/api/v1/asso_product',formData)
            .then(response => {
                console.log('asso_product_Success:', response.data);
                setResponseData4(response.data); // 서버 응답 데이터 저장
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
},[name])

// GPT 코드 칸 
=======
            console.log("Checking models formData to server:", formData);
            axios.post('http://127.0.0.1:8000/api/v1/other_models', formData)
                .then(response => {
                    console.log('Success:', response.data);
                    setResponseData2(response.data);
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
                    console.log('Success:', response.data);
                    setResponseData(response.data); // 서버 응답 데이터 저장
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    }, [name])

    // GPT 코드 칸








>>>>>>> aa1b4f189de7dfa00066f3caf8f5794bc99748c4




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
                </div>
<<<<<<< HEAD
                <h2 className="text-xl font-semibold mt-4 mb-2">추가로 비슷한 모델</h2>

                <div>
                    {responseData3 && Array.isArray(responseData3) ? (
                        <SimilarModels models={responseData3} />
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>

                <h2 className="text-xl font-semibold mt-4 mb-2">관련 브랜드 상품</h2>
                <div className="flex justify-around">
                    {/* Add related brand products here */}
                    <div className="w-1/4 p-2">
                        <div className="bg-gray-300 p-4 rounded-md">관련 상품 A</div>
                    </div>
                    <div className="w-1/4 p-2">
                        <div className="bg-gray-300 p-4 rounded-md">관련 상품 B</div>
                    </div>
                    <div className="w-1/4 p-2">
                        <div className="bg-gray-300 p-4 rounded-md">관련 상품 C</div>
                    </div>
                    <div className="w-1/4 p-2">
                        <div className="bg-gray-300 p-4 rounded-md">관련 상품 D</div>
=======
                <h2 className="text-xl font-semibold mt-4 mb-4">추가로 비슷한 모델</h2>
                <SimilarModels models={userResembleModels} />
                <h2 className="text-xl font-semibold mt-6 mb-4">관련 브랜드 상품</h2>
                <div className={`flex overflow-x-scroll py-3 ${styles['hide-scroll-bar']}`}>
                    <div className="flex flex-nowrap lg:ml-40 md:ml-20 ml-10">
                        {models.map((model, index) => (
                            <div key={index} className="hover:shadow-xl inline-block px-3">
                                <CardRelatedProduct />
                            </div>
                        ))}
>>>>>>> aa1b4f189de7dfa00066f3caf8f5794bc99748c4
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
