"use client"
import { FiMenu, FiX } from "react-icons/fi";
import { useState } from "react";

export default function IncHero() {
    const [nav, setNav] = useState(false);

    const handleNav = () => {
        setNav(!nav);
    };

    return (
        <div className="NAV">
            <div
                className="flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-white"
            // style={{ backgroundColor: '#FF6F91' }} // 배경색 변경
            >
                <h1 className="w-full text-3xl font-bold text-[#FF6F91] m-4">COSCHIC</h1> {/* 배경 색 변경 */}
                <ul className="hidden md:flex">
                </ul>
                <div className="block md:hidden" onClick={handleNav}>
                    {!nav ? <FiMenu size={28} /> : <FiX size={28} />}
                </div>
            </div>
            <div
                className={`md:hidden fixed left-0 top-[90px] w-[50%] h-full border-r border-r-gray-900 ease-in-out duration-500 ${nav ? 'left-0' : 'left-[100%]'}`}
                style={{ backgroundColor: '' }} // 배경색 변경
            >
                <ul className="p-4 uppercase">
                    <li className="p-2 border-b border-gray-600">홈</li> {/* 모바일 메뉴 아이템 */}
                    <li className="p-2 border-b border-gray-600">검색</li> {/* 모바일 메뉴 아이템 */}
                    <li className="p-2 border-b border-gray-600">내프로필</li> {/* 모바일 메뉴 아이템 */}
                    <li className="p-2 border-b border-gray-600">팀소개</li> {/* 모바일 메뉴 아이템 */}
                    <li className="p-2 border-b border-gray-600">문의</li> {/* 모바일 메뉴 아이템 */}
                </ul>
            </div>
        </div>
    );
}
