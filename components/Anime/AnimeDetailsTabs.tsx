import React from "react"
import { Star } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { shimmerBlurDataUrl } from "@/utils/blurDataUrl"
import MediaThumbnailComponent from "@/components/Common/MediaThumbnailComponent"


export default function AnimeDetailsTabs({ animeData }: { animeData: any }) {
    const [basis, setBasis] = React.useState('50%');

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

        window.addEventListener('resize', handleResize);

        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    return (
        <Tabs defaultValue="more-details" className="w-[95%] sm:w-[90%] dark">

            <TabsList className=" w-full flex justify-start overflow-scroll">
                <TabsTrigger value="more-details">More Details</TabsTrigger>
                {animeData?.characters && <TabsTrigger value="characters">Characters</TabsTrigger>}
                {animeData?.recommendations && <TabsTrigger value="recommendations">Recommendations</TabsTrigger>}
                {animeData?.relations && <TabsTrigger value="relations">Relations</TabsTrigger>}
            </TabsList>

            <TabsContent value="more-details" className="rounded-3xl flex">
                <Card className="w-full flex flex-wrap-reverse items-end justify-center min-w-0 h-fit p-2">
                    <CardContent className="w-full md:w-1/3 flex flex-col justify-center items-start gap-y-3">
                        {animeData?.startDate && <CardTitle className="text-[2rem] font-bold">Start Date <CardDescription className="text-[1.5rem] font-normal">{monthNames[animeData?.startDate?.month - 1]} {animeData?.startDate?.day}, {animeData?.startDate?.year}</CardDescription></CardTitle>}
                        {animeData?.endDate && <CardTitle className="text-[2rem] font-bold">End Date <CardDescription className="text-[1.5rem] font-normal">{monthNames[animeData?.endDate?.month - 1]} {animeData?.endDate?.day}, {animeData?.endDate?.year}</CardDescription></CardTitle>}
                        {animeData?.studios && <CardTitle className="text-[2rem] font-bold">Studios</CardTitle>}
                        {animeData?.studios.map((studio: string, index: number) => (
                            <CardDescription className="text-[1.5rem] font-normal" key={index}>{studio}</CardDescription>
                        ))}
                        {animeData?.isLicensed ? <CardDescription className="text-[1.5rem] font-normal">Licensed</CardDescription> : null}
                        <CardDescription className="text-[1.5rem] font-normal">Country of Origin: {animeData?.countryOfOrigin}</CardDescription>
                        {animeData?.synonyms && <CardTitle className="text-[2rem] font-bold">Other Names</CardTitle>}
                        {animeData?.synonyms.map((synonym: string, index: number) => (
                            <CardDescription className="text-[1.5rem] font-normal" key={index}>{synonym}</CardDescription>
                        ))}
                    </CardContent>
                    <CardContent className="w-full md:w-2/3 flex flex-col justify-center items-start gap-y-3">
                        <CardTitle className="text-[2rem] font-bold">Trailer</CardTitle>
                        <iframe className="w-full aspect-[1.85/1] border border-gray-200 rounded-sm" src={`https://www.youtube.com/embed/${animeData?.trailer?.id}`} allowFullScreen></iframe>
                    </CardContent>
                </Card>
            </TabsContent>

            {animeData?.characters && <TabsContent value="characters" className="p-5">
                <div className="flex justify-center items-start flex-wrap w-full text-center">
                    {animeData?.characters.map((character: any, index: React.Key | number) => (<div key={index} className="border-2 border-slate-800/50 border-b-0 h-max hover:bg-slate-800/50 transition-all duration-300 ease-in-out rounded-t-full flex flex-col items-center gap-x-5 shrink-0 w-full sm:w-[50%] lg:w-[33%]">
                        <Image
                            className="rounded-full flex justify-center items-center w-24 h-24 aspect-square object-cover"
                            src={`${character.image}`}
                            alt={`${character.name.full} photo`}
                            width={100}
                            height={100}
                            loading={index as number < 10 ? "eager" : "lazy"}
                            placeholder={`data:image/${shimmerBlurDataUrl(100, 100)}`} />
                        <div className="flex flex-col justify-center items-center text-white gap-y-1">
                            <h3 className="text-lg font-bold text-[#5179ff]">{character.name.userPreferred || character.name.full}</h3>
                            <h2 className="text-md font-semibold font-sans">{character.role} Character</h2>
                            <h2 className="text-md font-semibold font-sans">Voice Actors</h2>
                            <div className="flex flex-wrap max-h-[300px] py-3 overflow-y-scroll justify-evenly items-center gap-y-5">
                                {character?.voiceActors.map((actor: any, index: React.Key | number) => (<div key={index} className="flex-col flex items-center gap-x-5 w-[33%]">
                                    <Image
                                        className="rounded-full flex justify-center items-center w-24 h-24 aspect-square object-cover"
                                        src={`${actor.image}`}
                                        alt={`${actor.name.full} photo`}
                                        width={100}
                                        height={100}
                                        loading={index as number < 10 ? "eager" : "lazy"}
                                        placeholder={`data:image/${shimmerBlurDataUrl(100, 100)}`} />
                                    <div className="flex flex-col justify-center items-center text-white gap-y-1">
                                        <h3 className="text-lg font-bold text-[#5179ff]">{actor.name.userPreferred || actor.name.full}</h3>
                                        <h2 className="text-md font-semibold font-sans">{actor.language}</h2>
                                    </div>
                                </div>)
                                )}
                            </div>
                        </div>
                    </div>)
                    )}
                </div>
            </TabsContent>}

            {animeData?.recommendations && <TabsContent value="recommendations">
                <div className="w-full h-full flex justify-center">
                    <div className="w-full flex flex-wrap justify-start items-center">
                        {animeData?.recommendations.map((post: any, index: React.Key | number) => (<div key={index} style={{ flexBasis: basis }} className={`relative min-w-0 shrink-0 grow-0 basis-1/2 h-fit p-2`}>
                            <MediaThumbnailComponent link={`/anime/${post.id}`} id={post.id} title={post.title.userPreferred || post.title.english || post.title.romaji || post.title.native} poster={post.image} width={200} height={300} index={index} type={"anime"}>
                                <div className="absolute flex justify-start items-center flex-wrap gap-2 top-3 left-3 z-[3]">
                                    <span className='bg-yellow-500 text-white py-[0.8px] px-1 text-[0.8rem] rounded-md whitespace-nowrap flex items-center'>
                                        <Star fill="white" color='white' width={12} />&nbsp;{(post.rating / 10).toFixed(1)}
                                    </span>
                                    <span className='bg-red-500 text-white py-[2px] px-1 text-[0.8rem] rounded-md whitespace-nowrap flex items-center'>
                                        {post.type}
                                    </span>
                                    <span className='hidden sm:flex bg-green-500 text-white py-[2px] px-1 text-[0.8rem] rounded-md whitespace-nowrap items-center'>
                                        {post.status}
                                    </span>
                                    <span className='bg-blue-500 text-white py-[2px] px-1 text-[0.8rem] rounded-md whitespace-nowrap flex items-center'>
                                        EP {post.episodes}
                                    </span>
                                </div>
                            </MediaThumbnailComponent>
                        </div>)
                        )}
                    </div>
                </div>
            </TabsContent>}

            {animeData?.relations && <TabsContent value="relations">
                <div className="w-full h-full flex justify-center">
                    <div className="w-full flex flex-wrap justify-start items-center">
                        {animeData?.relations.map((post: any, index: React.Key | number) => (<div key={index} style={{ flexBasis: basis }} className={`relative min-w-0 shrink-0 grow-0 basis-1/2 h-fit p-2`}>
                            <MediaThumbnailComponent link={`/anime/${post.id}`} id={post.id} title={post.title.userPreferred || post.title.english || post.title.romaji || post.title.native} poster={post.image} width={200} height={300} index={index} type={"anime"}>
                                <div className="absolute flex justify-start items-center flex-wrap gap-2 top-3 left-3 z-[3]">
                                    <span className='bg-yellow-500 text-white py-[0.8px] px-1 text-[0.8rem] rounded-md whitespace-nowrap flex items-center'>
                                        <Star fill="white" color='white' width={12} />&nbsp;{(post.rating / 10).toFixed(1)}
                                    </span>
                                    <span className='bg-cyan-500 text-white py-[2px] px-1 text-[0.8rem] rounded-md whitespace-nowrap flex items-center'>
                                        {post.relationType}
                                    </span>
                                    {post.episodes && <span className='bg-blue-500 text-white py-[2px] px-1 text-[0.8rem] rounded-md whitespace-nowrap flex items-center'>
                                        EP {post.episodes}
                                    </span>}
                                    <span className='hidden sm:flex bg-green-500 text-white py-[2px] px-1 text-[0.8rem] rounded-md whitespace-nowrap items-center'>
                                        {post.status}
                                    </span>
                                    <span className='bg-red-500 text-white py-[2px] px-1 text-[0.8rem] rounded-md whitespace-nowrap flex items-center'>
                                        {post.type}
                                    </span>
                                </div>
                            </MediaThumbnailComponent>
                        </div>)
                        )}
                    </div>
                </div>
            </TabsContent>}

        </Tabs>
    )
}
