import React from 'react'
import SingleAnime from '@/components/Anime/SingleAnime'

const AnimePage = ({ params }: { params: { id: number } }) => {
    return (
        <div className="w-full bg-[#151517] rounded-l-lg overflow-hidden">
            <SingleAnime id={params.id} />
        </div>
    )
}

export default AnimePage