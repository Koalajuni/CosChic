"use client";
import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Header from '@/components/inc_header';
import Footer from '@/components/inc_footer';

const SearchPageClient = dynamic(() => import('./SearchPageClient'), { ssr: false });

const SearchPage = () => {
    return (
        <>
            <Header />
            <Suspense fallback={<div>Loading...</div>}>
                <SearchPageClient />
            </Suspense>
            <Footer />
        </>
    );
};

export default SearchPage;