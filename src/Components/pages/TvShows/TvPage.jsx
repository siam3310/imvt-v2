import React from 'react'
import HeroSectionCarousel from '../../utils/HeroSectionCarousel'
import MediaSwiper from '../../utils/MediaSwiper'
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
  const { data, loading } = useQuery(query);
  if (loading) return <div>Loading...</div>

  return (
    <div className='flex flex-col w-[100%] h-full overflow-y-scroll pb-7'>
      <HeroSectionCarousel data={data?.getTvTrendingToday?.results} loading={loading} />
      <MediaSwiper data={data?.getTvAiringToday?.results} loading={loading} heading="Airing Today" link="/tv-shows/Airing Today" />
      <MediaSwiper data={data?.getTvOnTheAir?.results} loading={loading} heading="On the Air" link="/tv-shows/On the Air" />
      <MediaSwiper data={data?.getTvTrendingWeek?.results} loading={loading} heading="Trending Now" link="/tv-shows/Trending" />
      <MediaSwiper data={data?.getTvPopular?.results} loading={loading} heading="What's Popular" link="/tv-shows/Popular" />
      <MediaSwiper data={data?.getTvTopRated?.results} loading={loading} heading="Top Rated" link="/tv-shows/Top Rated" />
    </div>
  )
}

export default TvPage