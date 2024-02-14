"use client"
import React from 'react'
import HeroSectionCarousel from '@/components/Common/HeroSectionCarousel'
import HeroMiniCarousel from '@/components/Common/HeroMiniCarousel'
import MediaSwiper from '@/components/Common/MediaSwiper'
import { gql, useQuery } from "@apollo/client";
import GetTrendingData from "@/graphql/queries/GetTrendingData.gql";

const TrendingPage = () => {
  const { data, loading } = useQuery(GetTrendingData);

  return (
    <div className='flex flex-col w-[100%] h-full overflow-y-scroll pb-7'>
      <HeroSectionCarousel data={data?.getAnyTrendingToday?.results} loading={loading} />
      <HeroMiniCarousel data={data?.getAnyTrendingToday?.results} loading={loading} />
      <MediaSwiper data={data?.getAnyTrendingWeek?.results} loading={loading} heading="Weekly Trending" link="all" />
      <MediaSwiper data={data?.getMovieTrendingWeek?.results} loading={loading} heading="Trending Movies" link="movies" />
      <MediaSwiper data={data?.getTvTrendingWeek?.results} loading={loading} heading="Trending Series" link="tv-shows" />
      <MediaSwiper data={data?.getPeopleTrendingWeek?.results} loading={loading} heading="Trending People" link="people" />
    </div>
  )
}

export default TrendingPage