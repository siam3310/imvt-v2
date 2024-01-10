import React from 'react'
import HeroSectionCarousel from './HeroSectionCarousel.jsx'
import MediaSwiper from './MediaSwiper.jsx'
import { gql, useQuery } from "@apollo/client";

const query = gql`
query GetHomeData {
  getAnyTrendingWeek {
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
  getAnyTrendingToday {
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
  getMovieTrendingWeek {
    backdrop_path
    id
    title
    overview
    poster_path
    media_type
    genre_ids
    vote_average
  }
  getTvTrendingWeek {
    backdrop_path
    id
    name
    overview
    poster_path
    media_type
    genre_ids
    vote_average
  }
  getPeopleTrendingWeek {
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
}
`;
const HomePage = () => {
  const { data, loading } = useQuery(query);
  if (loading) return <div>Loading...</div>

  return (
    <div className='flex flex-col w-[100%] h-full overflow-y-scroll pb-7'>
      <HeroSectionCarousel data={data?.getAnyTrendingToday} loading={loading} />
      <MediaSwiper data={data?.getAnyTrendingWeek} loading={loading} heading="Trending" />
      <MediaSwiper data={data?.getMovieTrendingWeek} loading={loading} heading="Trending Movies" />
      <MediaSwiper data={data?.getTvTrendingWeek} loading={loading} heading="Trending Series" />
      <MediaSwiper data={data?.getPeopleTrendingWeek} loading={loading} heading="Trending People" />
    </div>
  )
}

export default HomePage