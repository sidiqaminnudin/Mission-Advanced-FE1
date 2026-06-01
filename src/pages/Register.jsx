import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import '../styles/Auth.css'

export default function Register() {
  const { register } = useAuth()
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

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
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username minimal 3 karakter'
    } else if (formData.username.length > 20) {
      newErrors.username = 'Username maksimal 20 karakter'
    }
    
    if (!formData.password) {
      newErrors.password = 'Password harus diisi'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password minimal 8 karakter'
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Konfirmasi password harus diisi'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Password tidak cocok'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setLoading(true)
    const result = await register(formData.username, formData.password)
    
    if (!result.success) {
      setErrors({ general: result.error || 'Registrasi gagal' })
    }
    setLoading(false)
  }

  const handleGoogleRegister = () => {
    alert('Daftar dengan Google akan segera hadir!')
  }

  return (
    <div className="auth-wrapper register">
      <div className="auth-card">
        <div className="auth-header">
          <img src="/logo.png" alt="Chill Logo" />
          <h2>Daftar</h2>
          <p>Selamat datang!</p>
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
              minLength={3}
              maxLength={20}
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
                autoComplete="new-password"
                disabled={loading}
                minLength={8}
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

          <div className="input-group">
            <label htmlFor="confirmPassword">Konfirmasi Password</label>
            <div className="input-wrapper">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={errors.confirmPassword ? 'error' : ''}
                placeholder="Masukkan password sekali lagi"
                autoComplete="new-password"
                disabled={loading}
              />
              <button
                type="button"
                className="eye-icon"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label={showConfirmPassword ? 'Sembunyikan password' : 'Tampilkan password'}
                disabled={loading}
              >
                <i className={`fas ${showConfirmPassword ? 'fa-eye' : 'fa-eye-slash'}`} aria-hidden="true"></i>
              </button>
            </div>
            {errors.confirmPassword && (
              <span className="error-message" id="confirm-password-error">
                {errors.confirmPassword}
              </span>
            )}
          </div>

          <button
            type="submit"
            className={`auth-button ${loading ? 'loading' : ''}`}
            disabled={loading}
          >
            Daftar
          </button>

          <button
            type="button"
            className="auth-button google-button"
            onClick={handleGoogleRegister}
            disabled={loading}
          >
            <img src="/google-icon.png" alt="" />
            Daftar dengan Google
          </button>

          <p>
            Sudah punya akun? <Link to="/login">Masuk</Link>
          </p>
        </form>
      </div>
    </div>
  )
}