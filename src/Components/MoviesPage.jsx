import React from 'react'
import HeroSectionCarousel from './HeroSectionCarousel'
import MediaSwiper from './MediaSwiper'
import { gql, useQuery } from "@apollo/client";

const query = gql`
query GetMovieData {
    getMovieTrendingToday {
      backdrop_path
      id
      title
      overview
      poster_path
      media_type
      genre_ids
      vote_average
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
    getMoviePopular {
      backdrop_path
      id
      title
      overview
      poster_path
      media_type
      genre_ids
      vote_average
    }
    getMovieTopRated {
      backdrop_path
      id
      title
      overview
      poster_path
      media_type
      genre_ids
      vote_average
    }
    getMovieUpcoming {
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
  }
`;
const MoviesPage = () => {
    const { data, loading } = useQuery(query);
    if (loading) return <div>Loading...</div>

    return (
        <div className='flex flex-col w-[100%] h-full overflow-y-scroll'>
            <HeroSectionCarousel data={data?.getMovieTrendingToday} loading={loading} />
            <MediaSwiper data={data?.getMovieTrendingWeek} loading={loading} heading="Trending Movies" />
            <MediaSwiper data={data?.getMoviePopular} loading={loading} heading="Popular Movies" />
            <MediaSwiper data={data?.getMovieTopRated} loading={loading} heading="Top Rated Movies" />
            <MediaSwiper data={data?.getMovieUpcoming} loading={loading} heading="Upcoming Movies" />
        </div>
    )
}

export default MoviesPage