"use client"
import React from 'react';
import Lottie from "lottie-react";
import animationData from '@/public/assets/globeAnimation.json';
import styles from '@/styles/Login.module.css';
import LoginComponent from '@/components/loginComponent';

const Login = () => {

    return (
        <div>
            <div className='mt-20'>
                <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center dark:text-white" style={{ color: '#FF6F91' }}>CosChic</h2>
                <p className="font-xs text-center text-gray-600 dark:text-gray-400 sm:text-xs">
                    Beta V.1.0
                </p>
            </div>
            <div className='flex py-10 justify-center item-center'>
                <LoginComponent />
            </div>
        </div>
    );
};

export default Login;
