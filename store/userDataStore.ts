import { create } from 'zustand';

type UserDataStore = {
  userData: any;
  setUserData: (userData: any) => void;
};
export const useUserDataStore = create<UserDataStore>((set) => ({
  userData: null,
  setUserData: (userData) => set({ userData }),
}));
