'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const CardSimilarModel = ({ models }) => {
    const router = useRouter();

    const handleRedirect = (model) => {
        console.log('Model:', model);  // 모델 전체 데이터 로그
        const modelNamesArray = model.allModelNames.split(','); // 모델 이름을 배열로 분할
        const modelNamesParams = modelNamesArray.map((name, index) => `model${index + 1}=${name}`).join('&'); // 매개변수 형식으로 변환
        const url = `/test-product?name=${model.modelName}
        &url=${model.photoUrl}
        &modelNum=${model.modelNum}&${modelNamesParams}
        &lips=${model.lips}
        &eyes=${model.eyes}
        &eyebrow=${model.eyebrow}
        &nose=${model.nose}
        &contour=${model.contour}
        &sim=${model.similarity}
        &ufeye=${model.userFullEyesizeRatio}
        &uteye=${model.userFullTailEyeRatio}
        &utlip=${model.userTopLipRatio}
        &ublip=${model.userBottomLipRatio}
        &ursym=${model.userRightSymmetryRatio}
        &ulsym=${model.userLeftSymmertyRatio}
        &ufnh=${model.userFaceNoseHeightRatio}
        &ufnw=${model.userFaceNoseWidthRatio}
        &mfeye=${model.modelFullEyesizeRatio}
        &mteye=${model.modelFullTailEyeRatio}
        &mtlip=${model.modelTopLipRatio}
        &mblip=${model.modelBottomLipRatio}
        &mrsym=${model.modelRightSymmetryRatio}
        &mlsym=${model.modelLeftSymmertyRatio}
        &mfnh=${model.modelFaceNoseHeightRatio}
        &mfnw=${model.modelFaceNoseWidthRatio}
        
        `;
        // const url = `/test-product?name=${model.modelName}&url=${model.photoUrl}&modelNum=${model.modelNum}&allModelNames=${model.allModelNames}`;
        router.push(url);

    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">비슷한 모델</h2>
            <div className="space-y-4">
                {models && models.length > 0 ? (
                    models.map((model, index) => (
                        <div key={index} className="flex items-center border-b pb-4">
                            {/* Profile Image */}
                            <div className="w-1/4 flex justify-center">
                                <div className="w-24 h-24 bg-gray-300 rounded-full">
                                    <img src={model.photoUrl} />
                                </div>
                            </div>

                            {/* Information */}
                            <div className="w-1/2 px-4">
                                <h3 className="text-lg font-semibold">{model.modelName}</h3>
                                <p>입술: {model.lips}%</p>
                                <p>눈: {model.eyes}%</p>
                                <p>윤곽: {model.contour}%</p>
                                <p>유사도: {model.similarity}%</p>
                            </div>

                            {/* Button Container */}
                            <div className="w-1/4 flex justify-center">
                                <div className="bg-gray-200 p-4 rounded-lg flex flex-col items-center">
                                    <span className="mb-2">관련 상품: {model.product}</span>
                                    <button
                                        type="button"
                                        className="text-white bg-red-500 hover:bg-red-600 font-medium rounded-lg text-sm px-4 py-2"
                                        onClick={() => {
                                            // alert(model.modelName);
                                            handleRedirect(model)
                                            // alert(model.allModelNames)
                                        }}
                                    >
                                        가상 화장 입히기
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>비슷한 모델이 없습니다.</p>
                )}
            </div>
        </div>
    );
};

export default CardSimilarModel;
