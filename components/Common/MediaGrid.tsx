import React, { useEffect } from "react";
import Link from 'next/link'
import { Star, PlayCircle, ExternalLink } from "lucide-react"
import MediaThumbnailComponent from '@/components/Common/MediaThumbnailComponent'
const MediaGrid = ({ mediaData, loading, type }: { mediaData: any, loading: boolean, type?: string }) => {
    const [basis, setBasis] = React.useState('');

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
                    {mediaData?.results.map((post: { title: any; id: number; image: string; type: string; rating: number; releaseDate: string; totalEpisodes: number }, index: React.Key | null | undefined) => (
                        <div key={index} style={{ flexBasis: basis }} className={`relative min-w-0 h-fit p-2 shrink-0 grow-0 basis-1/2 sm:basis-1/4 md:basis-1/5 lg:basis-1/6 xl:basis-1/8`}>
                            <MediaThumbnailComponent link={`/anime/${post.id}`} title={post.title.userPreferred} poster={post.image} width={400} height={600} index={index} type={"anime"}>
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
        </div>
    )

    return (
        <div className="w-full h-fit">
            <div className="w-full h-full flex justify-start">
                <div className="flex flex-wrap w-full justify-start items-center">
                    {mediaData?.results.map((post: { __typename: string; title: any; id: any; vote_average: number; poster_path: string; name: any; known_for_department: string; profile_path: string; release_date: string; first_air_date: string; }, index: React.Key | null | undefined) => (
                        (post.__typename !== "People") ?
                            <div key={index} style={{ flexBasis: basis }} className={`relative min-w-0 h-fit p-2 shrink-0 grow-0 basis-1/2 sm:basis-1/4 md:basis-1/5 lg:basis-1/6 xl:basis-1/8`}>
                                <MediaThumbnailComponent link={`/${post.name ? "tv" : "movie"}/${post.id}`} title={post.name || post.title} poster={post.poster_path} width={400} height={600} index={index} release_date={post.release_date || post.first_air_date} type={post.title ? "movie" : "tv"}>
                                    <span className='bg-yellow-500 text-white absolute top-3 left-3 z-[3] py-[2px] px-2 text-[0.8rem] rounded-3xl whitespace-nowrap flex items-center'>
                                        <Star fill="white" color='white' width={12} />&nbsp;{post.vote_average.toFixed(1)}
                                    </span>
                                </MediaThumbnailComponent>
                            </div> :
                            <div key={index} style={{ flexBasis: basis }} className={`relative min-w-0 h-fit p-2 shrink-0 grow-0 basis-1/2 sm:basis-1/4 md:basis-1/5 lg:basis-1/6 xl:basis-1/8`}>
                                <MediaThumbnailComponent link={`/people/${post.id}`} title={post.name} poster={post.profile_path} width={400} height={600} index={index} type={"people"} >
                                    <span className='bg-yellow-500 text-white absolute top-3 left-3 z-[3] py-[2px] px-2 text-[0.8rem] rounded-3xl whitespace-nowrap flex items-center'>
                                        {(post.known_for_department === "Acting" && "Actor") || (post.known_for_department === "Writing" && "Writer") || (post.known_for_department === "Directing" && "Director") || (post.known_for_department === "Production" && "Producer") || post.known_for_department}
                                    </span>
                                </MediaThumbnailComponent>
                            </div>
                    )
                    )}
                </div>
            </div>
        </div>
    )
}

export default MediaGrid


import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Image from "next/image";
import { shimmerBlurDataUrl } from "@/utils/blurDataUrl";
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