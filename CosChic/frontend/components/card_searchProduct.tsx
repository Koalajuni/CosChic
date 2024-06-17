"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CardSearchProduct = ({ }) => {

    return (

        <section className="w-screen">

            <div className="m-4 mx-auto max-w-screen-lg rounded-md border border-gray-100 text-gray-600">
                <div className="relative flex ml-4 h-full flex-col text-gray-600 md:flex-row">
                    <div className="relative p-4 md:w-4/6">
                        <div className="flex flex-col md:flex-row">
                            <h2 className="mb-1 text-2xl font-black">제품 이름</h2>
                            <span className="ml-2 text-xs uppercase">카테고리</span>
                        </div>
                        <p className="mt-3 font-sans text-base tracking-normal">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos voluptate vero soluta voluptatum error non.</p>
                        <div className="flex flex-col md:flex-row md:items-end">
                            <p className="mt-6 text-2xl font-black">₩15000<sup className="align-sub text-sm">원</sup></p>
                            <span className="ml-2 text-xs uppercase">조회수 254</span>
                        </div>
                        <div className="mt-6 flex flex-col sm:flex-row">
                            <button className="mr-2 mb-2 flex cursor-pointer items-center justify-center rounded-md bg-emerald-400 py-2 px-8 text-center text-white transition duration-150 ease-in-out hover:translate-y-1 hover:bg-emerald-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                구매하기
                            </button>
                            <button className="mr-2 mb-4 flex cursor-pointer items-center justify-center rounded-md border py-2 px-8 text-center text-gray-500 transition duration-150 ease-in-out hover:translate-y-1 hover:bg-rose-500 hover:text-white">웹사이트 보기</button>
                        </div>
                    </div>
                    <div className="mx-auto flex items-center px-5 pt-1 md:p-8">
                        <img className="block h-auto max-w-full rounded-md shadow-lg" src="/images/4PQXlbagb4MqcadNmeo0D.png" alt="Shop image" />
                    </div>
                </div>
            </div>

        </section>


    );
};

export default CardSearchProduct;
