'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { blurDataUrl, shimmerBlurDataUrl } from '@/utils/blurDataUrl'
import { AnimatePresence, motion } from 'framer-motion'
import { Info, PlayCircle, Star } from 'lucide-react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

import { mediaPeopleData } from '@/types/mediaData'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import MediaThumbnailComponent from '@/components/Common/MediaThumbnailComponent'

import 'react-loading-skeleton/dist/skeleton.css'

interface MediaSwiperProps {
  data: mediaPeopleData[]
  loading: boolean
  heading: string
  upcoming?: boolean
  link: string
}
export default function MediaSwiper({
  data,
  loading,
  heading,
  upcoming,
  link,
}: MediaSwiperProps) {
  const [basis, setBasis] = useState<string>('')
  const [selectedId, setSelectedId] = useState<null | string>(null)
  const [selectedIndex, setSelectedIndex] = useState<number>(0)

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      let newBasis: number
      if (width > 600) {
        newBasis = 100 / Math.floor(width / 200)
      } else {
        newBasis = 100 / Math.floor(width / 160)
      }
      setBasis(`${newBasis}%`)
    }

    window.addEventListener('resize', handleResize)

    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if (loading || !data)
    return (
      <SkeletonTheme baseColor='#202020' highlightColor='#444'>
        <MediaSwiperSkeleton basis={basis} heading={heading} link={link} />
      </SkeletonTheme>
    )

  return (
    <Carousel
      opts={{ align: 'start' }}
      className='w-full flex flex-col h-fit gap-y-5 pr-5 text-white'
    >
      <div className='pl-5'>
        <h1 className='text-[1.5rem] sm:text-[2rem] lg:text-[2.5rem] font-bold pt-5 mb-3 overflow-hidden whitespace-nowrap text-ellipsis'>
          {heading}
        </h1>
        <Link href={link}>
          <span className='clickable bg-[#151517] text-white dark:bg-white dark:text-black px-3 py-[6.4px] text-sm sm:py-[6.4px] sm:text-md font-normal rounded-xl'>
            View more
          </span>
        </Link>
      </div>

      <CarouselContent className='ml-2'>
        {data[0]?.profile_path
          ? data?.map((post: mediaPeopleData, index: React.Key | number) => (
              <CarouselItem
                key={index}
                style={{ flexBasis: basis }}
                className={`relative min-w-0 h-fit p-2 shrink-0 grow-0 basis-1/2 sm:basis-1/4 md:basis-1/5 lg:basis-1/6 xl:basis-1/8`}
              >
                <MediaThumbnailComponent
                  link={`/people/${post.id}`}
                  id={post.id}
                  title={post.name}
                  poster={post.profile_path}
                  width={400}
                  height={600}
                  index={index}
                  type={'people'}
                >
                  <span className='bg-yellow-500 text-white absolute top-3 left-3 z-[3] py-[2px] px-2 text-[0.8rem] rounded-3xl whitespace-nowrap flex items-center'>
                    {(post.known_for_department === 'Acting' && 'Actor') ||
                      (post.known_for_department === 'Writing' && 'Writer') ||
                      (post.known_for_department === 'Directing' &&
                        'Director') ||
                      (post.known_for_department === 'Production' &&
                        'Producer') ||
                      post.known_for_department}
                  </span>
                </MediaThumbnailComponent>
              </CarouselItem>
            ))
          : data?.map(
              (post: mediaPeopleData, index: React.Key | null | undefined) => (
                <CarouselItem
                  key={index}
                  style={{ flexBasis: basis }}
                  className={`relative min-w-0 h-fit p-2 shrink-0 grow-0 basis-1/2 sm:basis-1/4 md:basis-1/5 lg:basis-1/6 xl:basis-1/8`}
                >
                  {/* <motion.div className=' z-[1111] ' layoutId={index as string} onClick={() => { setSelectedId(post.id); setSelectedIndex(index as number) }}> */}
                  <MediaThumbnailComponent
                    link={`/${post.name ? 'tv' : 'movie'}/${post.id}`}
                    id={post.id}
                    title={post.name || post.title}
                    poster={post.poster_path}
                    width={400}
                    height={600}
                    index={index}
                    release_date={post.release_date || post.first_air_date}
                    type={post.title ? 'movie' : 'tv'}
                  >
                    <span className='bg-yellow-500 text-white absolute top-3 left-3 z-[3] py-[2px] px-2 text-[0.8rem] rounded-3xl whitespace-nowrap flex items-center'>
                      <Star fill='white' color='white' width={12} />
                      &nbsp;{post.vote_average.toFixed(1)}
                    </span>
                  </MediaThumbnailComponent>
                  {/* </motion.div> */}
                </CarouselItem>
              )
            )}
      </CarouselContent>

      <div className='absolute right-16 top-20'>
        <CarouselPrevious className='text-black dark:bg-white right-1 top-1/2 -translate-y-1/2' />
        <CarouselNext className='text-black dark:bg-white left-0 top-1/2 -translate-y-1/2' />
      </div>
      {/* 
            <AnimatePresence>
                {data && selectedId && (
                    <motion.div className='relative w-full left-2 h-[320px] z-[1111]' layoutId={selectedId}>
                        <div className='absolute top-0 w-full h-full'>
                            <Image
                                className="w-full h-full rounded-md flex justify-center items-center object-cover z-[111]"
                                src={data[selectedIndex]?.backdrop_path === "https://image.tmdb.org/t/p/originalnull" ? blurDataUrl : data[selectedIndex]?.backdrop_path}
                                alt={`${data[selectedIndex]?.title} ${"poster"}`}
                                width={1080}
                                height={300}
                                loading={selectedIndex < 10 ? "eager" : "lazy"}
                                placeholder={`data:image/${shimmerBlurDataUrl(200, 300)}`}
                            />
                        </div>
                        <div className='flex flex-wrap lg:flex-nowrap overflow-y-auto items-center justify-center lg:justify-evenly gap-y-0 gap-x-2 sm:gap-5 py-[10px] px-2 sm:px-10 h-full w-full bg-gray-900 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-60 border border-gray-100'>
                            <div className="w-max z-[1111]">
                                <Image
                                    className="lg:max-w-[200px] sm:max-w-[120px] max-h-[300px] max-w-[80px] aspect-[3/4] rounded-md flex justify-center items-center object-cover"
                                    src={data[selectedIndex]?.poster_path === "https://image.tmdb.org/t/p/originalnull" ? blurDataUrl : data[selectedIndex]?.poster_path}
                                    alt={`${data[selectedIndex]?.title} ${"poster"}`}
                                    width={300}
                                    height={400}
                                    loading={selectedIndex < 10 ? "eager" : "lazy"}
                                    placeholder={`data:image/${shimmerBlurDataUrl(200, 300)}`}
                                />
                            </div>
                            <motion.div className='w-[100% - 300px] rounded-md overflow-y-auto max-h-[320px] z-[1111]' layoutId={selectedId}>
                                <div className='w-full flex flex-col justify-start gap-y-1 sm:gap-y-2 lg:gap-y-3 select-none'>
                                    <h3 className='font-bold w-fit text-[1.5rem] sm:text-[1.5rem] md:text-[2rem] lg:[2.5rem] xl:text-[3rem] text-wrap'>{data[selectedIndex]?.name || data[selectedIndex]?.title || "unknown"}</h3>
                                    <div className='flex flex-wrap items-center gap-x-2'>
                                        <span className='bg-yellow-500 py-1 px-1 lg:py-2 lg:px-3 text-[0.8rem] sm:text-[1rem] rounded-md whitespace-nowrap flex items-center'>
                                            <Star fill="white" color='white' width={16} />&nbsp;{data[selectedIndex]?.vote_average?.toFixed(1)}
                                        </span>
                                        {data[selectedIndex]?.adult && <span className='bg-red-500 py-1 px-1 lg:py-2 lg:px-3 text-[0.8rem] sm:text-[1rem] rounded-md'>
                                            NSFW
                                        </span>}
                                        {data[selectedIndex]?.genre_ids?.map((genre, index) => (
                                            <span key={index} className='bg-green-500 py-1 px-1 lg:py-2 lg:px-3 text-[0.8rem] sm:text-[1rem] rounded-md'>
                                                {genre}
                                            </span>
                                        ))}
                                        <span className='bg-purple-500 py-1 px-1 lg:py-2 lg:px-3 text-[0.8rem] sm:text-[1rem] rounded-md whitespace-nowrap flex items-center'>
                                            {data[selectedIndex]?.title ? "Movie" : "TV"}
                                        </span>
                                    </div>
                                    <span className='text-lg max-h-[115px] hidden lg:block text-[0.9rem] sm:text-[1rem] overflow-hidden'>{data[selectedIndex]?.overview}...</span>
                                    <div className='flex justify-start items-center gap-x-2'>
                                        <Link href={`/${data[selectedIndex]?.name ? "tv" : "movie"}/${data[selectedIndex]?.id}/play`} className='bg-yellow-500 cursor-pointer w-fit py-1 px-1 lg:py-2 lg:px-3 text-[0.8rem] sm:text-[1rem] rounded-md text-center flex items-center gap-x-1 lg:gap-x-2'><PlayCircle /> Play</Link>
                                        <Link href={`/${data[selectedIndex]?.name ? "tv" : "movie"}/${data[selectedIndex]?.id}`} className='bg-blue-500 cursor-pointer w-fit py-1 px-1 lg:py-2 lg:px-3 text-[0.8rem] sm:text-[1rem] rounded-md text-center flex items-center gap-x-1 lg:gap-x-2'><Info />More</Link>
                                    </div>
                                </div>
                            </motion.div>
                            <span className='lg:hidden w-full text-lg text-[0.8rem] sm:text-[1rem]'>{data[selectedIndex]?.overview}...</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence> */}
    </Carousel>
  )
}

