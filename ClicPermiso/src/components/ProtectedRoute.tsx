import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

//aqui se dice las rutas q van a estar protegidas y  
//si no hay sesion te redirige al login
export const ProtectedRoute = () => {
  const session = useAuthStore((state) => state.session)
  const loading = useAuthStore((state) => state.loading)

  if (loading) return <div>Cargando autenticación...</div>

  if (!session) return <Navigate to="/login" replace />

  return <Outlet />
}
