import React from 'react'
import Image from 'next/image'
import Logo from '@/public/assets/logo.svg'

const Footer = () => {
  return (
    <div className='max-h-[300px] w-full flex items-center justify-between px-3 sm:px-30 z-[1111111]'>
      <div className='flex flex-col justify-start items-start'>
        <Image src={Logo} alt='logo' width={100} height={100} />
      </div>
      <div className='flex flex-col justify-end items-end'></div>
    </div>
  )
}

export default Footer
