import UserProfileImage from '@/components/userProfileImage';
import React, { useState, useEffect } from 'react';
import ProductDetails from '@/components/productDetails';
import SimilarModels from '@/components/similarModels';
import Header from '@/components/inc_header';
import Footer from '@/components/inc_footer';

const TestProductPage = () => {

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

    {/*        더미 모델 공간입니다             */ }

    //주의: 
    //여기서 실제 DB안에 있는 유저 모델 정보를 입력해서 사용해주세요 
    // String인지, number인지 확인하고 아래 기입해주세요

    const dummyUserData = {
        "model": "",
        "pk": "",
        "fields": {
            "names": "",
            "age": "",
            "gender": "",
            "email": "",
            "createDate": "",
            "password": "",
            "IP": "",
            "uploadDate": "",
            "orgImage": "",
            "UUID": ""
        }
    };
    const dummyProductData = {
        "model": "",
        "pk": 1,
        "fields": {
            "productUrl": "",
            "productName": "",
            "brandName": "",
            "price": "",
            "productImage": "",
            "modelImage": "",
            "count": "",
            "categoryId": "",
            "category": ""
        }
    };
    {/*        더미 모델 공간입니다             */ }

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
                        <img src={productData.image} alt="화장 후 사진" className="w-60 h-60 rounded-md" />
                        <p>화장 후 사진</p>
                    </div>
                </div>
                <ProductDetails product={productData} />
                <h2 className="text-xl font-semibold mb-2">GPT 설명</h2>
                <div className="p-4 bg-gray-200 rounded-md">
                    GPT가 설명하는 칸입니다. 여기서는 화장품 또는 위에 GAN이 설명할 칸이라고 생각해주시면 되겠습니다.
                </div>
                <h2 className="text-xl font-semibold mt-4 mb-2">추가로 비슷한 모델</h2>
                <SimilarModels models={userResembleModels} />
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
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default TestProductPage;
