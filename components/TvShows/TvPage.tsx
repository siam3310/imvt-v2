"use client"
import React from 'react'
import HeroSectionCarousel from '@/components/Common/HeroSectionCarousel'
import HeroMiniCarousel from '@/components/Common/HeroMiniCarousel';
import MediaSwiper from '@/components/Common/MediaSwiper'
import { gql, useQuery } from "@apollo/client";

const query = gql`
query GetTvData {
    getTvTrendingToday {
      results {
        backdrop_path
        id
        name
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
    getTvTrendingWeek {
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
    getTvPopular {
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
    getTvTopRated {
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
    getTvAiringToday {
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
    getTvOnTheAir {
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
  }
`;
const TvPage = () => {
  const { data, loading, error } = useQuery(query);

  if (error) return <p>Error : {error.message}</p>;
  return (
    <div className='flex flex-col w-[100%] h-full overflow-y-scroll pb-[120px] sm:pb-[30px]'>
      <HeroSectionCarousel data={data?.getTvTrendingToday?.results} loading={loading} />
      <HeroMiniCarousel data={data?.getTvTrendingToday?.results} loading={loading} />
      <MediaSwiper data={data?.getTvAiringToday?.results} loading={loading} heading="Airing Today" link="/tv-shows/airing-today" />
      <MediaSwiper data={data?.getTvOnTheAir?.results} loading={loading} heading="On the Air" link="/tv-shows/on-the-air" />
      <MediaSwiper data={data?.getTvTrendingWeek?.results} loading={loading} heading="Trending Now" link="/tv-shows/trending" />
      <MediaSwiper data={data?.getTvPopular?.results} loading={loading} heading="What's Popular" link="/tv-shows/popular" />
      <MediaSwiper data={data?.getTvTopRated?.results} loading={loading} heading="Top Rated" link="/tv-shows/top-rated" />
    </div>
  )
}

export default TvPage