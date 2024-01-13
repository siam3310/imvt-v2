import React, { useState, useEffect } from "react";
import { Input } from "./ui/input"
import { LayoutGrid, LayoutPanelLeft, LayoutList } from "lucide-react"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "./ui/select"
import MediaGrid from "./MediaGrid"

export default function DiscoverPage() {
    const [query, setQuery] = useState("")
    const [page, setPage] = useState(1)
    const [searchType, setSearchType] = useState("any")
    return (
        <div className="w-full h-full overflow-scroll">
            <div className="flex gap-y-10 flex-col min-h-[100dvh] h-fit items-center justify-start p-6">
                <span className="font-bold text-white text-3xl lg:text-[2.5rem] mt-[30dvh] text-center">What would you like to<br /> watch tonight?</span>
                <Input type="text" onChange={(e) => setQuery(e.target.value)} value={query} placeholder="Search" className="max-w-[600px] rounded-3xl" />
                <div className="flex gap-x-2 justify-between items-center text-white max-w-[600px] w-full">
                    <div className="shrink-1">
                        <Select onValueChange={(e) => { setSearchType(e); setPage(1); }}>
                            <SelectTrigger className="w-fit sm:w-[180px]">
                                <SelectValue placeholder="Search Results" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Select Result Type</SelectLabel>
                                    <SelectItem value="any">Any</SelectItem>
                                    <SelectItem value="movie">Movie</SelectItem>
                                    <SelectItem value="tv">TV Show</SelectItem>
                                    <SelectItem value="people">People</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex gap-x-2 border border-yellow-500 rounded-lg cursor-pointer">
                        <span className="border-r px-1 py-1 text-yellow-500 border-yellow-500"><LayoutGrid /></span>
                        <span className=" px-0 py-1"><LayoutPanelLeft /></span>
                        <span className="border-l px-1 py-1"><LayoutList /></span>
                    </div>
                </div>
                <div className="flex flex-col gap-y-4 w-full overflow-scroll h-full">
                    <MediaGrid query={query} page={page} setPage={setPage} searchType={searchType} />
                </div>
            </div>
        </div>
    )
}
