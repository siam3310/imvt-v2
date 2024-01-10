import React from 'react'
import HeroSectionCarousel from './HeroSectionCarousel'
import MediaSwiper from './MediaSwiper'
import { gql, useQuery } from "@apollo/client";

const query = gql`
query GetTvData {
    getTvTrendingToday {
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
    getTvPopular {
      backdrop_path
      id
      name
      overview
      poster_path
      media_type
      genre_ids
      vote_average
    }
    getTvTopRated {
      backdrop_path
      id
      name
      overview
      poster_path
      media_type
      genre_ids
      vote_average
    }
    getTvAiringToday {
      backdrop_path
      id
      name
      overview
      poster_path
      media_type
      genre_ids
      vote_average
    }
    getTvOnTheAir {
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
`;
const TvPage = () => {
    const { data, loading } = useQuery(query);
    if (loading) return <div>Loading...</div>

    return (
        <div className='flex flex-col w-[100%] h-full overflow-y-scroll pb-7'>
            <HeroSectionCarousel data={data?.getTvTrendingToday} loading={loading} />
            <MediaSwiper data={data?.getTvAiringToday} loading={loading} heading="Airing Today" />
            <MediaSwiper data={data?.getTvOnTheAir} loading={loading} heading="On the Air" />
            <MediaSwiper data={data?.getTvTrendingWeek} loading={loading} heading="Trending Now" />
            <MediaSwiper data={data?.getTvPopular} loading={loading} heading="What's Popular" />
            <MediaSwiper data={data?.getTvTopRated} loading={loading} heading="Top Rated" />
        </div>
    )
}

export default TvPage