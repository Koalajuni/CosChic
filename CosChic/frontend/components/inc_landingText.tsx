import React from 'react';
import { FaRobot, FaGift, FaBalanceScale, FaMagic } from 'react-icons/fa';

export default function IncAnaly() {
    return (
        <div className="ANALY bg-gradient-to-b from-purple-100 to-white">
            <div className="w-full px-4 py-16">
                <div className="max-w-[1240px] mx-auto grid md:grid-cols-2 gap-20">
                    <div className="w-full mx-auto my-4 relative">
                        <div className="absolute inset-0 bg-purple-300 rounded-lg transform -rotate-6"></div>
                        <video className="relative z-10 rounded-lg shadow-2xl" width="100%" height="auto" controls autoPlay muted loop>
                            <source src="/videos/coschic.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                    <div className="flex flex-col justify-center">
                        <h2 className="text-[#8E65B7] font-bold text-2xl mb-2">내가 원하는 스타일, 나에게 맞게</h2>
                        <h1 className="text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#FF6F91] to-[#8E65B7]">
                            COSCHIC
                        </h1>
                        <p className="text-gray-600 mb-8">
                            나만을 위한 AI 뷰티 솔루션. COSCHIC으로 나만의 완벽한 스타을 발견해요.
                        </p>
                        <div className="grid grid-cols-2 gap-6">
                            {[
                                { icon: <FaRobot />, title: "AI 얼굴 인식", description: "정확한 얼굴 유형 분석" },
                                { icon: <FaGift />, title: "맞춤형 추천", description: "개인화된 화장품 제안" },
                                { icon: <FaBalanceScale />, title: "제품 비교", description: "최적의 선택을 위한 비교" },
                                { icon: <FaMagic />, title: "가상 메이크업", description: "다양한 스타일 시뮬레이션" }
                            ].map((item, index) => (
                                <div key={index} className="flex items-start space-x-3">
                                    <div className="text-purple-500 text-2xl">{item.icon}</div>
                                    <div>
                                        <h3 className="font-semibold text-gray-800">{item.title}</h3>
                                        <p className="text-sm text-gray-600">{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <a href="/login" className="mt-8 bg-gradient-to-r from-[#FF6F91] to-[#8E65B7] text-center text-white font-bold py-3 px-6 rounded-full hover:shadow-lg transform hover:-translate-y-1 transition duration-300">
                            지금 시작하기
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}