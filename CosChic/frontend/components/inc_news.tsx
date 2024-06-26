"use client";
import React, { useState } from 'react';
import axiosInstance from '@/hooks/axiosConfig';

export default function IncNews() {
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent default form submission behavior

        try {
            const response = await axiosInstance.post('/send_email', JSON.stringify({
                email: email,
                subject: 'Interest',
                message: 'Contacted for more info:'
            }), {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.status === 200) {
                setSuccessMessage('Your message was sent successfully!');
                setEmail(''); // Clear email field after successful submission
                setErrorMessage(''); // Clear error message if any
            } else {
                setErrorMessage('An error occurred. Please try again.');
                setSuccessMessage(''); // Clear success message if any
            }
        } catch (error) {
            setErrorMessage('An error occurred. Please try again.');
            setSuccessMessage(''); // Clear success message if any
            console.error(error); // Log the error for debugging purposes
        }
    };

    return (
        <div className="NEWS">
            <div className="w-full py-16 text-white px-4">
                <div className="max-w-[1240px] mx-auto grid lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        <h1 className="md:text-4xl sm:text-3xl text-2xl font-bold py-2">메일주소를 남겨주세요.</h1>
                        <p style={{ color: '#000000' }}>좀 더 다양한 정보를 원하시면 메일주소를 남겨주세요.</p>
                    </div>
                    <div className="my-4">
                        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center justify-between w-full">
                            <input
                                className="p-3 flex w-full rounded-md text-black"
                                type="email"
                                placeholder="이메일 주소를 입력하세요."
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <button
                                type="submit"
                                className="bg-[#C598F0] text-black rounded-md font-medium w-[200px] ml-4 my-6 py-3"
                            >
                                보내기
                            </button>
                        </form>
                        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                        {successMessage && <p className="text-green-500">{successMessage}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}
