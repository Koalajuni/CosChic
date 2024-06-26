"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { debounce } from 'lodash';
import SearchBar from '@/components/searchBar';
import CardSearchProduct from '@/components/card_searchProduct';
import Pagination from '@/components/inc_pagination';
import axiosInstance from '@/hooks/axiosConfig';

interface Result {
    productImage: string;
    productName: string;
    brandName: string;
    price: string;
    count: string;
    category: string;
    productUrl: string;
    productId: string; // Assuming you have a unique identifier
}

const SearchPageClient = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState<Result[]>([]);
    const [category, setCategory] = useState('모두');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [isSearching, setIsSearching] = useState(false);
    const resultsPerPage = 4;

    const searchParams = useSearchParams();

    const fetchResults = async (page: number, query: string, cat: string) => {
        if (!query) return;
        setIsSearching(true);
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
            setIsSearching(false);
        }
    };

    const debouncedHandleSearchChange = useCallback(
        debounce((value: string) => {
            if (value) {
                fetchResults(1, value, category);
            }
        }, 300),
        [category]
    );

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newSearchTerm = event.target.value;
        setSearchTerm(newSearchTerm);
        debouncedHandleSearchChange(newSearchTerm);
    };

    const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        fetchResults(1, searchTerm, category);
    };

    const handlePageChange = (page: number) => {
        fetchResults(page, searchTerm, category);
    };

    useEffect(() => {
        const query = searchParams.get('query');
        const cat = searchParams.get('category') || '모두';
        const page = Number(searchParams.get('page')) || 1;

        if (query && (query !== searchTerm || cat !== category || page !== currentPage)) {
            setSearchTerm(query);
            setCategory(cat);
            fetchResults(page, query, cat);
        }
    }, [searchParams]);

    return (
        <div style={{ padding: '20px' }}>
            <SearchBar
                searchTerm={searchTerm}
                onChange={handleSearchChange}
                onSearch={handleSearch}
                category={category}
                setCategory={setCategory}
            />
            {isSearching ? (
                <div>Searching...</div>
            ) : (
                <>
                    <div className="search-results" style={{ marginTop: '20px' }}>
                        {Array.isArray(results) && results.length > 0 ? (
                            results.map((result) => (
                                <CardSearchProduct
                                    key={result.productId}
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
                    {results.length > 0 && (
                        <Pagination
                            totalResults={totalResults}
                            resultsPerPage={resultsPerPage}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    )}
                </>
            )}
        </div>
    );
};

export default SearchPageClient;