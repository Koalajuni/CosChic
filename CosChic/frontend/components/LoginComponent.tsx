"use client";
import React, { useState } from 'react';
import Image from "next/image";
import { useRouter } from 'next/navigation';
import accountalert from "@/public/assets/account-alert.png";
import axiosInstance from '@/hooks/axiosConfig';

const LoginComponent = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginErrorMsg, setLoginErrorMsg] = useState("");
    const router = useRouter();

    const login = async () => {
        try {
            const formData = new FormData();
            formData.append('email', email);
            formData.append('password', password);

            const response = await axiosInstance.post('/login', formData);

            const userData = {
                UUID: response.data.UUID,
                email: response.data.email,
            };
            localStorage.setItem('userData', JSON.stringify(userData));
            router.push('/home');
        } catch (error) {
            setLoginErrorMsg('Login failed. Please check your credentials.');
        }
    };

    const register = async () => {
        try {
            const formData = new FormData();
            formData.append('email', email);
            formData.append('password', password);

            const response = await axiosInstance.post('/register', formData);
            if (response.status === 201) {
                const userData = {
                    UUID: response.data.UUID,
                    email: response.data.email,
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
        <section className="w-1/3 h-1/2 bg-white grid gap-5 p-2 items-center mx-auto">
            <div className="flex items-center justify-center">
                <div className="mr-2">
                    <Image src={accountalert} width="16" alt="alert" />
                </div>
                <div className="text-gray-500">
                    실제 사용하는 이메일 주소를 입력해 주세요
                </div>
            </div>
            <div className="flex flex-col items-center justify-center w-full gap-4">
                <div className="w-full h-18 p-5 flex items-center justify-center gap-4 rounded border border-gray-300 bg-white">
                    <input
                        className="w-full text-gray-800 text-lg placeholder-gray-400"
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
                <div className="w-full h-18 p-5 flex items-center justify-center gap-4 rounded border border-gray-300 bg-white">
                    <input
                        className="w-full text-gray-800 text-lg placeholder-gray-400"
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
                {loginErrorMsg && <div className="text-red-500">{loginErrorMsg}</div>}
                <div className="flex gap-5 justify-center">
                    <button
                        type="button"
                        className="w-48 h-34 p-5 flex items-center justify-center rounded bg-purple-500 text-white text-xl font-bold"
                        onClick={login}
                    >
                        로그인
                    </button>
                    <button
                        type="submit"
                        className="w-48 h-34 p-5 flex items-center justify-center rounded border border-purple-500 text-purple-500 text-xl font-bold"
                        onClick={register}
                    >
                        회원가입
                    </button>
                </div>
            </div>
        </section>
    );
};

export default LoginComponent;
