import { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import Navbar from '../components/Navbar'
import '../styles/App.css'

export default function Upgrade() {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
    }
  }, [isAuthenticated, navigate])

  if (!isAuthenticated) {
    return null
  }

  return (
    <div>
      <Navbar />
      
      <main className="section">
        <div className="container">
          <section className="card panel" style={{ textAlign: 'center', marginBottom: '24px' }}>
            <h1 className="section-title">Kenapa Harus Berlangganan?</h1>
            <p className="section-subtitle">
              Semua fitur premium dari desain kamu aku teruskan ke HTML/CSS native.
            </p>
            <div className="grid grid-3" style={{ marginTop: '24px' }}>
              <div>
                <i className="fa-solid fa-download" style={{ fontSize: '24px', marginBottom: '10px' }}></i>
                <div>Download Konten Pilihan</div>
              </div>
              <div>
                <i className="fa-solid fa-ban" style={{ fontSize: '24px', marginBottom: '10px' }}></i>
                <div>Tidak Ada Iklan</div>
              </div>
              <div>
                <i className="fa-solid fa-film" style={{ fontSize: '24px', marginBottom: '10px' }}></i>
                <div>Tonton Semua Konten</div>
              </div>
              <div>
                <i className="fa-solid fa-tv" style={{ fontSize: '24px', marginBottom: '10px' }}></i>
                <div>Kualitas Maksimal Sampai Dengan 4K</div>
              </div>
              <div>
                <i className="fa-solid fa-mobile-screen-button" style={{ fontSize: '24px', marginBottom: '10px' }}></i>
                <div>Tonton di TV, Tablet, Mobile, dan Laptop</div>
              </div>
              <div>
                <i className="fa-regular fa-closed-captioning" style={{ fontSize: '24px', marginBottom: '10px' }}></i>
                <div>Subtitle untuk Konten Pilihan</div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="section-title" style={{ textAlign: 'center' }}>Pilih Paketmu</h2>
            <p className="section-subtitle" style={{ textAlign: 'center' }}>
              Temukan paket sesuai kebutuhanmu.
            </p>
            <div className="package-grid">
              <article className="card package-card">
                <h3 className="package-name">Individual</h3>
                <div className="price">
                  Rp49.990<span className="small">/bulan</span>
                </div>
                <ul className="feature-list">
                  <li>
                    <i className="fa-solid fa-check"></i> 1 Akun
                  </li>
                  <li>
                    <i className="fa-solid fa-check"></i> Tidak ada iklan
                  </li>
                  <li>
                    <i className="fa-solid fa-check"></i> Kualitas 720p
                  </li>
                  <li>
                    <i className="fa-solid fa-check"></i> Download konten pilihan
                  </li>
                </ul>
                <Link className="btn btn-primary" to="/payment">
                  Langganan
                </Link>
              </article>

              <article className="card package-card featured">
                <h3 className="package-name">Berdua</h3>
                <div className="price">
                  Rp79.990
                  <span className="small" style={{ color: 'rgba(255,255,255,.8)' }}>
                    /bulan
                  </span>
                </div>
                <ul className="feature-list" style={{ color: 'rgba(255,255,255,.88)' }}>
                  <li>
                    <i className="fa-solid fa-check"></i> 2 Akun
                  </li>
                  <li>
                    <i className="fa-solid fa-check"></i> Tidak ada iklan
                  </li>
                  <li>
                    <i className="fa-solid fa-check"></i> Kualitas 1080p
                  </li>
                  <li>
                    <i className="fa-solid fa-check"></i> Download konten pilihan
                  </li>
                </ul>
                <Link 
                  className="btn" 
                  to="/payment"
                  style={{ background: '#fff', color: '#2236cb' }}
                >
                  Langganan
                </Link>
              </article>

              <article className="card package-card">
                <h3 className="package-name">Keluarga</h3>
                <div className="price">
                  Rp159.990<span className="small">/bulan</span>
                </div>
                <ul className="feature-list">
                  <li>
                    <i className="fa-solid fa-check"></i> 5-7 Akun
                  </li>
                  <li>
                    <i className="fa-solid fa-check"></i> Tidak ada iklan
                  </li>
                  <li>
                    <i className="fa-solid fa-check"></i> Kualitas 4K
                  </li>
                  <li>
                    <i className="fa-solid fa-check"></i> Download konten pilihan
                  </li>
                </ul>
                <Link className="btn btn-primary" to="/payment">
                  Langganan
                </Link>
              </article>
            </div>
          </section>
        </div>
      </main>

      <footer className="footer">
        <div className="container footer-grid">
          <div>
            <img src="/logo.png" alt="Chill" className="logo-img" />
            <p className="text-muted">@2026 Chill All Rights Reserved.</p>
          </div>
          <div>
            <h4>Genre</h4>
            <ul>
              <li>Aksi</li>
              <li>Anime</li>
              <li>Drama</li>
              <li>Komedi</li>
              <li>Thriller</li>
            </ul>
          </div>
          <div>
            <h4>Bantuan</h4>
            <ul>
              <li>FAQ</li>
              <li>Kontak Kami</li>
              <li>Privasi</li>
              <li>Syarat & Ketentuan</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  )
}