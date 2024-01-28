"use client"
import React, { useState, useEffect, useMemo } from "react";
import { FieldValues, SubmitHandler, set, useForm } from 'react-hook-form';
import { Search, XCircle } from "lucide-react"
import IptvChannels from "@/components/Iptv/IptvChannels"
import IptvPlayer from '@/components/Iptv/IptvPlayer'
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function IptvPage(): React.JSX.Element {
    const [iptvPlayerData, setIptvPlayerData] = useState({ url: "", inf: { title: "", tvgLogo: "", groupTitle: "" } })
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState("")
    const [group, setGroup] = useState("")
    const [page, setPage] = useState(1)
    const [searchBy, setSearchBy] = useState("country")
    const [countriesList, setCountriesList] = useState([])
    const [categoriesList, setCategoriesList] = useState([])
    useEffect(() => {
        const fetchIptvCountries = async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_IPTV_API_URL}/countries`)
            const data = await res.json()
            setCountriesList(data)
        }
        const fetchIptvCategories = async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_IPTV_API_URL}/categories`)
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

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setQuery(data.search);
    };

    return (
        <div className="w-full h-full max-h-[100dvh] overflow-scroll">
            <div className="flex gap-y-10 flex-col w-full min-h-[100dvh] h-fit items-center justify-start p-6">
                <div className={`font-bold text-3xl lg:text-[2.5rem] text-center ${iptvPlayerData.url === "" ? " mt-[30dvh]" : "iptv-player-app p-5 sm:p-10 min-w-[50vw] min-h-[50dvh] "}`}>Search TV channel to stream</div>
                {iptvPlayerData.url !== "" && <IptvPlayer playerData={iptvPlayerData} />}
                <form onSubmit={handleSubmit(onSubmit)} className="relative w-full max-w-[600px] flex h-fit items-center justify-center">
                    <Input {...register('search')} placeholder="Enter channel name" className="w-full rounded-3xl dark:bg-white dark:text-black" />
                    <button type="submit" className="absolute right-0 bg-blue-500 hover:bg-blue-700 font-semibold py-0 px-2 rounded-r-full h-full">
                        <Search />
                    </button>
                </form>
                <div className="flex gap-x-2 justify-between items-center max-w-[600px] w-full z-[4]">
                    <div className="shrink-1">
                        <Select onValueChange={(e) => { setSearchBy(e); setPage(1); }}>
                            <SelectTrigger className="
                            w-fit sm:w-[180px] dark:bg-white dark:text-black">
                                <SelectValue placeholder="Search by" />
                            </SelectTrigger>
                            <SelectContent className="dark:bg-white dark:text-black">
                                <SelectGroup ref={(ref) => ref?.addEventListener('touchend', (e) => { e.preventDefault(); })} >
                                    {/* <SelectLabel>Search by</SelectLabel> */}
                                    <SelectItem value="category">Category</SelectItem>
                                    <SelectItem value="country">Country</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex justify-evenly items-center gap-x-2 shrink-1">
                        <Select key={searchBy} onValueChange={(e) => { setGroup(e); setPage(1); }}>
                            <SelectTrigger className="w-fit sm:w-[180px] dark:bg-white dark:text-black">
                                <SelectValue placeholder={`Select ${searchBy}`} />
                            </SelectTrigger>
                            <SelectContent className="dark:bg-white dark:text-black">
                                <SelectGroup ref={(ref) => ref?.addEventListener('touchend', (e) => { e.preventDefault(); })}>
                                    <SelectLabel>Select {searchBy}</SelectLabel>
                                    {searchBy === "category" ? categoriesList.map((category, index) => (
                                        <SelectItem key={index} value={category}>{category}</SelectItem>
                                    )) : countriesList.map((country, index) => (
                                        <SelectItem key={index} value={country}>{country}</SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        {group !== "" && <XCircle className="cursor-pointer" onClick={(e) => { setGroup(""); setPage(1); }} />}
                    </div>
                </div>
                <div className="flex flex-col gap-y-4 w-full h-full">
                    <IptvChannels query={query} setQuery={setQuery} setIptvPlayerData={setIptvPlayerData} searchBy={searchBy} group={group} page={page} setPage={setPage} loading={loading} setLoading={setLoading} />
                </div>
            </div>
        </div>
    )
}
