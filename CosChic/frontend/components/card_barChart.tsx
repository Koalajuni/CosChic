import React, { useEffect, useState, useRef } from 'react';
import { CountUp } from 'countup.js';

interface CardBarChartProps {
    eye: string;
    nose: string;
    lips: string;
    eyebrows: string;
    total: string;
    contour: string;
}

const CardBarChart: React.FC<CardBarChartProps> = ({ eye, nose, lips, eyebrows, total, contour }) => {
    const [cardOpen, setCardOpen] = useState(false);
    const totalRef = useRef<HTMLHeadingElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);

    const eyeNumber = parseFloat(eye);
    const noseNumber = parseFloat(nose);
    const lipsNumber = parseFloat(lips);
    const eyebrowsNumber = parseFloat(eyebrows);
    const contourNumber = parseFloat(contour);
    const totalNumber = parseFloat(total);

    const totalSum = eyeNumber + noseNumber + lipsNumber + eyebrowsNumber + contourNumber;

    const eyeRatio = eyeNumber / totalSum;
    const noseRatio = noseNumber / totalSum;
    const lipsRatio = lipsNumber / totalSum;
    const eyebrowsRatio = eyebrowsNumber / totalSum;
    const contourRatio = contourNumber / totalSum;

    const sessions = [
        {
            label: "눈",
            size: eyeRatio * 100,
            color: "bg-pink-600"
        },
        {
            label: "코",
            size: noseRatio * 100,
            color: "bg-pink-400"
        },
        {
            label: "입",
            size: lipsRatio * 100,
            color: "bg-pink-200"
        },
        {
            label: "눈썹",
            size: eyebrowsRatio * 100,
            color: "bg-pink-200"
        },
        {
            label: "윤곽",
            size: contourRatio * 100,
            color: "bg-pink-100"
        }
    ];

    useEffect(() => {
        if (cardOpen && totalRef.current) {
            const countUpTotal = new CountUp(totalRef.current, totalNumber, { duration: 0.9 });
            countUpTotal.start();
            sessions.forEach((session, i) => {
                const deviceRef = document.querySelector(`[data-device-index="${i}"]`) as HTMLElement;
                if (deviceRef) {
                    const countUpDevice = new CountUp(deviceRef, session.size, { duration: 1.6 });
                    countUpDevice.start();
                }
            });
        }
    }, [cardOpen, totalNumber]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setCardOpen(true);
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="bg-white text-bg-gray-500 rounded shadow-xl py-5 px-5 w-full h-1/2 ">
            <div className="flex w-full">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">코스칙 점수</h3>
                <div className="relative h-5 leading-none">
                    <button
                        className="text-xl text-gray-500 hover:text-gray-300 h-6 focus:outline-none"
                        onClick={() => setCardOpen(!cardOpen)}
                    >
                        <i className={`mdi mdi-chevron-${cardOpen ? 'up' : 'down'}`}></i>
                    </button>
                </div>
            </div>
            <div
                className="relative overflow-hidden transition-all duration-500"
                ref={cardRef}
                style={{
                    maxHeight: cardOpen ? cardRef.current?.scrollHeight : 0,
                    opacity: cardOpen ? 1 : 0
                }}
            >
                <div>
                    <div className="pb-4 lg:pb-6">
                        <h4 className="text-2xl lg:text-3xl text-bg-gray-800 font-semibold leading-tight inline-block" ref={totalRef}>0</h4>
                    </div>
                    <div className="pb-4 lg:pb-6">
                        <div className={`overflow-hidden rounded-full h-3 bg-gray-800 flex transition-all duration-500 ${cardOpen ? 'w-full' : 'w-0'}`}>
                            {sessions.map((item, index) => (
                                <div
                                    key={index}
                                    className={`h-full ${item.color}`}
                                    style={{ width: `${item.size}%` }}
                                ></div>
                            ))}
                        </div>
                    </div>
                    <div className="flex -mx-4">
                        {sessions.map((item, index) => (
                            <div
                                key={index}
                                className={`w-1/3 px-4 ${index !== 0 ? 'border-l border-bg-gray-700' : ''}`}
                            >
                                <div className="text-sm">
                                    <span className={`inline-block w-2 h-2 rounded-full mr-1 align-middle ${item.color}`}>&nbsp;</span>
                                    <span className="align-middle">{item.label}&nbsp;</span>
                                </div>
                                <div className="font-medium text-lg text-bg-gray-800">
                                    <span data-device-index={index}>0</span>%
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardBarChart;
