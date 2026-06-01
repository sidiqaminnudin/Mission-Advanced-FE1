import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import '../styles/Auth.css'

export default function Login() {
  const { login } = useAuth()
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username harus diisi'
    }
    
    if (!formData.password) {
      newErrors.password = 'Password harus diisi'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setLoading(true)
    const result = await login(formData.username, formData.password)
    
    if (!result.success) {
      setErrors({ general: result.error || 'Login gagal' })
    }
    setLoading(false)
  }

  const handleGoogleLogin = () => {
    alert('Login dengan Google akan segera hadir!')
  }

  const handleForgotPassword = (e) => {
    e.preventDefault()
    alert('Fitur lupa password akan segera hadir!')
  }

  return (
    <div className="auth-wrapper login">
      <div className="auth-card">
        <div className="auth-header">
          <img src="/logo.png" alt="Chill Logo" />
          <h2>Masuk</h2>
          <p>Selamat datang kembali!</p>
        </div>

        <form onSubmit={handleSubmit}>
          {errors.general && (
            <div className="error-message general">{errors.general}</div>
          )}

          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={errors.username ? 'error' : ''}
              placeholder="Masukkan username"
              autoComplete="username"
              disabled={loading}
            />
            {errors.username && (
              <span className="error-message" id="username-error">
                {errors.username}
              </span>
            )}
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? 'error' : ''}
                placeholder="Masukkan password"
                autoComplete="current-password"
                disabled={loading}
              />
              <button
                type="button"
                className="eye-icon"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
                disabled={loading}
              >
                <i className={`fas ${showPassword ? 'fa-eye' : 'fa-eye-slash'}`} aria-hidden="true"></i>
              </button>
            </div>
            {errors.password && (
              <span className="error-message" id="password-error">
                {errors.password}
              </span>
            )}
          </div>

          <div className="auth-action">
            <label>
              <input type="checkbox" /> Ingat saya
            </label>
            <a href="#" onClick={handleForgotPassword}>
              Lupa password?
            </a>
          </div>

          <button
            type="submit"
            className={`auth-button ${loading ? 'loading' : ''}`}
            disabled={loading}
          >
            Masuk
          </button>

          <button
            type="button"
            className="auth-button google-button"
            onClick={handleGoogleLogin}
            disabled={loading}
          >
            <img src="/google-icon.png" alt="" />
            Masuk dengan Google
          </button>

          <p>
            Belum punya akun? <Link to="/register">Daftar</Link>
          </p>
        </form>
      </div>
    </div>
  )
}