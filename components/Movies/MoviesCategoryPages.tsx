"use client"
import React, { useState, useEffect } from "react";
import MediaGrid from "@/components/Common/MediaGrid";
import PaginationComponent from "@/components/Common/PaginationComponent";
import { gql, useQuery } from "@apollo/client";

const search = gql`
query GetMoviesData(
  $page: Int
) {
    getMovieTrendingWeek(page: $page) {
      results {
        backdrop_path
        id
        title
        overview
        poster_path
        media_type
        genre_ids
        vote_average
      }
      currentPage
      hasNextPage
      total_pages
      total_results
    }
    getMoviePopular(page: $page) {
      results {
        backdrop_path
        id
        title
        overview
        poster_path
        media_type
        genre_ids
        vote_average
      }
      currentPage
      hasNextPage
      total_pages
      total_results
    }
    getMovieTopRated(page: $page) {
      results {
        backdrop_path
        id
        title
        overview
        poster_path
        media_type
        genre_ids
        vote_average
      }
      currentPage
      hasNextPage
      total_pages
      total_results
    }
    getMovieUpcoming(page: $page) {
      results {
        backdrop_path
        id
        title
        overview
        poster_path
        media_type
        genre_ids
        vote_average
        release_date
      }
      currentPage
      hasNextPage
      total_pages
      total_results
    }
}
`;
const MovieCategoryPages = ({ category }: { category: string }) => {
  const [heading, setHeading] = useState("");
  const [page, setPage] = useState(1)
  const { data, loading } = useQuery(search, {
    variables: { page },
  });
  const [mediaData, setMediaData] = useState({
    results: [],
    hasNextPage: false
  });
  useEffect(() => {
    if (category === "trending") {
      setMediaData(data?.getMovieTrendingWeek)
      setHeading("Trending")
    } else if (category === "popular") {
      setMediaData(data?.getMoviePopular)
      setHeading("Popular")
    } else if (category === "top-rated") {
      setMediaData(data?.getMovieTopRated)
      setHeading("Top Rated")
    } else if (category === "upcoming") {
      setMediaData(data?.getMovieUpcoming)
      setHeading("Upcoming")
    }
  }, [data, page])

  return (
    <>
      <div className="w-full h-[100dvh] flex flex-col gap-y-3 p-5 ">
        <h1 className="text-white text-center font-bold text-[2rem]">{heading} Movies</h1>
        <div className="overflow-scroll h-full pb-[150px] sm:pb-[30px]">
          <MediaGrid mediaData={mediaData} loading={loading} />
          <PaginationComponent mediaData={mediaData} page={page} setPage={setPage} />
        </div>
      </div>
    </>
  )
}

export default MovieCategoryPages
