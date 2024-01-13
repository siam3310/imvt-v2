import React from 'react'
import { MoreVertical, ChevronLast, ChevronFirst, HomeIcon, Flame, Search, Clapperboard, Film, PanelRightClose, PanelLeftClose, ArrowLeftFromLine, XCircle } from "lucide-react"
import { Link } from "react-router-dom";
const BottomNav = () => {
    return (
        <div className="sm:hidden absolute bottom-0 z-50 w-full -translate-x-1/2 bg-[#0b0b0b] border-t border-gray-700 left-1/2 dark:bg-gray-700 dark:border-gray-600">
            {/* <div className="w-full">
                <div className="grid max-w-xs grid-cols-3 gap-1 p-1 mx-auto my-2 bg-gray-100 rounded-lg dark:bg-gray-600" role="group">
                    <Link to="movies" type="button" className="px-5 py-1.5 text-xs font-medium text-gray-900 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700 rounded-lg">
                        Movies
                    </Link>
                    <Link to="trending" type="button" className="px-5 py-1.5 text-xs font-medium text-white bg-gray-900 dark:bg-gray-300 dark:text-gray-900 rounded-lg">
                        Trending
                    </Link>
                    <Link to="tv" type="button" className="px-5 py-1.5 text-xs font-medium text-gray-900 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700 rounded-lg">
                        TV Shows
                    </Link>
                </div>
            </div> */}
            <div className="grid h-full max-w-lg grid-cols-5 mx-auto">
                <Link to={`/`} data-tooltip-target="tooltip-home" type="button" className="inline-flex flex-col items-center justify-center p-4 hover:bg-gray-50 dark:hover:bg-gray-800 group">
                    <HomeIcon color='rgb(107 114 128 / 1)' />
                    <span className="sr-only">Home</span>
                </Link>
                <div id="tooltip-home" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                    Home
                    <div className="tooltip-arrow" data-popper-arrow></div>
                </div>

                <Link to="trending" data-tooltip-target="tooltip-post" type="button" className="inline-flex flex-col items-center justify-center p-4 hover:bg-gray-50 dark:hover:bg-gray-800 group">
                    <Flame color='rgb(107 114 128 / 1)' />
                    <span className="sr-only">Trending</span>
                </Link>
                <div id="tooltip-post" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                    Trending
                    <div className="tooltip-arrow" data-popper-arrow></div>
                </div>
                <Link to="search" data-tooltip-target="tooltip-search" type="button" className="inline-flex flex-col items-center justify-center p-4 hover:bg-gray-50 dark:hover:bg-gray-800 group">
                    <Search color='rgb(107 114 128 / 1)' />
                    <span className="sr-only">Search</span>
                </Link>
                <div id="tooltip-search" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                    Search
                    <div className="tooltip-arrow" data-popper-arrow></div>
                </div>
                <Link to="movies" data-tooltip-target="tooltip-bookmark" type="button" className="inline-flex flex-col items-center justify-center p-4 hover:bg-gray-50 dark:hover:bg-gray-800 group">
                    <Clapperboard color='rgb(107 114 128 / 1)' />
                    <span className="sr-only">Movies</span>
                </Link>
                <div id="tooltip-bookmark" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                    Movies
                    <div className="tooltip-arrow" data-popper-arrow></div>
                </div>
                <Link to="tv" data-tooltip-target="tooltip-bookmark" type="button" className="inline-flex flex-col items-center justify-center p-4 hover:bg-gray-50 dark:hover:bg-gray-800 group">
                    <Film color='rgb(107 114 128 / 1)' />
                    <span className="sr-only">TV Shows</span>
                </Link>
                <div id="tooltip-bookmark" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                    TV Shows
                    <div className="tooltip-arrow" data-popper-arrow></div>
                </div>
                {/* <button data-tooltip-target="tooltip-settings" type="button" className="inline-flex flex-col items-center justify-center p-4 hover:bg-gray-50 dark:hover:bg-gray-800 group">
                    <svg className="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 12.25V1m0 11.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M4 19v-2.25m6-13.5V1m0 2.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M10 19V7.75m6 4.5V1m0 11.25a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM16 19v-2" />
                    </svg>
                    <span className="sr-only">Settings</span>
                </button>
                <div id="tooltip-settings" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                    Settings
                    <div className="tooltip-arrow" data-popper-arrow></div>
                </div> */}
            </div>
        </div>
    )
}

export default BottomNav