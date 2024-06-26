"use client";
// Import necessary modules and components
import React, { useState, useEffect, Suspense } from 'react';
import axios from 'axios';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import SearchBar from '@/components/searchBar';
import CardSearchProduct from '@/components/card_searchProduct';
import Header from '@/components/inc_header';
import Footer from '@/components/inc_footer';
import Pagination from '@/components/inc_pagination';
import axiosInstance from '@/hooks/axiosConfig';

// Define the Result interface for product search results
interface Result {
    productImage: string;
    productName: string;
    brandName: string;
    price: string;
    count: string;
    category: string;
    productUrl: string;
}

const SearchPage = () => {
    const router = useRouter();
    const pathname = usePathname();
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState<Result[]>([]);
    const [category, setCategory] = useState('모두');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);
    const resultsPerPage = 4;

    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);
    const page = Number(params.get('page')) || 1;

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const fetchResults = async (page: number, query: string, cat: string) => {
        setLoading(true);
        try {
            const response = await axiosInstance.get('/search', {
                params: {
                    query: query,
                    category: cat,
                    page: page,
                    results_per_page: resultsPerPage
                }
            });
            const { results, total_results, total_pages, current_page } = response.data;
            setResults(results);
            setTotalResults(total_results);
            setTotalPages(total_pages);
            setCurrentPage(current_page);
        } catch (error) {
            console.error("Error fetching search results:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const params = new URLSearchParams({
            query: searchTerm,
            category: category,
            page: '1'
        }).toString();
        router.push(`${pathname}?${params}`);
        fetchResults(1, searchTerm, category);
    };

    const handlePageChange = (page: number) => {
        const params = new URLSearchParams({
            query: searchTerm,
            category: category,
            page: String(page)
        }).toString();
        router.push(`${pathname}?${params}`);
        fetchResults(page, searchTerm, category);
    };

    useEffect(() => {
        const query = params.get('query');
        const category = params.get('category') || '모두';
        const page = Number(params.get('page')) || 1;

        if (query) {
            setSearchTerm(query);
            setCategory(category);
            fetchResults(page, query, category);
        }
    }, [searchParams]);

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Header />
            <div style={{ padding: '20px' }}>
                <SearchBar
                    searchTerm={searchTerm}
                    onChange={handleSearchChange}
                    onSearch={handleSearch}
                    category={category}
                    setCategory={setCategory}
                />
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <div style={{ marginTop: '20px' }}>
                        {Array.isArray(results) && results.length > 0 ? (
                            results.map((result, index) => (
                                <CardSearchProduct
                                    key={index}
                                    image={result.productImage}
                                    title={result.productName}
                                    description={result.brandName}
                                    price={result.price}
                                    count={result.count}
                                    category={result.category}
                                    productUrl={result.productUrl}
                                />
                            ))
                        ) : (
                            <CardSearchProduct
                                key={0}
                                image={"assets/default_search.png"}
                                title={"검색한 내용이 없습니다"}
                                description={"검색한 브랜드가 없습니다"}
                                price={"0"}
                                count={"--"}
                                category={"카테고리"}
                                productUrl={" "}
                            />
                        )}
                    </div>
                )}
                <Pagination
                    totalResults={totalResults}
                    resultsPerPage={resultsPerPage}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />
            </div>
            <Footer />
        </Suspense>
    );
};

export default SearchPage;
