"use client"
import React, { useState, useEffect } from "react";
import MediaGrid from "@/components/Common/MediaGrid";
import PaginationComponent from "@/components/Common/PaginationComponent";
import { gql, useQuery } from "@apollo/client";
import GetTvShowsData from "@/graphql/queries/GetTvShowsData.gql";

const TvCategoryPages = ({ category }: { category: string }) => {
  const [heading, setHeading] = useState("")
  const [page, setPage] = useState(1)
  const { data, loading } = useQuery(GetTvShowsData, {
    variables: { page },
  });
  const [mediaData, setMediaData] = useState({
    results: [],
    hasNextPage: false
  });
  useEffect(() => {
    if (category === "trending") {
      setMediaData(data?.getTvTrendingWeek)
      setHeading("Trending Shows")
    } else if (category === "popular") {
      setMediaData(data?.getTvPopular)
      setHeading("Popular Shows")
    } else if (category === "top-rated") {
      setMediaData(data?.getTvTopRated)
      setHeading("Top Rated Shows")
    } else if (category === "airing-today") {
      setMediaData(data?.getTvAiringToday)
      setHeading("Shows Airing Today")
    } else if (category === "on-the-air") {
      setMediaData(data?.getTvOnTheAir)
      setHeading("On the Air Shows")
    }
  }, [data, page])
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

export default TvCategoryPages
