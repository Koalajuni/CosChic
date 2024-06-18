"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from '@/components/searchBar';
import CardSearchResult from '@/components/card_searchResult';
import Header from '@/components/inc_header';
import Footer from '@/components/inc_footer';
import Pagination from '@/components/inc_pagination';
import CardSearchProduct from '@/components/card_searchProduct';

const SearchPage = () => {
    const [userUid, setUserUid] = useState("");

    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [category, setCategory] = useState('모두');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const resultsPerPage = 4;

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const fetchResults = async (page = 1) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/v1/search`, {
                params: {
                    query: searchTerm,
                    category: category,
                    page: page,
                    results_per_page: resultsPerPage
                }
            });
            console.log("API RESULT:", response)
            const { results, total_results, total_pages, current_page } = response.data;
            setResults(results);
            setTotalResults(total_results);
            setTotalPages(total_pages);
            setCurrentPage(current_page);
            console.log("jus the data:", results)
            console.log("jus the total resulst:", total_results)
            console.log("jus the total_pages:", total_pages)
            console.log("jus the current_page:", current_page)
        } catch (error) {
            console.error("Error fetching search results:", error);
            // Handle error appropriately
        }
    };

    const handleSearch = (event) => {
        event.preventDefault();
        fetchResults(1);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        fetchResults(page);
    };
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
                <div style={{ marginTop: '20px' }}>
                    {Array.isArray(results) && results.length > 0 ? (
                        results.map((result, index) => (
                            <CardSearchProduct
                                key={index}
                                image={result.image} // replace with actual image field
                                title={result.productName} // replace with actual title field
                                description={result.brandName} // replace with actual description field
                                price={result.price} // replace with actual price field
                                count={result.count} // replace with actual count field
                                category={result.category} // replace with actual category field
                            />
                        ))
                    ) : (
                        <CardSearchProduct
                            key={0}
                            image={"assets/deafult_search.png"} // replace with actual image field
                            title={"검색한 내용이 없습니다"} // replace with actual title field
                            description={"검색한 브랜드가 없습니다"} // replace with actual description field
                            price={"0"} // replace with actual price field
                            count={"--"} // replace with actual count field
                            category={"카테고리"} // replace with actual category field
                        />
                    )}
                </div>
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
