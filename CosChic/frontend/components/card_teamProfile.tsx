import React, { useState } from 'react';


const CardTeamProfile = ({ name, job, emailUrl = "", githubUrl = "" }) => {

    return (
        <div className="h-auto  border min-w-xs  w-full hover:shadow-xl rounded-md bg-gray-100 dark:bg-gray-800 ">
            <section className="w-full h-72  flex flex-col items-center  pt-10 gap-1 ">
                <div className="h-28 w-28 rounded-full overflow-hidden ">
                    <img src="/avatar/av9.jpeg" alt="" className="h-full w-full object-cover" />
                </div>
                <button className="bg-green-100 border-green-700 text-green-700 border   text-[12px] h-5 px-2 mt-5 rounded-full">Admin</button>
                <div className="flex flex-col items-center p-2 gap-2">
                    <h1 className=" text-xl font-bold text-blue-500">{name}</h1>
                    <p className="text-sm">{job}</p>
                </div>
            </section>
            <section className="grid grid-cols-2 ">
                <div className="flex items-center justify-center space-x-3 h-14 w-full cursor-pointer border-t border-r hover:bg-gray-400/10 ">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                    {/* <Mail size={18} className='fill-yellow-600 stroke-white' /> */}
                    <h1 className="text-sm font-bold ">Email</h1>
                </div>
                <div role="button" className="flex items-center justify-center space-x-3 h-14 cursor-pointer w-full border-t hover:bg-gray-400/10 ">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github">
                        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                        <path d="M9 18c-4.51 2-5-2-7-2" />
                    </svg>
                    <h1 className="text-sm font-bold ">Github</h1>
                </div>
            </section>
        </div>
    );
};

export default CardTeamProfile;
