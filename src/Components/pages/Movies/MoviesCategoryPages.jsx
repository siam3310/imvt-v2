import React, { useState, useEffect } from "react";
import MediaGrid from "../../utils/MediaGrid";
import PaginationComponent from "../../utils/PaginationComponent";
import { useParams } from 'react-router-dom';
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
const MovieCategoryPages = () => {
  const [page, setPage] = useState(1)
  const { category } = useParams();
  const { data, loading } = useQuery(search, {
    variables: { page },
  });
  const [mediaData, setMediaData] = useState({
    results: [],
    hasNextPage: false
  });
  useEffect(() => {
    if (category === "Trending") {
      setMediaData(data?.getMovieTrendingWeek)
    } else if (category === "Popular") {
      setMediaData(data?.getMoviePopular)
    } else if (category === "Top Rated") {
      setMediaData(data?.getMovieTopRated)
    } else if (category === "Upcoming") {
      setMediaData(data?.getMovieUpcoming)
    }
  }, [data, page])
  if (loading) return <div>Loading...</div>
  if (mediaData?.results?.length === 0) return <div>404 Not Found</div>
  return (
    <>
      <div className="w-full h-[100dvh] flex flex-col gap-y-3 p-5 ">
        <h1 className="text-white text-center font-bold text-[2rem]">{category} Movies</h1>
        <div className="overflow-scroll h-full">
          <MediaGrid mediaData={mediaData} />
          <PaginationComponent mediaData={mediaData} page={page} setPage={setPage} />
        </div>
      </div>
    </>
  )
}

export default MovieCategoryPages
