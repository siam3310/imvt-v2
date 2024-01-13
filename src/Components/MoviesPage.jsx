import React from 'react'
import HeroSectionCarousel from './HeroSectionCarousel'
import MediaSwiper from './MediaSwiper'
import { gql, useQuery } from "@apollo/client";

const query = gql`
query GetMovieData {
    getMovieTrendingToday {
      results {
        backdrop_path
        id
        title
        overview
        poster_path
        media_type
        genre_ids
        vote_average
        vote_count
      }
      currentPage
      hasNextPage
      total_pages
      total_results
    }
    getMovieTrendingWeek {
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
    getMoviePopular {
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
    getMovieTopRated {
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
    getMovieUpcoming {
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
const MoviesPage = () => {
  const { data, loading } = useQuery(query);
  if (loading) return <div>Loading...</div>

  return (
    <div className='flex flex-col w-[100%] h-full overflow-y-scroll pb-7'>
      <HeroSectionCarousel data={data?.getMovieTrendingToday?.results} loading={loading} />
      <MediaSwiper data={data?.getMovieTrendingWeek?.results} loading={loading} heading="Trending Now" />
      <MediaSwiper data={data?.getMoviePopular?.results} loading={loading} heading="What's Popular" />
      <MediaSwiper data={data?.getMovieTopRated?.results} loading={loading} heading="Top Rated" />
      <MediaSwiper data={data?.getMovieUpcoming?.results} loading={loading} upcoming={true} heading="Upcoming" />
    </div>
  )
}

export default MoviesPage