import React from 'react'
import { Star, ClockIcon, Users } from "lucide-react";
import MediaDetailsTabs from './MediaDetailsTabs';
import './SingleMediaPage.css';

const SingleMediaPage = ({ mediaData, loading, type }) => {

  if (loading || !mediaData) return <SkeletonTheme className="overflow-scroll" baseColor="#202020" highlightColor="#444"><SingleMediaSkeleton /></SkeletonTheme>

  return (<>
    <div className='overflow-y-scroll w-full h-[100dvh]'>
      <div className="flex w-full h-[40dvh] sm:h-[100dvh] movie-backdrop sm:bg-fixed" style={{ backgroundImage: `URL(${mediaData?.backdrop_path})`, backgroundRepeat: `no-repeat`, backgroundPosition: `center`, backgroundSize: `cover` }}>
      </div>
      <div className='flex flex-col gap-y-5 lg:gap-y-14'>
        <div className='flex sm:flex-row flex-col items-start w-full h-fit relative gap-y-10 -mt-[30dvh] z-2'>
          <div className='w-full sm:w-1/2 lg:w-1/3 h-full flex justify-center'>
            <img className='min-w-[150px] w-[40%] sm:w-[60%] lg:w-[50%] poster-box-shadow' src={mediaData?.poster_path} alt="no image" />
          </div>
          <div className='w-full max-w-[800px] sm:w-1/2 lg:w-2/3 h-fit flex flex-col items-start justify-start text-white px-5'>
            <h1 className='text-[2rem] lg:text-[2.5rem] font-bold'>{mediaData?.name || mediaData?.title}</h1>
            <h2 className='text-[1.2rem] font-serif'>{mediaData?.tagline}</h2>
            <div className='flex flex-wrap items-center gap-3 mt-3'>
              {mediaData?.adult && <span className='bg-red-500 p-2 text-[1rem] sm:py-2 sm:px-3 rounded-3xl'>
                NSFW
              </span>}
              <span className='bg-yellow-500 p-2 text-[1rem] sm:py-2 sm:px-3 rounded-3xl whitespace-nowrap flex items-center'>
                <Star fill="white" color='white' width={16} />&nbsp;{parseFloat(mediaData?.vote_average).toFixed(1)}&nbsp;•&nbsp;<Users fill="white" color='white' width={16} />&nbsp;{mediaData?.vote_count}
              </span>
              <span className='bg-blue-500 p-2 text-[1rem] sm:py-2 sm:px-3 rounded-3xl whitespace-nowrap flex items-center'>
                {new Date(mediaData?.first_air_date || mediaData?.release_date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
              </span>
              {mediaData?.runtime && <span className='bg-blue-500 p-2 text-[1rem] sm:py-2 sm:px-3 rounded-3xl whitespace-nowrap flex items-center'>
                <ClockIcon color='white' width={16} />&nbsp;{mediaData?.runtime % 60 === 0 ? `${mediaData?.runtime}m` : `${Math.floor(mediaData?.runtime / 60)}h ${mediaData?.runtime % 60}m`}
              </span>}
              {mediaData?.number_of_seasons && <span className='bg-purple-500 p-2 text-[1rem] sm:py-2 sm:px-3 rounded-3xl whitespace-nowrap flex items-center'>
                {mediaData?.number_of_seasons} {mediaData?.number_of_seasons > 1 ? 'Seasons' : 'Season'}
              </span>}
              {mediaData?.genres.map((genre, index) => (
                <span key={index} className='bg-green-500 p-2 text-[1rem] sm:py-2 sm:px-3 rounded-3xl'>
                  {genre}
                </span>
              ))}
              <p className='text-lg hidden lg:block'>{mediaData?.overview}</p>
            </div>
          </div>
        </div>
        <p className='text-lg text-white px-3 sm:px-10 lg:hidden'>{mediaData?.overview}</p>
        <div className='flex justify-center'><MediaDetailsTabs mediaData={mediaData} type={type} /></div>
      </div>
    </div>
  </>
  )
}

export default SingleMediaPage



import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
const SingleMediaSkeleton = ({ className }) => {
  return <div className='overflow-y-scroll h-[100dvh] pb-10'>
    <Skeleton className='flex pointer-events-none sm:absolute z-0 top-0 left-0 w-[100vw] h-[40dvh] sm:h-[100dvh] opacity-50 sm:bg-fixed rounded-2xl' />
    <div className='flex flex-col gap-y-5 lg:gap-y-14'>
      <div className='flex sm:flex-row flex-col items-start w-full h-fit relative gap-y-10 -mt-[20dvh] sm:mt-[70dvh] z-2'>
        <div className='w-[100vw] sm:w-[50vw] lg:w-1/3 h-full flex justify-center'>
          <Skeleton className='block w-[200px] aspect-[2/3] rounded-2xl' />
        </div>
        <div className='max-w-[800px] w-[100vw] gap-y-5 sm:w-[50vw] lg:w-2/3 h-fit flex flex-col sm:items-start items-center justify-start text-white px-5'>
          <Skeleton className='w-[300px] lg:w-[500px] text-[3rem]' />
          <Skeleton className='w-[300px] lg:w-[550px] text-[2.5rem]' />
          <Skeleton className='w-[300px] lg:w-[575px] text-[2rem]' />
          <Skeleton className='w-[300px] lg:w-[600px] text-[8rem]' />
        </div>
      </div>
      <div className='flex justify-center'><Skeleton className='w-[90vw] h-[90dvh] text-[1.2rem] sm:text-[1.8rem] lg:text-[2.5rem] rounded-xl' /></div>
    </div>
  </div>
}