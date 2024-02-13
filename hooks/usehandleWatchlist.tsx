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
    const watchlistItem = watchlistState?.find((watchlistItem: any) => watchlistItem.mediaId === mediaId)

    useEffect(() => {
        const handleAddToWatchlist = async () => {
            try {
                const response = await addToWatchList({
                    variables: {
                        mediaId: mediaId,
                        mediaType: type,
                        watchListType: watchlistType,
                        userId: userData?.id,
                    },
                });
                if (response.errors) {
                    return response
                }
                // console.log("add to watchlist")
                setWatchlistState([...watchlistState, response.data.addWatchlistItem])
                // console.log([...watchlistState, response.data.addWatchlistItem])
            } catch (error) {
                console.error(error);
            }
        }
        const handleDeleteWatchlist = async (watchlistItem: any) => {
            try {
                setWatchlistState(watchlistState.filter((item: any) => item.id !== watchlistItem.id))
                // console.log(watchlistState.filter((item: any) => item.id !== watchlistItem.id))
                const response = await deleteWatchlistItem({
                    variables: {
                        itemId: watchlistItem.id,
                        userId: userData?.id,
                    },
                });
                setWatchlistState(watchlistState.filter((item: any) => item.id !== watchlistItem.id))
                // console.log(watchlistState.filter((item: any) => item.id !== watchlistItem.id))
                // console.log(response?.data?.deleteWatchlistItem)
                return response
            } catch (error) {
                console.error(error);
            }
        }
        const handleUpdateWatchlist = async (watchlistItem: any) => {
            try {
                const updatedWatchlist = watchlistState.filter((item: any) => item.id !== watchlistItem.id)
                setWatchlistState([...updatedWatchlist, { ...watchlistItem, watchListType: watchlistType }])
                // console.log("updateWatchlistItem")
                // console.log([...updatedWatchlist, { ...watchlistItem, watchListType: watchlistType }])
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
        // console.log("running this useEffect")
        if (!watchlistItem && watchlistType) {
            // console.log("Initial watchlistState")
            // console.log(watchlistState)
            handleAddToWatchlist()
        }
        else if (watchlistItem && watchlistType === "") {
            // console.log("Initial watchlistState")
            // console.log(watchlistState)
            handleDeleteWatchlist(watchlistItem)
        }
        else if (watchlistItem && watchlistType && watchlistItem?.watchListType !== watchlistType) {
            // console.log("Initial watchlistState")
            // console.log(watchlistState)
            handleUpdateWatchlist(watchlistItem)
        }

    }, [watchlistType, mediaId, type])

    useEffect(() => {
        // console.log("running this 2nd useEffect")
        if (!watchlistItem) {
            setWatchlistType("");
        }
        if (watchlistItem) {
            setWatchlistType(watchlistItem.watchListType);
        }
    }, [watchlistItem, mediaId]);

    return { watchlistType, setWatchlistType }
}
export default usehandleWatchlist;
