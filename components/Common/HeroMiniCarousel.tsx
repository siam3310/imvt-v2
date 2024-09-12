import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Autoplay from 'embla-carousel-autoplay'
import { PlayCircle, PlusCircle } from 'lucide-react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

import { mediaData } from '@/types/mediaData'
import usehandleWatchlist from '@/hooks/usehandleWatchlist'
import { Button } from '@/components/ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

import 'react-loading-skeleton/dist/skeleton.css'

import { blurDataUrl, shimmerBlurDataUrl } from '@/utils/blurDataUrl'

export default function HeroMiniCarousel({
  data,
  loading,
}: {
  data: mediaData[] | undefined
  loading: boolean
}) {
  if (loading || !data)
    return (
      <SkeletonTheme baseColor='#202020' highlightColor='#444'>
        <HeroMiniSkeleton />
      </SkeletonTheme>
    )
  return (
    <Carousel
      opts={{ align: 'center', loop: true }}
      className='w-full relative h-fit sm:hidden text-white'
      plugins={[Autoplay({ delay: 3000 })]}
    >
      <CarouselContent className=''>
        {data?.map((mediaData: mediaData, index: React.Key | number) => (
          <HeroMiniCarouselSlide
            key={index}
            mediaData={mediaData}
            index={index}
          />
        ))}
      </CarouselContent>
    </Carousel>
  )
}

