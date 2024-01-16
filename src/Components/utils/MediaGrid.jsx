import React, { useEffect } from "react";
import { Link } from 'react-router-dom'
import { Star, PlayCircle, ExternalLink } from "lucide-react"

const MediaGrid = ({ mediaData, loading }) => {
    const [basis, setBasis] = React.useState('50%'); // initial basis

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
    if (loading) return <SkeletonTheme className="overflow-scroll" baseColor="#202020" highlightColor="#444"><MediaGridSkeleton basis={basis} /></SkeletonTheme>

    return (
        <div className="w-full h-fit">
            <div className="w-full h-full flex justify-start">
                <div className="flex flex-wrap w-full justify-start items-center">
                    {mediaData?.results.map((post, index) => (
                        (post.__typename !== "People") ? <div key={index} style={{ flexBasis: basis }} className={`relative min-w-0 shrink-0 grow-0 basis-1/2 h-fit p-2`}>
                            <div className="group clickable">
                                <Link to={`/${post.title ? "movie" : "tv"}/${post.id}`} className="hidden clickable group-hover:flex absolute w-full aspect-[2/3] group-hover:z-[3] justify-center items-center pr-5">
                                    <span className="z-[3] clickable"><PlayCircle size={48} color="#ffffff" strokeWidth={3} absoluteStrokeWidth /></span>
                                </Link>
                                <span className='bg-yellow-500 text-white absolute top-3 left-3 z-[3] py-[2px] px-2 text-[0.8rem] rounded-3xl whitespace-nowrap flex items-center'>
                                    <Star fill="white" color='white' width={12} />&nbsp;{parseFloat(post.vote_average).toFixed(1)}
                                </span>
                                <div className='w-full h-fulll'>
                                    <div className="aspect-[2/3]">
                                        <img
                                            className="rounded-t-md group-hover:cursor-pointer group-hover:blur group-hover:scale-90 transition-all duration-300 ease-in-out object-cover w-full h-full"
                                            src={post.poster_path}
                                            alt="Your alt text"
                                        />
                                    </div>
                                    <h2 className="text-gray-900 bg-white rounded-b-md border border-t-2 border-black px-3 text-center whitespace-nowrap overflow-hidden text-ellipsis font-semibold" title={post.name || post.title}>{post.name || post.title}</h2>
                                </div>
                            </div>
                        </div> : <div key={index} style={{ flexBasis: basis }} className={`relative min-w-0 shrink-0 grow-0 basis-1/2 h-fit p-2`}>
                            <div className="group clickable">
                                <Link to={`/people/${post.id}`} className="hidden clickable group-hover:flex absolute w-full aspect-[2/3] group-hover:z-[3] justify-center items-center pr-5">
                                    <span className="z-[3] clickable"><ExternalLink size={48} color="#ffffff" strokeWidth={3} absoluteStrokeWidth /></span>
                                </Link>
                                <span className='bg-yellow-500 text-white absolute top-3 left-3 z-[3] py-[2px] px-2 text-[0.8rem] rounded-3xl whitespace-nowrap flex items-center'>
                                    {post.known_for_department}
                                </span>
                                <div className='w-full h-fulll'>
                                    <div className="aspect-[2/3]">
                                        <img
                                            className="rounded-t-md group-hover:cursor-pointer group-hover:blur group-hover:scale-90 transition-all duration-300 ease-in-out object-cover w-full h-full"
                                            src={post.profile_path}
                                            alt="Your alt text"
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
const MediaGridSkeleton = ({ className, basis }) => {
    return <div className="w-full h-fit">
        <div className="w-full h-full flex justify-start">
            <div className="flex flex-wrap w-full justify-start items-center">
                {Array(35).fill().map((_, i) => (
                    <div key={i} style={{ flexBasis: basis }} className={`pl-5 relative min-w-0 shrink-0 grow-0 basis-1/2 h-fit`}>
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