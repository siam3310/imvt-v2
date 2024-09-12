'use client';

import React, { useEffect, useState } from 'react';
import GetMoviesData from '@/graphql/queries/GetMoviesData.gql';
import { gql, useQuery } from '@apollo/client';

import MediaGrid from '@/components/Common/MediaGrid';
import PaginationComponent from '@/components/Common/PaginationComponent';

const MovieCategoryPages = ({ category }: { category: string }) => {
  const [heading, setHeading] = useState('');
  const [page, setPage] = useState(1);
  const { data, loading } = useQuery(GetMoviesData, {
    variables: { page },
  });
  const [mediaData, setMediaData] = useState({
    results: [],
    hasNextPage: false,
  });
  useEffect(() => {
    if (category === 'trending') {
      setMediaData(data?.getMovieTrendingWeek);
      setHeading('Trending');
    } else if (category === 'popular') {
      setMediaData(data?.getMoviePopular);
      setHeading('Popular');
    } else if (category === 'top-rated') {
      setMediaData(data?.getMovieTopRated);
      setHeading('Top Rated');
    } else if (category === 'upcoming') {
      setMediaData(data?.getMovieUpcoming);
      setHeading('Upcoming');
    }
  }, [data, page, category]);

  return (
    <>
      <div className='w-full h-[100dvh] flex flex-col gap-y-3 p-5 '>
        <h1 className='text-white text-center font-bold text-[2rem]'>
          {heading} Movies
        </h1>
        <div className='overflow-scroll h-full pb-[150px] sm:pb-[30px]'>
          <MediaGrid mediaData={mediaData} loading={loading} />
          <PaginationComponent
            mediaData={mediaData}
            page={page}
            setPage={setPage}
          />
        </div>
      </div>
    </>
  );
};

export default MovieCategoryPages;
