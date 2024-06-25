import React, { useState } from 'react';


interface Product {
    productImage: string;
    productName: string;
    price: number;
    productUrl: string;
}

interface CardRelatedProductProps {
    product: Product;
    name: string;
}


const CardRelatedProduct: React.FC<CardRelatedProductProps> = ({ product, name }) => {
    const brandName = name.split('_')[0];
    const imageUrlParts = product.productImage.split('/');
    const lastPart = imageUrlParts[imageUrlParts.length - 1];
    const productImage = lastPart ? product.productImage : "assets/default_search.png";
    return (
        <div className="w-[300px] h-[180px] max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col justify-between">
            <div className="py-2 px-5 flex flex-col justify-between h-full">
                <div className="flex items-start justify-between mb-auto">
                    <div>
                        <h5 className="text-xl font-semibold py-2 tracking-tight text-gray-900 dark:text-white text-ellipsis overflow-hidden whitespace-nowrap w-24">{brandName}</h5>
                        <span className="text-xs uppercase">{product.productName}</span>
                    </div>
                    <img className="w-20 h-20 object-cover rounded-t-lg p-2" src={productImage} alt="Product Image" />
                </div>
                <div className="flex mb-2 items-end justify-between">
                    <div className="flex flex-col items-start">
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{product.price}<sup className="align-sub text-sm">원</sup></p>
                        <span className="text-xs uppercase">조회수 count</span>
                    </div>
                    <a href={product.productUrl} className="text-white bg-[#8E65B7] hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 self-end">구매하기</a>
                </div>
            </div>
        </div>




    );
};

export default CardRelatedProduct;
