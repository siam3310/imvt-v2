"use client"
import React, { useState, useEffect } from "react";
import MediaGrid from "@/components/Common/MediaGrid";
import PaginationComponent from "@/components/Common/PaginationComponent";
import { gql, useQuery } from "@apollo/client";
import GetTrendingMediaData from '@/graphql/queries/GetTrendingMediaData.gql';

const TrendingMediaPages = ({ type }: { type: string }) => {
  const [heading, setHeading] = useState("");
  const [page, setPage] = useState(1)
  const { data, loading } = useQuery(GetTrendingMediaData, {
    variables: { page },
  });
  const [mediaData, setMediaData] = useState({
    results: [],
    hasNextPage: false
  });

  useEffect(() => {
    if (type === "all") {
      setMediaData(data?.getAnyTrendingWeek)
      setHeading("Trending Now")
    } else if (type === "movies") {
      setMediaData(data?.getMovieTrendingWeek)
      setHeading("Trending Movies")
    } else if (type === "tv-shows") {
      setMediaData(data?.getTvTrendingWeek)
      setHeading("Trending TV Shows")
    } else if (type === "people") {
      setMediaData(data?.getPeopleTrendingWeek)
      setHeading("Trending People")
    }
  }, [data, page, type])

  return (
    <>
      <div className="w-full h-[100dvh] flex flex-col gap-y-3 p-5 ">
        <h1 className="text-white text-center font-bold text-[2rem]">{heading}</h1>
        <div className="overflow-scroll h-full pb-[150px] sm:pb-[30px]">
          <MediaGrid mediaData={mediaData} loading={loading} />
          <PaginationComponent mediaData={mediaData} page={page} setPage={setPage} />
        </div>
      </div>
    </>
  )
}

export default TrendingMediaPages
