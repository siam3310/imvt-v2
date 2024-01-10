import "./App.css";
import React from 'react'
import { Routes, Route } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import HomePage from "./Components/HomePage";
import TrendingPage from "./Components/TrendingPage";
import MoviesPage from "./Components/MoviesPage";
import TvPage from "./Components/TvPage";
import SingleMediaPage from "./Components/SingleMediaPage";
import CustomCursor from "./Components/CustomCursor";
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
          <Route path="/movies" element={<div className="w-full bg-[#151517] rounded-l-lg overflow-hidden">
            <MoviesPage />
          </div>} />
          <Route path="/movie/:id" element={<div className="w-full bg-[#151517] rounded-l-lg overflow-hidden">
            <SingleMediaPage />
          </div>} />
          <Route path="/tv" element={<div className="w-full bg-[#151517] rounded-l-lg overflow-hidden">
            <TvPage />
          </div>} />
        </Routes>
      </div>
    // </CustomCursor>
  );
}

export default App;
