import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Login'
import { ProtectedRoute } from './components/ProtectedRoute'
import Layout from './components/layout/Layout'
import AppRoutes from './routes/AppRoutes'
import './index.css'

export default function App() {
  // La autenticación ya se carga automáticamente por el persist middleware de zustand
  // No necesitamos useEffect para recuperar la sesión asíncronamente

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

