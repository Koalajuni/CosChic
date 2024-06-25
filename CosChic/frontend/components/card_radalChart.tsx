import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

interface CardRadarChartProps {
    eye: number | string | null;
    nose: number | string | null;
    lips: number | string | null;
    eyebrows: number | string | null;
    contour: number | string | null;
}

const CardRadarChart: React.FC<CardRadarChartProps> = ({ eye, nose, lips, eyebrows, contour }) => {
    const data = [
        {
            subject: '윤곽',
            A: contour,
            fullMark: 100,
        },
        {
            subject: '눈',
            A: eye,
            fullMark: 100,
        },
        {
            subject: '코',
            A: nose,
            fullMark: 100,
        },
        {
            subject: '입',
            A: lips,
            fullMark: 100,
        },
        {
            subject: '눈썹',
            A: eyebrows,
            fullMark: 100,
        },
    ];
    return (
        <div className="bg-white text-bg-gray-500 rounded shadow-xl py-2 px-5 w-full">
            <div className="flex w-full">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">모델 유사도</h3>
            </div>
            <div className="relative overflow-hidden transition-all duration-500">
                <div className="pb-2 lg:pb-2">
                    <ResponsiveContainer width="100%" height={300}>
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                            <PolarGrid />
                            <PolarAngleAxis dataKey="subject" />
                            <PolarRadiusAxis />
                            <Radar name="Mike" dataKey="A" stroke="#FF6F91" fill="#FF6F91" fillOpacity={0.6} />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default CardRadarChart;
