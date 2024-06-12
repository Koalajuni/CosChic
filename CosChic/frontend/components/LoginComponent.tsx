"use client";
import React, { useState } from 'react';
import Image from "next/image";
import accountalert from "@/public/assets/account-alert.png";
import styles from "@/styles/LoginComponent.module.css";
import axios from "axios"

const LoginComponent = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginErrorMsg, setLoginErrorMsg] = useState("");
    const [mode, setMode] = useState("login");

    const login = async () => {
        try {
            const response = await axios.post('/api/login', { email, password });
            // Handle successful login (e.g., store token, redirect, etc.)
        } catch (error) {
            setLoginErrorMsg('Login failed. Please check your credentials.');
        }
    };

    const register = async () => {
        try {
            const response = await axios.post('/api/register', { email, password });
            // Handle successful registration (e.g., redirect, display message, etc.)
        } catch (error) {
            setLoginErrorMsg('Registration failed. Please check your details.');
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (mode === "login") {
            await login();
        } else if (mode === "register") {
            await register();
        }
    };

    return (
        <section className={styles.accountLayout}>
            <div className={styles.accountAlert}>
                <div className={styles.iconContainer}>
                    <Image src={accountalert} width="16" alt="alert" />
                </div>
                <div className={styles.textContainer}>
                    실제 사용하는 이메일 주소를 입력해 주세요
                </div>
            </div>
            <div className={styles.inputBox}>
                <div className={styles.inputWrap}>
                    <input
                        className={styles.input}
                        placeholder="이메일"
                        type="email"
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setLoginErrorMsg("");
                        }}
                    />
                </div>
            </div>
            <div className={styles.inputBox}>
                <div className={styles.inputWrap}>
                    <input
                        className={styles.input}
                        placeholder="비밀번호"
                        type="password"
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setLoginErrorMsg("");
                        }}
                    />
                </div>
                {/* <ValideMsg>{loginErrorMsg}</ValideMsg> */}
            </div>
            <div className={styles.buttonContainer}>
                <button
                    className={styles.accountBtn}
                    onClick={() => setMode("login")}
                    style={{ background: '#805F89', color: '#fff', border: 'none', padding: '20px 40px', borderRadius: '10px', marginRight: '20px' }}
                >
                    로그인
                </button>
                <button
                    className={styles.accountBtn}
                    onClick={() => { setMode("register"); handleSubmit(new Event('submit')); }}
                    style={{ background: '#fff', color: '#805F89', border: '1px solid #805F89', padding: '20px 40px', borderRadius: '10px' }}
                >
                    회원가입
                </button>
            </div>
        </section>
    );
};

export default LoginComponent;
