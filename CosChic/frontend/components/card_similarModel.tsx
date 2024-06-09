'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const CardSimilarModel = ({ models }) => {
    const router = useRouter();

    const handleRedirect = () => {
        router.push('/test-product');
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">비슷한 모델</h2>
            <div className="space-y-4">
                {models.map((model, index) => (
                    <div key={index} className="flex items-center border-b pb-4">
                        {/* Profile Image */}
                        <div className="w-1/4 flex justify-center">
                            <div className="w-24 h-24 bg-gray-300 rounded-full"></div>
                        </div>

                        {/* Information */}
                        <div className="w-1/2 px-4">
                            <h3 className="text-lg font-semibold">{model.name}</h3>
                            <p>입술: {model.lips}%</p>
                            <p>눈: {model.eyes}%</p>
                            <p>윤곽: {model.contour}%</p>
                            <p>유사도: {model.similarity}%</p>
                        </div>

                        {/* Button Container */}
                        <div className="w-1/4 flex justify-center">
                            <div className="bg-gray-200 p-4 rounded-lg flex flex-col items-center">
                                <span className="mb-2">관련 상품 {model.product}</span>
                                <button
                                    type="button"
                                    className="text-white bg-red-500 hover:bg-red-600 font-medium rounded-lg text-sm px-4 py-2"
                                    onClick={handleRedirect}
                                >
                                    가상 화장 입히기
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CardSimilarModel;
