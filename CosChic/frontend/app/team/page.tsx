"use client"
import React from 'react';
import Header from "@/components/inc_header"
import Footer from '@/components/inc_footer';
import CardTeamProfile from '@/components/card_teamProfile';



const TeamPage = () => {
    return (
        <>
            <Header />
            <div className="p-10">
                <div className="flex component-container m-20px space-x-6">

                    <CardTeamProfile name="팀원1" job="개발자" emailUrl="email@gmail.com" githubUrl="www." />
                    <CardTeamProfile name="팀원2" job="개발자" emailUrl="email@gmail.com" githubUrl="www." />
                    <CardTeamProfile name="팀원3" job="개발자" emailUrl="email@gmail.com" githubUrl="www." />
                    <CardTeamProfile name="팀원4" job="개발자" emailUrl="email@gmail.com" githubUrl="www." />
                    <CardTeamProfile name="팀원5" job="개발자" emailUrl="email@gmail.com" githubUrl="www." />
                </div>
            </div>

            <Footer />
        </>
    )
}

export default TeamPage;