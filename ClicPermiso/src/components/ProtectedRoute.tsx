import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

export const ProtectedRoute = () => {
  const session = useAuthStore((state) => state.session)
  const loading = useAuthStore((state) => state.loading)

  if (loading) return <div>Cargando autenticación...</div>

  if (!session) return <Navigate to="/login" replace />

  return <Outlet />
}