const HeroMiniCarouselSlide = ({
  mediaData,
  index,
}: {
  mediaData: mediaData
  index: React.Key | number
}) => {
  const { watchlistType, setWatchlistType } = usehandleWatchlist(
    mediaData?.id,
    mediaData?.name ? 'tv' : 'movie'
  )
  let isUpcoming = false

  if (
    new Date(mediaData?.release_date) >= new Date() ||
    new Date(mediaData?.first_air_date) >= new Date()
  ) {
    isUpcoming = true
  }
  const watchListNames = {
    completed: 'Completed',
    watching: 'Watching',
    plan_to_watch: 'Plan to Watch',
    on_hold: 'On Hold',
    dropped: 'Dropped',
    remove: '',
  }

  return (
    <CarouselItem key={index} className={`h-fit transition-none`}>
      <div className='movie-backdrop absolute top-0 w-full h-full z-0'>
        <Image
          className='w-full h-full object-cover'
          src={mediaData?.backdrop_path}
          alt={`${mediaData?.name || mediaData?.title} backdrop`}
          width={400}
          height={600}
          loading={(index as number) < 10 ? 'eager' : 'lazy'}
          placeholder='blur'
          blurDataURL={`data:image/${shimmerBlurDataUrl(400, 600)}`}
        />
      </div>
      <div className='relative flex flex-col items-center justify-center gap-y-3 z-1 pt-5'>
        <Image
          className='w-52 block h-72 poster-box-shadow object-cover rounded-3xl clickable'
          src={mediaData?.poster_path}
          alt={`${mediaData?.name || mediaData?.title} poster`}
          width={400}
          height={600}
          loading={(index as number) < 10 ? 'eager' : 'lazy'}
          placeholder='blur'
          blurDataURL={`data:image/${shimmerBlurDataUrl(400, 600)}`}
        />
        <h3 className='font-bold w-[80%] text-center overflow-hidden text-ellipsis whitespace-nowrap text-[1.2rem]'>
          {mediaData?.name || mediaData?.title || 'unknown'}
        </h3>
        <p className='w-[80%] text-center overflow-hidden text-ellipsis whitespace-nowrap'>
          {isUpcoming
            ? new Date(
                mediaData?.release_date || mediaData?.first_air_date
              ).toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })
            : mediaData?.vote_average.toFixed(1)}{' '}
          • {mediaData?.title ? 'Movie' : 'TV'} •{' '}
          {mediaData?.genre_ids.join(', ')}
        </p>
        <div className='flex justify-center items-center gap-2'>
          {/* <Link href={`/${mediaData?.name ? "tv" : "movie"}/${mediaData?.id}/play`} className='bg-yellow-500 cursor-pointer w-24 sm:w-32 p-2 text-[0.8rem] sm:text-[1rem] sm:py-2 sm:px-3 rounded-xl text-center mb-6 flex items-center justify-center gap-2'><PlayCircle /> Play</Link>
                    <Link href={`/${mediaData?.name ? "tv" : "movie"}/${mediaData?.id}`} className='bg-blue-500 cursor-pointer w-24 sm:w-32 p-2 text-[0.8rem] sm:text-[1rem] sm:py-2 sm:px-3 rounded-xl text-center mb-6'>More details</Link>
                    <Link href={`/${mediaData?.name ? "tv" : "movie"}/${mediaData?.id}`} className='bg-blue-500 cursor-pointer w-24 sm:w-32 p-2 text-[0.8rem] sm:text-[1rem] sm:py-2 sm:px-3 rounded-xl text-center mb-6'>More details</Link> */}
          <Link
            href={`/${mediaData?.name ? 'tv' : 'movie'}/${mediaData?.id}/play`}
            className='bg-yellow-500 cursor-pointer w-fit p-2 text-[0.8rem] sm:text-[1rem] sm:py-2 sm:px-3 rounded-md text-center flex items-center gap-x-2'
          >
            <PlayCircle /> Play
          </Link>
          <Link
            href={`/${mediaData?.name ? 'tv' : 'movie'}/${mediaData?.id}`}
            className='bg-blue-500 cursor-pointer w-fit p-2 py-[10px] text-[0.8rem] sm:text-[1rem] sm:py-2 sm:px-3 rounded-md text-center'
          >
            More details
          </Link>
          <Popover>
            <PopoverTrigger asChild>
              <Button className='cursor-pointer w-fit p-2 text-[0.8rem] sm:text-[1rem] sm:py-2 sm:px-3 rounded-md text-center flex items-center gap-x-2'>
                {watchlistType ? (
                  watchListNames[watchlistType]
                ) : (
                  <>
                    <PlusCircle />
                  </>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className='flex flex-col w-full h-full gap-1 p-2 z-[11111111111111]'>
              <Button
                onClick={() => {
                  setWatchlistType('completed')
                }}
                variant={watchlistType === 'completed' ? 'default' : 'outline'}
              >
                Completed
              </Button>
              <Button
                onClick={() => {
                  setWatchlistType('watching')
                }}
                variant={watchlistType === 'watching' ? 'default' : 'outline'}
              >
                Watching
              </Button>
              <Button
                onClick={() => {
                  setWatchlistType('plan_to_watch')
                }}
                variant={
                  watchlistType === 'plan_to_watch' ? 'default' : 'outline'
                }
              >
                Plan to Watch
              </Button>
              <Button
                onClick={() => {
                  setWatchlistType('on_hold')
                }}
                variant={watchlistType === 'on_hold' ? 'default' : 'outline'}
              >
                On Hold
              </Button>
              <Button
                onClick={() => {
                  setWatchlistType('dropped')
                }}
                variant={watchlistType === 'dropped' ? 'default' : 'outline'}
              >
                Dropped
              </Button>
              {watchlistType && (
                <Button
                  onClick={() => {
                    setWatchlistType('')
                  }}
                  variant={'destructive'}
                >
                  Remove from Watchlist
                </Button>
              )}
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </CarouselItem>
  )
}

const HeroMiniSkeleton = () => {
  return (
    <div className='h-fit sm:hidden'>
      <div className='absolute top-0 w-full h-full z-0'>
        <Skeleton className='w-full h-full' />
      </div>
      <div className='relative flex flex-col items-center justify-center gap-y-3 pt-5'>
        <Skeleton className='min-w-52 block min-h-72 rounded-3xl' />
        <h3 className='w-44 text-[1.5rem]'>
          <Skeleton />
        </h3>
        <p className='w-36 text-[1.5rem]'>
          <Skeleton />
        </p>
      </div>
    </div>
  )
}
