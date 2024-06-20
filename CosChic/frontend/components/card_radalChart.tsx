import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

const data = [
    {
        subject: '윤곽',
        A: 60,
        fullMark: 100,
    },
    {
        subject: '눈',
        A: 40,
        fullMark: 100,
    },
    {
        subject: '코',
        A: 70,
        fullMark: 100,
    },
    {
        subject: '입',
        A: 32,
        fullMark: 100,
    },
    {
        subject: '눈썹',
        A: 29,
        fullMark: 100,
    },
];

const CardRadarChart = () => {
    return (
        <div className="bg-white text-gray-500 rounded shadow-xl py-2 px-5 w-full sm:w-2/3 md:w-1/2 lg:w-1/3">
            <div className="flex w-full">
                <h3 className="text-lg font-semibold leading-tight flex-1">유사도 분석</h3>
            </div>
            <div className="relative overflow-hidden transition-all duration-500">
                <div className="pb-2 lg:pb-2">
                    <ResponsiveContainer width="100%" height={300}>
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                            <PolarGrid />
                            <PolarAngleAxis dataKey="subject" />
                            <PolarRadiusAxis />
                            <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default CardRadarChart;
