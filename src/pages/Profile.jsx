import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useMyList } from '../contexts/MyListContext'
import Navbar from '../components/Navbar'
import '../styles/Home.css'

export default function Profile() {
  const { isAuthenticated, user } = useAuth()
  const { myListMovies } = useMyList()
  const navigate = useNavigate()

  // Local state for editable profile fields
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('••••••••••••')
  const [isEditingUsername, setIsEditingUsername] = useState(false)
  const [isEditingPassword, setIsEditingPassword] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
    } else {
      // Initialize form fields with user data
      setUsername(user?.username || '')
      setEmail(user?.email || '')
    }
  }, [isAuthenticated, navigate, user])

  if (!isAuthenticated) {
    return null
  }

  const handleSave = () => {
    // In a real app, this would make an API call to update user profile
    console.log('Saving profile:', { username, email, password })
    alert('Profil berhasil disimpan!')
    setIsEditingUsername(false)
    setIsEditingPassword(false)
  }

  const handlePhotoChange = () => {
    // In a real app, this would open a file picker
    alert('Fitur ubah foto akan segera hadir!')
  }

  // Get first 6 movies for "Daftar Saya" preview
  const previewMovies = myListMovies.slice(0, 6)

  return (
    <div className="home-page">
      <Navbar />
      
      <main className="content-wrapper" style={{ padding: '60px', minHeight: '80vh' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '40px' }}>Profil Saya</h1>
        
        <div style={{ 
          display: 'flex',
          gap: '60px',
          marginBottom: '60px',
          flexWrap: 'wrap'
        }}>
          {/* Profile Section */}
          <div style={{ flex: '0 0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
              <img 
                src="/avatar.png" 
                alt="Profile" 
                style={{ 
                  width: '120px', 
                  height: '120px', 
                  borderRadius: '50%',
                  marginBottom: '20px',
                  objectFit: 'cover'
                }} 
              />
              <button
                onClick={handlePhotoChange}
                style={{
                  background: 'transparent',
                  border: '2px solid #0f1e93',
                  color: '#0f1e93',
                  padding: '8px 20px',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  margin: '0 auto'
                }}
              >
                <span>📁</span>
                Ubah Foto
              </button>
              <p style={{ color: '#999', fontSize: '12px', marginTop: '8px' }}>
                Maksimal 2MB
              </p>
            </div>
            
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '20px',
              minWidth: '400px'
            }}>
              {/* Username Field */}
              <div>
                <label style={{ 
                  color: '#999', 
                  fontSize: '14px',
                  display: 'block',
                  marginBottom: '8px'
                }}>
                  Nama Pengguna
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    disabled={!isEditingUsername}
                    style={{
                      width: '100%',
                      padding: '12px 40px 12px 12px',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '16px',
                      outline: 'none'
                    }}
                  />
                  <button
                    onClick={() => setIsEditingUsername(!isEditingUsername)}
                    style={{
                      position: 'absolute',
                      right: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'transparent',
                      border: 'none',
                      color: '#999',
                      cursor: 'pointer',
                      fontSize: '18px'
                    }}
                  >
                    ✏️
                  </button>
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label style={{ 
                  color: '#999', 
                  fontSize: '14px',
                  display: 'block',
                  marginBottom: '8px'
                }}>
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '16px',
                    outline: 'none'
                  }}
                />
              </div>

              {/* Password Field */}
              <div>
                <label style={{ 
                  color: '#999', 
                  fontSize: '14px',
                  display: 'block',
                  marginBottom: '8px'
                }}>
                  Kata Sandi
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={isEditingPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={!isEditingPassword}
                    style={{
                      width: '100%',
                      padding: '12px 40px 12px 12px',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '16px',
                      outline: 'none'
                    }}
                  />
                  <button
                    onClick={() => setIsEditingPassword(!isEditingPassword)}
                    style={{
                      position: 'absolute',
                      right: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'transparent',
                      border: 'none',
                      color: '#999',
                      cursor: 'pointer',
                      fontSize: '18px'
                    }}
                  >
                    ✏️
                  </button>
                </div>
              </div>

              {/* Save Button */}
              <button
                onClick={handleSave}
                style={{
                  background: '#0f1e93',
                  color: '#fff',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: '600',
                  marginTop: '10px'
                }}
              >
                Simpan
              </button>
            </div>
          </div>

          {/* Subscription Prompt (Optional - shown in image_5.png) */}
          <div style={{
            flex: '1',
            background: 'rgba(255,255,255,0.05)',
            padding: '30px',
            borderRadius: '12px',
            minWidth: '300px'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '48px', marginBottom: '20px' }}>🎉</div>
              <h3 style={{ marginBottom: '15px', fontSize: '1.3rem' }}>
                Saat ini anda belum berlangganan
              </h3>
              <p style={{ color: '#999', marginBottom: '25px', lineHeight: '1.6' }}>
                Dapatkan Akses Tak Terbatas ke Ribuan Film dan Series Kesukaan Kamu!
              </p>
              <button
                onClick={() => navigate('/upgrade')}
                style={{
                  background: '#0f1e93',
                  color: '#fff',
                  padding: '12px 32px',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: '600'
                }}
              >
                Mulai Berlangganan
              </button>
            </div>
          </div>
        </div>

        {/* Daftar Saya Section */}
        <div style={{ marginTop: '60px' }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '30px'
          }}>
            <h2 style={{ fontSize: '2rem', margin: 0 }}>Daftar Saya</h2>
            <a 
              href="/mylist"
              onClick={(e) => {
                e.preventDefault()
                navigate('/mylist')
              }}
              style={{ 
                color: '#0f1e93', 
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: '600'
              }}
            >
              Lihat Semua
            </a>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
            gap: '20px'
          }}>
            {previewMovies.map((movie) => (
              <div 
                key={movie.id}
                style={{
                  position: 'relative',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  cursor: 'pointer'
                }}
              >
                <img 
                  src={movie.image} 
                  alt={movie.alt}
                  style={{
                    width: '100%',
                    aspectRatio: '0.685 / 1',
                    objectFit: 'cover',
                    display: 'block',
                    borderRadius: '10px'
                  }}
                />
                {movie.hasNewEpisode && (
                  <span style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    background: '#0f1e93',
                    color: '#fff',
                    padding: '8px 12px',
                    fontSize: '11px',
                    fontWeight: '700',
                    borderRadius: '0 0 10px 0'
                  }}>
                    Episode Baru
                  </span>
                )}
                {movie.isTop10 && (
                  <span style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    background: '#b71f1d',
                    color: '#fff',
                    padding: '8px 8px 6px',
                    fontSize: '11px',
                    fontWeight: '700',
                    lineHeight: '1.1',
                    textAlign: 'center',
                    borderRadius: '0 0 0 10px'
                  }}>
                    Top<br />10
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}