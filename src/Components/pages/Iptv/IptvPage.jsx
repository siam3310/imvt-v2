import React, { useState, useEffect, useMemo } from "react";
import { Input } from "../../ui/input"
import { Search } from "lucide-react"
import { useForm } from 'react-hook-form';
import IptvPlayer from './IptvPlayer'

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "../../ui/select"
import IptvChannels from "./IptvChannels"

export default function IptvPage() {
    const [iptvPlayerData, setIptvPlayerData] = useState({})
    const [query, setQuery] = useState("")
    const [group, setGroup] = useState("")
    const [page, setPage] = useState(1)
    const [searchBy, setSearchBy] = useState("country")
    const [countriesList, setCountriesList] = useState([])
    const [categoriesList, setCategoriesList] = useState([])
    useEffect(() => {
        const fetchIptvCountries = async () => {
            const res = await fetch(`${import.meta.env.VITE_IPTV_API_URL}/countries`)
            const data = await res.json()
            setCountriesList(data)
        }
        const fetchIptvCategories = async () => {
            const res = await fetch(`${import.meta.env.VITE_IPTV_API_URL}/categories`)
            const data = await res.json()
            setCategoriesList(data)
        }
        fetchIptvCountries()
        fetchIptvCategories()
    }, [])
    const { register, handleSubmit, formState: { errors } } = useForm();
    useEffect(() => {
        setPage(1)
    }, [query, group, searchBy])

    const onSubmit = (data) => {
        console.log(data);
        setQuery(data.search)
    };
    return (
        <div key={setIptvPlayerData} className="w-full h-full max-h-[100dvh] overflow-scroll mb-10">
            {Object.keys(iptvPlayerData).length > 0 && <IptvPlayer className="p-10 w-[100%] h-[100%] z-[2]" playerData={iptvPlayerData} />}
            <div className="flex gap-y-10 flex-col w-full min-h-[100dvh] h-fit items-center justify-start p-6">
                <span className={`font-bold text-white text-3xl lg:text-[2.5rem] text-center ${Object.keys(iptvPlayerData).length === 0 ? " mt-[30dvh]" : "mt-[10px]"}`}>Input your desired TV channel to begin streaming</span>
                <form onSubmit={handleSubmit(onSubmit)} className="relative w-full max-w-[600px] flex h-fit items-center justify-center">
                    <Input {...register('search')} placeholder="Search" className="w-full rounded-3xl" />
                    <button type="submit" className="absolute right-0 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-1 px-2 rounded-3xl h-full">
                        <Search />
                    </button>
                </form>
                <div className="flex gap-x-2 justify-between items-center text-white max-w-[600px] w-full z-[4]">
                    <div className="shrink-1">
                        <Select onValueChange={(e) => { setSearchBy(e); setPage(1); }}>
                            <SelectTrigger className="w-fit sm:w-[180px]">
                                <SelectValue placeholder="Search by" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Search by</SelectLabel>
                                    <SelectItem value="category">Category</SelectItem>
                                    <SelectItem value="country">Country</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="shrink-1">
                        <Select key={searchBy} onValueChange={(e) => { setGroup(e); setPage(1); }}>
                            <SelectTrigger className="w-fit sm:w-[180px]">
                                <SelectValue placeholder={`Select ${searchBy}`} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Select {searchBy}</SelectLabel>
                                    {searchBy === "category" ? categoriesList.map((category, index) => (
                                        <SelectItem key={index} value={category}>{category}</SelectItem>
                                    )) : countriesList.map((country, index) => (
                                        <SelectItem key={index} value={country}>{country}</SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="flex flex-col gap-y-4 w-full h-full">
                    <IptvChannels query={query} setQuery={setQuery} iptvPlayerData={iptvPlayerData} setIptvPlayerData={setIptvPlayerData} searchBy={searchBy} group={group} page={page} setPage={setPage} />
                </div>
            </div>
        </div>
    )
}
