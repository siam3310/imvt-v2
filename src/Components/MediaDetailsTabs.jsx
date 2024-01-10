import React from "react"
import { Link } from 'react-router-dom'
import { Star, PlayCircle, ExternalLink } from "lucide-react"
import axios from 'axios';
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
export default function MediaDetailsTabs({ movieData }) {
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
  const [streamingData, setStreamingData] = React.useState()

  const getStreamingData = async () => {
    if (movieData?.streamingId) {
      const array = movieData?.streamingId.split("-");
      const episodeId = array.length > 1 ? array[array.length - 1] : null;
      const data = (await axios.get(`${import.meta.env.VITE_CONSUMET_API_URL}/movies/flixhq/watch?episodeId=${episodeId}&mediaId=${movieData?.streamingId}`)).data;
      setStreamingData(data)
    }
  }

  React.useEffect(() => {
    getStreamingData()
    console.log("movieData")
    console.log(movieData)
    return () => {
      console.log("streamingData")
      console.log(streamingData);
    }
  }, [movieData])

  const [basis, setBasis] = React.useState('50%'); // initial basis

  React.useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width > 600) {
        var newBasis = 100 / Math.floor(width / 200);
      } else {
        var newBasis = 100 / Math.floor(width / 100);
      }
      setBasis(`${newBasis}%`);
    };

    // Attach resize listener
    window.addEventListener('resize', handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Tabs defaultValue="casts" className="w-[95%] sm:w-[90%] dark mb-10">
      <TabsList className=" w-full flex justify-start overflow-scroll">
        <TabsTrigger value="casts">Casts</TabsTrigger>
        <TabsTrigger value="videos">Videos</TabsTrigger>
        {movieData?.similar && <TabsTrigger value="similar">Similar</TabsTrigger>}
        {movieData?.recommendations && <TabsTrigger value="recommendations">Recommendations</TabsTrigger>}
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
      <TabsContent value="casts" className="p-5 max-h-[85dvh] overflow-y-scroll">
        <div className="flex flex-wrap justify-between items-center gap-y-5">
          {movieData?.casts.map((cast, index) => (<div key={index} className="flex items-center gap-x-5 w-[100%] sm:w-[50%] lg:w-[33%]">
            <img className="rounded-full w-24 h-24 aspect-square object-cover" src={cast.profile_path !== "https://image.tmdb.org/t/p/originalnull" ? cast.profile_path : "https://st4.depositphotos.com/9998432/24428/v/450/depositphotos_244284796-stock-illustration-person-gray-photo-placeholder-man.jpg"} alt="cast image" />
            <div className="flex flex-col justify-start items-start text-white gap-y-1">
              <h3 className="text-lg font-bold text-[#5179ff]">{cast.name || cast.original_name}</h3>
              <h2 className="text-md font-semibold font-sans">as {cast.character}</h2>
              <h3 className="text-sm">{(cast.known_for_department === "Acting" && "Actor") || (cast.known_for_department === "Writing" && "Writer") || (cast.known_for_department === "Directing" && "Director") || (cast.known_for_department === "Production" && "Producer") || cast.known_for_department}</h3>
            </div>
          </div>)
          )}
        </div>

      </TabsContent>
      {movieData?.similar && <TabsContent value="similar">
        <div className="w-full h-full flex justify-center">
          <div className="flex flex-wrap justify-start items-center">
            {movieData?.similar.map((post, index) => (<div key={index} style={{ flexBasis: basis }} className={`relative min-w-0 shrink-0 grow-0 basis-1/2 h-fit p-2`}>
              <div className="group clickable" key={index}>
                <Link to={`/${post.name ? "tv" : "movie"}/${post.id}`} className="hidden clickable group-hover:flex absolute w-full h-full justify-center items-center pr-5">
                  <span className="z-[3] clickable"><PlayCircle size={48} color="#ffffff" strokeWidth={3} absoluteStrokeWidth /></span>
                </Link>
                <span className='bg-yellow-500 text-white absolute top-3 left-3 z-[3] py-[2px] px-2 text-[0.8rem] rounded-3xl whitespace-nowrap flex items-center'>
                  <Star fill="white" color='white' width={12} />&nbsp;{parseFloat(post.rating).toFixed(1)}
                </span>
                <div className='w-full h-fulll'>
                  <div className="aspect-[2/3]">
                    <img
                      className="rounded-t-md group-hover:cursor-pointer group-hover:blur group-hover:scale-90 transition-all duration-300 ease-in-out object-cover w-full h-full"
                      src={post.image}
                      alt="Your alt text"
                    />
                  </div>
                  <h2 className="text-gray-900 bg-white rounded-b-md border border-t-2 border-black px-3 text-center whitespace-nowrap overflow-hidden text-ellipsis font-semibold" title={post.name || post.title}>{post.name || post.title}</h2>
                </div>
              </div>
            </div>)
            )}
          </div>
        </div>
      </TabsContent>}
      {movieData?.recommendations && <TabsContent value="recommendations">
        <div className="w-full h-full flex justify-center">
          <div className="flex flex-wrap justify-start items-center">
            {movieData?.recommendations.map((post, index) => (<div key={index} style={{ flexBasis: basis }} className={`relative min-w-0 shrink-0 grow-0 basis-1/2 h-fit p-2`}>
              <div className="group clickable">
                <Link to={`/${post.name ? "tv" : "movie"}/${post.id}`} className="hidden clickable group-hover:flex absolute w-full h-full justify-center items-center pr-5">
                  <span className="z-[3] clickable"><PlayCircle size={48} color="#ffffff" strokeWidth={3} absoluteStrokeWidth /></span>
                </Link>
                <span className='bg-yellow-500 text-white absolute top-3 left-3 z-[3] py-[2px] px-2 text-[0.8rem] rounded-3xl whitespace-nowrap flex items-center'>
                  <Star fill="white" color='white' width={12} />&nbsp;{parseFloat(post.rating).toFixed(1)}
                </span>
                <div className='w-full h-fulll'>
                  <div className="aspect-[2/3]">
                    <img
                      className="rounded-t-md group-hover:cursor-pointer group-hover:blur group-hover:scale-90 transition-all duration-300 ease-in-out object-cover w-full h-full"
                      src={post.image}
                      alt="Your alt text"
                    />
                  </div>
                  <h2 className="text-gray-900 bg-white rounded-b-md border border-t-2 border-black px-3 text-center whitespace-nowrap overflow-hidden text-ellipsis font-semibold" title={post.name || post.title}>{post.name || post.title}</h2>
                </div>
              </div>
            </div>)
            )}
          </div>
        </div>
      </TabsContent>}
      <TabsContent value="reviews" className="p-5 max-h-[85dvh] overflow-y-scroll">
        <div className="flex flex-wrap justify-between items-center gap-y-5">
          {movieData?.reviews.map((review, index) => (
            <div key={index} className="flex flex-wrap sm:flex-nowrap justify-center items-center gap-x-5 w-[100%] h-fit">
              <div className="flex flex-col items-center justify-start h-full w-[90%] sm:w-1/3">
                <img className="rounded-full min-w-24 min-h-24 max-w-24 max-h-24 aspect-square object-cover" src={review.author_details.avatar_path ? `https://image.tmdb.org/t/p/original${review.author_details.avatar_path}` : "https://st4.depositphotos.com/9998432/24428/v/450/depositphotos_244284796-stock-illustration-person-gray-photo-placeholder-man.jpg"} alt="user image" />
                <h3 className="text-lg font-bold text-[#5179ff]">{review.author_details.username}</h3>
                <h2 className="text-md font-semibold text-white font-sans">{review.author_details.author || review.author}</h2>
                <span className=' text-white font-mono py-[2px] px-2 text-[1rem] rounded-3xl whitespace-nowrap flex items-center'>
                  Rated {review.author_details.rating} out of 10
                </span>
              </div>
              <div className="flex flex-col w-[90%] sm:w-2/3 justify-start items-start text-white gap-y-1">
                <h3 className="text-sm max-h-[200px] overflow-hidden">{review.content}</h3>
              </div>
            </div>)
          )}
        </div>

      </TabsContent>
    </Tabs>
  )
}
