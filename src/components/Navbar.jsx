import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import '../styles/Navbar.css'

export default function Navbar() {
  const { user, logout } = useAuth()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const navigate = useNavigate()

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen)
  }

  const handleLogout = () => {
    logout()
    setDropdownOpen(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      toggleDropdown()
    }
  }

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="nav-left">
        <div className="logo-container nav-logo">
          <Link to="/">
            <img src="/logo.png" alt="Chill - Platform Streaming" className="logo-img" />
          </Link>
        </div>
        <ul className="nav-links">
          <li><Link to="/series">Series</Link></li>
          <li><Link to="/" className="active" aria-current="page">Film</Link></li>
          <li><Link to="/mylist">Daftar Saya</Link></li>
        </ul>
      </div>
      <div className="nav-right">
        {user ? (
          <>
            <div
              id="avatar-button"
              className="avatar-container"
              role="button"
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
              tabIndex={0}
              onClick={toggleDropdown}
              onKeyDown={handleKeyDown}
            >
              <img src="/avatar.png" alt="Avatar pengguna" className="avatar-img" />
              <i className="fas fa-caret-down dropdown-icon" aria-hidden="true"></i>
            </div>

            {dropdownOpen && (
              <div className="dropdown show" role="menu" aria-label="Menu pengguna">
                <Link to="/profile" role="menuitem" onClick={() => setDropdownOpen(false)}>
                  <i className="fas fa-user" aria-hidden="true"></i> Profil Saya
                </Link>
                <Link to="/upgrade" role="menuitem" onClick={() => setDropdownOpen(false)}>
                  <i className="fas fa-star" aria-hidden="true"></i> Ubah Premium
                </Link>
                <button onClick={handleLogout} role="menuitem" className="logout-btn">
                  <i className="fas fa-sign-out-alt" aria-hidden="true"></i> Keluar
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="auth-links">
            <Link to="/login" className="btn-login">Masuk</Link>
            <Link to="/register" className="btn-register">Daftar</Link>
          </div>
        )}
      </div>
    </nav>
  )
}