import React from 'react';
import Lottie from '@/node_modules/react-lottie';
import animationData from '@/public/assets/globeAnimation.json';
import styles from '@/styles/Login.module.css';
import LoginComponent from '@/components/LoginComponent';

const Login = () => {
    const brands = ["Brand A", "Brand B", "Brand C", "Brand D", "Brand E", "Brand F", "Brand G", "Brand H", "Brand I", "Brand J"];
    const images = Array(10).fill('/path/to/image'); // Update paths to actual image paths

    return (
        <div className={styles.container}>
            {/* <div className={styles.backgroundAnimation}>
                <Lottie options={{ animationData }} />
            </div> */}
            <div className={styles.overlay}></div>

            <div className={`${styles.horizontalRow} ${styles.textAnimation}`}>
                {Array(4).fill("COSCHIC").map((text, index) => (
                    <span key={index}>{text}</span>
                ))}
            </div>

            <div className={`${styles.horizontalRow} ${styles.textAnimation}`}>
                {["Beauty is all you need", "Artificial Intelligence", "Technology", "Freedom"].map((text, index) => (
                    <span key={index}>{text}</span>
                ))}
            </div>

            <div className={`${styles.horizontalRow} ${styles.textAnimation}`}>
                {["Modern", "Love", "Facial Recognition", "AI"].map((text, index) => (
                    <span key={index}>{text}</span>
                ))}
            </div>

            <div className={`${styles.horizontalRow} ${styles.textAnimation}`}>
                {["Global", "Value", "Inclusion", "Passion"].map((text, index) => (
                    <span key={index}>{text}</span>
                ))}
            </div>

            <div className={`${styles.horizontalRow} ${styles.textAnimation}`}>
                {["Cosmetic", "Beautiful", "Awareness", "Intelligence"].map((text, index) => (
                    <span key={index}>{text}</span>
                ))}
            </div>

            <div className={styles.verticalSlider}>
                <div className={styles.verticalSliderContent}>
                    {brands.map((brand, index) => (
                        <div key={index} className={styles.textSlide}>
                            {brand}
                        </div>
                    ))}
                    {images.map((image, index) => (
                        <div key={index} className={styles.imageSlide}>
                            <img src={image} alt={`slide ${index}`} />
                        </div>
                    ))}
                </div>
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
