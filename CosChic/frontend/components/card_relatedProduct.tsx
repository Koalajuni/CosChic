import React, { useState } from 'react';


const CardRelatedProduct = ({ }) => {

    return (


        <div className="w-auto max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="px-5 pb-5">
                <div className="flex gap-10 justify-content-between">
                    <a href="#">
                        <h5 className="text-xl font-semibold py-2 tracking-tight text-gray-900 dark:text-white text-ellipsis overflow-hidden whitespace-nowrap w-24">Brand iasnd theaj sadjkas </h5>
                        <div className="flex flex-col md:flex-row">
                            <span className="text-xs uppercase">name of the product can be very large</span>
                        </div>
                    </a>
                    <a href="#">
                        <img className="p-8 rounded-t-lg" src="assets/default_search.png" />
                    </a>
                </div>
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">3000<sup className="align-sub text-sm">원</sup></p>
                        <span className="text-xs uppercase">조회수 count</span>
                    </div>
                    <a href="#" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">구매하기</a>
                </div>
            </div>
        </div>


    );
};

export default CardRelatedProduct;
