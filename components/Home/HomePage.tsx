"use client"
import React from 'react'
import { useTheme } from 'next-themes'
import { gql, useQuery } from "@apollo/client";
import HeroSectionCarousel from '@/components/Common/HeroSectionCarousel'
import HeroMiniCarousel from '@/components/Common/HeroMiniCarousel';
import MediaSwiper from '@/components/Common/MediaSwiper'

const query = gql`
query GetHomeData {
  getAnyTrendingToday {
    results {
      ... on Movie {
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
      ... on TV {
        backdrop_path
        adult
        id
        name
        overview
        poster_path
        media_type
        genre_ids
        vote_average
        vote_count
      }
    }
    currentPage
    hasNextPage
    total_pages
    total_results
  }
  getAnyTrendingWeek {
    results {
      ... on Movie {
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
      ... on TV {
        backdrop_path
        adult
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
  getTvTrendingWeek {
    results {
      backdrop_path
      adult
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
  getPeopleTrendingWeek {
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
const HomePage = () => {
  const { data, loading } = useQuery(query);
  const { theme, setTheme } = useTheme()
  setTheme('dark')


  return (
    <div className='flex flex-col w-[100%] h-full overflow-y-scroll pb-[120px] sm:pb-[30px]'>
      <HeroSectionCarousel data={data?.getAnyTrendingToday?.results} loading={loading} />
      <HeroMiniCarousel data={data?.getAnyTrendingToday?.results} loading={loading} />
      <MediaSwiper data={data?.getAnyTrendingWeek?.results} loading={loading} heading="Weekly Trending" link="trending/all" />
      <MediaSwiper data={data?.getMovieTrendingWeek?.results} loading={loading} heading="Trending Movies" link="trending/movies" />
      <MediaSwiper data={data?.getTvTrendingWeek?.results} loading={loading} heading="Trending Series" link="trending/tv-shows" />
      <MediaSwiper data={data?.getPeopleTrendingWeek?.results} loading={loading} heading="Trending People" link="trending/people" />
    </div>
  )
}

export default HomePage
