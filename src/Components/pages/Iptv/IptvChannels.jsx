import React, { useState, useEffect, useMemo } from 'react'
import PaginationComponent from '../../utils/PaginationComponent'
import { XCircle, PlayCircle } from "lucide-react"
const IptvChannels = ({ query, setQuery, setIptvPlayerData, searchBy, group, page, setPage }) => {
    const [iptvData, setIptvData] = useState({})
    const [basis, setBasis] = React.useState('50%'); // initial basis

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width > 600) {
                var newBasis = 100 / Math.floor(width / 200);
            } else {
                var newBasis = 100 / Math.floor(width / 150);
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


    const fetchIptvChannels = useMemo(() => (async () => {
        const url = `${import.meta.env.VITE_IPTV_API_URL}/${searchBy}?group=${group}&search=${query}&page=${page}`
        const res = await fetch(url)
        const data = await res.json()
        setIptvData(data);
    }), [searchBy, group, query, page]);

    useEffect(() => {
        fetchIptvChannels();
    }, [fetchIptvChannels]);
    return (
        <div className="w-full max-h-[100dvh] flex flex-col gap-y-3">
            {query && <h1 className="text-white text-start font-semibold text-[1rem] flex gap-x-3">{iptvData?.totalResults} {iptvData?.totalResults > 1 ? "results" : "result"} found for {query}<XCircle className="cursor-pointer" onClick={(e) => setQuery("")} /></h1>}
            <div className="h-full pb-5">
                <div className="w-full h-fit">
                    <div className="w-full h-full flex justify-start">
                        <div className="flex flex-wrap w-full justify-start items-center">
                            {iptvData?.results?.map((iptv, index) => (
                                <div key={index} style={{ flexBasis: basis }} onClick={() => setIptvPlayerData(iptv)} className={`relative min-w-0 shrink-0 grow-0 basis-1/2 h-fit p-2`}>
                                    <div className="group clickable">
                                        <button className="hidden clickable group-hover:flex absolute w-full aspect-[2/3] group-hover:z-[3] justify-center items-center pr-5">
                                            <span className="z-[3] clickable"><PlayCircle size={48} color="#ffffff" strokeWidth={3} absoluteStrokeWidth /></span>
                                        </button>
                                        <div className='w-full h-full'>
                                            <div className="aspect-[2/3]">
                                                <img
                                                    className="flex justify-center items-center rounded-t-md group-hover:cursor-pointer group-hover:blur group-hover:scale-90 transition-all duration-300 ease-in-out object-contain bg-gray-200 w-full h-full"
                                                    src={iptv.inf.tvgLogo}
                                                    alt="Logo Not Found"
                                                />
                                            </div>
                                            <h2 className="text-gray-900 bg-white border  px-3 text-center whitespace-nowrap overflow-hidden text-ellipsis font-semibold" title={iptv.inf.title}>{iptv.inf.title}</h2>
                                            <h2 onClick={(e) => setQuery(iptv.inf.groupTitle)} className="bg-white rounded-b-md border px-3 text-center whitespace-nowrap overflow-hidden text-ellipsis font-semibold text-blue-600 cursor-pointer" title={iptv.inf.groupTitle}>{iptv.inf.groupTitle}</h2>
                                        </div>
                                    </div>
                                </div>
                            )
                            )}
                        </div>
                    </div>
                </div>
                <PaginationComponent mediaData={{ "total_pages": iptvData.totalPages, ...iptvData }} page={page} setPage={setPage} />
            </div>
        </div>

    )
}

export default IptvChannels