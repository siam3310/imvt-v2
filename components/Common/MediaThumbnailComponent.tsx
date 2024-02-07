import React, { Key } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { PlayCircle, ExternalLink } from 'lucide-react'
import { blurDataUrl, shimmerBlurDataUrl } from '@/utils/blurDataUrl';

const MediaThumbnailComponent = ({ children, link, title, poster, index, width, height, release_date = "", type }: { children: React.ReactNode, link: string, title: string, poster: string, index: Key | null | undefined, width: number, height: number, release_date?: string, type: string }) => {

    let isUpcoming = false;

    if (type !== "people" && new Date(release_date) >= new Date()) {
        isUpcoming = true;
    }

    return (
        <div className="group clickable">
            <Link href={link} className="hidden clickable group-hover:flex absolute w-full aspect-[2/3] group-hover:z-[3] justify-center items-center pr-5">
                {/* <Link href={link} className="hidden clickable group-hover:flex absolute w-full h-full justify-center items-center pr-5"> */}
                {type === "people" ?
                    <span className="z-[3] clickable"><ExternalLink size={48} color="#ffffff" strokeWidth={3} absoluteStrokeWidth /></span>
                    : <span className="z-[3] clickable"><PlayCircle size={48} color="#ffffff" strokeWidth={3} absoluteStrokeWidth /></span>}
            </Link>
            {!isUpcoming ? children : <span className='bg-yellow-500 text-white absolute top-3 left-3 z-[3] py-[2px] px-2 text-[0.8rem] rounded-3xl whitespace-nowrap flex items-center'>
                {new Date(release_date).toLocaleDateString("en-US", { day: 'numeric', month: 'short', year: 'numeric' })}
            </span>}
            <div className='w-full h-full'>
                <div className="aspect-[2/3]">
                    <Image
                        className="rounded-t-md flex justify-center items-center group-hover:cursor-pointer group-hover:blur group-hover:scale-90 transition-all duration-300 ease-in-out object-cover w-full h-full"
                        src={poster === "https://image.tmdb.org/t/p/originalnull" ? blurDataUrl : poster}
                        alt={`${title} ${type === "people" ? "profile" : "poster"}`}
                        width={width}
                        height={height}
                        loading={index as number < 10 ? "eager" : "lazy"}
                        placeholder={`data:image/${shimmerBlurDataUrl(width, height)}`}
                    />
                </div>
                <h2 className="text-gray-900 bg-white rounded-b-md border border-t-2 border-black px-3 text-center whitespace-nowrap overflow-hidden text-ellipsis font-semibold" title={title}>{title}</h2>
            </div>
        </div>
    )
}

export default MediaThumbnailComponent