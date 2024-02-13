import React, { Key, useEffect, useState } from "react";
import Link from 'next/link'
import { Star, PlayCircle, Info } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Image from 'next/image'
import { shimmerBlurDataUrl, blurDataUrl } from '@/utils/blurDataUrl';

import MediaThumbnailComponent from '@/components/Common/MediaThumbnailComponent'
const MediaGrid = ({ mediaData, loading, type }: { mediaData: any, loading: boolean, type?: string }) => {
    const [basis, setBasis] = React.useState('');
    const [selectedId, setSelectedId] = useState<null | string>(null)
    const [selectedIndex, setSelectedIndex] = useState<number>(0)
    console.log(mediaData)

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width > 600) {
                var newBasis = 100 / Math.floor(width / 200);
            } else {
                var newBasis = 100 / Math.floor(width / 150);
            }
            setBasis(`${newBasis}%`);
        };

        // Attach resize listener
        window.addEventListener('resize', handleResize);

        // Call handler right away so state gets updated with initial window size
        handleResize();

        // Remove event listener on cleanup
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    if (loading) return <SkeletonTheme baseColor="#202020" highlightColor="#444"><MediaGridSkeleton basis={basis} /></SkeletonTheme>
    if (type === "anime") return (
        <div className="w-full h-fit">
            <div className="w-full h-full flex justify-start">
                <div className="flex flex-wrap w-full justify-start items-center">
                    {mediaData?.results.map((post: { title: any; id: string; image: string; type: string; rating: number; releaseDate: string; totalEpisodes: number }, index: React.Key | null | undefined) => (
                        <div key={index} style={{ flexBasis: basis }} className={`relative min-w-0 h-fit p-2 shrink-0 grow-0 basis-1/2 sm:basis-1/4 md:basis-1/5 lg:basis-1/6 xl:basis-1/8`}>
                            <MediaThumbnailComponent link={`/anime/${post.id}`} id={post.id} title={post.title.userPreferred || post.title.english || post.title.romaji || post.title.native} poster={post.image} width={400} height={600} index={index} type={"anime"}>
                                <div className="absolute flex justify-start items-center flex-wrap gap-2 top-3 left-3 z-[3]">
                                    {post.rating && <span className='bg-yellow-500 text-white py-[0.8px] px-1 text-[0.8rem] rounded-md whitespace-nowrap flex items-center'>
                                        <Star fill="white" color='white' width={12} />&nbsp;{(post.rating / 10).toFixed(1)}
                                    </span>}
                                    {post.type && <span className='bg-red-500 text-white py-[2px] px-1 text-[0.8rem] rounded-md whitespace-nowrap flex items-center'>
                                        {post.type}
                                    </span>}
                                    {post.totalEpisodes && <span className='bg-blue-500 text-white py-[2px] px-1 text-[0.8rem] rounded-md whitespace-nowrap flex items-center'>
                                        EP {post.totalEpisodes}
                                    </span>}
                                    {post.releaseDate && <span className='bg-green-500 text-white py-[2px] px-1 text-[0.8rem] rounded-md whitespace-nowrap flex items-center'>
                                        {post.releaseDate}
                                    </span>}
                                </div>
                            </MediaThumbnailComponent>
                        </div>
                    )
                    )}
                </div>
            </div>
        </div >
    )

    return (
        <div className="w-full h-fit">
            <div className="w-full h-full flex flex-col-reverse lg:flex-row justify-start">
                <div className="flex flex-wrap w-full justify-start items-center">
                    {mediaData?.results.map((post: { __typename: string; title: any; id: any; vote_average: number; poster_path: string; name: any; known_for_department: string; profile_path: string; release_date: string; first_air_date: string; }, index: React.Key | null | undefined) => (
                        (post.__typename !== "People") ?
                            <div key={index} style={{ flexBasis: basis }} className={`relative min-w-0 h-fit p-2 shrink-0 grow-0 basis-1/2 sm:basis-1/4 md:basis-1/5 lg:basis-1/6 xl:basis-1/8`}>
                                <motion.div className=' z-[1111] ' layoutId={index as string} onClick={() => { setSelectedId(post.id); setSelectedIndex(index as number) }}>
                                    <MediaThumbnailComponent link={`/${post.name ? "tv" : "movie"}/${post.id}`} id={post.id} title={post.name || post.title} poster={post.poster_path} width={400} height={600} index={index} release_date={post.release_date || post.first_air_date} type={post.title ? "movie" : "tv"}>
                                        <span className='bg-yellow-500 text-white absolute top-3 left-3 z-[3] py-[2px] px-2 text-[0.8rem] rounded-3xl whitespace-nowrap flex items-center'>
                                            <Star fill="white" color='white' width={12} />&nbsp;{post.vote_average.toFixed(1)}
                                        </span>
                                    </MediaThumbnailComponent>
                                </motion.div>
                            </div> :
                            <div key={index} style={{ flexBasis: basis }} className={`relative min-w-0 h-fit p-2 shrink-0 grow-0 basis-1/2 sm:basis-1/4 md:basis-1/5 lg:basis-1/6 xl:basis-1/8`}>
                                <MediaThumbnailComponent link={`/people/${post.id}`} title={post.name} id={post.id} poster={post.profile_path} width={400} height={600} index={index} type={"people"} >
                                    <span className='bg-yellow-500 text-white absolute top-3 left-3 z-[3] py-[2px] px-2 text-[0.8rem] rounded-3xl whitespace-nowrap flex items-center'>
                                        {(post.known_for_department === "Acting" && "Actor") || (post.known_for_department === "Writing" && "Writer") || (post.known_for_department === "Directing" && "Director") || (post.known_for_department === "Production" && "Producer") || post.known_for_department}
                                    </span>
                                </MediaThumbnailComponent>
                            </div>
                    )
                    )}
                </div>

                <AnimatePresence>
                    {mediaData?.results && mediaData?.results[selectedIndex]?.id && selectedId && (
                        <motion.div className='relative lg:w-1/3 lg:h-full w-full left-0 h-[320px] z-[1111]' layoutId={selectedId}>
                            <div className='absolute top-0 w-full h-full'>
                                <Image
                                    className="w-full h-full rounded-md flex justify-center items-center object-cover z-[111]"
                                    src={mediaData?.results[selectedIndex]?.backdrop_path === "https://image.tmdb.org/t/p/originalnull" ? blurDataUrl : mediaData?.results[selectedIndex]?.backdrop_path}
                                    alt={`${mediaData?.results[selectedIndex]?.title} ${"poster"}`}
                                    width={1080}
                                    height={300}
                                    loading={selectedIndex < 10 ? "eager" : "lazy"}
                                    placeholder={`data:image/${shimmerBlurDataUrl(200, 300)}`}
                                />
                            </div>
                            <div className='flex flex-wrap overflow-y-auto items-center justify-center lg:justify-evenly gap-y-0 gap-x-2 sm:gap-5 py-[10px] px-2 sm:px-10 h-full w-full bg-gray-900 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-60 border border-gray-100'>
                                <div className="w-max z-[1111]">
                                    <Image
                                        className="lg:max-w-[200px] sm:max-w-[120px] max-h-[300px] max-w-[80px] aspect-[3/4] rounded-md flex justify-center items-center object-cover"
                                        src={mediaData?.results[selectedIndex]?.poster_path === "https://image.tmdb.org/t/p/originalnull" ? blurDataUrl : mediaData?.results[selectedIndex]?.poster_path}
                                        alt={`${mediaData?.results[selectedIndex]?.title} ${"poster"}`}
                                        width={300}
                                        height={400}
                                        loading={selectedIndex < 10 ? "eager" : "lazy"}
                                        placeholder={`data:image/${shimmerBlurDataUrl(200, 300)}`}
                                    />
                                </div>
                                <motion.div className='w-[100% - 300px] rounded-md lg:h-full z-[1111]'>
                                    <div className='w-full flex flex-col justify-start gap-y-1 sm:gap-y-2 lg:gap-y-3 select-none'>
                                        <h3 className='font-bold w-fit text-[1.5rem] sm:text-[1.5rem] md:text-[2rem] text-wrap'>{mediaData?.results[selectedIndex]?.name || mediaData?.results[selectedIndex]?.title || "unknown"}</h3>
                                        <div className='flex flex-wrap items-center gap-2'>
                                            <span className='bg-yellow-500 py-1 px-1 lg:py-2 lg:px-3 text-[0.8rem] sm:text-[1rem] rounded-md whitespace-nowrap flex items-center'>
                                                <Star fill="white" color='white' width={16} />&nbsp;{mediaData?.results[selectedIndex]?.vote_average.toFixed(1)}
                                            </span>
                                            {mediaData?.results[selectedIndex]?.adult && <span className='bg-red-500 py-1 px-1 lg:py-2 lg:px-3 text-[0.8rem] sm:text-[1rem] rounded-md'>
                                                NSFW
                                            </span>}
                                            {mediaData?.results[selectedIndex]?.genre_ids.map((genre: string, index: Key | null) => (
                                                <span key={index} className='bg-green-500 py-1 px-1 lg:py-2 lg:px-3 text-[0.8rem] sm:text-[1rem] rounded-md'>
                                                    {genre}
                                                </span>
                                            ))}
                                            <span className='bg-purple-500 py-1 px-1 lg:py-2 lg:px-3 text-[0.8rem] sm:text-[1rem] rounded-md whitespace-nowrap flex items-center'>
                                                {mediaData?.results[selectedIndex]?.title ? "Movie" : "TV"}
                                            </span>
                                        </div>
                                        <span className='text-lg max-h-[115px] hidden lg:block text-[0.9rem] sm:text-[1rem] overflow-hidden'>{mediaData?.results[selectedIndex]?.overview}...</span>
                                        <div className='flex justify-start items-center gap-x-2'>
                                            <Link href={`/${mediaData?.results[selectedIndex]?.name ? "tv" : "movie"}/${mediaData?.results[selectedIndex]?.id}/play`} className='bg-yellow-500 cursor-pointer w-fit py-1 px-1 lg:py-2 lg:px-3 text-[0.8rem] sm:text-[1rem] rounded-md text-center flex items-center gap-x-1 lg:gap-x-2'><PlayCircle /> Play</Link>
                                            <Link href={`/${mediaData?.results[selectedIndex]?.name ? "tv" : "movie"}/${mediaData?.results[selectedIndex]?.id}`} className='bg-blue-500 cursor-pointer w-fit py-1 px-1 lg:py-2 lg:px-3 text-[0.8rem] sm:text-[1rem] rounded-md text-center flex items-center gap-x-1 lg:gap-x-2'><Info />More</Link>
                                        </div>
                                    </div>
                                </motion.div>
                                <span className='lg:hidden w-full text-lg text-[0.8rem] sm:text-[1rem]'>{mediaData?.results[selectedIndex]?.overview}...</span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}

export default MediaGrid


import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
const MediaGridSkeleton = ({ basis }: { basis: string }) => {
    return <div className="w-full h-fit">
        <div className="w-full h-full flex justify-start">
            <div className="flex flex-wrap w-full justify-start items-center">
                {Array(35).fill(null).map((_, i) => (
                    <div key={i} style={{ flexBasis: basis }} className={`pl-5 relative min-w-0 shrink-0 grow-0 basis-1/2 sm:basis-1/4 md:basis-1/5 lg:basis-1/6 xl:basis-1/8 h-fit`}>
                        <div className="group clickable">
                            <span className='bg-yellow-500 w-[50px] h-[25px] text-white absolute top-2 left-7 z-[3] py-[2px] px-2 text-[0.8rem] rounded-3xl whitespace-nowrap flex items-center'>
                            </span>
                            <Skeleton className="rounded-t-md overflow-hidden group-hover:cursor-pointer group-hover:blur relative group-hover:scale-90 h-full aspect-[2/3] transition-all duration-300 ease-in-out" />
                            <Skeleton className="rounded-b-md text-[1.5rem] border border-t-2 border-black px-3 text-center whitespace-nowrap overflow-hidden text-ellipsis font-semibold" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
}