'use client';

import React from 'react';
import GetMoviebyId from '@/graphql/queries/GetMoviebyId.gql';
import { gql, useQuery } from '@apollo/client';

import SingleMediaPage from '@/components/Common/SingleMediaPage';

const SingleMovie = ({ id }: { id: string }) => {
  const tmdbId = id;
  const { data, loading } = useQuery(GetMoviebyId, {
    variables: { tmdbId },
  });
  const movieData = data?.getMoviebyId;

  return (
    <>
      <SingleMediaPage mediaData={movieData} loading={loading} type='movie' />
    </>
  );
};

export default SingleMovie;
