"use client"
import { ReactTyped } from "react-typed"

export default function IncHero() {
    return (
        <div className="HERO text-black">
            <div className="py-10 max-w-[800px] mt-[40px] w-full mx-auto text-center flex flex-col justify-center">
                <p className="text-text-white font-bold p-2" style={{ color: '#8E65B7' }}>내가 원하는 스타일, 이제 나에게 맞게</p>
                <h1 className="md:text-6xl sm:text-5xl text-3xl font-bold md:py-6" style={{ color: '#FF6F91' }}>Your AI Stylist</h1>
                <div>
                    <p className="md:text-4xl sm:text-3xl text-xl font-bold">
                        <ReactTyped
                            className=''
                            strings={[
                                '쉽고 간편한 화장법',
                                'AI로 얼굴 분석하기',
                                '인공지능 스타일리스트',
                                'Beta 1.0 운영중입니다'
                            ]}
                            typeSpeed={60}
                            backSpeed={60}
                            loop
                        />
                    </p>
                </div>
                <a href="/login" className="bg-[#C598F0] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-white">지금 시작하기</a>
            </div>
        </div>
    )
}