"use client"
import React from 'react'
import { useTheme } from 'next-themes'
import { gql, useQuery } from "@apollo/client";
import HeroSectionCarousel from '@/components/Common/HeroSectionCarousel'
import HeroMiniCarousel from '@/components/Common/HeroMiniCarousel';
import MediaSwiper from '@/components/Common/MediaSwiper'
import GetHomeData from '@/graphql/queries/GetHomeData.gql'

const HomePage = () => {
  const { data, loading } = useQuery(GetHomeData);
  const { theme, setTheme } = useTheme()

  setTheme('dark')

  return (
    <div className='flex flex-col w-[100%] h-full overflow-y-scroll pb-[120px] sm:pb-[30px]'>
      <HeroSectionCarousel data={data?.getAnyTrendingToday?.results} loading={loading} />
      <HeroMiniCarousel data={data?.getAnyTrendingToday?.results} loading={loading} />
      <MediaSwiper data={data?.getAnyTrendingWeek?.results} loading={loading} heading="Weekly Trending" link="trending/all" />
      <MediaSwiper data={data?.getMovieTrendingWeek?.results} loading={loading} heading="Trending Movies" link="trending/movies" />
      <MediaSwiper data={data?.getTvTrendingWeek?.results} loading={loading} heading="Trending Series" link="trending/tv-shows" />
      <MediaSwiper data={data?.getPeopleTrendingWeek?.results} loading={loading} heading="Trending People" link="trending/people" />
    </div>
  )
}

export default HomePage
