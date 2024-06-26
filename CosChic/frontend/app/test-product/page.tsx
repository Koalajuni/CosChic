"use client";
import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Header from '@/components/inc_header';
import Footer from '@/components/inc_footer';

const TestProductClient = dynamic(() => import('./TestProductClient'), { ssr: false });

const TestProductPage = () => {
    return (
        <>
            <Header />
            <Suspense fallback={<div>Loading...</div>}>
                <TestProductClient />
            </Suspense>
            <Footer />
        </>
    );
};

export default TestProductPage;