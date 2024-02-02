"use client"
import React, { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { shimmerBlurDataUrl } from '@/utils/blurDataUrl';
import { Star, Users } from "lucide-react"
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { mediaData } from '@/types/mediaData'
const HeroSectionCarousel = ({ data, loading }: { data: mediaData[] | undefined, loading: boolean }) => {
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [emblaMainRef, emblaMainApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000 })])
    const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
        containScroll: 'keepSnaps',
        dragFree: true
    })

    const onThumbClick = useCallback(
        (index: number) => {
            if (!emblaMainApi || !emblaThumbsApi) return
            emblaMainApi.scrollTo(index)
        },
        [emblaMainApi, emblaThumbsApi]
    )

    const onSelect = useCallback(() => {
        if (!emblaMainApi || !emblaThumbsApi) return
        setSelectedIndex(emblaMainApi.selectedScrollSnap())
        emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap())
    }, [emblaMainApi, emblaThumbsApi, setSelectedIndex])

    useEffect(() => {
        if (!emblaMainApi) return
        onSelect()
        emblaMainApi.on('select', onSelect)
        emblaMainApi.on('reInit', onSelect)
    }, [emblaMainApi, onSelect])


    if (loading) return <SkeletonTheme baseColor="#202020" highlightColor="#444"><HeroSkeleton /></SkeletonTheme>

    return (
        <div className='Carousel hidden sm:block text-white'>
            <div className="embla">
                <div className="embla__viewport" ref={emblaMainRef}>
                    <div className="embla__container">
                        {data?.map((mediaData: mediaData, index: React.Key | number) => (
                            <div className="embla__slide" key={index}>
                                <Image
                                    className="embla__slide__img"
                                    src={mediaData.backdrop_path}
                                    alt={`${mediaData.name || mediaData.title} backdrop`}
                                    width={1280}
                                    height={720}
                                    loading={index as number < 10 ? "eager" : "lazy"}
                                    placeholder={`data:image/${shimmerBlurDataUrl(1280, 720)}`}
                                />
                                <div className='flex items-center gap-3 absolute top-0 right-0 z-10 w-full h-[80%] p-[3rem]'>
                                    <div className='w-full flex flex-col justify-center gap-y-3 select-none'>
                                        <h3 className='font-bold text-[1.5rem] sm:text-[2rem] lg:text-[3rem]'>{mediaData.name || mediaData.title || "unknown"}</h3>
                                        <div className='flex flex-wrap items-center gap-3'>
                                            <span className='bg-yellow-500 py-1 px-3 text-[0.8rem] sm:text-[1rem] sm:py-2 sm:px-3 rounded-3xl whitespace-nowrap flex items-center'>
                                                <Star fill="white" color='white' width={16} />&nbsp;{mediaData?.vote_average.toFixed(1)}&nbsp;•&nbsp;<Users fill="white" color='white' width={16} />&nbsp;{mediaData?.vote_count}
                                            </span>
                                            {mediaData.adult && <span className='bg-red-500 p-2 text-[0.8rem] sm:text-[1rem] sm:py-2 sm:px-3 rounded-3xl'>
                                                NSFW
                                            </span>}
                                            {mediaData.genre_ids.map((genre, index) => (
                                                <span key={index} className='bg-green-500 p-2 text-[0.8rem] sm:text-[1rem] sm:py-2 sm:px-3 rounded-3xl'>
                                                    {genre}
                                                </span>
                                            ))}
                                            <span className='bg-purple-500 py-2 px-3 text-[0.8rem] sm:text-[1rem] sm:py-2 sm:px-3 rounded-3xl whitespace-nowrap flex items-center'>
                                                {mediaData.title ? "Movie" : "TV"}
                                            </span>
                                        </div>
                                        <span className='text-lg max-h-[115px] text-[0.9rem] sm:text-[1rem] overflow-hidden'>{mediaData.overview}...</span>
                                        <Link href={`/${mediaData.name ? "tv" : "movie"}/${mediaData.id}`} className='bg-blue-500 cursor-pointer w-24 sm:w-32 p-2 text-[0.8rem] sm:text-[1rem] sm:py-2 sm:px-3 rounded-xl text-center'>More details</Link>
                                    </div>
                                    <Image
                                        className="w-56 hidden sm:block h-80 object-cover rounded-3xl clickable"
                                        src={mediaData.poster_path}
                                        alt={`${mediaData.name || mediaData.title} poster`}
                                        width={400}
                                        height={600}
                                        loading={index as number < 10 ? "eager" : "lazy"}
                                        placeholder={`data:image/${shimmerBlurDataUrl(400, 600)}`}
                                    />
                                </div>
                            </div>

                        ))}
                    </div>
                </div>
                <div className="embla-thumbs">
                    <div className="embla-thumbs__viewport" ref={emblaThumbsRef}>
                        <div className="embla-thumbs__container">
                            {data?.map((mediaData: mediaData, index: number) => (
                                <Thumb
                                    onClick={() => onThumbClick(index)}
                                    selected={index === selectedIndex}
                                    backdropSrc={mediaData.backdrop_path}
                                    posterSrc={mediaData.poster_path}
                                    title={mediaData.name || mediaData.title || "unknown"}
                                    key={index}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroSectionCarousel

const Thumb = ({ selected, backdropSrc, posterSrc, onClick, title }: { selected: boolean; backdropSrc: string; posterSrc: string; onClick: any; title: string }) => {
    return (
        <div
            className={'embla-thumbs__slide'.concat(
                selected ? ' embla-thumbs__slide--selected' : ''
            )}
        >
            <button
                onClick={onClick}
                className="hidden sm:block group embla-thumbs__slide__button overflow-hidden transition-all duration-500 ease-in-out"
                type="button"
            >
                <Image
                    className="embla-thumbs__slide__img group-hover:scale-[1.2] transition-all duration-500 ease-in-out"
                    src={backdropSrc}
                    alt={`${title} thumbnail`}
                    width={256}
                    height={144}
                    placeholder={`data:image/${shimmerBlurDataUrl(256, 144)}`}
                />
                <span className='group-hover:flex items-center justify-center h-full w-full hidden absolute top-0 left-0 text-white font-bold text-lg py-1 px-2 clickable'>
                    {title}
                </span>
            </button>
            <button
                onClick={onClick}
                className="block sm:hidden group hover embla-thumbs__slide__button overflow-hidden transition-all duration-500 ease-in-out"
                type="button"
            >
                <Image
                    className="embla-thumbs__slide__img group-hover:scale-[1.2] transition-all duration-500 ease-in-out"
                    src={posterSrc}
                    alt={`${title} thumbnail`}
                    width={100}
                    height={150}
                    placeholder={`data:image/${shimmerBlurDataUrl(100, 150)}`}
                />
            </button>
        </div>
    )
}

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
const HeroSkeleton = () => {
    return <div className='Carousel sm:block hidden'>
        <div className="embla">
            <div className="embla__viewport">
                <div className="embla__container">
                    <div className="embla__slide">
                        <Skeleton className="embla__slide__img" />
                        <div className='flex items-center gap-3 absolute top-0 right-0 w-full h-[80dvh] p-[3rem]'>
                            <div className='w-full flex flex-col justify-center gap-y-6'>
                                <Skeleton className='flex max-w-[90%] text-[1.2rem] sm:text-[1.8rem] lg:text-[2.5rem]' />
                                <Skeleton className='flex max-w-[80%] text-[1.2rem] sm:text-[1.8rem] lg:text-[2.5rem]' />
                                <Skeleton className='flex max-w-[70%] text-[1rem] sm:text-[1.5rem] lg:text-[2.2rem]' />
                                <Skeleton className='flex max-w-[60%] text-[1rem] sm:text-[1.5rem] lg:text-[2.2rem]' />
                            </div>
                            <div className='min-w-56 min-h-80 rounded-3xl object-cover overflow-hidden'>
                                <Skeleton className="w-56 hidden sm:block h-80 object-cover rounded-3xl clickable" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}
