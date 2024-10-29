import { UserData } from '@/types/user';
import { create } from 'zustand';

interface UserStore {
  userData: UserData | null;
  setUserData: (userData: UserData | null) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  userData: null,
  setUserData: (userData) => set({ userData })
}));