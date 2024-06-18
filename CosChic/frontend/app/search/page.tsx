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
    const resultsPerPage = 4;

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearch = async (event) => {
        event.preventDefault();
        try {
            console.log("searched:", category)
            const response = await axios.get(`http://127.0.0.1:8000/api/v1/search`,
                {
                    params: {
                        query: searchTerm,
                        category: category
                    }
                });
            setResults(response.data);
            setCurrentPage(1);
        } catch (error) {
            console.error("Error fetching search results:", error);
            // Handle error appropriately
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const indexOfLastResult = currentPage * resultsPerPage;
    const indexOfFirstResult = indexOfLastResult - resultsPerPage;
    const currentResults = results.slice(indexOfFirstResult, indexOfLastResult);


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
                    {currentResults.map((result, index) => (
                        <CardSearchProduct
                            key={index}
                            image={result.image} // replace with actual image field
                            title={result.productName} // replace with actual title field
                            description={result.brandName} // replace with actual description field
                            price={result.price} // replace with actual price field
                            count={result.count} // replace with actual count field
                            category={result.category} // replace with actual category field
                        />
                    ))}
                </div>
                <Pagination
                    totalResults={results.length}
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
