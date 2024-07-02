"use client"
import Header from "@/components/inc_header"
import Footer from "@/components/inc_footer"
import CardProfileInformation from "@/components/card_profileInfo";
import SimilarModels from "@/components/similarModels";
import useUserUID from "@/hooks/useUserUID";
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import axiosInstance from "@/hooks/axiosConfig";


export default function UserProfile() {

    const userUID = useUserUID(); // USER UID 가져오는 변수  
    const [userData, setUserData] = useState<any | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [image, setImage] = useState<string>('/assets/logo.png');
    const [responseData3, setResponseData3] = useState(null);
    const [imagePath, setImagePath] = useState('');
    const fileInput = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            // console.log("fetching UserData:", userUID)
            if (userUID) {
                try {
                    const response = await axiosInstance.get(`/userdata/${userUID}`);
                    setUserData(response.data);
                    // 프로필 이미지가 있는 경우 설정
                    if (response.data.profileImage) {
                        setImage(response.data.profileImage);
                    }
                } catch (err) {
                    setError('Failed to fetch user data.');
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [userUID]);

    useEffect(() => {
        if (userData) {
            console.log("This is the user response:", userData);
        }
    }, [userData]);


    // 파일 업로드
    const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const file = event.target.files[0];
            await onFileUpload(file); // 파일을 선택하자마자 업로드
        }
    };

    const onFileUpload = async (file: File) => {

        const formData = new FormData();
        formData.append('profileImage', file);

        try {
            const response = await axiosInstance.post(`/userdata/upload/${userUID}`, formData);

            console.log('File uploaded successfully:', response.data);
            // 서버 응답 형식 점검
            if (response.data && response.data.output_image_path) {
                setImage(response.data.output_image_path);
            } else {
                console.error('Output image path not found in response:', response.data);
            }
        } catch (error) {
            console.error('Error uploading the file:', error);

        }
    };


    const profileImageStyle = {
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "200px",
        height: "200px",
        borderRadius: "30%",
        border: "1px solid gray",
        boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",

    };

    const models = [
        { name: '모델 A', similarity: 87, image: './assets/dasique_eye30.jpg' },
        { name: '모델 B', similarity: 63, image: './assets/muzigaemansion_lip1.jpg' },
        { name: '모델 C', similarity: 43, image: './assets/jungsaemmool_tint_1.jpg' },
        { name: '모델 D', similarity: 23, image: './assets/wakemake_eye_3.jpg' },
        { name: '모델 E', similarity: 23, image: './assets/deardahila_tint_1.jpg' }
    ];



    return (
        <>
            <Header />
            <div className="container mx-auto px-4 py-8">
                {loading ? (
                    <div className="text-center">Loading...</div>
                ) : error ? (
                    <div className="text-center text-red-500">Error: {error}</div>
                ) : (
                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="md:w-1/3">
                            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                                <div className="relative w-48 h-48 mx-auto mb-4">
                                    <img
                                        src={image}
                                        alt="Profile"
                                        className="w-full h-full object-cover rounded-full border-4 border-pink-200"
                                    />
                                    <button
                                        onClick={() => fileInput.current?.click()}
                                        className="absolute bottom-0 right-0 bg-pink-500 text-white p-2 rounded-full hover:bg-pink-600 transition"
                                    >
                                        <svg xmlns="https://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                        </svg>
                                    </button>
                                </div>
                                <input type="file" className="hidden" ref={fileInput} onChange={onFileChange} />
                                {userData && (
                                    <>
                                        <h2 className="text-2xl font-bold mb-2">{userData.names}</h2>
                                        <p className="text-gray-600 mb-1">{userData.email}</p>
                                        <p className="text-gray-600">{userData.gender}</p>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="md:w-2/3">
                            <CardProfileInformation
                                name={userData?.names}
                                email={userData?.email}
                                age={userData?.age}
                                gender={userData?.gender}
                                UUID={userUID || ''}
                            />
                        </div>
                    </div>
                )}
                <div className="mt-12">
                    <h2 className="text-2xl font-bold mb-6">나와 비슷한 모델</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {models.map((model, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                                <img src={model.image} alt={model.name} className="w-full h-48 object-cover" />
                                <div className="p-4">
                                    <h3 className="font-semibold text-lg mb-2">{model.name}</h3>
                                    <p className="text-sm text-gray-600">유사도: {model.similarity}%</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}