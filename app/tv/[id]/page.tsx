import React from 'react'
import SingleTv from '@/components/TvShows/Tv/SingleTv'

const TvPage = ({ params }: { params: { id: string } }) => {
    return (
        <div className="w-full bg-[#151517] rounded-l-lg overflow-hidden">
            <SingleTv id={params.id} />
        </div>
    )
}

export default TvPage