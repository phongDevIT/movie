import React from "react";
import useSWR from "swr";
import { SwiperSlide, Swiper } from "swiper/react";
import { fetcher } from "../../config";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import Button from "../button/Button";
const Banner = () => {
    const { data, error } = useSWR(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=75c59ca262c8ea2f7b4401b408a3193f`,
        fetcher
    );
    const movies = data?.results || [];
    return (
        <section className="banner h-[600px] page-container mb-20 overflow-hidden">
            <Swiper grabCursor={true} slidesPerView={"auto"}>
                {movies.length > 0 &&
                    movies.map((item) => (
                        <SwiperSlide key={item.id}>
                            <BannerItem item={item}></BannerItem>
                        </SwiperSlide>
                    ))}
            </Swiper>
        </section>
    );
};
function BannerItem({ item }) {
    const { title, poster_path, id } = item;
    const navigate = useNavigate();

    return (
        <div className="w-full h-full rounded-lg relative">
            <div className="overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)] rounded-lg "></div>
            <img
                src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
                alt=""
                className="w-full h-full object-cover rounded-lg object-top"
            />
            <div className="absolute left-5 bottom-5 w-full text-white">
                <h2 className="text-3xl font-bold mb-3">{title}</h2>
                <div className="flex items-center gap-x-3 mb-8">
                    <span className="py-2 px-7 border border-white rounded-lg">
                        Action
                    </span>
                    <span className="py-2 px-7 border border-white rounded-lg">
                        Acventure
                    </span>
                    <span className="py-2 px-7  border border-white rounded-lg">
                        Drama
                    </span>
                </div>
                <Button onClick={() => navigate(`/movies/${id}`)}>
                    Watch Now
                </Button>
                {/* <button className="py-3 px-6 rounded-lg bg-primary text-white font-medium">
                    Watch Now
                </button> */}
            </div>
        </div>
    );
}
export default Banner;
