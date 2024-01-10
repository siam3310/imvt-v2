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
      vote_count
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
        <div className='flex flex-col w-[100%] h-full overflow-y-scroll pb-7'>
            <HeroSectionCarousel data={data?.getMovieTrendingToday} loading={loading} />
            <MediaSwiper data={data?.getMovieTrendingWeek} loading={loading} heading="Trending Now" />
            <MediaSwiper data={data?.getMoviePopular} loading={loading} heading="What's Popular" />
            <MediaSwiper data={data?.getMovieTopRated} loading={loading} heading="Top Rated" />
            <MediaSwiper data={data?.getMovieUpcoming} loading={loading} upcoming={true} heading="Upcoming Indian" />
        </div>
    )
}

export default MoviesPage