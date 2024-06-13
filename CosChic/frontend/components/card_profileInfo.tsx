"use client";
import React, { useState } from 'react';
import axios from 'axios';
import styles from '@/styles/CardProfileInformation.module.css';

const CardProfileInformation = ({ user_id }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        email: '',
        age: '',
        gender: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put('http://127.0.0.1:8000/api/v1/user_profile/:user_id', formData);
            console.log('Data submitted successfully:', response.data);
        } catch (error) {
            console.error('Error submitting data:', error);
        }
    };

    return (
        <div className="flex justify-start mt-2 px-8">
            <form className="max-w-2xl" onSubmit={handleSubmit}>
                <div className="flex flex-wrap border shadow rounded-lg p-3 dark:bg-gray-600">
                    <h2 className="text-xl text-gray-600 dark:text-gray-300 pb-2">Account settings:</h2>

                    <div className="flex flex-col gap-2 w-full border-gray-400">

                        <div>
                            <label className="text-gray-600 dark:text-gray-400">User
                                name
                            </label>
                            <input
                                className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:bg-gray-600 dark:text-gray-100"
                                type="text"
                                name="firstName"
                                placeholder="이름"
                                value={formData.firstName}
                                onChange={handleChange} />
                        </div>

                        <div>
                            <label className="text-gray-600 dark:text-gray-400">Email</label>
                            <input
                                className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:bg-gray-600 dark:text-gray-100"
                                type="text"
                                name="email"
                                placeholder="{user.email}"
                                value={formData.email}
                                onChange={handleChange} />
                        </div>
                        <div>
                            <label className="text-gray-600 dark:text-gray-400">Age</label>
                            <input
                                className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:bg-gray-600 dark:text-gray-100"
                                type="text"
                                name="age"
                                value={formData.age}
                                placeholder="20"
                                onChange={handleChange} />
                        </div>

                        <div>
                            <label className="text-gray-600 dark:text-gray-400">Gender</label>
                            <input
                                className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:bg-gray-600 dark:text-gray-100"
                                name="gender"
                                value={formData.gender}
                                placeholder="gender"
                                onChange={handleChange} />

                        </div>
                        <div className="flex justify-end">
                            <button
                                className="py-1.5 px-3 m-1 text-center bg-violet-700 border rounded-md text-white  hover:bg-violet-500 hover:text-gray-100 dark:text-gray-200 dark:bg-violet-700"
                                type="submit">Save changes</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CardProfileInformation;
