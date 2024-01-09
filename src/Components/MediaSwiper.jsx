import React, { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Star, Play, ExternalLink } from "lucide-react"
import useEmblaCarousel from 'embla-carousel-react'
import './Swiper.css'
const MediaSwiper = ({ data, loading, heading }) => {
    const options = { align: 'start', dragFree: true, containScroll: 'trimSnaps' }
    const [emblaRef, emblaApi] = useEmblaCarousel(options)
    const size = ""

    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick
    } = usePrevNextButtons(emblaApi)
    if (loading) return <div>Loading...</div>
    return (
        <div className='Swiper relative mt-5 rounded-2xl mx-3'>
            <h1 className='text-[1.5rem] sm:text-[2rem] lg:text-[2.5rem] text-white font-bold ml-6 pt-5 mb-3 overflow-hidden whitespace-nowrap text-ellipsis'>{heading}
            </h1>
            <span className='clickable bg-white px-3 py-[6.4px] text-sm sm:py-[6.4px] sm:text-md text-black font-normal rounded-xl ml-6'>View more</span>

            <div className="embla">
                <div className="embla__viewport" ref={emblaRef}>
                    <div className="embla__container">
                        {data?.map((post, index) => (
                            <div className="embla__slide clickable flex group overflow-hidden min-w-[180px] sm:min-w-[200px] max-w-[180px] sm:max-w-[200px] h-[15rem] sm:h-[19rem]" key={index}>
                                {/* Details Overlay */}
                                <div className='overflow-hidden h-0 w-0 group-hover:w-[180px] group-hover:sm:w-[200px] group-hover:h-full z-[2] group-hover:sm:delay-700 transition-all duration-500 ease-in-out'>
                                    <div className='hidden relative group-hover:block w-full h-full rounded-l-2xl'>
                                        <img src={post.backdrop_path} alt="backdrop" className='brightness-50 object-cover blur-sm rounded-2xl h-full w-full' />
                                        <div className='absolute top-0 left-0'>
                                            <div className='flex flex-col justify-center gap-y-3 text-white p-[1rem]'>
                                                <h3 className='font-bold text-[1rem] max-h-[2.8rem] sm:max-h-[3rem] overflow-hidden'>{post.name ? post.name : post.title}</h3>
                                                <div className='flex flex-wrap items-center gap-3 max-h-[1.8rem] overflow-hidden'>
                                                    <span className='bg-yellow-500 py-[2px] px-2 text-[0.8rem] rounded-3xl whitespace-nowrap flex items-center'>
                                                        <Star fill="white" color='white' width={12} />&nbsp;{parseFloat(post.vote_average).toFixed(1)}
                                                    </span>
                                                    {post.release_date && <span className='bg-orange-500 py-[2px] px-2 text-[0.8rem] rounded-3xl whitespace-nowrap flex items-center'>
                                                        {new Date(post.release_date).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}
                                                    </span>}
                                                    {post.adult && <span className='bg-red-500 py-[2px] px-2 text-[0.8rem] rounded-3xl whitespace-nowrap flex items-center'>
                                                        NSFW
                                                    </span>}
                                                    {post.media_type && <span key={index} className='bg-blue-500 py-1 px-2 text-[0.8rem] rounded-3xl'>
                                                        {post.media_type}
                                                    </span>}
                                                    {post.genre_ids.map((genre, index) => (
                                                        <span key={index} className='bg-green-500 py-1 px-2 text-[0.8rem] rounded-3xl'>
                                                            {genre}
                                                        </span>
                                                    ))}
                                                </div>
                                                <p className='text-[0.8rem] max-h-[4.7rem] overflow-hidden'>{post.overview}</p>
                                            </div>
                                        </div>
                                        <div className='absolute bottom-2 w-full h-full px-2 text-white'>
                                            <div className='w-full h-full flex justify-center items-end gap-x-1 relative bottom-0 left-0'>
                                                <span className='w-1/2 rounded-full flex justify-center items-center bg-yellow-500 py-1 clickable'><Play fill="white" width={20} /></span>
                                                <Link to={`/movie/${post.id}`} className='w-1/2 rounded-full flex justify-center items-center bg-blue-500 py-1 clickable'><ExternalLink width={20} /></Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Thumbnail Image */}
                                <Link to={`/${post.name ? "tv" : "movie"}/${post.id}`} className='clickable'>
                                    <img
                                        className="embla__slide__img rounded-2xl group-hover:h-0 group-hover:w-0 w-full max-w-[180px] sm:max-w-[200px] max-h-[15rem] sm:max-h-[19rem] group-hover:sm:delay-700 transition-all duration-500 ease-in-out"
                                        src={post.poster_path}
                                        alt="Your alt text"
                                    />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="embla__buttons gap-x-2">
                    <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
                    <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
                </div>
            </div>
        </div>
    )
}

export default MediaSwiper

const usePrevNextButtons = (emblaApi) => {
    const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
    const [nextBtnDisabled, setNextBtnDisabled] = useState(true)

    const onPrevButtonClick = useCallback(() => {
        if (!emblaApi) return
        emblaApi.scrollPrev()
    }, [emblaApi])

    const onNextButtonClick = useCallback(() => {
        if (!emblaApi) return
        emblaApi.scrollNext()
    }, [emblaApi])

    const onSelect = useCallback((emblaApi) => {
        setPrevBtnDisabled(!emblaApi.canScrollPrev())
        setNextBtnDisabled(!emblaApi.canScrollNext())
    }, [])

    useEffect(() => {
        if (!emblaApi) return

        onSelect(emblaApi)
        emblaApi.on('reInit', onSelect)
        emblaApi.on('select', onSelect)
    }, [emblaApi, onSelect])

    return {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick
    }
}

export const PrevButton = (props) => {
    const { children, ...restProps } = props

    return (
        <button
            className="embla__button embla__button--prev clickable"
            type="button"
            {...restProps}
        >
            <svg fill="#ffffff" version="1.1" id="Layer_1"
                viewBox="0 0 330 330">
                <path id="XMLID_6_" d="M165,0C74.019,0,0,74.019,0,165s74.019,165,165,165s165-74.019,165-165S255.981,0,165,0z M205.606,234.394
	c5.858,5.857,5.858,15.355,0,21.213C202.678,258.535,198.839,260,195,260s-7.678-1.464-10.606-4.394l-80-79.998
	c-2.813-2.813-4.394-6.628-4.394-10.606c0-3.978,1.58-7.794,4.394-10.607l80-80.002c5.857-5.858,15.355-5.858,21.213,0
	c5.858,5.857,5.858,15.355,0,21.213l-69.393,69.396L205.606,234.394z"/>
            </svg>
            {children}
        </button>
    )
}

export const NextButton = (props) => {
    const { children, ...restProps } = props

    return (
        <button
            className="embla__button embla__button--next clickable"
            type="button"
            {...restProps}
        >
            <svg fill="#ffffff" version="1.1" id="Layer_1"
                viewBox="0 0 330 330">
                <path id="XMLID_2_" d="M165,0C74.019,0,0,74.019,0,165s74.019,165,165,165s165-74.019,165-165S255.981,0,165,0z M225.606,175.605
	l-80,80.002C142.678,258.535,138.839,260,135,260s-7.678-1.464-10.606-4.394c-5.858-5.857-5.858-15.355,0-21.213l69.393-69.396
	l-69.393-69.392c-5.858-5.857-5.858-15.355,0-21.213c5.857-5.858,15.355-5.858,21.213,0l80,79.998
	c2.814,2.813,4.394,6.628,4.394,10.606C230,168.976,228.42,172.792,225.606,175.605z"/>
            </svg>
            {children}
        </button>
    )
}

