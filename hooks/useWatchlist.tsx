import { useState, useEffect } from 'react';
import { GetMoviebyId, GetTvbyId, GetAnimebyId } from "@/graphql/queries/WatchlistQuery.gql";
import { useApolloClient } from '@apollo/client';
import { useWatchlistDataStore } from '@/store/watchlistDataStore'
const useWatchlist = (watchlist: any[]) => {
    const { watchlistState, setWatchlistState } = useWatchlistDataStore()
    const [mediaList, setMediaList] = useState<any>({ movie: [], tv: [], anime: [] });
    const [loading, setLoading] = useState(true);
    const client = useApolloClient();

    useEffect(() => {
        const fetchMedia = async () => {
            setLoading(true);
            setMediaList({ movie: [], tv: [], anime: [] });
            const promises = watchlistState.map((media: any) => {
                if (media.mediaType === 'movie') {
                    return client.query({
                        query: GetMoviebyId,
                        variables: { tmdbId: media.mediaId },
                    });
                }
                else if (media.mediaType === 'tv') {
                    return client.query({
                        query: GetTvbyId,
                        variables: { tmdbId: media.mediaId },
                    });
                }
                else {
                    return client.query({
                        query: GetAnimebyId,
                        variables: { id: media.mediaId },
                    });
                }
            });
            const results = await Promise.all(promises);
            // console.log("results")
            // console.log(results)
            const newMediaList: { movie: any[], tv: any[], anime: any[] } = { movie: [], tv: [], anime: [] };
            results.forEach((result: any) => {
                if (result?.data?.getMoviebyId) {
                    newMediaList.movie.push(result?.data?.getMoviebyId);
                } else if (result?.data?.getTvbyId) {
                    newMediaList.tv.push(result?.data?.getTvbyId);
                } else {
                    newMediaList.anime.push(result?.data?.getAnimebyId);
                }
            });
            setMediaList(newMediaList);
            if (results.length > 0) {
                setLoading(results[results.length - 1].loading);
            }
        };

        if (watchlistState.length > 0) {
            fetchMedia();
        } else {
            setLoading(false);
        }

    }, [watchlistState]);

    return { mediaList, loading };
};

export default useWatchlist;