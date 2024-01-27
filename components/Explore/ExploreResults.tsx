import React, { useState, useEffect } from "react";
import MediaGrid from "@/components/Common/MediaGrid";
import PaginationComponent from "@/components/Common/PaginationComponent";
import { gql, useQuery } from "@apollo/client";
const search = gql`
query DiscoverMedia($type: String, $dategte: String, $datelte: String, $votesAvglte: Float, $votesAvggte: Float, $votesCountlte: Int, $votesCountgte: Int, $sort: String, $genres: String, $page: Int) {
  discoverMedia(type: $type, dategte: $dategte, datelte: $datelte, votesAvglte: $votesAvglte, votesAvggte: $votesAvggte, votesCountlte: $votesCountlte, votesCountgte: $votesCountgte, sort: $sort, genres: $genres, page: $page) {
    currentPage
    hasNextPage
    results {
      ... on Movie {
        adult
        backdrop_path
        id
        title
        original_language
        original_title
        overview
        poster_path
        media_type
        genre_ids
        popularity
        release_date
        video
        vote_average
        vote_count
        streamingId
      }
      ... on TV {
        adult
        backdrop_path
        id
        name
        original_language
        original_name
        overview
        poster_path
        media_type
        genre_ids
        popularity
        first_air_date
        vote_average
        vote_count
        origin_country
        streamingId
      }
      ... on People {
        adult
        biography
        id
        name
        original_name
        media_type
        popularity
        gender
        known_for_department
        profile_path
        known_for {
          ... on Movie {
            adult
            backdrop_path
            id
            title
            original_language
            original_title
            overview
            poster_path
            media_type
            genre_ids
            popularity
            release_date
            video
            vote_average
            vote_count
            streamingId
          }
          ... on TV {
            adult
            backdrop_path
            id
            name
            original_language
            original_name
            overview
            poster_path
            media_type
            genre_ids
            popularity
            first_air_date
            vote_average
            vote_count
            origin_country
            streamingId
          }
          ... on People {
            adult
            biography
            id
            name
            original_name
            media_type
            popularity
            gender
            known_for_department
            profile_path
          }
        }
      }
    }
    total_pages
    total_results
    
  }
}
`;
const ExploreResults = ({ type, dategte, datelte, votesAvglte, votesAvggte, votesCountlte, votesCountgte, sort, genres, page, setPage }: { type: string, dategte: string, datelte: string, votesAvglte: number | undefined, votesAvggte: number | undefined, votesCountlte: number | undefined, votesCountgte: number | undefined, sort: string, genres: string, page: number, setPage: React.Dispatch<React.SetStateAction<number>> }) => {

  const { data, loading } = useQuery(search, {
    variables: { type, dategte, datelte, votesAvglte, votesAvggte, votesCountlte, votesCountgte, sort, genres, page },
  });

  const [mediaData, setMediaData] = useState({
    results: [],
    hasNextPage: false,
    total_results: 0,
    total_pages: 0,
    currentPage: 0
  });
  useEffect(() => {
    setMediaData(data?.discoverMedia)
  }, [data, page])

  return (
    <>
      <div className="w-full flex flex-col gap-y-3">
        {mediaData?.total_results ? <h1 className="text-white text-start font-semibold text-[1rem] pl-5">{mediaData?.total_results} results found</h1> : null}
        <div className="w-full h-full">
          <MediaGrid mediaData={mediaData} loading={loading} />
          <PaginationComponent mediaData={mediaData} page={page} setPage={setPage} />
        </div>
      </div>
    </>
  )
}

export default ExploreResults