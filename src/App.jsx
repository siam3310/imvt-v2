import "./App.css";
import React from 'react'
import { Routes, Route } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import HomePage from "./Components/pages/Home/HomePage";
import TrendingPage from "./Components/pages/Trending/TrendingPage";
import TrendingMediaPages from "./Components/pages/Trending/TrendingMediaPages";
import SearchPage from "./Components/pages/Search/SearchPage";
import MoviesPage from "./Components/pages/Movies/MoviesPage";
import MovieCategoryPages from "./Components/pages/Movies/MoviesCategoryPages.jsx";
import TvPage from "./Components/pages/TvShows/TvPage";
import TvCategoryPages from "./Components/pages/TvShows/TvCategoryPages.jsx";
import SingleMovie from "./Components/pages/Movies/Movie/SingleMovie";
import SingleTv from "./Components/pages/TvShows/Tv/SingleTv";
import CustomCursor from "./Components/utils/CustomCursor";
import "./App.css"

function App() {
  return (
    // <CustomCursor>
    <div className="app flex bg-[#151517] max-h-[100dvh] overflow-y-hidden select-none">
      <div className="w-fit">
        <Sidebar />
      </div>
      <Routes>
        <Route path="/" element={<div className="w-full bg-[#151517] rounded-l-lg overflow-hidden">
          <HomePage />
        </div>} />
        <Route path="/trending" element={<div className="w-full bg-[#151517] rounded-l-lg overflow-hidden">
          <TrendingPage />
        </div>} />
        <Route path="/trending/:type" element={<div className="w-full bg-[#151517] rounded-l-lg overflow-hidden">
          <TrendingMediaPages />
        </div>} />
        <Route path="/search" element={<div className="w-full bg-[#151517] rounded-l-lg overflow-hidden">
          <SearchPage />
        </div>} />
        <Route path="/movies" element={<div className="w-full bg-[#151517] rounded-l-lg overflow-hidden">
          <MoviesPage />
        </div>} />
        <Route path="/movies/:category" element={<div className="w-full bg-[#151517] rounded-l-lg overflow-hidden">
          <MovieCategoryPages />
        </div>} />
        <Route path="/movie/:id" element={<div className="w-full bg-[#151517] rounded-l-lg overflow-hidden">
          <SingleMovie />
        </div>} />
        <Route path="/tv" element={<div className="w-full bg-[#151517] rounded-l-lg overflow-hidden">
          <TvPage />
        </div>} />
        <Route path="/tv/:category" element={<div className="w-full bg-[#151517] rounded-l-lg overflow-hidden">
          <TvCategoryPages />
        </div>} />
        <Route path="/tv/:id" element={<div className="w-full bg-[#151517] rounded-l-lg overflow-hidden">
          <SingleTv />
        </div>} />
      </Routes>
    </div>
    // </CustomCursor>
  );
}

export default App;
