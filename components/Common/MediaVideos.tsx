import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
    Card,
    CardFooter,
} from "@/components/ui/card"
import MediaPlayer from "./MediaPlayer"
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"

const MediaVideos = ({ mediaData, type }: { mediaData: any, type: string }) => {
    const [episodeId, setEpisodeId] = useState(null)
    const [seasonNumber, setSeasonNumber] = useState(1)
    const [episodeNumber, setEpisodeNumber] = useState(1)
    const [streamingData, setStreamingData] = useState({ sources: [], subtitles: [] })
    const [isYoutubeEmbed, setIsYoutubeEmbed] = useState(false)
    const [iframeSrc, setIframeSrc] = useState("")
    const [isMediaPlayer, setIsMediaPlayer] = useState(true)
    const [youtubeKey, setYoutubeKey] = useState(null)
    const IframeButtonDetails = [
        { name: "BlackVid", url: `https://blackvid.space/embed?tmdb=${mediaData?.id}&season=${seasonNumber}&episode=${episodeNumber}` },
        { name: "SuperEmbed", url: `https://multiembed.mov/directstream.php?video_id=${mediaData?.id}&tmdb=1&s=${seasonNumber}&e=${episodeNumber}` },
        { name: "2Embed", url: `https://www.2embed.cc/embed/${mediaData?.id}&s=${seasonNumber}&e=${episodeNumber}` },
        { name: "VidSrc", url: `https://vidsrc.xyz/embed/${type}/${mediaData?.id}&season=${seasonNumber}&episode=${episodeNumber}` },
        { name: "tvembed", url: `https://tvembed.cc/${type}/${mediaData?.id}/${seasonNumber}/${episodeNumber}` },
        { name: "Player S", url: ` https://embed.smashystream.com/playere.php?dplayer=S&tmdb=${mediaData?.id}&season=${seasonNumber}&episode=${episodeNumber}` },
        { name: "Player F", url: ` https://embed.smashystream.com/playere.php?dplayer=F&tmdb=${mediaData?.id}&season=${seasonNumber}&episode=${episodeNumber}` },
        { name: "Hindi Player", url: ` https://embed.smashystream.com/playere.php?dplayer=D&tmdb=${mediaData?.id}&season=${seasonNumber}&episode=${episodeNumber}` },
    ]
    useEffect(() => {
        if (type === "movie") {
            const array = mediaData?.streamingId?.split("-");
            setEpisodeId(array.length > 1 ? array[array.length - 1] : null);
        }
        else {
            setEpisodeId(mediaData?.seasons[seasonNumber - 1]?.episodes[episodeNumber - 1]?.id)
        }
    }, [seasonNumber, episodeNumber, mediaData, type])

    useEffect(() => {
        const getStreamingData = async () => {
            if (mediaData?.streamingId && episodeId) {
                const data = (await axios.get(`https://imvt-server.vercel.app/api/movies/flixhq/watch?episodeId=${episodeId}&mediaId=${mediaData?.streamingId}`)).data;
                setStreamingData(data);
            }
        };

        getStreamingData();
    }, [mediaData, episodeId]);

    return (
        <Card key={episodeId} className="h-fit flex lg:flex-row-reverse flex-col gap-3 lg:max-h-fit">
            {/* Movie Player */}
            {type === "movie" && <>
                {!isMediaPlayer && <iframe className="w-full aspect-[1.85/1]" src={`${isYoutubeEmbed ? `https://www.youtube.com/embed/${youtubeKey}` : iframeSrc}`} allowFullScreen></iframe>}
                {isMediaPlayer && streamingData?.sources && <MediaPlayer
                    media={{
                        urls: streamingData?.sources,
                        subtitles: streamingData?.subtitles,
                        thumbnail: mediaData?.backdrop_path,
                    }}
                    className='w-[99%] min-h-[350px] aspect-[1.85/1]'
                />}
                {isMediaPlayer && streamingData && !streamingData.sources && <MediaPlayer
                    media={{
                        urls: [{ quality: "HD", url: "https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_fmp4/master.m3u8" }],
                        subtitles: [],
                        thumbnail: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/04174dbc-fe2f-4983-824a-6d80412e917e/de1s9he-1e5476f3-0ea2-49d0-a7fc-f6a182624850.png/v1/fill/w_960,h_540,q_80,strp/404_not_found__08th_phonak_movie_night_style__by_xxneojadenxx_de1s9he-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NTQwIiwicGF0aCI6IlwvZlwvMDQxNzRkYmMtZmUyZi00OTgzLTgyNGEtNmQ4MDQxMmU5MTdlXC9kZTFzOWhlLTFlNTQ3NmYzLTBlYTItNDlkMC1hN2ZjLWY2YTE4MjYyNDg1MC5wbmciLCJ3aWR0aCI6Ijw9OTYwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.UXpWTdFPNrYsKY5zOeIT2Hgv_GzyqXYkxWg0VgrlmrQ",
                    }}
                    className='w-full min-h-[350px]  aspect-[1.85/1]'
                />}
                {isMediaPlayer && !streamingData && <div className='w-[99%] min-h-[350px] aspect-[1.85/1] flex items-center justify-center'>Loading...</div>}
            </>}

            {/* Tv Player */}
            {type === "tv" && <div className=' w-full'>
                <ResizablePanelGroup
                    direction="horizontal"
                    className=" rounded-lg border w-full"
                >
                    <ResizablePanel defaultSize={70} className='flex justify-center items-center w-full h-full min-w-[300px]'>
                        {!isMediaPlayer && <iframe className="w-full aspect-[1.85/1]" src={`${isYoutubeEmbed ? `https://www.youtube.com/embed/${youtubeKey}` : iframeSrc}`} allowFullScreen></iframe>}
                        {isMediaPlayer && streamingData && streamingData.sources && <MediaPlayer
                            media={{
                                urls: streamingData.sources,
                                subtitles: streamingData.subtitles,
                                thumbnail: mediaData?.backdrop_path,
                            }}
                            className='w-[99%] min-h-[350px] aspect-[1.85/1]'
                        />}
                        {isMediaPlayer && streamingData && !streamingData.sources && <MediaPlayer
                            media={{
                                urls: [{ url: "https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_fmp4/master.m3u8" }],
                                subtitles: [],
                                thumbnail: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/04174dbc-fe2f-4983-824a-6d80412e917e/de1s9he-1e5476f3-0ea2-49d0-a7fc-f6a182624850.png/v1/fill/w_960,h_540,q_80,strp/404_not_found__08th_phonak_movie_night_style__by_xxneojadenxx_de1s9he-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NTQwIiwicGF0aCI6IlwvZlwvMDQxNzRkYmMtZmUyZi00OTgzLTgyNGEtNmQ4MDQxMmU5MTdlXC9kZTFzOWhlLTFlNTQ3NmYzLTBlYTItNDlkMC1hN2ZjLWY2YTE4MjYyNDg1MC5wbmciLCJ3aWR0aCI6Ijw9OTYwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.UXpWTdFPNrYsKY5zOeIT2Hgv_GzyqXYkxWg0VgrlmrQ",
                            }}
                            className='w-full min-h-[350px] aspect-[1.85/1]'
                        />}
                        {isMediaPlayer && !streamingData && <div className='w-[99%] min-h-[350px] aspect-[1.85/1] flex items-center justify-center'>Loading...</div>}
                    </ResizablePanel>

                    <> <ResizableHandle />
                        <ResizablePanel defaultSize={20} className='max-w-[500px] hidden lg:block'>
                            <ResizablePanelGroup direction="vertical">
                                <ResizablePanel defaultSize={30} className='max-h-fit'>
                                    <h1 className="text-xl h-10 px-3 py-2 font-bold whitespace-nowrap overflow-hidden text-ellipsis">Seasons</h1>
                                    <ScrollArea className="h-full w-full rounded-md border p-4">
                                        {mediaData?.seasons && <div className="flex flex-col gap-3">
                                            <div className="flex flex-col gap-3">
                                                {mediaData?.seasons?.map((season: { season: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; }, index: React.Key | null | undefined) => (
                                                    <Button key={index} variant={seasonNumber === (index as number) + 1 ? null : "secondary"} onClick={() => { setSeasonNumber((index as number) + 1); setEpisodeNumber(1) }} className="w-full whitespace-nowrap overflow-hidden text-ellipsis">Season {season.season}</Button>
                                                ))}
                                            </div>
                                        </div>}
                                    </ScrollArea>
                                </ResizablePanel>
                                <ResizableHandle withHandle />
                                <ResizablePanel defaultSize={70}>
                                    <h1 className="text-xl h-10 px-3 py-2 font-bold whitespace-nowrap overflow-hidden text-ellipsis">Episodes</h1>
                                    <ScrollArea className="h-full w-full rounded-md border p-4 pb-12">
                                        {mediaData?.seasons && <div className="flex flex-col gap-3">
                                            <div className="flex flex-col gap-3">
                                                {mediaData.seasons[seasonNumber - 1]?.episodes?.map((episode: { id: React.SetStateAction<null>; title: any; episode: any; }, index: number | null | undefined) => (
                                                    <Button key={index} variant={episodeNumber === (index as number) + 1 ? null : "secondary"} onClick={() => { setEpisodeNumber((index as number) + 1); setEpisodeId(episode.id) }} title={episode.title || `Episode ${episode.episode}`} className="w-full whitespace-nowrap overflow-hidden text-ellipsis">{episode.title || `Episode ${episode.episode}`}</Button>
                                                ))}
                                            </div>
                                        </div>}
                                    </ScrollArea>
                                </ResizablePanel>
                            </ResizablePanelGroup>
                        </ResizablePanel></>
                </ResizablePanelGroup>
            </div>}

            <CardFooter className="flex lg:flex-col overflow-y-scroll max-h-[70dvh] gap-3 pt-3">
                <Button className="w-28" id="video-btn-1" title="FlixHq" variant={isMediaPlayer ? null : "secondary"} onClick={() => { setIsMediaPlayer(true); setIsYoutubeEmbed(false) }}>FlixHq</Button>
                {IframeButtonDetails.map((button, index) => {
                    return <Button variant={(!isMediaPlayer && !isYoutubeEmbed && iframeSrc === button.url.toString()) ? null : "secondary"} id={`video-btn-${index + 2}`} key={index} title={button.name} onClick={() => { setIframeSrc(button.url.toString()); setIsMediaPlayer(false); setIsYoutubeEmbed(false) }} className="w-28">{button.name}</Button>
                })}
                {mediaData?.videos.results.toReversed().map((video: { type: string | number | null | undefined; key: React.SetStateAction<null>; name: string | undefined; }, index: React.Key | null | undefined) => {
                    if (video.type === 'Teaser' || video.type === 'Behind the Scenes' || video.type === 'Trailer' || video.type === 'Featurette') {
                        return <Button variant={(!isMediaPlayer && isYoutubeEmbed && youtubeKey === video.key) ? null : "secondary"} id={`video-btn-${(index as number) + 1 + 10}`} key={index} title={video.name} onClick={() => { setIsYoutubeEmbed(true); setYoutubeKey(video.key); setIsMediaPlayer(false) }} className="w-28">{video.type === 'Behind the Scenes' ? "BTS" : video.type}</Button>
                    }
                }
                )}
            </CardFooter>
            {type === "tv" && <ResizablePanelGroup direction="horizontal" className="lg:max-w-0 max-h-[50dvh]">
                <ResizablePanel defaultSize={30} className='max-h-fit'>
                    <h1 className="text-xl h-10 px-3 py-2 font-bold whitespace-nowrap overflow-hidden text-ellipsis">Seasons</h1>
                    <ScrollArea className="h-full w-full rounded-md border p-4">
                        {mediaData?.seasons && <div className="flex flex-col gap-3">
                            <div className="flex flex-col gap-3">
                                {mediaData?.seasons?.map((season: { season: string | number | null | undefined; }, index: React.Key | null | undefined) => (
                                    <Button key={index} variant={seasonNumber === (index as number) + 1 ? null : "secondary"} onClick={() => { setSeasonNumber((index as number) + 1); setEpisodeNumber(1) }} className="w-full whitespace-nowrap overflow-hidden text-ellipsis">Season {season.season}</Button>
                                ))}
                            </div>
                        </div>}
                    </ScrollArea>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={70}>
                    <h1 className="text-xl h-10 px-3 py-2 font-bold whitespace-nowrap overflow-hidden text-ellipsis">Episodes</h1>
                    <ScrollArea className="h-full w-full rounded-md border p-4 pb-12">
                        {mediaData?.seasons && <div className="flex flex-col gap-3">
                            <div className="flex flex-col gap-3">
                                {mediaData?.seasons[seasonNumber - 1]?.episodes?.map((episode: { id: React.SetStateAction<null>; title: any; episode: any; }, index: React.Key | null | undefined) => (
                                    <Button key={index} variant={episodeNumber === (index as number) + 1 ? null : "secondary"} onClick={() => { setEpisodeNumber((index as number) + 1 + 1); setEpisodeId(episode.id) }} title={episode.title || `Episode ${episode.episode}`} className="w-full whitespace-nowrap overflow-hidden text-ellipsis">{episode.title || `Episode ${episode.episode}`}</Button>
                                ))}
                            </div>
                        </div>}
                    </ScrollArea>
                </ResizablePanel>
            </ResizablePanelGroup>}
        </Card >
    )
}

export default MediaVideos
