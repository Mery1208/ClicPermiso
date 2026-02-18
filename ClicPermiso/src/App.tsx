// esto es lo principal de la app

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import AppRoutes from './routes/AppRoutes';
import './index.css';
import { useEffect } from 'react'
import { supabase } from './supabase'
import { useAuthStore } from './store/authStore'
import Login from './components/Login'
import { ProtectedRoute } from './components/ProtectedRoute'


const Dashboard = () => {
  const signOut = useAuthStore((state) => state.signOut)
  
  const handleLogout = async () => {
    await supabase.auth.signOut()
    signOut()
  }

  return (
    <div>
      <h1>Bienvenido al Área Privada</h1>
      <p>Solo puedes ver esto si estás logueado.</p>
      <button onClick={handleLogout}>Cerrar Sesión</button>
    </div>
  )
}

function App() {

  const setSession = useAuthStore((state) => state.setSession)

  useEffect(() => {
    // 1. Obtener sesión inicial
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    // 2. Escuchar cambios (login, logout, token refresh) en tiempo real
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [setSession])

  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta Pública */}
        <Route path="/login" element={<Login />} />

        {/* Rutas Protegidas */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          {/* Puedes agregar más rutas privadas aquí */}
        </Route>
        
        {/* Redirección por defecto */}
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;