const MediaSwiperSkeleton = ({
  basis,
  heading,
  link,
}: {
  basis: any
  heading: any
  link: any
}) => {
  return (
    <Carousel className='w-full flex flex-col h-fit gap-y-5 pl-3 pr-5'>
      <div>
        <h1 className='text-[1.5rem] sm:text-[2rem] lg:text-[2.5rem] pt-5 mb-3'>
          {heading}
        </h1>
        <Link href={link}>
          <span className='clickable bg-[#151517] text-white dark:bg-white dark:text-black px-3 py-[6.4px] text-sm sm:py-[6.4px] sm:text-md rounded-xl'>
            View more
          </span>
        </Link>
      </div>
      <CarouselContent>
        {Array(20)
          .fill('')
          .map((_, i) => (
            <CarouselItem
              key={i}
              style={{ flexBasis: basis }}
              className={`relative min-w-0 shrink-0 grow-0 h-fit basis-1/2 sm:basis-1/4 md:basis-1/5 lg:basis-1/6 xl:basis-1/8`}
            >
              <div className='group clickable'>
                <span className='bg-yellow-500 w-[50px] h-[25px] absolute top-2 left-7 z-[3] py-[2px] px-2 text-[0.8rem] rounded-3xl flex items-center'></span>
                <Skeleton className='rounded-t-md group-hover:cursor-pointer group-hover:blur relative h-full aspect-[2/3] transition-all duration-300 ease-in-out' />
                <Skeleton className='rounded-b-md text-[1.5rem] border border-t-1 border-black px-3' />
              </div>
            </CarouselItem>
          ))}
      </CarouselContent>
      <div className='absolute right-16 top-20'>
        <CarouselPrevious className='text-black dark:bg-white right-1 top-1/2 -translate-y-1/2' />
        <CarouselNext className='text-black dark:bg-white left-0 top-1/2 -translate-y-1/2' />
      </div>
    </Carousel>
  )
}
