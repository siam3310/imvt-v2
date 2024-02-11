import { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client';
import { useUserDataStore } from '@/store/userDataStore'
import { useWatchlistDataStore } from '@/store/watchlistDataStore'
import { AddToWatchList, UpdateWatchList, DeleteWatchList } from "@/graphql/queries/GetUserData.gql"
const usehandleWatchlist = (mediaId: string, type: string) => {
    const { userData } = useUserDataStore()
    const { watchlistState, setWatchlistState } = useWatchlistDataStore()
    const [watchlistType, setWatchlistType] = useState<null | "" | "completed" | "watching" | "plan_to_watch" | "on_hold" | "dropped">(null)
    const [addToWatchList] = useMutation(AddToWatchList);
    const [updateWatchlistItem] = useMutation(UpdateWatchList);
    const [deleteWatchlistItem] = useMutation(DeleteWatchList);

    useEffect(() => {
        const handleAddToWatchlist = async () => {
            try {
                console.log("watchlistType")
                console.log(watchlistType)
                const response = await addToWatchList({
                    variables: {
                        mediaId: mediaId,
                        mediaType: type,
                        watchListType: watchlistType,
                        userId: userData?.id,
                    },
                });
                // console.log("add to watchlist")
                // console.log([...watchlistState, response.data.addWatchlistItem])
                setWatchlistState([...watchlistState, response.data.addWatchlistItem])
            } catch (error) {
                console.error(error);
            }
        }
        const handleDeleteWatchlist = async (watchlistItem: any) => {
            try {
                // console.log("deleteWatchlistItem")
                // console.log(userData?.watchlist)
                setWatchlistState(userData?.watchlist.filter((item: any) => item.id !== watchlistItem.id))
                // console.log(watchlistState.filter((item: any) => item.id !== watchlistItem.id))
                return await deleteWatchlistItem({
                    variables: {
                        itemId: watchlistItem.id,
                        userId: userData?.id,
                    },
                });
            } catch (error) {
                console.error(error);
            }
        }
        const handleUpdateWatchlist = async (watchlistItem: any) => {
            try {
                console.log("updateWatchlistItem")
                console.log(userData?.watchlist)
                setWatchlistState([...userData?.watchlist, { ...watchlistItem, watchListType: watchlistType }])
                return await updateWatchlistItem({
                    variables: {
                        itemId: watchlistItem.id,
                        watchListType: watchlistType,
                        userId: userData?.id,
                    },
                });
            } catch (error) {
                console.error(error);
            }
        };
        const watchlistItem = watchlistState?.find((watchlistItem: any) => watchlistItem.mediaId === mediaId)
        // console.log("watchlistState")
        // console.log(watchlistState)
        if (!watchlistItem && watchlistType) {
            handleAddToWatchlist()
        }
        else if (watchlistItem && watchlistType === "") {
            handleDeleteWatchlist(watchlistItem)
        }
        else if (watchlistItem && watchlistType && watchlistItem?.watchListType !== watchlistType) {
            handleUpdateWatchlist(watchlistItem)
        }

    }, [watchlistType, mediaId, type])

    useEffect(() => {
        watchlistState?.forEach((watchlistItem: any) => {
            if (watchlistItem.mediaId === mediaId) {
                setWatchlistType(watchlistItem.watchListType);
            }
        });
    }, [userData, mediaId]);

    return { watchlistType, setWatchlistType }
}
export default usehandleWatchlist;
