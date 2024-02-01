import React, { useState, useEffect } from "react";
import MediaGrid from "@/components/Common/MediaGrid";
import PaginationComponent from "@/components/Common/PaginationComponent";
import { gql, useQuery } from "@apollo/client";
import GetbyQuery from "@/graphql/queries/GetbyQuery.gql";
const SearchResults = ({ query, searchType, page, setPage }: { query: string, searchType: string, page: number, setPage: (page: number) => void }) => {
    const { data, loading } = useQuery(GetbyQuery, {
        variables: { query, page },
    });
    const [mediaData, setMediaData] = useState({
        results: [],
        hasNextPage: false,
        total_results: 0,
        total_pages: 0,
        currentPage: 0
    });
    useEffect(() => {
        if (searchType === "any") {
            setMediaData(data?.getAnybyQuery)
        } else if (searchType === "movie") {
            setMediaData(data?.getMoviebyQuery)
        } else if (searchType === "tv") {
            setMediaData(data?.getTvbyQuery)
        } else if (searchType === "people") {
            setMediaData(data?.getpeoplebyQuery)
        }
    }, [data, query, searchType, page])
    return (
        <>
            <div className="w-full max-h-[100dvh] flex flex-col gap-y-3">
                {query && <h1 className="text-white text-start font-semibold text-[1rem]">{mediaData?.total_results} results found for {query}</h1>}
                <div className="overflow-scroll h-full pb-[100px] sm:pb-[30px]">
                    <MediaGrid mediaData={mediaData} loading={loading} />
                    <PaginationComponent mediaData={mediaData} page={page} setPage={setPage} />
                </div>
            </div>
        </>
    )
}

export default SearchResults