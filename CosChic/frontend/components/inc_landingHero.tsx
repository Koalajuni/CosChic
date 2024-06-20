"use client"
import { ReactTyped } from "react-typed"

export default function IncHero() {
    return(
        <div className="HERO text-black">
            <div className="py-10 max-w-[800px] mt-[40px] w-full mx-auto text-center flex flex-col justify-center">
            <p className="text-text-white font-bold p-2" style={{ color: '#8E65B7' }}>인공지능을 통해 고객의 얼굴 유형에 완벽하게 맞는 맞춤형 !!!</p>
            <h1 className="md:text-6xl sm:text-5xl text-3xl font-bold md:py-6" style={{ color: '#FF6F91' }}>Your AI Stylist</h1>
                <div>
                    <p className="md:text-4xl sm:text-3xl text-xl font-bold">
                        <ReactTyped
                        className=''
                        strings={[
                            '쉽고 간편한 프로그램 직접 경험하세요.',
                            '새로운 서비스를 경험해보세요.',
                            'COSCHIC이 추천드려요.',
                            '6월말일까지 30% 할인행사 합니다.'
                        ]}
                        typeSpeed={80}
                        backSpeed={80}
                        loop
                        />
                    </p>
                </div>
                <button className="bg-[#C598F0] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-black">로그인</button>
                <button className="bg-[#C598F0] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-black">회원가입</button>
            </div>
        </div>
    )
}