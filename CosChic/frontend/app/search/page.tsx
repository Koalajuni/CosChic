"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from '@/components/searchBar';
import CardSearchResult from '@/components/card_searchResult';
import Header from '@/components/inc_header';
import Footer from '@/components/inc_footer';
import Pagination from '@/components/inc_pagination';

const SearchPage = () => {
    const [userUid, setUserUid] = useState("");

    useEffect(() => {
        // User UID 가져와서 저장
        const storedUserUid = localStorage.getItem('UUID');
        console.log(storedUserUid)
        if (storedUserUid) {
            setUserUid(storedUserUid);
        }
        console.log(storedUserUid)
    }, []);
    {/*        더미 모델 공간입니다             */ }

    //주의: 
    //여기서 실제 DB안에 있는 유저 모델 정보를 입력해서 사용해주세요 
    // String인지, number인지 확인하고 아래 기입해주세요


    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearch = async (event) => {
        event.preventDefault();
        // Make API call to search endpoint
        // Replace with your API URL
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/v1/search?query=${searchTerm}`);
            setResults(response.data);
        } catch (error) {
            console.error("Error fetching search results:", error);
            // Handle error appropriately
        }
    };

    const dummyData = [
        {
            image: 'https://via.placeholder.com/50',
            title: 'Dummy Title 1',
            description: 'This is a description for dummy data 1.',
        },
        {
            image: 'https://via.placeholder.com/50',
            title: 'Dummy Title 2',
            description: 'This is a description for dummy data 2.',
        },
        {
            image: 'https://via.placeholder.com/50',
            title: 'Dummy Title 3',
            description: 'This is a description for dummy data 3.',
        },
    ];

    const dataToDisplay = results.length > 0 ? results : dummyData;

    return (
        <>
            <Header />
            <div style={{ padding: '20px' }}>
                <SearchBar searchTerm={searchTerm} onChange={handleSearchChange} onSearch={handleSearch} />
                <div style={{ marginTop: '20px' }}>
                    {dataToDisplay.map((result, index) => (
                        <CardSearchResult
                            key={index}
                            image={result.image} // replace with actual image field
                            title={result.title} // replace with actual title field
                            description={result.description} // replace with actual description field
                        />
                    ))}
                </div>
            </div>
            <Pagination />
            <Footer />
        </>
    );
};

export default SearchPage;
