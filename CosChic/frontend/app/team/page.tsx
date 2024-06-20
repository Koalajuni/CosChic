"use client"
import React, { useState, useEffect } from 'react';
import Header from "@/components/inc_header"
import Footer from '@/components/inc_footer';
import CardTeamProfile from '@/components/card_teamProfile';
import { ReactTyped } from "react-typed"



const TeamPage = () => {
    const [teamMembers, setTeamMembers] = useState([
        { imageUrl: "assets/hj.jpg", name: "김현진", job: "개발자", emailUrl: "domgy0112@naver.com", githubUrl: "https://github.com/hyeonjin0112" },
        { imageUrl: "assets/mc.jpg", name: "옥민찬", job: "개발자", emailUrl: "mac0602@naver.com", githubUrl: "https://github.com/minchanok" },
        { imageUrl: "assets/sh.jpg", name: "이상휘", job: "개발자", emailUrl: "leesangwhui@gmail.com", githubUrl: "https://github.com/angrychimpanzee" },
        { imageUrl: "assets/jh.jpg", name: "임지현", job: "개발자", emailUrl: "imjihyun5330@gmail.com", githubUrl: "https://github.com/imj1hye0n" },
        { imageUrl: "assets/tj.jpg", name: "이현준", job: "개발자", emailUrl: "hyounjunl@gmail.com", githubUrl: "https://github.com/Koalajuni" },
    ]);

    useEffect(() => {
        const shuffledTeam = [...teamMembers].sort(() => Math.random() - 0.5); // Shuffle the team array copy
        setTeamMembers(shuffledTeam);
    }, []); // Run the shuffle effect only once on component mount

    return (
        <>
            <Header />
            <div className="HERO text-black">
                <div className="py-3 max-w-[800px] w-full mx-auto text-center flex flex-col justify-center">
                    <h1 className="md:text-6xl sm:text-5xl text-3xl font-bold md:py-6" style={{ color: '#FF6F91' }}>Your AI Stylist</h1>
                    <div>
                        <p className="md:text-4xl sm:text-3xl text-xl font-bold">
                            <ReactTyped
                                className=''
                                strings={[
                                    '나에게 맞는 화장법',
                                    '찾아주셔서 감사합니다',
                                    'ChicBytes팀이 함께합니다',
                                ]}
                                typeSpeed={80}
                                backSpeed={80}
                                loop
                            />
                        </p>
                    </div>
                </div>
            </div>
            <div className=" mt-4 justify-center items-center px-8">
                <div className="flex component-container m-20px space-x-6">
                    {teamMembers.map((member) => (
                        <CardTeamProfile
                            key={member.name} // Important for performance with dynamic lists
                            imageUrl={member.imageUrl}
                            name={member.name}
                            job={member.job}
                            emailUrl={member.emailUrl}
                            githubUrl={member.githubUrl}
                        />
                    ))}
                </div>
            </div>
            <div className='flex justify-center py-8'>
                <p className="text-1xl font-bold p-2 mb-8" style={{ color: '#8E65B7' }}>ChicBytes팀의 개발팀을 소개합니다</p>
            </div>

            <Footer />
        </>
    )
}

export default TeamPage;