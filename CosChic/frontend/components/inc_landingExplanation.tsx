import React from 'react';
import Image from 'next/image';

export default function IncLandingExplanation() {
    const features = [
        {
            icon: "🤖",
            title: "AI 얼굴 인식",
            description: "정확한 얼굴 유형 분석으로 맞춤형 뷰티 솔루션 제공",
            image: "/assets/landingAnalysis.png"
        },
        {
            icon: "💄",
            title: "가상 메이크업",
            description: "다양한 스타일을 시도해보고 나만의 룩 찾기",
            image: "/assets/landingGan.png"
        },
        {
            icon: "🎨",
            title: "맞춤형 추천",
            description: "개인화된 화장품 제안으로 완벽한 메이크업 실현",
            image: "/assets/landingRecsys.png"
        }
    ];

    return (
        <div className="bg-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                        <span className="block text-[#8E65B7]">나만의 완벽한 뷰티</span>
                        <span className="block text-[#FF6F91]">COSCHIC과 함께 시작하세요</span>
                    </h2>
                    <p className="mt-4 text-xl text-gray-500">
                        AI 기술로 당신만의 아름다움을 발견하고 표현하세요
                    </p>
                </div>
                <div className="mt-10">
                    {features.map((feature, index) => (
                        <div key={index} className="flex flex-col md:flex-row items-center mb-20 last:mb-0">
                            <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-8' : 'md:order-2 md:pl-8'}`}>
                                <div className="relative h-64 sm:h-80 rounded-lg overflow-hidden shadow-lg">
                                    <Image
                                        src={feature.image}
                                        alt={feature.title}
                                        layout="fill"
                                        objectFit="cover"
                                        className="transition-transform duration-300 hover:scale-105"
                                    />
                                </div>
                            </div>
                            <div className={`w-full md:w-1/2 mt-8 md:mt-0 ${index % 2 === 0 ? '' : 'md:order-1'}`}>
                                <div className="flex items-center mb-4">
                                    <span className="flex-shrink-0 inline-flex items-center justify-center h-12 w-12 rounded-md bg-gradient-to-r from-[#FF6F91] to-[#8E65B7] text-white text-2xl">
                                        {feature.icon}
                                    </span>
                                    <h3 className="ml-4 text-2xl font-bold text-gray-900">{feature.title}</h3>
                                </div>
                                <p className="text-lg text-gray-500">{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}