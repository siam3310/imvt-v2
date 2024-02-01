"use client"
import React from 'react'
import { gql, useQuery } from "@apollo/client";
import SingleMediaPage from '@/components/Common/SingleMediaPage';
import GetMoviebyId from "@/graphql/queries/GetMoviebyId.gql";

const SingleMovie = ({ id }: { id: string }) => {
  const tmdbId = id;
  const { data, loading } = useQuery(GetMoviebyId, {
    variables: { tmdbId },
  });
  const movieData = data?.getMoviebyId;

  return (
    <>
      <SingleMediaPage mediaData={movieData} loading={loading} type="movie" />
    </>
  )
}


export default SingleMovie