"use client"
import React from 'react'
import { HomeIcon, Search, Clapperboard, Film, Tv, Compass } from "lucide-react"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthenticatedUser } from "@/hooks/useAuthenticatedUser";
import { ProfilePopover } from "@/components/user/ProfilePopover";
const BottomNav = () => {
    const { userData, loading } = useAuthenticatedUser()
    const pathname = usePathname();
    if (pathname === "/login" || pathname === "/signup") return <></>

    return (
        <div className="sm:hidden absolute bottom-0 z-50 w-full -translate-x-1/2 dark:bg-[#0b0b0b] border-t left-1/2 dark:border-gray-600">
            <div className="w-full">
                <div className="grid max-w-xs grid-cols-2 gap-1 p-1 mx-auto my-2 dark:bg-[rgb(62,67,75)] rounded-lg dark:border-gray-600" role="group">
                    <Link href="/search" className="flex justify-evenly items-center px-5 py-1.5 text-xs font-medium rounded-lg border dark:bg-black dark:border-gray-900 dark:text-white dark:hover:bg-gray-900">
                        <Search color='rgb(107 114 128 / 1)' />Search
                    </Link>
                    <Link href="/explore" className="flex justify-evenly items-center px-5 py-1.5 text-xs font-medium rounded-lg border dark:bg-black dark:border-gray-900 dark:text-white dark:hover:bg-gray-900">
                        <Compass color='rgb(107 114 128 / 1)' />Explore
                    </Link>
                </div>
            </div>

            <div className="grid h-full max-w-lg grid-cols-5 mx-auto">
                <Link href={`/`} data-tooltip-target="tooltip-home" type="button" className="inline-flex flex-col items-center justify-center p-4 hover:bg-gray-50 dark:hover:bg-gray-900 group">
                    <HomeIcon color='rgb(107 114 128 / 1)' />
                    <span className="text-sm text-[rgb(107,114,128,1)]">Home</span>
                </Link>

                <Link href="movies" data-tooltip-target="tooltip-bookmark" type="button" className="inline-flex flex-col items-center justify-center p-4 hover:bg-gray-50 dark:hover:bg-gray-900 group">
                    <Clapperboard color='rgb(107 114 128 / 1)' />
                    <span className="text-sm text-[rgb(107,114,128,1)]">Movies</span>
                </Link>

                <Link href="tv-shows" data-tooltip-target="tooltip-bookmark" type="button" className="inline-flex flex-col items-center justify-center p-4 hover:bg-gray-50 dark:hover:bg-gray-900 group">
                    <Film color='rgb(107 114 128 / 1)' />
                    <span className="text-sm text-[rgb(107,114,128,1)]">Series</span>
                </Link>

                <Link href="iptv" data-tooltip-target="tooltip-post" type="button" className="inline-flex flex-col items-center justify-center p-4 hover:bg-gray-50 dark:hover:bg-gray-900 group">
                    <Tv color='rgb(107 114 128 / 1)' />
                    <span className="text-sm text-[rgb(107,114,128,1)] whitespace-nowrap">Live TV</span>
                </Link>

                <ProfilePopover userData={userData}>
                    <button className="w-full h-full p-1 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-900">
                        <span className='flex flex-col items-center justify-center'>
                            <svg className='text-[rgb(107,114,128,1)]' xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><g fill="none"><path fill="currentColor" d="M4 18a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2" opacity="0.16" /><path stroke="currentColor" strokeLinejoin="round" strokeWidth="2" d="M4 18a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" /><circle cx="12" cy="7" r="3" stroke="currentColor" strokeWidth="2" /></g></svg>
                            <span className="text-sm text-[rgb(107,114,128,1)]">Profile</span>
                        </span>
                    </button>
                </ProfilePopover>
            </div>
        </div>
    )
}

export default BottomNav
