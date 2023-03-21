import React, { useEffect, useState } from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import MovieCard from "./MovieCard";
import useSWR from "swr";
import "swiper/css";
import { fetcher } from "../../config";
// https://api.themoviedb.org/3/movie/now_playing?api_key=75c59ca262c8ea2f7b4401b408a3193f
const MovieList = ({ type = "now_playing" }) => {
    const { data, error } = useSWR(
        `https://api.themoviedb.org/3/movie/${type}?api_key=75c59ca262c8ea2f7b4401b408a3193f`,
        fetcher
    );
    const movies = data?.results || [];
    // console.log("movies: ", movies);
    return (
        <div className="movie-list">
            <Swiper grabCursor={true} spaceBetween={40} slidesPerView={"auto"}>
                {movies.length > 0 &&
                    movies.map((item) => (
                        <SwiperSlide key={item.id}>
                            <MovieCard item={item}></MovieCard>
                        </SwiperSlide>
                    ))}
            </Swiper>
        </div>
    );
};

export default MovieList;
