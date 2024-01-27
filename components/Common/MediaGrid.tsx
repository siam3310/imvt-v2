import React, { useEffect } from "react";
import Link from 'next/link'
import { Star, PlayCircle, ExternalLink } from "lucide-react"

const MediaGrid = ({ mediaData, loading }: { mediaData: any, loading: boolean }) => {
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

    return (
        <div className="w-full h-fit">
            <div className="w-full h-full flex justify-start">
                <div className="flex flex-wrap w-full justify-start items-center">
                    {mediaData?.results.map((post: { __typename: string; title: any; id: any; vote_average: string; poster_path: string; name: any; known_for_department: string; profile_path: string; }, index: React.Key | null | undefined) => (
                        (post.__typename !== "People") ? <div key={index} style={{ flexBasis: basis }} className={`relative min-w-0 shrink-0 grow-0 basis-1/2 sm:basis-1/4 md:basis-1/5 lg:basis-1/6 xl:basis-1/8 h-fit p-2`}>
                            <div className="group clickable">
                                <Link href={`/${post.title ? "movie" : "tv"}/${post.id}`} className="hidden clickable group-hover:flex absolute w-full aspect-[2/3] group-hover:z-[3] justify-center items-center pr-5">
                                    <span className="z-[3] clickable"><PlayCircle size={48} color="#ffffff" strokeWidth={3} absoluteStrokeWidth /></span>
                                </Link>
                                <span className='bg-yellow-500 text-white absolute top-3 left-3 z-[3] py-[2px] px-2 text-[0.8rem] rounded-3xl whitespace-nowrap flex items-center'>
                                    <Star fill="white" color='white' width={12} />&nbsp;{parseFloat(post.vote_average).toFixed(1)}
                                </span>
                                <div className='w-full h-fulll'>
                                    <div className="aspect-[2/3]">
                                        <Image
                                            className="rounded-t-md group-hover:cursor-pointer group-hover:blur group-hover:scale-90 transition-all duration-300 ease-in-out object-cover w-full h-full"
                                            src={post.poster_path}
                                            alt={`${mediaData.name || mediaData.title} poster`}
                                            width={400}
                                            height={600}
                                            loading={index as number < 10 ? "eager" : "lazy"}
                                            placeholder={`data:image/${shimmerBlurDataUrl(400, 600)}`}
                                        />
                                    </div>
                                    <h2 className="text-gray-900 bg-white rounded-b-md border border-t-2 border-black px-3 text-center whitespace-nowrap overflow-hidden text-ellipsis font-semibold" title={post.name || post.title}>{post.name || post.title}</h2>
                                </div>
                            </div>
                        </div> : <div key={index} style={{ flexBasis: basis }} className={`relative min-w-0 shrink-0 grow-0 basis-1/2 sm:basis-1/4 md:basis-1/5 lg:basis-1/6 xl:basis-1/8 h-fit p-2`}>
                            <div className="group clickable">
                                <Link href={`/people/${post.id}`} className="hidden clickable group-hover:flex absolute w-full aspect-[2/3] group-hover:z-[3] justify-center items-center pr-5">
                                    <span className="z-[3] clickable"><ExternalLink size={48} color="#ffffff" strokeWidth={3} absoluteStrokeWidth /></span>
                                </Link>
                                <span className='bg-yellow-500 text-white absolute top-3 left-3 z-[3] py-[2px] px-2 text-[0.8rem] rounded-3xl whitespace-nowrap flex items-center'>
                                    {post.known_for_department}
                                </span>
                                <div className='w-full h-fulll'>
                                    <div className="aspect-[2/3]">
                                        <Image
                                            className="rounded-t-md group-hover:cursor-pointer group-hover:blur group-hover:scale-90 transition-all duration-300 ease-in-out object-cover w-full h-full"
                                            src={post.profile_path}
                                            alt={`${post.name || post.title} photo`}
                                            width={400}
                                            height={600}
                                            loading={index as number < 10 ? "eager" : "lazy"}
                                            placeholder={`data:image/${shimmerBlurDataUrl(400, 600)}`}
                                        />
                                    </div>
                                    <h2 className="text-gray-900 bg-white rounded-b-md border border-t-2 border-black px-3 text-center whitespace-nowrap overflow-hidden text-ellipsis font-semibold" title={post.name || post.title}>{post.name || post.title}</h2>
                                </div>
                            </div>
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