"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import SearchBar from '@/components/searchBar';
import CardSearchProduct from '@/components/card_searchProduct';
import Header from '@/components/inc_header';
import Footer from '@/components/inc_footer';
import Pagination from '@/components/inc_pagination';

const SearchPage = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [searchTerm, setSearchTerm] = useState(searchParams.get('query') || '');
    const [results, setResults] = useState([]);
    const [category, setCategory] = useState(searchParams.get('category') || '모두');
    const [currentPage, setCurrentPage] = useState(Number(searchParams.get('page')) || 1);
    const [totalResults, setTotalResults] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);
    const resultsPerPage = 4;

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const fetchResults = async (page = 1, query = searchTerm, cat = category) => {
        setLoading(true);
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/v1/search`, {
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
            console.log("data", results)
        } catch (error) {
            console.error("Error fetching search results:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (event) => {
        event.preventDefault();
        const params = new URLSearchParams({
            query: searchTerm,
            category: category,
            page: '1'
        }).toString();
        router.push(`${pathname}?${params}`, { shallow: true });
        fetchResults(1, searchTerm, category);
    };

    const handlePageChange = (page) => {
        const params = new URLSearchParams({
            query: searchTerm,
            category: category,
            page: String(page)
        }).toString();
        router.push(`${pathname}?${params}`, { shallow: true });
        fetchResults(page, searchTerm, category);
    };

    useEffect(() => {
        const query = searchParams.get('query');
        const category = searchParams.get('category') || '모두';
        const page = Number(searchParams.get('page')) || 1;

        if (query) {
            setSearchTerm(query);
            setCategory(category);
            fetchResults(page, query, category);
        }
    }, [searchParams]);

    return (
        <>
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
                                    image={result.productImage} // replace with actual image field
                                    title={result.productName} // replace with actual title field
                                    description={result.brandName} // replace with actual description field
                                    price={result.price} // replace with actual price field
                                    count={result.count} // replace with actual count field
                                    category={result.category} // replace with actual category field
                                    productUrl={result.productUrl}
                                />
                            ))
                        ) : (
                            <CardSearchProduct
                                key={0}
                                image={"assets/default_search.png"} // replace with actual image field
                                title={"검색한 내용이 없습니다"} // replace with actual title field
                                description={"검색한 브랜드가 없습니다"} // replace with actual description field
                                price={"0"} // replace with actual price field
                                count={"--"} // replace with actual count field
                                category={"카테고리"} // replace with actual category field
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
        </>
    );
};

export default SearchPage;
