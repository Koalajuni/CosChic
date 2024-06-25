// CardSearchProduct.js
"use client";
import React from 'react';
import Swal from "sweetalert2"


interface CardSearchProductProps {
    image: string;
    title: string;
    description: string;
    price: string;
    count: string;
    category: string;
    productUrl: string;
}

const CardSearchProduct: React.FC<CardSearchProductProps> = ({ image, title, description, price, count, category, productUrl }) => {
    const clickMoreDetails = () => {
        Swal.fire("준비 중인 기능입니다", '비즈니스 관련 문의는 문의 페이지를 방문해주세요', 'info'); // 사용자에게 오류 메시지 표시
    };
    return (
        <section className="w-screen">
            <div className="m-4 mx-auto max-w-screen-lg rounded-md border border-gray-100 text-gray-600">
                <div className="relative flex ml-4 h-full flex-col text-gray-600 md:flex-row">
                    <div className="relative p-4 md:w-4/6">
                        <div className="flex flex-col md:flex-row">
                            <h2 className="mb-1 text-2xl font-black">{title}</h2>
                            <span className="ml-2 text-xs uppercase">{category}</span>
                        </div>
                        <p className="mt-3 font-sans text-base tracking-normal">{description}</p>
                        <div className="flex flex-col md:flex-row md:items-end">
                            <p className="mt-6 text-2xl font-black">{price}<sup className="align-sub text-sm">원</sup></p>
                            <span className="ml-2 text-xs uppercase">조회수 {count}</span>
                        </div>
                        <div className="mt-6 flex flex-col sm:flex-row">
                            <button className="mr-2 mb-2 flex cursor-pointer items-center justify-center rounded-md bg-[#8E65B7] py-2 px-8 text-center text-white transition duration-150 ease-in-out hover:translate-y-1 hover:bg-emerald-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                <a href={productUrl}>구매하기</a>
                            </button>
                            <button onClick={clickMoreDetails} className="mr-2 mb-2 flex cursor-pointer items-center justify-center rounded-md border py-2 px-8 text-center text-gray-500 transition duration-150 ease-in-out hover:translate-y-1 hover:bg-rose-500 hover:text-white">상세정보 보기</button>
                        </div>
                    </div>
                    <div className="mx-auto flex items-center px-5 pt-1">
                        <img className="block h-44 rounded-m shadow" src={image} alt="Shop image" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CardSearchProduct;
