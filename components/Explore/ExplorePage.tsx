import React, { useState } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import ExploreResults from "@/components/Explore/ExploreResults"

export default function ExplorePage() {
    const [type, setType] = useState("movie")
    const [sort, setSort] = useState("popularity.desc")
    const [genres, setGenres] = useState<string[]>([])
    const [includeAllGenres, setIncludeAllGenres] = useState<boolean>(true)
    const [dategte, setDategte] = useState<string>("")
    const [datelte, setDatelte] = useState<string>("")
    const [page, setPage] = useState(1)
    const [votesAvglte, setVotesAvglte] = useState<number | undefined>()
    const [votesAvggte, setVotesAvggte] = useState<number | undefined>()
    const [votesCountlte, setVotesCountlte] = useState<number | undefined>()
    const [votesCountgte, setVotesCountgte] = useState<number | undefined>()

    return <>
        <Card className="mx-auto w-full min-w-0">
            <ScrollArea className="w-full h-[100dvh] pb-[150px] sm:pb-[30px]">
                <CardHeader>
                    <CardTitle>Explore</CardTitle>
                    <CardDescription>Apply filters to narrow down your search results.</CardDescription>
                </CardHeader>
                <div className="w-full flex flex-wrap justify-between items-center">
                    {/* Media Type */}
                    <Card className="w-full sm:w-1/2 lg:w-1/4 sm:h-[185.6px] min-w-0">
                        <CardHeader>
                            <CardTitle>Media Type</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Select onValueChange={(e) => { setType(e); setGenres([]); setPage(1) }}>
                                <SelectTrigger className=" text-white">
                                    <SelectValue placeholder="Movie" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup ref={(ref) => ref?.addEventListener('touchend', (e) => { e.preventDefault(); })} >
                                        <SelectItem value="movie">Movie</SelectItem>
                                        <SelectItem value="tv">TV Show</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </CardContent>
                    </Card>
                    {/* Sort By */}
                    <Card className="w-full sm:w-1/2 lg:w-1/4 sm:h-[185.6px] min-w-0">
                        <CardHeader>
                            <CardTitle>Sort By</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Select onValueChange={(e) => { setSort(e); setPage(1) }}>
                                <SelectTrigger className=" text-white">
                                    <SelectValue placeholder="Popularity Descending" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup ref={(ref) => ref?.addEventListener('touchend', (e) => { e.preventDefault(); })}>
                                        <SelectItem value="popularity.desc">Popularity Descending</SelectItem>
                                        <SelectItem value="popularity.asc">Popularity Ascending</SelectItem>
                                        <SelectItem value="release_date.desc">Release Date Descending</SelectItem>
                                        <SelectItem value="release_date.asc">Release Date Ascending</SelectItem>
                                        <SelectItem value="vote_average.desc">Rating Descending</SelectItem>
                                        <SelectItem value="vote_average.asc">Rating Ascending</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </CardContent>
                    </Card>
                    {/* Release Date */}
                    <Card className="w-full sm:w-1/2 lg:w-1/4 sm:h-[185.6px] min-w-0">
                        <CardHeader>
                            <CardTitle>Release Date</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col gap-y-2">
                                <div className="flex items-center justify-between gap-x-3">
                                    <CardDescription>From</CardDescription>
                                    <Input onChange={(e) => { setDategte(e.target.value); setPage(1) }} type="date" />
                                </div>
                                <div className="flex items-center justify-between gap-x-3">
                                    <CardDescription>To&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</CardDescription>
                                    <Input onChange={(e) => setDatelte(e.target.value)} type="date" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    {/* Rating */}
                    <Card className="w-full sm:w-1/2 lg:w-1/4 sm:h-[185.6px] min-w-0">
                        <CardHeader>
                            <CardTitle>Rating</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col gap-y-2">
                                <div className="flex items-center justify-between gap-x-3">
                                    <CardDescription>Votes Average</CardDescription>
                                    <Input
                                        value={votesAvggte}
                                        onChange={(e) => {
                                            setVotesAvggte(parseFloat(parseFloat(e.target.value).toFixed(1)));
                                            setPage(1);
                                        }}
                                        step={0.1}
                                        type="number"
                                        min={0}
                                        max={10}
                                        placeholder="Min"
                                    />
                                    <Input
                                        value={votesAvglte}
                                        onChange={(e) => {
                                            setVotesAvglte(parseFloat(parseFloat(e.target.value).toFixed(1)));
                                            setPage(1);
                                        }}
                                        step={0.1}
                                        type="number"
                                        min={0}
                                        max={10}
                                        placeholder="Max"
                                    />
                                </div>
                                <div className="flex items-center justify-between gap-x-3">
                                    <CardDescription>No of Votes&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</CardDescription>
                                    <Input value={votesCountgte} onChange={(e) => { setVotesCountgte(parseInt(e.target.value)); setPage(1) }} type="number" min={0} placeholder="Min" />
                                    <Input value={votesCountlte} onChange={(e) => { setVotesCountlte(parseInt(e.target.value)); setPage(1) }} type="number" min={0} placeholder="Max" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                {/* Genres */}
                <Card className="w-full min-w-0">
                    <CardHeader className="flex flex-row gap-x-3 justify-between items-center">
                        <CardTitle>Genres</CardTitle>
                        <CardDescription className="flex gap-x-2 justify-start items-center mt-5">
                            <Switch onClick={(e) => { setIncludeAllGenres(!includeAllGenres); setPage(1) }} checked={includeAllGenres} id="genre-mode" />
                            <Label htmlFor="genre-mode">Include all selected</Label>
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ToggleGroup value={genres} onValueChange={(e) => { setGenres(e); setPage(1) }} variant={"outline"} className=" flex justify-start items-center flex-wrap gap-2" type="multiple">
                            {/* Movie */}
                            {type === 'movie' && <>
                                <ToggleGroupItem className="data-[state=on]:bg-white data-[state=on]:text-black" value={"35"}>Comedy</ToggleGroupItem>
                                <ToggleGroupItem className="data-[state=on]:bg-white data-[state=on]:text-black" value={"18"}>Drama</ToggleGroupItem>
                                <ToggleGroupItem className="data-[state=on]:bg-white data-[state=on]:text-black" value={"53"}>Thriller</ToggleGroupItem>
                                <ToggleGroupItem className="data-[state=on]:bg-white data-[state=on]:text-black" value={"28"}>Action</ToggleGroupItem>
                                <ToggleGroupItem className="data-[state=on]:bg-white data-[state=on]:text-black" value={"27"}>Horror</ToggleGroupItem>
                                <ToggleGroupItem className="data-[state=on]:bg-white data-[state=on]:text-black" value={"10749"}>Romance</ToggleGroupItem>
                                <ToggleGroupItem className="data-[state=on]:bg-white data-[state=on]:text-black" value={"80"}>Crime</ToggleGroupItem>
                                <ToggleGroupItem className="data-[state=on]:bg-white data-[state=on]:text-black" value={"12"}>Adventure</ToggleGroupItem>
                                <ToggleGroupItem className="data-[state=on]:bg-white data-[state=on]:text-black" value={"14"}>Fantasy</ToggleGroupItem>
                                <ToggleGroupItem className="data-[state=on]:bg-white data-[state=on]:text-black" value={"878"}>Science Fiction</ToggleGroupItem>
                                <ToggleGroupItem className="data-[state=on]:bg-white data-[state=on]:text-black" value={"9648"}>Mystery</ToggleGroupItem>
                                <ToggleGroupItem className="data-[state=on]:bg-white data-[state=on]:text-black" value={"10751"}>Family</ToggleGroupItem>
                            </>}
                            {/* TV Show */}
                            {type === "tv" && <>
                                <ToggleGroupItem className="data-[state=on]:bg-white data-[state=on]:text-black" value={"10759"}>Action & Adventure</ToggleGroupItem>
                                <ToggleGroupItem className="data-[state=on]:bg-white data-[state=on]:text-black" value={"16"}>Animation</ToggleGroupItem>
                                <ToggleGroupItem className="data-[state=on]:bg-white data-[state=on]:text-black" value={"35"}>Comedy</ToggleGroupItem>
                                <ToggleGroupItem className="data-[state=on]:bg-white data-[state=on]:text-black" value={"80"}>Crime</ToggleGroupItem>
                                <ToggleGroupItem className="data-[state=on]:bg-white data-[state=on]:text-black" value={"99"}>Documentary</ToggleGroupItem>
                                <ToggleGroupItem className="data-[state=on]:bg-white data-[state=on]:text-black" value={"18"}>Drama</ToggleGroupItem>
                                <ToggleGroupItem className="data-[state=on]:bg-white data-[state=on]:text-black" value={"10751"}>Family</ToggleGroupItem>
                                <ToggleGroupItem className="data-[state=on]:bg-white data-[state=on]:text-black" value={"10762"}>Kids</ToggleGroupItem>
                                <ToggleGroupItem className="data-[state=on]:bg-white data-[state=on]:text-black" value={"9648"}>Mystery</ToggleGroupItem>
                                <ToggleGroupItem className="data-[state=on]:bg-white data-[state=on]:text-black" value={"10763"}>News</ToggleGroupItem>
                                <ToggleGroupItem className="data-[state=on]:bg-white data-[state=on]:text-black" value={"10764"}>Reality</ToggleGroupItem>
                                <ToggleGroupItem className="data-[state=on]:bg-white data-[state=on]:text-black" value={"10765"}>Sci-Fi & Fantasy</ToggleGroupItem>
                                <ToggleGroupItem className="data-[state=on]:bg-white data-[state=on]:text-black" value={"10766"}>Soap</ToggleGroupItem>
                                <ToggleGroupItem className="data-[state=on]:bg-white data-[state=on]:text-black" value={"10767"}>Talk</ToggleGroupItem>
                                <ToggleGroupItem className="data-[state=on]:bg-white data-[state=on]:text-black" value={"10768"}>War & Politics</ToggleGroupItem>
                                <ToggleGroupItem className="data-[state=on]:bg-white data-[state=on]:text-black" value={"37"}>Western</ToggleGroupItem>
                            </>}
                        </ToggleGroup>
                    </CardContent>
                </Card>
                {/* <CardFooter className="pt-5 flex justify-start items-center gap-x-3">
                    <Button>Filter</Button>
                    <Button variant="outline">Cancel</Button>
                </CardFooter> */}
                <div className="flex flex-col gap-y-4 max-w-[100vw] overflow-scroll p-1 sm:p-8">
                    <ExploreResults type={type} sort={sort} datelte={datelte} dategte={dategte} votesAvglte={votesAvglte} votesAvggte={votesAvggte} votesCountlte={votesCountlte} votesCountgte={votesCountgte} genres={genres.join(includeAllGenres ? ',' : '|')} page={page} setPage={setPage} />
                </div>
            </ScrollArea>
        </Card>
    </>
}
