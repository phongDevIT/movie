import React, { useEffect, useState } from "react";
import useSWR from "swr";
import "swiper/css";
import { fetcher } from "../config";
import MovieCard from "../components/movie/MovieCard";
import useDebounce from "../hooks/useDebounce";
import ReactPaginate from "react-paginate";
// https://api.themoviedb.org/3/search/movie?api_key=75c59ca262c8ea2f7b4401b408a3193f

const itemsPerPage = 20;
const MoviePage = () => {
    const [itemOffset, setItemOffset] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const [nextPage, setNextPage] = useState(1);
    const [filter, setFilter] = useState("");
    const [url, setUrl] = useState(
        `https://api.themoviedb.org/3/movie/popular?api_key=75c59ca262c8ea2f7b4401b408a3193f&page=${nextPage}`
    );
    const filterDebounce = useDebounce(filter, 500);
    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };
    const { data, error } = useSWR(url, fetcher);
    useEffect(() => {
        if (filterDebounce) {
            setUrl(
                `https://api.themoviedb.org/3/search/movie?api_key=75c59ca262c8ea2f7b4401b408a3193f&query=${filterDebounce}&page=${nextPage}`
            );
        } else {
            setUrl(
                `https://api.themoviedb.org/3/movie/popular?api_key=75c59ca262c8ea2f7b4401b408a3193f&page=${nextPage}`
            );
        }
    }, [filterDebounce, nextPage]);
    const loading = !data && !error;
    const movies = data?.results || [];
    useEffect(() => {
        if (!data || !data.total_results) return;
        setPageCount(Math.ceil(data.total_results / itemsPerPage));
    }, [data, itemOffset]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % data.total_results;
        setItemOffset(newOffset);
        setNextPage(event.selected + 1);
    };
    // if (!data) return null;
    // const { page, total_pages } = data;

    return (
        <div className="py-10 page-container">
            <div className="flex mb-10">
                <div className="flex-1">
                    <input
                        type="text"
                        className="w-full p-4 bg-slate-800 text-white outline-none"
                        placeholder="Type to search here..."
                        onChange={handleFilterChange}
                    />
                </div>
                <button className="p-4 text-primary text-white">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                        />
                    </svg>
                </button>
            </div>
            {loading && (
                <div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent border-t-4 mx-auto animate-spin"></div>
            )}
            <div className="grid grid-cols-4 gap-10 ">
                {!loading &&
                    movies.length > 0 &&
                    movies.map((item) => (
                        <MovieCard key={item.id} item={item}></MovieCard>
                    ))}
            </div>
            <div className="mt-10">
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel="< previous"
                    renderOnZeroPageCount={null}
                    className="pagination"
                />
            </div>
        </div>
    );
};

export default MoviePage;
