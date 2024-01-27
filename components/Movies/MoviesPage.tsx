import React from 'react'
import { useTheme } from 'next-themes'
import { gql, useQuery } from "@apollo/client";
import HeroSectionCarousel from '@/components/Common/HeroSectionCarousel'
import HeroMiniCarousel from '@/components/Common/HeroMiniCarousel';
import MediaSwiper from '@/components/Common/MediaSwiper'

const query = gql`
query GetMovieData {
    getMovieTrendingToday {
      results {
        backdrop_path
        adult
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
        adult
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
        adult
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
        adult
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
        adult
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
  const { data, loading, error } = useQuery(query);
  const { theme, setTheme } = useTheme()
  setTheme('dark')
  if (error) return <p>Error : {error.message}</p>;
  return (
    <div className='flex flex-col w-[100%] h-full overflow-y-scroll pb-[120px] sm:pb-[30px]'>
      <HeroSectionCarousel data={data?.getMovieTrendingToday?.results} loading={loading} />
      <HeroMiniCarousel data={data?.getMovieTrendingToday?.results} loading={loading} />
      <MediaSwiper data={data?.getMovieTrendingWeek?.results} loading={loading} heading="Trending Now" link="movies/trending" />
      <MediaSwiper data={data?.getMoviePopular?.results} loading={loading} heading="What's Popular" link="movies/popular" />
      <MediaSwiper data={data?.getMovieTopRated?.results} loading={loading} heading="Top Rated" link="movies/top-rated" />
      <MediaSwiper data={data?.getMovieUpcoming?.results} loading={loading} upcoming={true} heading="Upcoming" link="movies/upcoming" />
    </div>
  )
}

export default MoviesPage