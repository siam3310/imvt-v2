import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import { gql, useQuery } from "@apollo/client";
import { Star, PlayCircle, ExternalLink } from "lucide-react"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "./ui/pagination"
const search = gql`
query GetbyQuery(
  $query: String!
  $page: Int
) {
getAnybyQuery(query: $query, page: $page) {
    results {
        ... on Movie {
            backdrop_path
            id
            title
            overview
            poster_path
            media_type
            genre_ids
            vote_average
        }
        ... on TV {
            backdrop_path
            id
            name
            overview
            poster_path
            media_type
            genre_ids
            vote_average
        }
        ... on People {
            biography
            id
            name
            original_name
            media_type
            gender
            profile_path
            known_for_department
        }
    }
    currentPage
    hasNextPage
    total_pages
    total_results
}
getMoviebyQuery(query: $query, page: $page) {
    results {
        backdrop_path
        id
        title
        overview
        poster_path
        media_type
        genre_ids
        vote_average
    }
    currentPage
    hasNextPage
    total_pages
    total_results
}
getTvbyQuery(query: $query, page: $page) {
    results {
        backdrop_path
        id
        name
        overview
        poster_path
        media_type
        genre_ids
        vote_average
    }
    currentPage
    hasNextPage
    total_pages
    total_results
}
getpeoplebyQuery(query: $query, page: $page) {
    results {
        biography
        gender
        id
        media_type
        name
        original_name
        profile_path
        known_for_department
    }
    currentPage
    hasNextPage
    total_pages
    total_results
}
}
`;
const MediaGrid = ({ query, searchType, page, setPage }) => {
    const [basis, setBasis] = React.useState('50%'); // initial basis
    const [mediaData, setMediaData] = React.useState({
        results: [],
        hasNextPage: false
    }); // initial basis
    const { data, loading } = useQuery(search, {
        variables: { query, page },
    });
    const handlePreviousPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const handleNextPage = () => {
        if (data.hasNextPage) {
            setPage(page + 1);
        }
    };
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

    if (loading) return <div>Loading...</div>
    return (
        <div className="w-full h-full">
            <div className="w-full h-full flex justify-start">
                <div className="flex flex-wrap w-full justify-start items-center">
                    {mediaData?.results.map((post, index) => (
                        (post.__typename !== "People") ? <div key={index} style={{ flexBasis: basis }} className={`relative min-w-0 shrink-0 grow-0 basis-1/2 h-fit p-2`}>
                            <div className="group clickable">
                                <Link to={`/${post.title ? "movie" : "tv"}/${post.id}`} className="hidden clickable group-hover:flex absolute w-full h-full justify-center items-center pr-5">
                                    <span className="z-[3] clickable"><PlayCircle size={48} color="#ffffff" strokeWidth={3} absoluteStrokeWidth /></span>
                                </Link>
                                <span className='bg-yellow-500 text-white absolute top-3 left-3 z-[3] py-[2px] px-2 text-[0.8rem] rounded-3xl whitespace-nowrap flex items-center'>
                                    <Star fill="white" color='white' width={12} />&nbsp;{parseFloat(post.vote_average).toFixed(1)}
                                </span>
                                <div className='w-full h-fulll'>
                                    <div className="aspect-[2/3]">
                                        <img
                                            className="rounded-t-md group-hover:cursor-pointer group-hover:blur group-hover:scale-90 transition-all duration-300 ease-in-out object-cover w-full h-full"
                                            src={post.poster_path}
                                            alt="Your alt text"
                                        />
                                    </div>
                                    <h2 className="text-gray-900 bg-white rounded-b-md border border-t-2 border-black px-3 text-center whitespace-nowrap overflow-hidden text-ellipsis font-semibold" title={post.name || post.title}>{post.name || post.title}</h2>
                                </div>
                            </div>
                        </div> : <div key={index} style={{ flexBasis: basis }} className={`relative min-w-0 shrink-0 grow-0 basis-1/2 h-fit p-2`}>
                            <div className="group clickable">
                                <Link to={`/people/${post.id}`} className="hidden clickable group-hover:flex absolute w-full h-full justify-center items-center pr-5">
                                    <span className="z-[3] clickable"><ExternalLink size={48} color="#ffffff" strokeWidth={3} absoluteStrokeWidth /></span>
                                </Link>
                                <span className='bg-yellow-500 text-white absolute top-3 left-3 z-[3] py-[2px] px-2 text-[0.8rem] rounded-3xl whitespace-nowrap flex items-center'>
                                    {post.known_for_department}
                                </span>
                                <div className='w-full h-fulll'>
                                    <div className="aspect-[2/3]">
                                        <img
                                            className="rounded-t-md group-hover:cursor-pointer group-hover:blur group-hover:scale-90 transition-all duration-300 ease-in-out object-cover w-full h-full"
                                            src={post.profile_path}
                                            alt="Your alt text"
                                        />
                                    </div>
                                    <h2 className="text-gray-900 bg-white rounded-b-md border border-t-2 border-black px-3 text-center whitespace-nowrap overflow-hidden text-ellipsis font-semibold" title={post.name || post.title}>{post.name || post.title}</h2>
                                </div>
                            </div>
                        </div>
                    )
                    )}
                </div>
            </div>
            {mediaData?.results && mediaData?.total_pages > 1 && <Pagination className="dark text-white mt-3">
                <PaginationContent>
                    {page - 1 !== 0 && <><PaginationItem>
                        <PaginationPrevious onClick={handlePreviousPage} />
                    </PaginationItem>
                        {page > 10 && <><PaginationItem>
                            <PaginationLink onClick={() => setPage(1)}>
                                {1}
                            </PaginationLink>
                        </PaginationItem>
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem></>}
                        <PaginationItem>
                            <PaginationLink onClick={() => setPage(page - 1)}>
                                {page - 1}
                            </PaginationLink>
                        </PaginationItem></>}
                    <PaginationItem>
                        <PaginationLink isActive onClick={() => setPage(2)}>
                            {page}
                        </PaginationLink>
                    </PaginationItem>
                    {mediaData?.hasNextPage && <PaginationItem>
                        <PaginationLink onClick={() => setPage(page + 1)}>
                            {page + 1}
                        </PaginationLink>
                    </PaginationItem>}
                    {mediaData?.hasNextPage && mediaData?.total_pages > page + 1 && <>
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink onClick={() => setPage(mediaData?.total_pages)}>
                                {mediaData?.total_pages}
                            </PaginationLink>
                        </PaginationItem>
                    </>}
                    {mediaData?.hasNextPage && <PaginationItem>
                        <PaginationNext onClick={handleNextPage} />
                    </PaginationItem>}
                </PaginationContent>
            </Pagination>}
        </div>
    )
}

export default MediaGrid
