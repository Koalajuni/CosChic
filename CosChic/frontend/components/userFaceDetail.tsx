import React from 'react';
interface DetailRatios {
    userFullEyesizeRatio: number;
    modelFullEyesizeRatio: number;
    userFullTailEyeRatio: number;
    modelFullTailEyeRatio: number;
    userLeftSymmertyRatio: number;
    modelLeftSymmertyRatio: number;
    userRightSymmetryRatio: number;
    modelRightSymmetryRatio: number;
    userBottomLipRatio: number;
    modelBottomLipRatio: number;
    userTopLipRatio: number;
    modelTopLipRatio: number;
    userFaceNoseHeightRatio: number;
    modelFaceNoseHeightRatio: number;
    userFaceNoseWidthRatio: number;
    modelFaceNoseWidthRatio: number;
}

interface UserFaceDetailProps {
    detailRatios: DetailRatios;
}

const UserFaceDetail: React.FC<UserFaceDetailProps> = ({ detailRatios }) => {
    const detailsData = [
        {
            category: "EYES",
            icon: "icons/eye.png",
            attributes: [
                { label: "눈 길이 비율", values: [detailRatios.userFullEyesizeRatio, detailRatios.modelFullEyesizeRatio] },
                { label: "눈 꼬리 비율", values: [detailRatios.userFullTailEyeRatio, detailRatios.modelFullTailEyeRatio] },
                { label: "왼쪽 눈 비대칭", values: [detailRatios.userLeftSymmertyRatio, detailRatios.modelLeftSymmertyRatio] },
                { label: "오른쪽 눈 비대칭", values: [detailRatios.userRightSymmetryRatio, detailRatios.modelRightSymmetryRatio] }
            ]
        },
        {
            category: "LIPS",
            icon: "icons/lip.png",
            attributes: [
                { label: "아랫입술 비율", values: [detailRatios.userBottomLipRatio, detailRatios.modelBottomLipRatio] },
                { label: "윗입술 비율", values: [detailRatios.userTopLipRatio, detailRatios.modelTopLipRatio] }
            ]
        },
        {
            category: "NOSE",
            icon: "icons/nose.png",
            attributes: [
                { label: "코 높이 비율", values: [detailRatios.userFaceNoseHeightRatio, detailRatios.modelFaceNoseHeightRatio] },
                { label: "코 넓이 비율", values: [detailRatios.userFaceNoseWidthRatio, detailRatios.modelFaceNoseWidthRatio] }
            ]
        }
    ];

    return (
        <div className="bg-white rounded-lg shadow-xl p-6 h-[700px] w-full overflow-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">분석표</h2>
            <div className="space-y-6">
                {detailsData.map((detail, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center mb-3">
                            <img src={detail.icon} alt={`${detail.category} Icon`} className="w-6 h-6 mr-2" />
                            <h3 className="text-xl font-semibold text-[#8E65B7]">{detail.category}</h3>
                        </div>
                        <table className="w-full">
                            <thead>
                                <tr className="text-sm text-gray-600">
                                    <th className="font-medium text-left py-2">비율 기준</th>
                                    <th className="font-medium text-center py-2">사용자 분석</th>
                                    <th className="font-medium text-center py-2">모델 분석</th>
                                </tr>
                            </thead>
                            <tbody>
                                {detail.attributes.map((attr, attrIndex) => (
                                    <tr key={attrIndex} className="border-t border-gray-200">
                                        <td className="py-2 text-pink-500">{attr.label}</td>
                                        {attr.values.map((value, valueIndex) => (
                                            <td key={valueIndex} className="py-2 text-center">
                                                <span className="inline-block bg-gray-100 rounded px-2 py-1 text-sm font-medium text-gray-700">
                                                    {value || '-'}
                                                </span>
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserFaceDetail;