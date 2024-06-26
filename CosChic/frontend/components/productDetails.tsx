import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaShoppingBag, FaTag, FaCopyright, FaList } from 'react-icons/fa';

interface Product {
    productImage: string;
    productName: string;
    brandName: string;
    price: number;
    categoryId: string;
    productUrl: string;
    category: string;
}

const ProductDetails = ({ product }: { product: Product }) => {
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const shimmer = document.querySelector('.shimmer');
        if (shimmer) {
            shimmer.animate(
                [
                    { backgroundPosition: '-468px 0' },
                    { backgroundPosition: '468px 0' }
                ],
                {
                    duration: 1000,
                    iterations: Infinity
                }
            );
        }
    }, []);

    const getCategoryIcon = (category: string) => {
        switch (category) {
            case 'lipstick':
                return <FaTag className="text-pink-500" />;
            default:
                return <FaList className="text-purple-500" />;
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10 bg-gradient-to-r from-pink-100 to-purple-100 p-8 rounded-2xl shadow-2xl"
        >
            <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
                <span className="shimmer">사용한 상품</span>
            </h2>
            <div className="flex flex-col md:flex-row items-center justify-between">
                {product && product.productImage && (
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="mb-6 md:mb-0 md:mr-8 relative"
                    >
                        <img
                            src={product.productImage}
                            alt={product.productName}
                            className="w-64 h-64 object-cover rounded-lg shadow-lg"
                        />
                        <div className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md">
                            {getCategoryIcon(product.category)}
                        </div>
                    </motion.div>
                )}
                <div className="flex-1 space-y-4">
                    {product && product.productName && (
                        <motion.p
                            className="text-xl font-semibold text-gray-700 flex items-center"
                            animate={{ x: isHovered ? 10 : 0 }}
                        >
                            <FaShoppingBag className="mr-2 text-pink-500" />
                            <span className="text-pink-600">{product.productName}</span>
                        </motion.p>
                    )}
                    {product && product.brandName && (
                        <motion.p
                            className="text-lg text-gray-600 flex items-center"
                            animate={{ x: isHovered ? 10 : 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            <FaCopyright className="mr-2 text-purple-500" />
                            브랜드: <span className="font-bold text-purple-600 ml-2">{product.brandName}</span>
                        </motion.p>
                    )}
                    {product && product.price && (
                        <motion.p
                            className="text-lg text-gray-600 flex items-center"
                            animate={{ x: isHovered ? 10 : 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <FaTag className="mr-2 text-green-500" />
                            가격: <span className="font-bold text-green-600 ml-2">{product.price}원</span>
                        </motion.p>
                    )}
                    {product && product.categoryId && (
                        <motion.p
                            className="text-lg text-gray-600 flex items-center"
                            animate={{ x: isHovered ? 10 : 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <FaList className="mr-2 text-blue-500" />
                            카테고리: <span className="font-bold text-blue-600 ml-2">{product.categoryId}</span>
                        </motion.p>
                    )}
                    {product && product.productUrl && (
                        <motion.div
                            animate={{ x: isHovered ? 10 : 0 }}
                            transition={{ delay: 0.4 }}
                            className="mt-6"
                        >
                            <a
                                href={product.productUrl}
                                className="inline-block bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-2 px-6 rounded-full hover:from-pink-600 hover:to-purple-600 transition duration-300 shadow-lg"
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                            >
                                제품 구매하기
                            </a>
                        </motion.div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default ProductDetails;