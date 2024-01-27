"use client"
import React, { useState, useEffect, Key } from 'react'
import { Button } from '@/components/ui/button'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import MediaPlayer from '@/components/Common/MediaPlayer'
import { shimmerBlurDataUrl } from '@/utils/blurDataUrl'
import Image from 'next/image'

const SingleMediaPlayer = ({ id, type, querySeason, queryEpisode }: { id: string, type: string, querySeason: number, queryEpisode: number }) => {

    const [seasonNumber, setSeasonNumber] = useState<number>(querySeason | 1)
    const [streamingId, setStreamingId] = useState("")
    const [episodeNumber, setEpisodeNumber] = useState<number>(queryEpisode || 1)
    const [episodeId, setEpisodeId] = useState("")
    const [isMediaPlayer, setIsMediaPlayer] = useState(true)
    const [serverNumber, setServerNumber] = useState<number>(1)
    const [iframeSrc, setIframeSrc] = useState("")
    const [loading, setLoading] = useState<boolean>(false)
    const [mediaData, setmediaData] = useState<{ release_date: string, description: string, image: string, cover: string, id: string, totalSeason: number, totalEpisode: number, seasons: any[] }>({ image: "", release_date: "", description: "", cover: "", id: "", totalSeason: 0, totalEpisode: 0, seasons: [] })
    const [streamingData, setstreamingData] = useState<{ sources: { url: string, quality: string }[], subtitles: { url: string, lang: string }[] }[]>(() => [{ sources: [{ url: "", quality: "" }], subtitles: [{ url: "", lang: "" }] }])
    const IframeButtonDetails = [
        { name: "BlackVid", url: `https://blackvid.space/embed?tmdb=${id}&season=${seasonNumber}&episode=${episodeNumber}` },
        { name: "SuperEmbed", url: `https://multiembed.mov/directstream.php?video_id=${id}&tmdb=1&s=${seasonNumber}&e=${episodeNumber}` },
        { name: "2Embed", url: `https://www.2embed.cc/embed/${id}&s=${seasonNumber}&e=${episodeNumber}` },
        { name: "VidSrc", url: `https://vidsrc.xyz/embed/${type}/${id}&season=${seasonNumber}&episode=${episodeNumber}` },
        { name: "tvembed", url: `https://tvembed.cc/${type}/${id}/${seasonNumber}/${episodeNumber}` },
        { name: "Player S", url: ` https://embed.smashystream.com/playere.php?dplayer=S&tmdb=${id}&season=${seasonNumber}&episode=${episodeNumber}` },
        { name: "Player F", url: ` https://embed.smashystream.com/playere.php?dplayer=F&tmdb=${id}&season=${seasonNumber}&episode=${episodeNumber}` },
        { name: "Hindi Player", url: ` https://embed.smashystream.com/playere.php?dplayer=D&tmdb=${id}&season=${seasonNumber}&episode=${episodeNumber}` },
    ]

    useEffect(() => {
        const getMediaData = async () => {
            setLoading(true)
            const res = await fetch(`${process.env.NEXT_PUBLIC_CONSUMET_API_URL}/meta/tmdb/info/${id}?type=${type}`)
            const data = await res.json()
            setmediaData(data)
            setStreamingId(data.id)
            if (episodeId === "" && type === "tv") {
                setEpisodeId(data.seasons[0]?.episodes[0]?.id)
            }
            // setLoading(false)
        }
        getMediaData()
    }, [id, type, querySeason, queryEpisode])

    useEffect(() => {
        if (type === "movie") {
            const array = streamingId?.split("-");
            setEpisodeId(array.length > 1 ? array[array.length - 1] : "");
        }
        else {
            setEpisodeId(mediaData?.seasons[seasonNumber - 1]?.episodes[episodeNumber - 1]?.id)
        }
    }, [streamingId, seasonNumber, episodeNumber, mediaData, type])

    useEffect(() => {
        const getStreamingData = async () => {
            setLoading(true);
            setstreamingData([{ sources: [{ url: "", quality: "" }], subtitles: [{ url: "", lang: "" }] }]);

            const servers = ['', 'vidcloud', 'mixdrop', 'upcloud'];
            const requests = servers.map((server, index) => {
                const url = index === 0
                    ? `${process.env.NEXT_PUBLIC_CONSUMET_API_URL}/meta/tmdb/watch/${episodeId}?id=${streamingId}`
                    : `${process.env.NEXT_PUBLIC_CONSUMET_API_URL}/movies/flixhq/watch?server=${server}&episodeId=${episodeId}&mediaId=${streamingId}`;
                return fetch(url).then(res => res.json());
            });

            const data = await Promise.all(requests);
            setstreamingData(data);
            if (streamingId !== "" && episodeId !== "") {
                setLoading(false);
            }

        };

        getStreamingData();
    }, [mediaData, streamingId, type, episodeId]);


    return (
        <div className='dark:bg-black'>
            <ResizablePanelGroup
                direction="horizontal"
                className="rounded-lg border"
            >

                {/* md Screen Seasons and Episodes */}
                {type !== "movie" &&
                    <>
                        <ResizableHandle />
                        <ResizablePanel className='h-[100dvh] md:block hidden max-w-[30%] min-w-0' defaultSize={20}>
                            <div className="flex h-full items-center justify-center p-6">
                                <>
                                    <ResizablePanel defaultSize={20} className='max-w-[500px] h-full'>
                                        <ResizablePanelGroup direction="vertical">
                                            <ResizablePanel defaultSize={30} className='max-h-fit'>
                                                <h1 className="text-xl h-10 px-3 py-2 font-bold whitespace-nowrap overflow-hidden text-ellipsis">Seasons</h1>
                                                <ScrollArea className="h-full w-full rounded-md border p-4 pb-[50px]">
                                                    {mediaData?.seasons && <div className="flex flex-col gap-3">
                                                        {mediaData.seasons.map((season: {
                                                            image: any; season: string;
                                                            episodes: any[]
                                                        }, index: React.Key | number) => (
                                                            <>
                                                                <div className='flex gap-x-3 justify-center items-start min-w-[200px] shrink-0'>

                                                                    <Image className='w-[25%]'
                                                                        src={season.image.mobile}
                                                                        alt={`${seasonNumber} poster`}
                                                                        width={100}
                                                                        height={150}
                                                                        loading={index as number < 10 ? "eager" : "lazy"}
                                                                        placeholder={`data:image/${shimmerBlurDataUrl(100, 150)}`} />
                                                                    <div className='flex flex-col justify-start items-start w-[75%] h-full px-5'>
                                                                        <h3 className='text-xl font-bold'>
                                                                            Season {season.season}
                                                                        </h3>
                                                                        <h4>
                                                                            {season.episodes?.length} Episodes
                                                                        </h4>
                                                                    </div>
                                                                </div>
                                                                <Button key={index} variant={seasonNumber === (index as number) + 1 ? "default" : "secondary"} onClick={() => { setSeasonNumber((index as number) + 1); setEpisodeNumber(1) }} className="w-full whitespace-nowrap overflow-hidden text-ellipsis">Play</Button>
                                                            </>))}
                                                    </div>}
                                                    <ScrollBar orientation="horizontal" />
                                                </ScrollArea>
                                            </ResizablePanel>
                                            <ResizableHandle withHandle />
                                            <ResizablePanel defaultSize={70} className=''>
                                                <h1 className="text-xl h-10 px-3 py-2 font-bold whitespace-nowrap overflow-hidden text-ellipsis">Episodes</h1>
                                                <ScrollArea className="h-full w-full rounded-md border p-4 pb-12">
                                                    {mediaData?.seasons && <div className="flex flex-col gap-3">
                                                        <div className="flex flex-col gap-3">
                                                            {mediaData.seasons[seasonNumber - 1]?.episodes?.map((episode: { id: string; title: any; episode: string }, index: number | null | undefined) => (
                                                                <Button key={index} variant={episodeNumber === (index as number) + 1 ? "default" : "secondary"} onClick={() => { setEpisodeNumber((index as number) + 1); setEpisodeId(episode.id) }} title={episode.title || `Episode ${episode.episode}`} className="w-full whitespace-nowrap overflow-hidden text-ellipsis">{episode.title || `Episode ${episode.episode}`}</Button>
                                                            ))}
                                                        </div>
                                                    </div>}
                                                    <ScrollBar orientation="horizontal" />
                                                </ScrollArea>
                                            </ResizablePanel>
                                        </ResizablePanelGroup>
                                    </ResizablePanel>
                                </>
                            </div>
                        </ResizablePanel>
                        <ResizableHandle />
                    </>}

                {/* Main media Player and servers with <md screen Seasons + Episodes and <xl screen Media Details */}
                <ResizablePanel className='h-[100dvh] w-full min-w-0 sm:p-0 pb-32' defaultSize={60}>
                    <div className="w-full h-full">

                        <ScrollArea className='w-full h-full'>
                            {!isMediaPlayer && <iframe className="w-full aspect-[1.85/1]" src={`${iframeSrc}`} allowFullScreen></iframe>}
                            {isMediaPlayer && streamingData[serverNumber - 1]?.sources?.length > 0 && <MediaPlayer
                                media={{
                                    urls: streamingData[serverNumber - 1].sources,
                                    subtitles: streamingData[serverNumber - 1].subtitles,
                                    thumbnail: mediaData?.cover,
                                }}
                                key={serverNumber + episodeNumber + seasonNumber}
                                className='w-full min-h-[200px] sm:min-h-[350px] max-h-[100dvh] aspect-[4/3] sm:aspect-[1.85/1]'
                            />}
                            {isMediaPlayer && !loading && (streamingData[serverNumber - 1]?.sources?.length === 0 || !streamingData[serverNumber - 1].sources || !streamingData) && <MediaPlayer
                                media={{
                                    urls: [{ url: "https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_fmp4/master.m3u8", quality: "1080p" }],
                                    subtitles: [],
                                    thumbnail: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/04174dbc-fe2f-4983-824a-6d80412e917e/de1s9he-1e5476f3-0ea2-49d0-a7fc-f6a182624850.png/v1/fill/w_960,h_540,q_80,strp/404_not_found__08th_phonak_movie_night_style__by_xxneojadenxx_de1s9he-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NTQwIiwicGF0aCI6IlwvZlwvMDQxNzRkYmMtZmUyZi00OTgzLTgyNGEtNmQ4MDQxMmU5MTdlXC9kZTFzOWhlLTFlNTQ3NmYzLTBlYTItNDlkMC1hN2ZjLWY2YTE4MjYyNDg1MC5wbmciLCJ3aWR0aCI6Ijw9OTYwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.UXpWTdFPNrYsKY5zOeIT2Hgv_GzyqXYkxWg0VgrlmrQ",
                                }}
                                className='w-full min-h-[200px] sm:min-h-[350px] max-h-[100dvh] aspect-[4/3] sm:aspect-[1.85/1]'
                            />}

                            {loading && <div className='w-[99%] min-h-[200px] sm:min-h-[350px] max-h-[100dvh] aspect-[4/3] sm:aspect-[1.85/1] flex items-center justify-center'>Loading...</div>}


                            <div className="flex flex-col gap-5 items-start justify-center p-10 pt-10">
                                <div className='flex sm:flex-row flex-col items-start justify-center gap-3'>
                                    <span className='shrink-0 py-1'>
                                        Internal Servers&nbsp;
                                    </span>
                                    <div className='flex flex-wrap items-center justify-start gap-3'>
                                        <Button onClick={(e) => { setServerNumber(1); setIsMediaPlayer(true) }} variant={isMediaPlayer && serverNumber === 1 ? "default" : "secondary"} className="w-28">Server 1</Button>
                                        <Button onClick={(e) => { setServerNumber(2); setIsMediaPlayer(true) }} variant={isMediaPlayer && serverNumber === 2 ? "default" : "secondary"} className="w-28">Server 2</Button>
                                        <Button onClick={(e) => { setServerNumber(3); setIsMediaPlayer(true) }} variant={isMediaPlayer && serverNumber === 3 ? "default" : "secondary"} className="w-28">Server 3</Button>
                                        <Button onClick={(e) => { setServerNumber(4); setIsMediaPlayer(true) }} variant={isMediaPlayer && serverNumber === 4 ? "default" : "secondary"} className="w-28">Server 4</Button>
                                    </div>
                                </div>
                                <div className='flex sm:flex-row flex-col items-start justify-start gap-x-3'>
                                    <span className='shrink-0 py-1'>
                                        External Iframes
                                    </span>
                                    <div className='flex flex-wrap items-center justify-start gap-3'>
                                        {IframeButtonDetails.map((button, index) => {
                                            return <Button variant={(!isMediaPlayer && iframeSrc === button.url.toString()) ? "default" : "secondary"} id={`video-btn-${index + 2}`} key={index} title={button.name} onClick={() => { setIframeSrc(button.url.toString()); setIsMediaPlayer(false) }} className="w-28">{button.name}</Button>
                                        })}
                                    </div>
                                </div>
                            </div>


                            <div className=' md:hidden'>
                                {type !== "movie" && <ResizablePanelGroup direction="vertical" className='min-h-[70dvh] min-w-0'>
                                    <ResizablePanel defaultSize={45} className='max-h-fit min-w-0'>
                                        <h1 className="text-xl h-10 px-3 py-2 font-bold whitespace-nowrap overflow-hidden text-ellipsis">Seasons</h1>
                                        <ScrollArea className="h-full w-full rounded-md border p-4">
                                            {mediaData?.seasons && <div className="flex flex-col gap-3 pb-10">
                                                {mediaData.seasons.map((season: {
                                                    image: any; season: string | null | undefined;
                                                    episodes: any[]
                                                }, index: React.Key | number | undefined) => (
                                                    <>
                                                        <div className='flex justify-center items-start min-w-[200px] shrink-0'>
                                                            <Image className='w-[25%]' src={season.image.mobile} alt={`${seasonNumber} poster`}
                                                                width={200}
                                                                height={200}
                                                                loading={index as number < 10 ? "eager" : "lazy"}
                                                                placeholder={`data:image/${shimmerBlurDataUrl(100, 150)}`} />
                                                            <div className='flex flex-col justify-start items-start w-[75%] h-full px-5'>
                                                                <h3 className='text-xl font-bold'>
                                                                    Season {season.season}
                                                                </h3>
                                                                <h4>
                                                                    {season.episodes?.length} Episodes
                                                                </h4>
                                                            </div>
                                                        </div>
                                                        <Button key={index} variant={seasonNumber === (index as number) + 1 ? "default" : "secondary"} onClick={() => { setSeasonNumber((index as number) + 1); setEpisodeNumber(1) }} className="w-full whitespace-nowrap overflow-hidden text-ellipsis">Play</Button>
                                                    </>))}
                                            </div>}
                                            <ScrollBar orientation="horizontal" />
                                        </ScrollArea>
                                    </ResizablePanel>
                                    <ResizableHandle withHandle />
                                    <ResizablePanel defaultSize={55} className='min-w-0'>
                                        <h1 className="text-xl h-10 px-3 py-2 font-bold whitespace-nowrap overflow-hidden text-ellipsis">Episodes</h1>
                                        <ScrollArea className="h-full max-w-[100vw] w-full rounded-md border p-4 pb-12">
                                            {mediaData?.seasons && <div className="w-full flex flex-col">
                                                <div className="w-full flex flex-col gap-y-3">
                                                    {mediaData.seasons[seasonNumber - 1]?.episodes?.map((episode: { id: string; title: any; episode: string }, index: number | null | undefined) => (
                                                        <Button key={index} variant={episodeNumber === (index as number) + 1 ? "default" : "secondary"} onClick={() => { setEpisodeNumber((index as number) + 1); setEpisodeId(episode.id) }} title={episode.title || `Episode ${episode.episode}`} className="w-full justify-start text-start whitespace-nowrap overflow-hidden text-ellipsis">{episode.title || `Episode ${episode.episode}`}</Button>
                                                    ))}
                                                </div>
                                            </div>}
                                            <ScrollBar orientation="horizontal" />
                                        </ScrollArea>
                                    </ResizablePanel>
                                </ResizablePanelGroup>
                                }
                            </div>

                            <ScrollArea className="flex w-full h-full xl:hidden items-center justify-center p-0">
                                <Card className="w-full h-full">
                                    <CardHeader className='flex flex-col gap-y-4'>
                                        <CardTitle>Currently Playing</CardTitle>
                                        {type !== "movie" && <> <CardDescription>Season {mediaData.seasons[seasonNumber - 1]?.episodes[episodeNumber - 1]?.season} | Episode {mediaData.seasons[seasonNumber - 1]?.episodes[episodeNumber - 1]?.episode}
                                        </CardDescription>
                                        </>
                                        }
                                        <div className="w-full">
                                            <Image className='w-full sm:w-[50%] max-h-[50dvh] object-contain object-left' src={type !== "movie" ? mediaData?.seasons[seasonNumber - 1]?.episodes[episodeNumber - 1]?.img.hd : mediaData.image}
                                                alt={`current media poster`}
                                                width={300}
                                                height={300}
                                                placeholder={`data:image/${shimmerBlurDataUrl(50, 75)}`} />
                                        </div>
                                        {type !== "movie" && <CardTitle>{mediaData.seasons[seasonNumber - 1]?.episodes[episodeNumber - 1]?.title}</CardTitle>}
                                        <CardDescription>
                                            {type !== "movie" ? mediaData?.seasons[seasonNumber - 1]?.episodes[episodeNumber - 1]?.description : mediaData.description}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardFooter>
                                        {type !== "movie" ? mediaData.seasons[seasonNumber - 1]?.episodes[episodeNumber - 1]?.release_date : mediaData.release_date}
                                    </CardFooter>
                                </Card>
                            </ScrollArea>
                        </ScrollArea>
                    </div>

                </ResizablePanel>

                {/* xl Screen Media Details */}
                <ResizableHandle className='xl:block hidden' />
                <ResizablePanel className='h-[100dvh] xl:block hidden max-w-[20vw] min-w-0 overflow-hidden' defaultSize={20}>
                    <ScrollArea className="flex w-full h-full items-center justify-center p-0 min-w-[300px] shrink-0">
                        <Card className="w-full h-full">
                            <CardHeader className='flex flex-col gap-y-4'>
                                <CardTitle>Currently Playing</CardTitle>
                                {type !== "movie" && <CardDescription>Season {mediaData.seasons[seasonNumber - 1]?.episodes[episodeNumber - 1]?.season} | Episode {mediaData.seasons[seasonNumber - 1]?.episodes[episodeNumber - 1]?.episode}</CardDescription>}
                                <div>
                                    <Image className='w-full max-h-[50dvh] object-contain object-left' src={type !== "movie" ? mediaData?.seasons[seasonNumber - 1]?.episodes[episodeNumber - 1]?.img.hd : mediaData.image}
                                        alt={`current media poster`}
                                        width={300}
                                        height={300}
                                        placeholder={`data:image/${shimmerBlurDataUrl(50, 75)}`} />
                                </div>
                                {type !== "movie" && <CardTitle>{mediaData.seasons[seasonNumber - 1]?.episodes[episodeNumber - 1]?.title}</CardTitle>}
                                <CardDescription>
                                    {type !== "movie" ? mediaData?.seasons[seasonNumber - 1]?.episodes[episodeNumber - 1]?.description : mediaData.description}
                                </CardDescription>
                            </CardHeader>
                            <CardFooter>
                                {type !== "movie" ? mediaData.seasons[seasonNumber - 1]?.episodes[episodeNumber - 1]?.release_date : mediaData.release_date}
                            </CardFooter>
                        </Card>
                    </ScrollArea>
                </ResizablePanel>


            </ResizablePanelGroup>
        </div>
    )
}

export default SingleMediaPlayer