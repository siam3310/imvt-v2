import React from 'react'

import SingleMovie from '@/components/Movies/Movie/SingleMovie'

const MoviePage = ({ params }: { params: { id: string } }) => {
  return (
    <div className='w-full bg-[#151517] rounded-l-lg overflow-hidden'>
      <SingleMovie id={params.id} />
    </div>
  )
}

export default MoviePage
