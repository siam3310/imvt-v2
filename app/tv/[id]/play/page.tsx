"use client"
import React from 'react'
import SingleMediaPlayer from '@/components/Common/SingleMediaPlayer'
import { useSearchParams, usePathname } from 'next/navigation'

const TvPlayerPage = () => {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const id = pathname.split('/')[2]
    // const type = pathname.split('/')[1]
    const season = searchParams.get('s') || "1";
    const episode = searchParams.get('e') || "1";
    
    return (
        <div className="w-full bg-[#151517] rounded-l-lg overflow-hidden">
            <SingleMediaPlayer id={id} type={"tv"} querySeason={Number(season)} queryEpisode={Number(episode)} />
        </div>
    )
}

export default TvPlayerPage