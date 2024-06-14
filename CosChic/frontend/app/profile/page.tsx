"use client"
import Header from "@/components/inc_header"
import Footer from "@/components/inc_footer"
import CardProfileInformation from "@/components/card_profileInfo";
import SimilarModels from "@/components/similarModels";
import useUserUID from "@/hooks/useUserUID";
import React, { useState, useEffect } from 'react';
import axios from 'axios';


export default function UserProfile() {

    const userUID = useUserUID(); // USER UID 가져오는 변수  
    const [userData, setUserData] = useState<any | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        const fetchUserData = async () => {
            // console.log("fetching UserData:", userUID)
            if (userUID) {
                try {
                    const response = await axios.get(`http://127.0.0.1:8000/api/v1/userdata/${userUID}`);
                    setUserData(response.data);
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


    const profileImageStyle = {
        backgroundImage: "url('https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202306/04/138bdfca-3e86-4c09-9632-d22df52a0484.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "200px",
        height: "200px",
        borderRadius: "30%",
        border: "1px solid gray",
        boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
    };
    const userResembleModels = [
        { name: '모델 A', similarity: 87, image: 'https://via.placeholder.com/100' },
        { name: '모델 B', similarity: 63, image: 'https://via.placeholder.com/100' },
        { name: '모델 C', similarity: 43, image: 'https://via.placeholder.com/100' },
        { name: '모델 D', similarity: 23, image: 'https://via.placeholder.com/100' },
        { name: '모델 E', similarity: 23, image: 'https://via.placeholder.com/100' }
    ];

    return (
        <>
            <Header />
            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div>Error: {error}</div>
            ) : (
                <section className="h-full flex justify-center">
                    <div className="px-3 py-2">
                        <div className="flex flex-wrap border shadow rounded-lg p-3 dark:bg-gray-600 items-center flex-col">
                            <a
                                className="block mx-auto"
                                href=""
                                style={profileImageStyle}
                            ></a>
                            {userData && (
                                <>
                                    <p className="font-serif font-semibold p-4">{userData.names}</p>
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
                </section>
            )}
            <div>
                <h2 className="text-xl font-semibold mt-4 mb-2 p-6">나와 비슷한 모델</h2>
                <SimilarModels models={userResembleModels} />
            </div>
            <Footer />
        </>
    )

} 