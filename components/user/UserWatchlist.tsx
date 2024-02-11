"use client"
import React from 'react'
import { useUserDataStore } from '@/store/userDataStore'
import useWatchlist from '@/hooks/useWatchlist'
import MediaGrid from '@/components/Common/MediaGrid'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const UserWatchlist = () => {
    const [watchListData, setWatchListData] = React.useState([])
    const { userData } = useUserDataStore()
    const { mediaList, loading } = useWatchlist(watchListData)
    console.log(loading)

    React.useEffect(() => {
        if (userData) {
            setWatchListData(userData.watchlist)
        }
    }, [userData])
    return (
        <div className='w-full h-full overflow-y-auto flex flex-col justify-start items-center space-y-6'>
            <h1 className='text-[2rem] sm:text-[3rem] font-bold text-center py-20 w-full bg-red-500 whitespace-nowrap overflow-hidden text-ellipsis'>Your Watchlist</h1>
            <div className="w-full sm:px-10 shrink">
                {!mediaList || (mediaList.movie.length === 0 && mediaList.tv.length === 0 && mediaList.anime.length === 0) ? <div className='flex items-center justify-center w-full h-[300px] text-xl'>No Media in your Watchlist</div> :
                    <Tabs defaultValue={mediaList.movie.length > 0 ? "movies" : mediaList.tv.length > 0 ? "tv" : "anime"} className="w-full">
                        <TabsList className='mx-1'>
                            {mediaList.movie && mediaList.movie.length > 0 && <TabsTrigger value="movies">Movies</TabsTrigger>}
                            {mediaList.tv && mediaList.tv.length > 0 && <TabsTrigger value="tv">TV</TabsTrigger>}
                            {mediaList.anime && mediaList.anime.length > 0 && <TabsTrigger value="anime">Anime</TabsTrigger>}
                        </TabsList>
                        <TabsContent value="movies"><MediaGrid mediaData={{ results: mediaList.movie }} type='movie' loading={loading} /></TabsContent>
                        <TabsContent value="tv"><MediaGrid mediaData={{ results: mediaList.tv }} type='tv' loading={loading} /></TabsContent>
                        <TabsContent value="anime"><MediaGrid mediaData={{ results: mediaList.anime }} type='anime' loading={loading} /></TabsContent>
                    </Tabs>}
            </div>
        </div>
    )
}

export default UserWatchlist