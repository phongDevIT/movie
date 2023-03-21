import React from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";
import { fetcher } from "../config";
import MovieCard from "../components/movie/MovieCard";
// https://api.themoviedb.org/3/movie/{movie_id}?api_key=

const MovieDetailPage = () => {
    const { movieId } = useParams();
    const { data, error } = useSWR(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=75c59ca262c8ea2f7b4401b408a3193f`,
        fetcher
    );
    // console.log("data: ", data);
    if (!data) return null;
    const { backdrop_path, poster_path, title, genres, overview } = data;
    return (
        <div className="py-10">
            <div className="w-full h-[600px] relative">
                <div className="absolute inset-0 bg-black bg-opacity-70"></div>
                <div
                    className="w-full h-full bg-cover bg-no-repeat"
                    style={{
                        backgroundImage: `url(https://image.tmdb.org/t/p/original/${backdrop_path})`,
                    }}
                ></div>
            </div>
            <div className="w-full h-[400px] max-w-[800px] mx-auto -mt-[200px] relative z-1000 pb-5">
                <img
                    src={`https://image.tmdb.org/t/p/original/${poster_path}`}
                    alt=""
                    className="w-full h-full object-cover rounded-xl"
                />
            </div>
            <h1 className="text-center text-white text-4xl mb-10">{title}</h1>
            {genres.length > 0 && (
                <div className="flex items-center justify-center gap-x-5 mb-10">
                    {genres.map((item) => (
                        <span
                            className="py-2 px-6 text-primary rounded-lg border border-primary cursor-pointer"
                            key={item.id}
                        >
                            {item.name}
                        </span>
                    ))}
                </div>
            )}
            <p className="text-center leading-relaxed max-w-[600px] mx-auto mb-10">
                {overview}
            </p>
            <MovieCredit></MovieCredit>
            <MovieVideos></MovieVideos>
            <MovieSimilar></MovieSimilar>
        </div>
    );
};
function MovieCredit() {
    const { movieId } = useParams();
    const { data, error } = useSWR(
        `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=75c59ca262c8ea2f7b4401b408a3193f`,
        fetcher
    );
    if (!data) return null;
    const { cast, name, profile_path } = data;
    if (!cast && cast.length <= 0) return null;

    return (
        <div className="py-5">
            <h2 className="text-center text-3xl mb-10">Casts</h2>
            <div className="grid grid-cols-4 gap-5 mb-10">
                {cast.slice(0, 4).map((item) => (
                    <div className="cast-item" key={item.id}>
                        <img
                            src={`https://image.tmdb.org/t/p/original/${item.profile_path}`}
                            className="w-full h-[300px] rounded-lg object-cover mb-3"
                            alt=""
                        />
                        <h3 className="text-center text-xl">{item.name}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
}
function MovieVideos() {
    const { movieId } = useParams();
    const { data, error } = useSWR(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=75c59ca262c8ea2f7b4401b408a3193f`,
        fetcher
    );
    if (!data) return null;
    // console.log("data: ", data);
    const { results } = data;
    if (!results || results.length <= 0) return null;
    return (
        <div className="py-10">
            <div className="flex flex-col gap-10">
                {results.slice(0, 2).map((item) => (
                    <div className="" key={item.id}>
                        <h3 className="mb-5 text-xl font-medium p-3 bg-primary inline-block">
                            {item.name}
                        </h3>
                        <div key={item.id} className="w-full aspect-video">
                            <iframe
                                width="1104"
                                height="621"
                                src={`https://www.youtube.com/embed/${item.key}`}
                                title="Mario&#39;s Boots at Nintendo New York [MAR10 Day Recap]"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                                className="w-full h-full object-fill"
                            ></iframe>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function MovieSimilar() {
    const { movieId } = useParams();
    const { data, error } = useSWR(
        `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=75c59ca262c8ea2f7b4401b408a3193f`,
        fetcher
    );
    if (!data) return null;
    const { results } = data;
    if (!results || results.length <= 0) return null;
    return (
        <div className="py-10">
            <h2 className="text-3xl font-medium mb-10">Similar movies</h2>
            <div className="movie-list">
                <Swiper
                    grabCursor={true}
                    spaceBetween={40}
                    slidesPerView={"auto"}
                >
                    {results.length > 0 &&
                        results.map((item) => (
                            <SwiperSlide key={item.id}>
                                <MovieCard item={item}></MovieCard>
                            </SwiperSlide>
                        ))}
                </Swiper>
            </div>
        </div>
    );
}

export default MovieDetailPage;
