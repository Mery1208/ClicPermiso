import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import type { AuthChangeEvent } from '@supabase/supabase-js'
import type { Session } from '@supabase/supabase-js'
import { supabase } from './supabase'
import { useAuthStore } from './store/authStore'
import Login from './components/Login'
import { ProtectedRoute } from './components/ProtectedRoute'
import Layout from './components/layout/Layout'
import AppRoutes from './routes/AppRoutes'
import './index.css'

export default function App() {
  const setSession = useAuthStore((state) => state.setSession)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }: { data: { session: Session | null } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event: AuthChangeEvent, session: Session | null) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        {/* always send root to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<Login />} />

        <Route path="/*" element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="*" element={<AppRoutes />} />
          </Route>
        </Route>

        {/* fallback, should not be reached */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

