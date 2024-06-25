"use client";
import React, { useState } from 'react';
import Header from "@/components/inc_header";
import Footer from '@/components/inc_footer';
import axiosInstance from '@/hooks/axiosConfig';

const ContactPage = () => {
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await axiosInstance.post('/send_email', { email, subject, message }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.status === 200) {
                setSuccessMessage('Message sent successfully!');
                setEmail('');
                setSubject('');
                setMessage('');
            } else {
                setErrorMessage('Failed to send message. Please try again.');
            }
        } catch (error) {
            setErrorMessage('An error occurred. Please try again.');
        }
    };

    return (
        <>
            <Header />
            <section className="bg-white dark:bg-gray-900">
                <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
                    <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center dark:text-white" style={{ color: '#FF6F91' }}>Contact Us</h2>
                    <p className="font-medium text-center text-gray-600 dark:text-gray-400 sm:text-xl">
                        기술적인 문제가 있나요? 베타 기능에 대한 피드백을 보내고 싶으신가요?
                    </p>
                    <p className="mb-8 lg:mb-16 font-medium text-center text-gray-600 dark:text-gray-400 sm:text-xl">
                        비즈니스 계획에 대한 자세한 정보가 필요하신가요? 모두 알려주세요.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">이메일</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                                placeholder="name@flowbite.com"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">내용</label>
                            <input
                                type="text"
                                id="subject"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                                placeholder="Let us know how we can help you"
                                required
                            />
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">메시지</label>
                            <textarea
                                id="message"
                                rows={6}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Leave a comment..."
                                required
                            ></textarea>
                        </div>
                        <button type="submit" className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-[#FF6F91] sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">문의 전송하기</button>
                    </form>

                    {successMessage && <p className="mt-4 text-green-500">{successMessage}</p>}
                    {errorMessage && <p className="mt-4 text-red-500">{errorMessage}</p>}
                </div>
            </section>
            <Footer />
        </>
    );
};

export default ContactPage;
