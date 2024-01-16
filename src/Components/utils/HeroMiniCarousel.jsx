import * as React from "react"
import { Link } from 'react-router-dom'
import Autoplay from "embla-carousel-autoplay"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "../ui/carousel"

export default function HeroMiniCarousel({ data, loading }) {

    if (loading || !data) return <SkeletonTheme className="overflow-scroll" baseColor="#202020" highlightColor="#444"><HeroMiniSkeleton /></SkeletonTheme>
    return (
        <Carousel
            opts={{
                align: "center",
                loop: true,
            }}
            className="w-full relative h-fit sm:hidden"
            plugins={[
                Autoplay({
                    delay: 2000,
                }),
            ]}
        >
            <CarouselContent className="">
                {data?.map((post, index) => (
                    <CarouselItem key={index} className={`h-fit transition-none`}>
                        <div className="movie-backdrop absolute top-0 w-full h-full z-0">
                            <img
                                className="w-full h-full object-cover"
                                src={post.backdrop_path}
                                alt="Backdrop"
                            />
                        </div>
                        <div className="relative flex flex-col items-center justify-center gap-y-3 z-1 text-white pt-5">
                            <img
                                className="w-52 block h-72 poster-box-shadow object-cover rounded-3xl clickable"
                                src={post.poster_path}
                                alt="Movie logo"
                            />
                            <h3 className='font-bold w-[80%] text-center overflow-hidden text-ellipsis whitespace-nowrap text-[1.2rem]'>{post.name || post.title || "unknown"}</h3>
                            <p className="w-[80%] text-center overflow-hidden text-ellipsis whitespace-nowrap">{parseFloat(post?.vote_average).toFixed(1)} • {post.title ? "Movie" : "TV"} • {post.genre_ids.join(', ')}</p>
                            <Link to={`/${post.name ? "tv" : "movie"}/${post.id}`} className='bg-blue-500 cursor-pointer w-24 sm:w-32 p-2 text-[0.8rem] sm:text-[1rem] sm:py-2 sm:px-3 rounded-xl text-center'>More details</Link>
                        </div>

                    </CarouselItem>))}
            </CarouselContent>

        </Carousel >
    )
}


import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
const HeroMiniSkeleton = ({ className }) => {
    return <div className='h-fit transition-none sm:hidden'>
        <div className="movie-backdrop absolute top-0 w-full h-full z-0">
            <Skeleton className='w-full h-full object-cover' />
        </div>
        <div className="relative flex flex-col items-center justify-center gap-y-3 z-1 text-white pt-5">
            <Skeleton className='w-52 block h-72 poster-box-shadow object-cover rounded-3xl clickable' />
            <h3 className='font-bold w-[250px] text-center overflow-hidden text-ellipsis whitespace-nowrap text-[1.2rem]'><Skeleton /></h3>
            <p className="w-[250px] text-center overflow-hidden text-ellipsis whitespace-nowrap"><Skeleton /></p>
        </div>
    </div>
}
