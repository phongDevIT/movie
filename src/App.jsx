import { Fragment } from "react";
import Banner from "./components/banner/Banner";
import "swiper/css";
import HomePage from "./pages/HomePage";
import { Route, Routes } from "react-router-dom";
import Main from "./components/layout/Main";
import MoviePage from "./pages/MoviePage";
import MovieDetailPage from "./pages/MovieDetailPage";

// https://api.themoviedb.org/3/movie/now_playing?api_key=75c59ca262c8ea2f7b4401b408a3193
function App() {
    return (
        <Fragment>
            <Routes>
                {/* <Route path="/" element={<Main></Main>}></Route> */}
                <Route element={<Main></Main>}>
                    {/* <Route path="/" element={<Banner></Banner>}></Route> */}
                    <Route
                        path="/"
                        element={
                            <>
                                <Banner></Banner>
                                <HomePage></HomePage>
                            </>
                        }
                    ></Route>
                    <Route
                        path="/movies"
                        element={<MoviePage></MoviePage>}
                    ></Route>
                    <Route
                        path="/movies/:movieId"
                        element={<MovieDetailPage></MovieDetailPage>}
                    ></Route>
                </Route>
            </Routes>
        </Fragment>
    );
}

export default App;
