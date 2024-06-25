"use client";
import React, { useState } from 'react';
import Image from "next/image";
import { useRouter } from 'next/navigation';
import accountalert from "@/public/assets/account-alert.png";
import styles from "@/styles/LoginComponent.module.css";
import axios from "axios"
import axiosInstance from '@/hooks/axiosConfig';


const LoginComponent = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginErrorMsg, setLoginErrorMsg] = useState("");
    const [mode, setMode] = useState("login");
    const router = useRouter();


    const login = async () => {
        try {
            console.log("this is the email:", email)
            console.log("this is the password:", password)

            const formData = new FormData();
            formData.append('email', email);
            formData.append('password', password);

            const response = await axiosInstance.post('/login', formData);

            const userData = {
                UUID: response.data.UUID,
                email: response.data.email,
                // Add other user data properties here
            };
            localStorage.setItem('userData', JSON.stringify(userData));
            // localStorage.setItem('email', JSON.stringify(email));
            router.push('/home');
        } catch (error) {
            setLoginErrorMsg('Login failed. Please check your credentials.');
        }
    };

    const register = async () => {
        try {
            console.log("this is the email:", email)
            console.log("this is the password:", password)
            const formData = new FormData();
            formData.append('email', email);
            formData.append('password', password);

            const response = await axiosInstance.post('/register', formData);
            if (response.status === 201) {
                console.log('Registration successful!');
                const userData = {
                    UUID: response.data.UUID,
                    email: response.data.email,
                    // Add other user data properties here
                };
                localStorage.setItem('userData', JSON.stringify(userData));
                router.push('/profile');
            } else {
                console.error('Registration failed:', response.data);
            }
        } catch (error) {
            setLoginErrorMsg('Registration failed. Please check your details.');
        }
    };

    return (
        <section className={styles.accountLayout}>
            <div className={styles.accountAlert}>
                <div className={styles.iconContainer}>
                    <Image src={accountalert} width="16" alt="alert" />
                </div>
                <div className="text-[#C598F0]">
                    실제 사용하는 이메일 주소를 입력해 주세요
                </div>
            </div>
            <div className={styles.inputBox}>
                <div className={styles.inputWrap}>
                    <input
                        className={styles.input}
                        placeholder="이메일"
                        type="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setLoginErrorMsg("");
                        }}
                        required
                    />
                </div>
            </div>
            <div className={styles.inputBox}>
                <div className={styles.inputWrap}>
                    <input
                        className={styles.input}
                        placeholder="비밀번호"
                        type="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setLoginErrorMsg("");
                        }}
                        required
                    />
                </div>
            </div>
            {loginErrorMsg && <div className={styles.errorMsg}>{loginErrorMsg}</div>}
            <div className={styles.buttonContainer}>
                <button
                    type="button"
                    className={styles.accountBtn}
                    onClick={login}
                    style={{ background: '#C598F0', color: '#fff', border: 'none', padding: '20px 40px', borderRadius: '10px', marginRight: '20px' }}
                >
                    로그인
                </button>
                <button
                    type="submit"
                    className={styles.accountBtn}
                    onClick={register}
                    style={{ background: '#fff', color: '#C598F0', border: '1px solid #C598F0', padding: '20px 40px', borderRadius: '10px' }}
                >
                    회원가입
                </button>
            </div>

        </section>
    );
};

export default LoginComponent;
