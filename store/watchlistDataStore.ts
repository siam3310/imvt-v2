import { create } from 'zustand'

type watchlistDataStore = {
  watchlistState: any
  setWatchlistState: (userData: any) => void
}

export const useWatchlistDataStore = create<watchlistDataStore>((set) => ({
  watchlistState: [],
  setWatchlistState: (watchlistState) => set({ watchlistState }),
}))
