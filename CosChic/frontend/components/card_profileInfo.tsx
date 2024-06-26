"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '@/styles/CardProfileInformation.module.css';
import axiosInstance from '@/hooks/axiosConfig';

interface CardProfileInformationProps {
    name?: string;
    email?: string;
    age?: string;
    gender?: string;
    UUID: string | null;
}

const CardProfileInformation: React.FC<CardProfileInformationProps> = ({ name, email, age, gender, UUID }) => {
    const [formData, setFormData] = useState({
        names: name || "홍길동",
        email: email || "coschic@gmail.com",
        age: age || "20",
        gender: gender || "female",
    });
    useEffect(() => {
        setFormData({
            names: name || "",
            email: email || "",
            age: age || "",
            gender: gender || "",
        });
    }, [name, email, age, gender]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://211.216.177.2:18000/api/v1/userdata/${UUID}`, formData);
            console.log('Data submitted successfully:', response.data);
            window.location.reload();
        } catch (error) {
            console.error('Error submitting data:', error);
        }
    };

    return (
        <div className="w-full flex justify-start mt-2 px-8">
            <form className="max-w-2xl" onSubmit={handleSubmit}>
                <div className="flex flex-wrap border shadow rounded-lg p-3 dark:bg-gray-600">
                    <h2 className="text-xl text-gray-600 dark:text-gray-300 pb-2">나의 계정:</h2>

                    <div className="flex flex-col gap-2 w-full  border-gray-400">

                        <div>
                            <label className="text-gray-600 dark:text-gray-400">이름
                            </label>
                            <input
                                className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none text-black focus:border-slate-500 hover:shadow dark:bg-gray-600 dark:text-gray-100"
                                type="text"
                                name="names"
                                placeholder="이름"
                                value={formData.names}
                                onChange={handleChange} />
                        </div>

                        <div>
                            <label className="text-gray-600 dark:text-gray-400">이메일</label>
                            <input
                                className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none text-black focus:border-slate-500 hover:shadow dark:bg-gray-600 dark:text-gray-100"
                                type="text"
                                name="email"
                                placeholder="{user.email}"
                                value={formData.email}
                                onChange={handleChange} />
                        </div>
                        <div>
                            <label className="text-gray-600 dark:text-gray-400">나이</label>
                            <input
                                className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none text-black focus:border-slate-500 hover:shadow dark:bg-gray-600 dark:text-gray-100"
                                type="text"
                                name="age"
                                value={formData.age}
                                placeholder="20"
                                onChange={handleChange} />
                        </div>

                        <div>
                            <label className="text-gray-600 dark:text-gray-400">성별</label>
                            <input
                                className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none text-black focus:border-slate-500 hover:shadow dark:bg-gray-600 dark:text-gray-100"
                                name="gender"
                                value={formData.gender}
                                placeholder="gender"
                                onChange={handleChange} />

                        </div>
                        <div className="flex justify-end">
                            <button
                                className="py-1.5 px-3 m-1 text-center bg-violet-700 border rounded-md text-white  hover:bg-violet-500 hover:text-gray-100 dark:text-gray-200 dark:bg-violet-700"
                                type="submit">저장하기</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CardProfileInformation;
