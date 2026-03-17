import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface User {
  id: string;
  email: string;
}

interface AuthState {
  user: User | null
  loading: boolean
  setUser: (user: User | null) => void
  signOut: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      loading: false, // In local mode, loading is usually fast
      setUser: (user) => set({ user, loading: false }),
      signOut: () => set({ user: null, loading: false }),
    }),
    {
      name: 'auth-storage',
    }
  )
)
