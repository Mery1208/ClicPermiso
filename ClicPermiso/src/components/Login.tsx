import { useState } from 'react'
import { supabase } from '../supabase'
import { useNavigate } from 'react-router-dom'

import './Login.css'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isRegister, setIsRegister] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    let error = null

    if (isRegister) {
      const result = await supabase.auth.signUp({ email, password })
      error = result.error
    } else {
      const result = await supabase.auth.signInWithPassword({ email, password })
      error = result.error
    }

    if (error) {
      alert(error.message)
    } else {
      // siempre redirigir a sol-diurno tras autenticación o registro
      navigate('/sol-diurno')
    }
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
