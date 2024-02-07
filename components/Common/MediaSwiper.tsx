"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import { Star } from "lucide-react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import MediaThumbnailComponent from "@/components/Common/MediaThumbnailComponent"
import { mediaPeopleData } from '@/types/mediaData'
interface MediaSwiperProps {
    data: mediaPeopleData[];
    loading: boolean;
    heading: string;
    upcoming?: boolean;
    link: string;
}
export default function MediaSwiper({ data, loading, heading, upcoming, link }: MediaSwiperProps) {
    const [basis, setBasis] = useState<string>('');

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            let newBasis: number;
            if (width > 600) {
                newBasis = 100 / Math.floor(width / 200);
            } else {
                newBasis = 100 / Math.floor(width / 160);
            }
            setBasis(`${newBasis}%`);
        };

        window.addEventListener('resize', handleResize);

        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (loading || !data) return <SkeletonTheme baseColor="#202020" highlightColor="#444"><MediaSwiperSkeleton basis={basis} heading={heading} link={link} /></SkeletonTheme>

    return (
        <Carousel opts={{ align: "start" }} className="w-full flex flex-col h-fit gap-y-5 pr-5 text-white">
            <div className="pl-5">
                <h1 className='text-[1.5rem] sm:text-[2rem] lg:text-[2.5rem] font-bold pt-5 mb-3 overflow-hidden whitespace-nowrap text-ellipsis'>{heading}</h1>
                <Link href={link}><span className='clickable bg-[#151517] text-white dark:bg-white dark:text-black px-3 py-[6.4px] text-sm sm:py-[6.4px] sm:text-md font-normal rounded-xl'>View more</span></Link>
            </div>
            <CarouselContent className='ml-2'>
                {data[0]?.profile_path ? data?.map((post: mediaPeopleData, index: React.Key | number) => (
                    <CarouselItem key={index} style={{ flexBasis: basis }} className={`relative min-w-0 h-fit p-2 shrink-0 grow-0 basis-1/2 sm:basis-1/4 md:basis-1/5 lg:basis-1/6 xl:basis-1/8`} >
                        <MediaThumbnailComponent link={`/people/${post.id}`} title={post.name} poster={post.profile_path} width={400} height={600} index={index} type={"people"} >
                            <span className='bg-yellow-500 text-white absolute top-3 left-3 z-[3] py-[2px] px-2 text-[0.8rem] rounded-3xl whitespace-nowrap flex items-center'>
                                {(post.known_for_department === "Acting" && "Actor") || (post.known_for_department === "Writing" && "Writer") || (post.known_for_department === "Directing" && "Director") || (post.known_for_department === "Production" && "Producer") || post.known_for_department}
                            </span>
                        </MediaThumbnailComponent>
                    </CarouselItem>
                )) : data?.map((post: mediaPeopleData, index: React.Key | null | undefined) => (
                    <CarouselItem key={index} style={{ flexBasis: basis }} className={`relative min-w-0 h-fit p-2 shrink-0 grow-0 basis-1/2 sm:basis-1/4 md:basis-1/5 lg:basis-1/6 xl:basis-1/8`} >
                        {/* <CarouselItem key={index} style={{ flexBasis: basis }} className={`relative min-w-0 shrink-0 grow-0 basis-1/2 h-fit`} > */}
                        <MediaThumbnailComponent link={`/${post.name ? "tv" : "movie"}/${post.id}`} title={post.name || post.title} poster={post.poster_path} width={400} height={600} index={index} release_date={post.release_date || post.first_air_date} type={post.title ? "movie" : "tv"}>
                            <span className='bg-yellow-500 text-white absolute top-3 left-3 z-[3] py-[2px] px-2 text-[0.8rem] rounded-3xl whitespace-nowrap flex items-center'>
                                <Star fill="white" color='white' width={12} />&nbsp;{post.vote_average.toFixed(1)}
                            </span>
                        </MediaThumbnailComponent>
                    </CarouselItem>))
                }
            </CarouselContent>
            <div className="absolute right-16 top-20">
                <CarouselPrevious className="text-black dark:bg-white right-1 top-1/2 -translate-y-1/2" />
                <CarouselNext className="text-black dark:bg-white left-0 top-1/2 -translate-y-1/2" />
            </div>
        </Carousel >
    )
}

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
const MediaSwiperSkeleton = ({ basis, heading, link }: { basis: any; heading: any; link: any }) => {
    return <Carousel
        className="w-full flex flex-col h-fit gap-y-5 pl-3 pr-5"
    >
        <div>
            <h1 className='text-[1.5rem] sm:text-[2rem] lg:text-[2.5rem] pt-5 mb-3'>{heading}</h1>
            <Link href={link} ><span className='clickable bg-[#151517] text-white dark:bg-white dark:text-black px-3 py-[6.4px] text-sm sm:py-[6.4px] sm:text-md rounded-xl'>View more</span></Link>
        </div>
        <CarouselContent>
            {Array(20).fill('').map((_, i) => (
                <CarouselItem key={i} style={{ flexBasis: basis }} className={`relative min-w-0 shrink-0 grow-0 h-fit basis-1/2 sm:basis-1/4 md:basis-1/5 lg:basis-1/6 xl:basis-1/8`} >
                    <div className="group clickable">
                        <span className='bg-yellow-500 w-[50px] h-[25px] absolute top-2 left-7 z-[3] py-[2px] px-2 text-[0.8rem] rounded-3xl flex items-center'>
                        </span>
                        <Skeleton className="rounded-t-md group-hover:cursor-pointer group-hover:blur relative h-full aspect-[2/3] transition-all duration-300 ease-in-out" />
                        <Skeleton className="rounded-b-md text-[1.5rem] border border-t-1 border-black px-3" />
                    </div>
                </CarouselItem>
            ))}
        </CarouselContent>
        <div className="absolute right-16 top-20">
            <CarouselPrevious className="text-black dark:bg-white right-1 top-1/2 -translate-y-1/2" />
            <CarouselNext className="text-black dark:bg-white left-0 top-1/2 -translate-y-1/2" />
        </div>
    </Carousel >
}
