'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Model } from '@/types/model';

interface BarChartProps {
    value: number;
    maxValue: number;
    color: string;
}

interface CardSimilarModelProps {
    models: Model[];
}


const BarChart: React.FC<BarChartProps> = ({ value, maxValue, color }) => (
    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700 relative">
        <div
            className="h-2.5 rounded-full"
            style={{ width: `${(value / maxValue) * 100}%`, backgroundColor: color }}
        ></div>
        <span className="absolute right-0 top-0 -mt-6 text-xs text-gray-600">{value.toFixed(1)}</span>
    </div>
);

const CardSimilarModel: React.FC<CardSimilarModelProps> = ({ models }) => {
    const router = useRouter();

    const handleRedirect = (model: Model) => {
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
        <div className="p-6 bg-white rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Similar Models</h2>
            <div className="space-y-8">
                {models && models.length > 0 ? (
                    models.map((model, index) => (
                        <div key={index} className="flex flex-col md:flex-row items-center bg-gray-50 rounded-xl p-6 transition-shadow duration-300 hover:shadow-md">
                            {/* Profile Image */}
                            <div className="w-full md:w-1/4 flex justify-center mb-4 md:mb-0">
                                <div className="w-32 h-32 bg-gray-300 rounded-full overflow-hidden shadow-lg">
                                    <img src={model.photoUrl} alt={model.modelName} className="w-full h-full object-cover" />
                                </div>
                            </div>

                            {/* Information */}
                            <div className="w-full md:w-1/2 px-4">
                                <h3 className="text-xl font-semibold mb-4 text-gray-800">{model.modelName}</h3>
                                <div className="space-y-2">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Lips</p>
                                        <BarChart value={model.lips} maxValue={100} color="#FF6B6B" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Eyes</p>
                                        <BarChart value={model.eyes} maxValue={100} color="#4ECDC4" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Contour</p>
                                        <BarChart value={model.contour} maxValue={100} color="#45B7D1" />
                                    </div>
                                    <div className="mt-4 pt-2 border-t border-gray-200">
                                        <p className="text-sm font-bold text-gray-700">Total Similarity Score</p>
                                        <BarChart value={model.similarity} maxValue={100} color="#FF6F91" />
                                    </div>
                                </div>
                            </div>

                            {/* Button Container */}
                            <div className="w-full md:w-1/4 flex justify-center mt-4 md:mt-0">
                                <div className="bg-white p-4 rounded-lg flex flex-col items-center shadow-md">
                                    <span className="mb-2 text-sm font-medium text-gray-600">Related Product: {model.product}</span>
                                    <button
                                        type="button"
                                        className="text-white bg-gradient-to-r from-[#FF6F91] to-[#8E65B7] hover:from-[#FF5B82] hover:to-[#7A52A5] font-medium rounded-full text-sm px-6 py-3 transition duration-300 ease-in-out"
                                        onClick={() => handleRedirect(model)}
                                    >
                                        Try Virtual Makeup

                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">No similar models found.</p>
                )}
            </div>
        </div>
    );
};

export default CardSimilarModel;