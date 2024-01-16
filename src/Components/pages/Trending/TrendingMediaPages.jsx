import React, { useState, useEffect } from "react";
import MediaGrid from "../../utils/MediaGrid";
import PaginationComponent from "../../utils/PaginationComponent";
import { useParams } from 'react-router-dom';
import { gql, useQuery } from "@apollo/client";

const search = gql`
query GetTrendingData(
  $page: Int
) {
  getAnyTrendingWeek(page: $page) {
    results {
      ... on Movie {
        backdrop_path
        id
        title
        overview
        poster_path
        media_type
        genre_ids
        vote_average
      }
      ... on TV {
        backdrop_path
        id
        name
        overview
        poster_path
        media_type
        genre_ids
        vote_average
      }
    }
    currentPage
    hasNextPage
    total_pages
    total_results
  }
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
  getTvTrendingWeek(page: $page) {
    results {
      backdrop_path
      id
      name
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
  getPeopleTrendingWeek(page: $page) {
    results {
      adult
      biography
      id
      name
      original_name
      media_type
      popularity
      gender
      known_for_department
      profile_path
    }
    currentPage
    hasNextPage
    total_pages
    total_results
  }
}
`;
const TrendingMediaPages = () => {
  const [page, setPage] = useState(1)
  const { type } = useParams();
  const { data, loading } = useQuery(search, {
    variables: { page },
  });
  const [mediaData, setMediaData] = useState({
    results: [],
    hasNextPage: false
  });
  useEffect(() => {
    if (type === "all") {
      setMediaData(data?.getAnyTrendingWeek)
    } else if (type === "movies") {
      setMediaData(data?.getMovieTrendingWeek)
    } else if (type === "tv shows") {
      setMediaData(data?.getTvTrendingWeek)
    } else if (type === "people") {
      setMediaData(data?.getPeopleTrendingWeek)
    }
  }, [data, page])
  // if (loading) return <div>Loading...</div>
  // if (mediaData?.results?.length === 0) return <div>404 Not Found</div>
  return (
    <>
      <div className="w-full h-[100dvh] flex flex-col gap-y-3 p-5 ">
        <h1 className="text-white text-center font-bold text-[2rem]">Trending {type}</h1>
        <div className="overflow-scroll h-full">
          <MediaGrid mediaData={mediaData} loading={loading} />
          <PaginationComponent mediaData={mediaData} page={page} setPage={setPage} />
        </div>
      </div>
    </>
  )
}

export default TrendingMediaPages
