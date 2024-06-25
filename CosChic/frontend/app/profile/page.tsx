"use client" 
import Header from "@/components/inc_header"
import Footer from "@/components/inc_footer"
import CardProfileInformation from "@/components/card_profileInfo";
import SimilarModels from "@/components/similarModels";
import useUserUID from "@/hooks/useUserUID";
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';


export default function UserProfile() {

    const userUID = useUserUID(); // USER UID 가져오는 변수  
    const [userData, setUserData] = useState<any | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [image, setImage] = useState<string>('/assets/logo.png');
    const [responseData3, setResponseData3] = useState(null);
    const [imagePath, setImagePath] = useState('');
    const fileInput = useRef<HTMLInputElement>(null);
    const baseUrl = 'http://127.0.0.1:8000/api';

    useEffect(() => {
        const fetchUserData = async () => {
            // console.log("fetching UserData:", userUID)
            if (userUID) {
                try {
                    const response = await axios.get(`http://127.0.0.1:8000/api/v1/userdata/${userUID}`);
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
            const response = await axios.post(
                `${baseUrl}/v1/userdata/upload/${userUID}`,
                formData,
            {
                headers: {
                'Content-Type': 'multipart/form-data',
                    },
                }
            );
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

    const userResembleModels = [
        { name: '모델 A', similarity: 87, image: 'dasique_eye30.jpg' },
        { name: '모델 B', similarity: 63, image: 'espoir_lipstick_1.jpg.jpg' },
        { name: '모델 C', similarity: 43, image: 'jungsaemmool_tint_1.jpg' },
        { name: '모델 D', similarity: 23, image: 'wakemake_eye_3.jpg' },
        { name: '모델 E', similarity: 23, image: './assets/deardahila_tint_1.jpg' }
    ];
    

    return (
        <>
            <Header />
            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div>Error: {error}</div>
            ) : (
                <div className="h-full flex justify-center">
                    <div className="px-3 py-2">
                        <div className="flex flex-wrap border shadow rounded-lg p-3 dark:bg-gray-600 items-center flex-col ">
                            <div className="hover:translate-y-1 hover:bg-[#e9b4c0]" style={profileImageStyle} onClick={() => fileInput.current?.click()} />
                                <input type="file"style={{display : "none"}} ref={fileInput} onChange={onFileChange} />
                                
                                {userData && (
                                <>
                                    <p className="font-serif font-semibold p-4  text-black">{userData.names}</p>
                                    <span className="text-sm text-gray-400">
                                        {userData.email}
                                    </span>
                                    <span className="text-sm text-gray-400">
                                        {userData.gender}
                                    </span>
                                    <span></span>
                                </>
                            )}
                        </div>
                    </div>
                    <div>
                        <CardProfileInformation name={userData?.names} email={userData?.email} age={userData?.age} gender={userData?.gender} UUID={userUID} />
                    </div>
                </div>
            )}
            <div>
                <h2 className="text-xl font-semibold mt-4 mb-2 p-6">나와 비슷한 모델</h2>
                    <div className="flex h-full justify-center items-center border rounded-xl py-3 space-x-4">
                    <img src="./assets/deardahila_tint_1.jpg"  className="inset-0 w-[150px] h-[150px] object-cover rounded-full border-2 border-[#ffb4c5] rounded-md shadow-xl" />
                    <img src="./assets/dasique_eye30.jpg"  className="inset-0 w-[150px] h-[150px] object-cover rounded-full border-2 border-[#ffb4c5] rounded-md shadow-xl" />
                    <img src="./assets/jungsaemmool_tint_1.jpg"  className="inset-0 w-[150px] h-[150px] object-cover rounded-full border-2 border-[#ffb4c5] rounded-md shadow-xl" />
                    <img src="./assets/wakemake_eye_3.jpg" className="inset-0 w-[150px] h-[150px] object-cover rounded-full border-2 border-[#ffb4c5] rounded-md shadow-xl" />
                    <img src="./assets/muzigaemansion_lip1.jpg" className="inset-0 w-[150px] h-[150px] object-cover rounded-full border-2 border-[#ffb4c5] rounded-md shadow-xl" />

                    </div>            
            </div>
            <Footer />
        </>
    )
}