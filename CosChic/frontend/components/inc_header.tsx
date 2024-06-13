import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu visibility

    const handleNavClick = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen); // Toggle mobile menu state on button click
    };
    return (
        <header className="bg-white">
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
                <div className="flex lg:flex-1">
                    <a href="#" className="-m-1.5 p-1.5">
                        <span className="">CosChic</span>
                        <img className="h-8 w-auto" src="logo_SmartCctv.png" alt="" />
                    </a>
                </div>
                <div className="flex lg:hidden">
                    <button onClick={handleNavClick} type="button" className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
                        <span className="sr-only">Open main menu</span>
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </button>
                </div>
                <div className="hidden lg:flex lg:gap-x-12">
                    <a href="http://localhost:18000/home" className="text-sm font-semibold leading-6 text-gray-900">홈</a>
                    <a href="http://localhost:18000/search" className="text-sm font-semibold leading-6 text-gray-900">검색</a>
                    <a href="http://localhost:18000/profile" className="text-sm font-semibold leading-6 text-gray-900">내 프로필</a>
                    <a href="http://localhost:18000/profile" className="text-sm font-semibold leading-6 text-gray-900">팀 소개</a>
                    <a href="http://localhost:18000/profile" className="text-sm font-semibold leading-6 text-gray-900">문의</a>
                </div>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    <a href="http://localhost:18000/home" className="text-sm font-semibold leading-6 text-gray-900"> <span aria-hidden="true"></span></a>
                </div>
                <div className={!isMobileMenuOpen ? "lg:hidden fixed right-0 top-[90px] w-[30%] h-full border-r border-r-gray-300 bg-[#ffffff] ease-in-out duration-500" : "md:hidden fixed left-[100%]"}>
                    <ul className='p-4'>
                        <li className='p-4 border-b border-gray-200'>홈</li>
                        <li className='p-4 border-b border-gray-200'>검색</li>
                        <li className='p-4 border-b border-gray-200'>내 프로필</li>
                        <li className='p-4 border-b border-gray-200'>팀 소개</li>
                        <li className='p-4 border-b border-gray-200'>문의</li>
                    </ul>
                </div>
            </nav>
        </header>

    )

}