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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.put(`https://211.216.177.2:18000/api/v1/userdata/${UUID}`, formData);
            console.log('Data submitted successfully:', response.data);
            window.location.reload();
        } catch (error) {
            console.error('Error submitting data:', error);
        }
    };

    return (
        <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">내 계정 정보</h2>
            <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">이름</label>
                        <input
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                            type="text"
                            name="names"
                            value={formData.names}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">이메일</label>
                        <input
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">나이</label>
                        <input
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                            type="number"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">성별</label>
                        <select
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                        >
                            <option value="">선택하세요</option>
                            <option value="male">남성</option>
                            <option value="female">여성</option>
                            <option value="other">기타</option>
                        </select>
                    </div>
                </div>
                <div className="mt-6">
                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-white bg-pink-500 rounded-md hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                    >
                        저장하기
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CardProfileInformation;
