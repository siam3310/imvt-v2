import React from 'react'
import HeroSectionCarousel from '../../utils/HeroSectionCarousel.jsx'
import MediaSwiper from '../../utils/MediaSwiper.jsx'
import { gql, useQuery } from "@apollo/client";
import HeroMiniCarousel from '../../utils/HeroMiniCarousel.jsx';

const query = gql`
query GetHomeData {
  getAnyTrendingWeek {
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
  getAnyTrendingToday {
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
        vote_count
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
        vote_count
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
  if (loading) return <div>Loading...</div>

  return (
    <div className='flex flex-col w-[100%] h-full overflow-y-scroll pb-7'>
      <HeroSectionCarousel data={data?.getAnyTrendingToday?.results} loading={loading} />
      <HeroMiniCarousel data={data?.getAnyTrendingToday?.results} loading={loading} />
      <MediaSwiper data={data?.getAnyTrendingWeek?.results} loading={loading} heading="Trending" />
      <MediaSwiper data={data?.getMovieTrendingWeek?.results} loading={loading} heading="Trending Movies" />
      <MediaSwiper data={data?.getTvTrendingWeek?.results} loading={loading} heading="Trending Series" />
      <MediaSwiper data={data?.getPeopleTrendingWeek?.results} loading={loading} heading="Trending People" />
    </div>
  )
}

export default HomePage