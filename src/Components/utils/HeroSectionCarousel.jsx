import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Star, Users } from "lucide-react"
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import "./HeroSectionCarousel.css"
const HeroSectionCarousel = ({ data, loading }) => {
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [emblaMainRef, emblaMainApi] = useEmblaCarousel({})
    const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
        containScroll: 'keepSnaps',
        dragFree: true
    })

    const onThumbClick = useCallback(
        (index) => {
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
    if (loading) return <div>Loading...</div>
    return (
        <div className='Carousel hidden sm:block'>
            <div className="embla">
                <div className="embla__viewport" ref={emblaMainRef}>
                    <div className="embla__container">
                        {data?.map((post, index) => (
                            <div className="embla__slide" key={index}>

                                <img
                                    className="embla__slide__img"
                                    src={post.backdrop_path}
                                    alt="Movie logo"
                                />
                                <div className='flex items-center gap-3 absolute top-0 right-0 z-10 w-full h-[80%] p-[3rem]'>
                                    <div className='w-full flex flex-col justify-center gap-y-3 text-white select-none'>
                                        <h3 className='font-bold text-[1.5rem] sm:text-[2rem] lg:text-[3rem]'>{post.name || post.title || "unknown"}</h3>
                                        <div className='flex flex-wrap items-center gap-3'>
                                            <span className='bg-yellow-500 py-1 px-3 text-[0.8rem] sm:text-[1rem] sm:py-2 sm:px-3 rounded-3xl whitespace-nowrap flex items-center'>
                                                <Star fill="white" color='white' width={16} />&nbsp;{parseFloat(post?.vote_average).toFixed(1)}&nbsp;•&nbsp;<Users fill="white" color='white' width={16} />&nbsp;{post?.vote_count}
                                            </span>
                                            {post.adult && <span className='bg-red-500 p-2 text-[0.8rem] sm:text-[1rem] sm:py-2 sm:px-3 rounded-3xl'>
                                                NSFW
                                            </span>}
                                            {post.genre_ids.map((genre, index) => (
                                                <span key={index} className='bg-green-500 p-2 text-[0.8rem] sm:text-[1rem] sm:py-2 sm:px-3 rounded-3xl'>
                                                    {genre}
                                                </span>
                                            ))}
                                            <span className='bg-purple-500 py-2 px-3 text-[0.8rem] sm:text-[1rem] sm:py-2 sm:px-3 rounded-3xl whitespace-nowrap flex items-center'>
                                                {post.title ? "Movie" : "TV"}
                                            </span>
                                        </div>
                                        <span className='text-lg max-h-[115px] text-[0.9rem] sm:text-[1rem] overflow-hidden'>{post.overview}...</span>
                                        <Link to={`/${post.name ? "tv" : "movie"}/${post.id}`} className='bg-blue-500 cursor-pointer w-24 sm:w-32 p-2 text-[0.8rem] sm:text-[1rem] sm:py-2 sm:px-3 rounded-xl text-center'>More details</Link>
                                    </div>
                                    <img
                                        className="w-56 hidden sm:block h-80 object-cover rounded-3xl clickable"
                                        src={post.poster_path}
                                        alt="Movie logo"
                                    />
                                </div>
                            </div>

                        ))}
                    </div>
                </div>

                <div className="embla-thumbs">
                    <div className="embla-thumbs__viewport" ref={emblaThumbsRef}>
                        <div className="embla-thumbs__container">
                            {data?.map((post, index) => (
                                <Thumb
                                    onClick={() => onThumbClick(index)}
                                    selected={index === selectedIndex}
                                    imgSrc={post.backdrop_path}
                                    post={post}
                                    key={index}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div></div>
    )
}

export default HeroSectionCarousel

const Thumb = (props) => {
    const { selected, imgSrc, onClick, post } = props

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
                <img
                    className="embla-thumbs__slide__img group-hover:scale-[1.2] transition-all duration-500 ease-in-out"
                    src={imgSrc}
                    alt="Your alt text"
                />
                <span className='group-hover:flex items-center justify-center h-full w-full hidden absolute top-0 left-0 text-white font-bold text-lg py-1 px-2 clickable'>{post.name || post.title || "unknown"}</span>
            </button>
            <button
                onClick={onClick}
                className="block sm:hidden group hover embla-thumbs__slide__button overflow-hidden transition-all duration-500 ease-in-out"
                type="button"
            >
                <img
                    className="embla-thumbs__slide__img group-hover:scale-[1.2] transition-all duration-500 ease-in-out"
                    src={post.poster_path}
                    alt="Your alt text"
                />
            </button>
        </div>
    )
}
