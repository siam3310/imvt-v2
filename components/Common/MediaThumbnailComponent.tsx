import React, { Key, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { blurDataUrl, shimmerBlurDataUrl } from '@/utils/blurDataUrl';
import { ExternalLink, Info, PlayCircle, PlusCircle } from 'lucide-react';

import usehandleWatchlist from '@/hooks/usehandleWatchlist';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

const MediaThumbnailComponent = ({
  children,
  link,
  id,
  title,
  poster,
  index,
  width,
  height,
  release_date = '',
  type,
  title2 = null,
}: {
  children: React.ReactNode;
  id: string;
  link: string;
  title: string;
  poster: string;
  index: Key | null | undefined;
  width: number;
  height: number;
  release_date?: string;
  type: string;
  title2?: any;
}) => {
  let isUpcoming = false;

  if (type !== 'people' && new Date(release_date) >= new Date()) {
    isUpcoming = true;
  }
  const { watchlistType, setWatchlistType } = usehandleWatchlist(id, type);

  const watchListNames = {
    completed: 'Completed',
    watching: 'Watching',
    plan_to_watch: 'Plan to Watch',
    on_hold: 'On Hold',
    dropped: 'Dropped',
    remove: '',
  };

  return (
    <div className='group clickable'>
      <div className='hidden clickable group-hover:flex absolute w-full aspect-[2/3] group-hover:z-[3] justify-center items-center pr-5'>
        {/* <Link href={link} className="hidden clickable group-hover:flex absolute w-full h-full justify-center items-center pr-5"> */}
        {type === 'people' ? (
          <span className='z-[3] clickable'>
            <Link href={link}>
              <ExternalLink
                size={48}
                color='#ffffff'
                strokeWidth={3}
                absoluteStrokeWidth
              />
            </Link>
          </span>
        ) : (
          <span className='z-[3] clickable flex flex-wrap justify-center items-center gap-2'>
            <Link
              className='text-white hover:text-yellow-300'
              title='play now'
              href={link + '/play'}
            >
              <PlayCircle size={48} strokeWidth={4} absoluteStrokeWidth />
            </Link>
            <Link
              className='text-white hover:text-blue-600'
              title='More Info'
              href={link}
            >
              <Info size={48} strokeWidth={4} absoluteStrokeWidth />
            </Link>
          </span>
        )}
      </div>
      {!isUpcoming ? (
        children
      ) : (
        <span className='bg-yellow-500 text-white absolute top-3 left-3 z-[3] py-[2px] px-2 text-[0.8rem] rounded-3xl whitespace-nowrap flex items-center'>
          {new Date(release_date).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })}
        </span>
      )}
      {/* <Button variant={"link"} className='w-full absolute bottom-8 left-0 z-[10] flex items-start justify-end p-2'>
                {type !== "people" && <Popover>
                    <PopoverTrigger asChild>
                        <span className='p-1 border-black border bg-white text-black w-fit rounded-tl-xl text-[0.8rem] whitespace-nowrap '>{watchlistType ? watchListNames[watchlistType] : <><PlusCircle size={20} strokeWidth={2} absoluteStrokeWidth /></>}</span>
                    </PopoverTrigger>
                    <PopoverContent className="flex flex-col w-full h-full gap-1 p-2 z-[11111111111111]">
                        <Button onClick={() => { setWatchlistType("completed"); }} variant={watchlistType === "completed" ? "default" : "outline"}>Completed</Button>
                        <Button onClick={() => { setWatchlistType("watching"); }} variant={watchlistType === "watching" ? "default" : "outline"}>Watching</Button>
                        <Button onClick={() => { setWatchlistType("plan_to_watch"); }} variant={watchlistType === "plan_to_watch" ? "default" : "outline"}>Plan to Watch</Button>
                        <Button onClick={() => { setWatchlistType("on_hold"); }} variant={watchlistType === "on_hold" ? "default" : "outline"}>On Hold</Button>
                        <Button onClick={() => { setWatchlistType("dropped"); }} variant={watchlistType === "dropped" ? "default" : "outline"}>Dropped</Button>
                        {watchlistType && <Button onClick={() => { setWatchlistType(""); }} variant={'destructive'}>Remove from Watchlist</Button>}
                    </PopoverContent>
                </Popover>}
            </Button> */}

      <div className='w-full h-full'>
        <div className='aspect-[2/3]'>
          <Image
            className='rounded-t-md flex justify-center items-center group-hover:cursor-pointer group-hover:blur group-hover:scale-90 transition-all duration-300 ease-in-out object-cover w-full h-full'
            src={
              poster === 'https://image.tmdb.org/t/p/originalnull'
                ? blurDataUrl
                : poster
            }
            alt={`${title} ${type === 'people' ? 'profile' : 'poster'}`}
            width={width}
            height={height}
            loading={(index as number) < 10 ? 'eager' : 'lazy'}
            placeholder={`data:image/${shimmerBlurDataUrl(width, height)}`}
          />
        </div>
        <Link href={link}>
          <h2
            className='cursor-pointer text-gray-900 bg-white rounded-b-md border border-t-2 border-black px-3 text-center whitespace-nowrap overflow-hidden text-ellipsis font-semibold'
            title={title}
          >
            {title}
          </h2>
        </Link>
        {title2 && (
          <h2
            className='text-gray-900 bg-white rounded-b-md border border-t-2 border-black px-3 text-center whitespace-nowrap overflow-hidden text-ellipsis font-semibold'
            title={title2}
          >
            {title2}
          </h2>
        )}
      </div>
    </div>
  );
};

export default MediaThumbnailComponent;
