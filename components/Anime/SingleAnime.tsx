"use client"
import React from 'react'
import { gql, useQuery } from "@apollo/client";
import SingleAnimePage from '@/components/Anime/SingleAnimePage';
import { GetAnimebyId } from '@/graphql/queries/GetAnime.gql';

const SingleAnime = ({ id }: { id: number }) => {
    const { data, loading, error } = useQuery(GetAnimebyId, {
        variables: { id },
    });
    const animeData = data?.getAnimebyId;
    // console.log(animeData);

    if (error && !data && !loading) {
        console.log(error);
        return (<>
            <div className='w-full h-full flex justify-center items-center text-3xl text-red-500'>{error.message}</div>
        </>)
    }

    return (<>
        <SingleAnimePage animeData={animeData} loading={loading} />
    </>
    )
}

export default SingleAnime