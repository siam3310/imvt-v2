import { Button } from "./ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./ui/tabs"
import VideoPlayer from "./VideoPlayer"
import { useState } from "react"
export default function MediaDetailsTabs({ streamingData, movieData }) {
  const [isYoutubeEmbed, setIsYoutubeEmbed] = useState(false)
  const [iframeSrc, setIframeSrc] = useState(false)
  const [isMediaPlayer, setIsMediaPlayer] = useState(true)
  const [youtubeKey, setYoutubeKey] = useState(null)
  const IframeButtonDetails = [
    { name: "BlackVid", url: `https://blackvid.space/embed?tmdb=${movieData?.id}` },
    { name: "SuperEmbed", url: `https://multiembed.mov/directstream.php?video_id=${movieData?.id}&tmdb=1` },
    { name: "2Embed", url: `https://www.2embed.cc/embed/${movieData?.id}` },
    { name: "VidSrc", url: `https://vidsrc.xyz/embed/movie/${movieData?.id}` },
    { name: "tvembed", url: `https://tvembed.cc/movie/${movieData?.id}` },
    { name: "Smsystrm: S", url: ` https://embed.smashystream.com/playere.php?dplayer=S&tmdb=${movieData?.id}` },
    { name: "Smsystrm: F", url: ` https://embed.smashystream.com/playere.php?dplayer=F&tmdb=${movieData?.id}` },
    { name: "Hindi Player", url: ` https://embed.smashystream.com/playere.php?dplayer=D&tmdb=${movieData?.id}` },
  ]
  return (
    <Tabs defaultValue="videos" className="w-[95%] sm:w-[90%] dark mb-10">
      <TabsList className=" w-full flex justify-start overflow-scroll">
        <TabsTrigger value="videos">Videos</TabsTrigger>
        <TabsTrigger value="casts">Casts</TabsTrigger>
        <TabsTrigger value="similar">Similar</TabsTrigger>
        <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        <TabsTrigger value="reviews">Reviews</TabsTrigger>
      </TabsList>
      <TabsContent value="videos" className="rounded-3xl">
        <Card className="h-fit flex lg:flex-row flex-col-reverse gap-3 lg:max-h-[80dvh]">
          <CardFooter className="flex lg:flex-col overflow-y-scroll flex-shrink gap-3 pt-3">
            <Button className="w-28" id="video-btn-1" title="FlixHq" variant={isMediaPlayer ? "" : "secondary"} onClick={() => { setIsMediaPlayer(true); setIsYoutubeEmbed(false) }}>FlixHq</Button>
            {IframeButtonDetails.map((button, index) => {
              return <Button variant={(!isMediaPlayer && !isYoutubeEmbed && iframeSrc === button.url) ? "" : "secondary"} id={`video-btn-${index + 2}`} key={index} title={button.name} onClick={() => { setIframeSrc(button.url); setIsMediaPlayer(false); setIsYoutubeEmbed(false) }} className="w-28">{button.name}</Button>
            })}
            {movieData?.videos.results.toReversed().map((video, index) => {
              if (video.type === 'Teaser' || video.type === 'Behind the Scenes' || video.type === 'Trailer' || video.type === 'Featurette') {
                return <Button variant={(!isMediaPlayer && isYoutubeEmbed && youtubeKey === video.key) ? "" : "secondary"} id={`video-btn-${index + 10}`} key={index} title={video.name} onClick={() => { setIsYoutubeEmbed(true); setYoutubeKey(video.key); setIsMediaPlayer(false) }} className="w-28">{video.type === 'Behind the Scenes' ? "BTS" : video.type}</Button>
              }
            }
            )}
          </CardFooter>
          {!isMediaPlayer && <iframe className="w-full aspect-[1.85/1]" src={`${isYoutubeEmbed ? `https://www.youtube.com/embed/${youtubeKey}` : iframeSrc}`} allowFullScreen></iframe>}
          {isMediaPlayer && streamingData && streamingData.sources && <VideoPlayer
            media={{
              urls: streamingData?.sources,
              subtitles: streamingData?.subtitles,
              thumbnail: movieData?.backdrop_path,
            }}
            className='w-full aspect-[1.85/1]'
          />}
          {isMediaPlayer && streamingData && !streamingData.sources && <VideoPlayer
            media={{
              urls: [{ url: "https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_fmp4/master.m3u8" }],
              subtitles: [],
              thumbnail: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/04174dbc-fe2f-4983-824a-6d80412e917e/de1s9he-1e5476f3-0ea2-49d0-a7fc-f6a182624850.png/v1/fill/w_960,h_540,q_80,strp/404_not_found__08th_phonak_movie_night_style__by_xxneojadenxx_de1s9he-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NTQwIiwicGF0aCI6IlwvZlwvMDQxNzRkYmMtZmUyZi00OTgzLTgyNGEtNmQ4MDQxMmU5MTdlXC9kZTFzOWhlLTFlNTQ3NmYzLTBlYTItNDlkMC1hN2ZjLWY2YTE4MjYyNDg1MC5wbmciLCJ3aWR0aCI6Ijw9OTYwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.UXpWTdFPNrYsKY5zOeIT2Hgv_GzyqXYkxWg0VgrlmrQ",
            }}
            className='w-full aspect-[1.85/1]'
          />}

        </Card>
      </TabsContent>
      <TabsContent value="casts">
        <Card className="flex justify-start gap-3">
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="similar">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here. After saving, you'll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Current password</Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">New password</Label>
              <Input id="new" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="recommendations">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here. After saving, you'll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Current password</Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">New password</Label>
              <Input id="new" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="reviews">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here. After saving, you'll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Current password</Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">New password</Label>
              <Input id="new" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
