import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

import './Login.css'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isRegister, setIsRegister] = useState(false)
  const navigate = useNavigate()
  const setUser = useAuthStore((state) => state.setUser)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!email || !password) {
      alert('Por favor ingrese email y contraseña')
      return;
    }

    // Simulamos un login / registro local que siempre es exitoso 
    // y guardamos el usuario en el store global
    const mockUser = {
      id: email, // Usamos el email como id para simplificar
      email: email,
    }
    
    setUser(mockUser)
    navigate('/sol-diurno')
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>{isRegister ? 'Crear cuenta' : 'Iniciar Sesión'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">
            {isRegister ? 'Registrar' : 'Entrar'}
          </button>
        </form>
        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
          {isRegister ? (
            <span>
              ¿Ya tienes cuenta?{' '}
              <button
                className="btn-link"
                onClick={() => setIsRegister(false)}
              >
                Iniciar sesión
              </button>
            </span>
          ) : (
            <span>
              ¿No tienes cuenta?{' '}
              <button
                className="btn-link"
                onClick={() => setIsRegister(true)}
              >
                Regístrate
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
