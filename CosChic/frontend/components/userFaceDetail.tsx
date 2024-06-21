import React from 'react';


const UserFaceDetail = ({ detailRatios }) => {

    const detailsData = [
        {
            category: "EYES",
            icon: "icons/eye.png",
            attributes: [
                { label: "눈 길이 비율", values: [detailRatios.userFullEyesizeRatio, detailRatios.modelFullEyesizeRatio] },
                { label: "눈 꼬리 비율", values: [detailRatios.userFullTailEyeRatio, detailRatios.modelFullTailEyeRatio] },
                { label: "왼쪽 눈 비대칭", values: [detailRatios.userLeftSymmertyRatio, detailRatios.modelLeftSymmertyRatio] },
                { label: "오른쪽 눈 비대칭", values: [detailRatios.userRightSymmetryRatio, detailRatios.modelRightSymmetryRatio], color: "bg-black" }
            ]
        },
        {
            category: "LIPS",
            icon: "icons/lip.png",
            attributes: [
                { label: "아랫입술 비율", values: [detailRatios.userBottomLipRatio, detailRatios.modelBottomLipRatio] },
                { label: "윗입술 비율", values: [detailRatios.userTopLipRatio, detailRatios.modelTopLipRatio], color: "bg-red-500" }
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
        <div className="bg-white text-gray-500 rounded shadow-xl py-2 px-5 h-[600px] w-full overflow-auto">
            <table className="w-full table-auto">
                <thead>
                    <tr className="justify-start">
                        <th className="text-xl text-black font-semibold mt-2 ml-4 py-2 text-start" colSpan={4}>분석표</th>
                    </tr>
                    <tr className="justify-start">
                        <th className="px-4 py-2"></th>
                        <th className="px-4 py-2">비율 기준</th>
                        <th className="px-4 py-2 text-center">사용자 분석</th>
                        <th className="px-4 py-2 text-center">모델 분석</th>
                    </tr>
                </thead>
                <tbody>
                    {detailsData.map((detail, index) => (
                        <React.Fragment key={index}>
                            <tr>
                                <td className="flex w-full items-center px-4 py-2" colSpan={4}>
                                    <img src={detail.icon} alt={`${detail.category} Icon`} className="w-6 h-6 mr-4" />
                                    <span className="text-xl text-[#8E65B7] font-semibold">{detail.category}</span>
                                </td>
                            </tr>
                            {detail.attributes.map((attr, attrIndex) => (
                                <tr key={attrIndex} className="bg-white justify-center items-center border-b border-gray-200">
                                    <td className="px-4 py-2"></td>
                                    <td className="px-4 py-2 text-center text-pink-500">{attr.label}</td>
                                    {attr.values.map((value, valueIndex) => (
                                        <td key={valueIndex} className="px-4 py-2 text-center">
                                            {value ? (
                                                <span className="w-auto text-black">{value}</span>
                                            ) : (
                                                <div className={`w-8 h-4 ${attr.color} border border-gray-300`}></div>
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserFaceDetail;
