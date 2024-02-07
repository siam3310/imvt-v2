"use client"
import React from 'react'
import SingleAnimePlayer from '@/components/Anime/SingleAnimePlayer'
import { useSearchParams, usePathname } from 'next/navigation'

const AnimePlayerPage = () => {
    const pathname = usePathname()
    const id = pathname.split('/')[2]


    return (
        <div className="w-full bg-[#151517] rounded-l-lg overflow-hidden">
            <SingleAnimePlayer id={id}/>
        </div>
    )
}

export default AnimePlayerPage