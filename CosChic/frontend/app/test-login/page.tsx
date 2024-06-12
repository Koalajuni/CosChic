"use client"
import React from 'react';
import Lottie from "lottie-react";
import animationData from '@/public/assets/globeAnimation.json';
import styles from '@/styles/Login.module.css';
import LoginComponent from '@/components/LoginComponent';

const Login = () => {
    const brands = ["Brand A", "Brand B", "Brand C", "Brand D", "Brand E", "Brand F", "Brand G", "Brand H", "Brand I", "Brand J"];
    const images = [
        '/assets/Login_FaceImage/1.jpg',
        '/assets/Login_FaceImage/2.jpg',
        '/assets/Login_FaceImage/3.jpg',
        '/assets/Login_FaceImage/4.jpg',
        '/assets/Login_FaceImage/5.jpg',
        '/assets/Login_FaceImage/6.jpg',
        '/assets/Login_FaceImage/7.jpg',
        '/assets/Login_FaceImage/8.jpg',
        '/assets/Login_FaceImage/9.jpg',
        '/assets/Login_FaceImage/10.jpg',
    ];

    // Function to generate a random margin-left value
    const getRandomMargin = () => {
        return Math.floor(Math.random() * 30); // Adjust the range as needed
    };

    return (
        <div className={styles.container}>
            <div className={styles.backgroundAnimation}>
                <Lottie animationData={animationData} loop={true} />;
            </div>
            <div className={styles.overlay}></div>

            <div className={styles.verticalSlider}>
                <div className={styles.verticalSliderContent}>
                    {images.map((image, index) => (
                        <div key={index} className={styles.imageSlide}>
                            <img src={image} alt={`slide ${index}`} className={styles.slideImage} />
                        </div>
                    ))}
                </div>
            </div>

            <div className={`${styles.horizontalRow} ${styles.textAnimation}`} style={{ marginLeft: `${getRandomMargin()}%` }}>
                {Array(10).fill("COSCHIC").map((text, index) => (
                    <span key={index} className={styles.sparsedText}>{text}</span>
                ))}
            </div>

            <div className={`${styles.horizontalRow} ${styles.textAnimation}`} >
                {["Modern", "Love", "Facial Recognition", "AI", "Global", "Value", "Inclusion", "Passion"].map((text, index) => (
                    <span key={index} className={styles.smallSparsedText}>{text}</span>
                ))}
            </div>

            <div className={`${styles.horizontalRow} ${styles.textAnimation}`} style={{ marginLeft: `${getRandomMargin()}%` }} >
                {Array(10).fill("COSCHIC").map((text, index) => (
                    <span key={index} className={styles.sparsedText}>{text}</span>
                ))}
            </div>

            <div className={`${styles.horizontalRow} ${styles.textAnimation}`} >
                {["Global", "Value", "Inclusion", "Passion", "Cosmetic", "Beautiful", "Awareness", "Intelligence"].map((text, index) => (
                    <span key={index} className={styles.smallSparsedText}>{text}</span>
                ))}
            </div>

            <div className={`${styles.horizontalRow} ${styles.textAnimation}`} style={{ marginLeft: `${getRandomMargin()}%` }}>
                {Array(10).fill("COSCHIC").map((text, index) => (
                    <span key={index} className={styles.sparsedText}>{text}</span>
                ))}
            </div>

            <div className={`${styles.horizontalRow} ${styles.textAnimation}`} >
                {["Cosmetic", "Beautiful", "Awareness", "Intelligence", "Modern", "Love", "Facial Recognition", "AI",].map((text, index) => (
                    <span key={index} className={styles.smallSparsedText}>{text}</span>
                ))}
            </div>
            <div className={`${styles.horizontalRow} ${styles.textAnimation}`} style={{ marginLeft: `${getRandomMargin()}%` }}>
                {Array(10).fill("COSCHIC").map((text, index) => (
                    <span key={index} className={styles.sparsedText}>{text}</span>
                ))}
            </div>


            <div className={styles.bottomBox}>
                <h1>COSCHIC</h1>
                <h2>Your AI Stylist</h2>
            </div>

            <div className={styles.loginContainer}>
                <LoginComponent />
            </div>
        </div>
    );
};

export default Login;
