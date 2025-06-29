import type { User } from '@/common/types/types';
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface AuthState {
  user: User | null;
  isAuth: boolean;
  login: (userData: User) => void;
  logout: () => void;
}


export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuth: false,

      login: (userData: User) => set({ user: userData, isAuth: true }),
      logout: () => set({ user: null, isAuth: false }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
);

export const appSaveUser = (user: User) => {
  console.log(user);
  useAuth.getState().login(user);
}

export default useAuth