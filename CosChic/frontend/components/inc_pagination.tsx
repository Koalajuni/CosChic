"use client";
import { useState, useEffect } from "react";

interface PaginationProps {
    totalResults: number;
    resultsPerPage: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalResults, resultsPerPage, currentPage, onPageChange }) => {
    const totalPages = Math.max(1, Math.ceil(totalResults / resultsPerPage));
    const [visiblePages, setVisiblePages] = useState<number[]>([]);

    useEffect(() => {
        if (totalPages <= 10) {
            setVisiblePages(Array.from({ length: totalPages }, (_, index) => index + 1));
        } else if (currentPage <= 6) {
            setVisiblePages(Array.from({ length: 10 }, (_, index) => index + 1));
        } else {
            let startPage = currentPage - 5;
            let endPage = currentPage + 4;
            if (endPage > totalPages) {
                endPage = totalPages;
                startPage = endPage - 9;
            }
            setVisiblePages(Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index));
        }
    }, [totalPages, currentPage]);


    const handleClick = (page: number) => {
        onPageChange(page);
        if (page > 6 && totalPages > 10) {
            let startPage = page - 5;
            let endPage = page + 4;
            if (endPage > totalPages) {
                endPage = totalPages;
                startPage = endPage - 9;
            }
            setVisiblePages(Array.from({ length: endPage - startPage + 1 }, (_, index) => index + startPage));
        } else if (page <= 6 && totalPages > 10) {
            setVisiblePages(Array.from({ length: 10 }, (_, index) => index + 1));
        }
    };

    const handlePrevious = () => {
        if (currentPage > 1) {
            handleClick(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            handleClick(currentPage + 1);
        }
    };

    return (
        <div className="max-w-screen-xl mx-auto mt-12 px-4 text-gray-600 md:px-8">
            <div className="hidden items-center justify-between sm:flex" aria-label="Pagination">
                <button onClick={handlePrevious} className="hover:text-indigo-600 flex items-center gap-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                        <path fillRule="evenodd" d="M18 10a.75.75 0 01-.75.75H4.66l2.1 1.95a.75.75 0 11-1.02 1.1l-3.5-3.25a.75.75 0 010-1.1l3.5-3.25a.75.75 0 111.02 1.1l-2.1 1.95h12.59A.75.75 0 0118 10z" clipRule="evenodd" />
                    </svg>
                    Previous
                </button>
                <ul className="flex items-center gap-1">
                    {visiblePages.map((item, idx) => (
                        <li key={item} className="text-sm">
                            <button
                                onClick={() => handleClick(item)}
                                aria-current={currentPage == item ? "page" : undefined}
                                className={`px-3 py-2 rounded-lg duration-150 hover:text-indigo-600 hover:bg-indigo-50 ${currentPage == item ? "bg-indigo-50 text-indigo-600 font-medium" : ""}`}
                            >
                                {item}
                            </button>
                        </li>
                    ))}
                </ul>
                <button onClick={handleNext} className="hover:text-indigo-600 flex items-center gap-x-2">
                    Next
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                        <path fillRule="evenodd" d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
            {/* On mobile version */}
            <div className="flex items-center justify-between text-sm text-gray-600 font-medium sm:hidden">
                <button onClick={handlePrevious} className="px-4 py-2 border rounded-lg duration-150 hover:bg-gray-50">Previous</button>
                <div className="font-medium">
                    Page {currentPage} of {totalPages}
                </div>
                <button onClick={handleNext} className="px-4 py-2 border rounded-lg duration-150 hover:bg-gray-50">Next</button>
            </div>
        </div>
    );
}

export default Pagination;
