'use client'

import React, { useEffect, useState } from 'react'

const IPYTV = () => {
  const [iframeSize, setIframeSize] = useState({ width: 880, height: 365 })

  useEffect(() => {
    const updateIframeSize = () => {
      const width = window.innerWidth
      let newWidth = 880
      let newHeight = 502

      if (width <= 475) {
        newWidth = 475
        newHeight = 365
      } else if (width <= 550) {
        newWidth = 550
        newHeight = 365
      } else if (width <= 630) {
        newWidth = 630
        newHeight = 365
      } else if (width <= 880) {
        newWidth = 880
        newHeight = 502
      }

      setIframeSize({ width: newWidth, height: newHeight })
    }

    window.addEventListener('resize', updateIframeSize)
    updateIframeSize() // Initial call to set the size

    return () => window.removeEventListener('resize', updateIframeSize)
  }, [])

  return (
    <div className='w-full flex justify-center items-center bg-[#151517] rounded-l-lg overflow-hidden'>
      <iframe
        src={`https://tvweb360.tv/live_embed_player_${iframeSize.width}px_en`}
        width={iframeSize.width}
        height={iframeSize.height}
      ></iframe>
    </div>
  )
}

export default IPYTV
