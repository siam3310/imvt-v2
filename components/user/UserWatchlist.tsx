"use client"
import React, { useState, useEffect } from 'react'
import { useUserDataStore } from '@/store/userDataStore'
import useWatchlist from '@/hooks/useWatchlist'
import MediaGrid from '@/components/Common/MediaGrid'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const UserWatchlist = () => {
    const [watchListData, setWatchListData] = useState([])
    const { userData } = useUserDataStore()
    const { mediaList, loading } = useWatchlist(watchListData)

    useEffect(() => {
        if (userData) {
            setWatchListData(userData?.watchlist)
        }
    }, [userData])


    return (
        <div className='w-full h-full overflow-y-auto flex flex-col justify-start items-center space-y-6 pb-[120px] sm:pb-5'>
            <h1 className='text-[2rem] sm:text-[3rem] font-bold text-center py-20 w-full bg-red-500 whitespace-nowrap overflow-hidden text-ellipsis'>Your Watchlist</h1>
            <div className="w-full sm:px-10 shrink">
                {!loading && (!mediaList || (mediaList?.movie.length === 0 && mediaList?.tv.length === 0 && mediaList?.anime.length === 0)) ? <div className='flex items-center justify-center w-full h-[300px] text-xl'>No Media in your Watchlist</div> :
                    <Tabs defaultValue={"movie"} className="w-full">
                        <TabsList className='mx-1'>
                            {<TabsTrigger value="movie">Movies</TabsTrigger>}
                            {<TabsTrigger value="tv">TV</TabsTrigger>}
                            {<TabsTrigger value="anime">Anime</TabsTrigger>}
                        </TabsList>
                        <TabsContent value="movie">
                            {!loading && (!mediaList || mediaList?.movie.length === 0) ?
                                <div className='flex items-center justify-center w-full h-[300px] text-xl'>
                                    No Movie in your Watchlist
                                </div> :
                                <MediaGrid mediaData={{ results: mediaList?.movie }} type='movie' loading={loading} />
                            }
                        </TabsContent>
                        <TabsContent value="tv">
                            {!loading && (!mediaList || mediaList?.tv.length === 0) ?
                                <div className='flex items-center justify-center w-full h-[300px] text-xl'>
                                    No TV Show in your Watchlist
                                </div> :
                                <MediaGrid mediaData={{ results: mediaList?.tv }} type='tv' loading={loading} />
                            }
                        </TabsContent>
                        <TabsContent value="anime">
                            {!loading && (!mediaList || mediaList?.anime.length === 0) ?
                                <div className='flex items-center justify-center w-full h-[300px] text-xl'>
                                    No Anime in your Watchlist
                                </div> :
                                <MediaGrid mediaData={{ results: mediaList?.anime }} type='anime' loading={loading} />
                            }
                        </TabsContent>
                    </Tabs>}
            </div>
        </div>
    )
}

export default UserWatchlist