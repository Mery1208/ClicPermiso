import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Session, User } from '@supabase/supabase-js'

interface AuthState {
  user: User | null
  session: Session | null
  loading: boolean
  setSession: (session: Session | null) => void
  signOut: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      session: null,
      loading: true,
      setSession: (session) =>
        set((state) => {
          if (
            state.session?.access_token === session?.access_token &&
            state.session?.refresh_token === session?.refresh_token
          ) {
            return { ...state, loading: false }
          }
          return {
            session,
            user: session?.user ?? null,
            loading: false,
          }
        }),
      signOut: () => set({ user: null, session: null, loading: false }),
    }),
    {
      name: 'auth-storage',
    }
  )
)
