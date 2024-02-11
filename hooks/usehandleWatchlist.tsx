import { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client';
import { useUserDataStore } from '@/store/userDataStore'
import { AddToWatchList, UpdateWatchList, DeleteWatchList } from "@/graphql/queries/GetUserData.gql"
const usehandleWatchlist = (mediaId: string, type: string) => {
    const { userData } = useUserDataStore()
    const [watchlistType, setWatchlistType] = useState<"" | "remove" | "completed" | "watching" | "plan_to_watch" | "on_hold" | "dropped">("")
    const [watchlistId, setWatchlistId] = useState<string>("")
    const [addToWatchList] = useMutation(AddToWatchList);
    const [updateWatchlistItem] = useMutation(UpdateWatchList);
    const [deleteWatchlistItem] = useMutation(DeleteWatchList);

    useEffect(() => {
        const handleWatchlist = async () => {
            try {
                if (watchlistId) {
                    if (watchlistType === "remove") {
                        await deleteWatchlistItem({
                            variables: {
                                itemId: watchlistId,
                                userId: userData?.id,
                            },
                        });
                    }
                    else {
                        await updateWatchlistItem({
                            variables: {
                                itemId: watchlistId,
                                watchListType: watchlistType,
                                userId: userData?.id,
                            },
                        });
                    }
                }
                else {
                    const response = await addToWatchList({
                        variables: {
                            mediaId: mediaId,
                            mediaType: type,
                            watchListType: watchlistType,
                            userId: userData?.id,
                        },
                    });
                    console.log(response)
                    setWatchlistId(response?.data?.addWatchlistItem.id)
                }
            } catch (error) {
                console.error(error);
            }
        };
        if (watchlistType && userData?.watchlist?.watchListType !== watchlistType) {
            handleWatchlist()
            if (watchlistType === "remove") {
                setWatchlistType("")
            }
        }
    }, [watchlistType, userData, mediaId, type])

    useEffect(() => {
        userData?.watchlist?.forEach((watchlistItem: any) => {
            if (watchlistItem.mediaId === mediaId) {
                setWatchlistType(watchlistItem.watchListType)
                setWatchlistId(watchlistItem.id)
            }
        })
    }, [userData, mediaId])
    return { watchlistType, setWatchlistType }
}
export default usehandleWatchlist;
