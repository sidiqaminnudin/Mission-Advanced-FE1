import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import Navbar from '../components/Navbar'
import '../styles/Home.css'

export default function Home() {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      navigate('/login')
    }
  }, [isAuthenticated, navigate])

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="home-page">
      <a href="#main-content" className="skip-link">Skip to main content</a>
      
      <Navbar />

      <header className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Duty After School</h1>
          <p className="hero-desc">
            Sebuah benda tak dikenal mengambil alih dunia. Dalam keputusasaan,
            Departemen Pertahanan mulai merekrut siswa sekolah menengah. Mereka
            pun segera menjadi pejuang garis depan.
          </p>
          <div className="hero-buttons">
            <button className="btn-primary" aria-label="Mulai menonton">Mulai</button>
            <button className="btn-secondary" aria-label="Lihat informasi selengkapnya">
              <i className="fa-solid fa-circle-info" aria-hidden="true"></i> Selengkapnya
            </button>
            <span className="age-tag" aria-label="Rating usia 18 tahun ke atas">18+</span>
            <button className="mute-button" aria-label="Matikan suara">
              <i className="fa-solid fa-volume-xmark" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </header>

      <main className="content-wrapper" id="main-content">
        <section className="movie-section" aria-labelledby="continue-watching">
          <h3 className="section-title" id="continue-watching">Melanjutkan Tonton Film</h3>
          <div className="movie-scroll-container">
            <MovieCard 
              image="/images/movie1.png"
              title="Don't Look Up"
              rating="4.5/5"
              wide
            />
            <MovieCard 
              image="/images/movie2.png"
              title="All of Us Are Dead"
              rating="4.2/5"
              wide
            />
            <MovieCard 
              image="/images/movie3.png"
              title="Blue Lock"
              rating="4.6/5"
              badge="Episode Baru"
              wide
            />
            <MovieCard 
              image="/images/movie4.png"
              title="A Man Called Otto"
              rating="4.4/5"
              wide
            />
          </div>
        </section>

        <section className="movie-section" aria-labelledby="top-rating">
          <h3 className="section-title" id="top-rating">Top Rating Film dan Series Hari ini</h3>
          <div className="movie-scroll-container">
            <MovieCard image="/images/poster1.png" badge="Episode Baru" />
            <MovieCard image="/images/poster2.png" />
            <MovieCard image="/images/poster3.png" />
            <MovieCard image="/images/poster4.png" badge="Episode Baru" />
            <MovieCard image="/images/poster5.png" topBadge />
          </div>
        </section>

        <section className="movie-section" aria-labelledby="trending">
          <h3 className="section-title" id="trending">Film Trending</h3>
          <div className="movie-scroll-container">
            <MovieCard image="/images/poster6.png" topBadge />
            <MovieCard image="/images/poster7.png" topBadge />
            <MovieCard image="/images/poster8.png" topBadge />
            <MovieCard image="/images/poster9.png" topBadge />
            <MovieCard image="/images/poster10.png" topBadge />
          </div>
        </section>

        <section className="movie-section" aria-labelledby="new-release">
          <h3 className="section-title" id="new-release">Rilis Terbaru</h3>
          <div className="movie-scroll-container">
            <MovieCard image="/images/poster10.png" topBadge />
            <MovieCard image="/images/poster12.png" badge="Episode Baru" />
            <MovieCard image="/images/poster5.png" topBadge />
            <MovieCard image="/images/poster4.png" badge="Episode Baru" />
            <MovieCard image="/images/poster11.png" />
          </div>
        </section>
      </main>

      <footer className="main-footer" role="contentinfo">
        <div className="footer-header">
          <div className="logo-container">
            <img src="/logo.png" alt="Chill logo" className="logo-img" />
          </div>
          <p className="copyright">© {currentYear} Chill All Rights Reserved.</p>
        </div>

        <div className="footer-links">
          <div className="link-column">
            <h4>Genre</h4>
            <div className="genre-grid">
              <a href="/series?genre=aksi">Aksi</a>
              <a href="/series?genre=anak">Anak-anak</a>
              <a href="/series?genre=anime">Anime</a>
              <a href="/series?genre=britania">Britania</a>
              <a href="/series?genre=drama">Drama</a>
              <a href="/series?genre=fantasi">Fantasi Ilmiah</a>
              <a href="/series?genre=kejahatan">Kejahatan</a>
              <a href="/series?genre=kdrama">KDrama</a>
              <a href="/series?genre=komedi">Komedi</a>
              <a href="/series?genre=romantis">Romantis</a>
              <a href="/series?genre=thriller">Thriller</a>
              <a href="/series?genre=horror">Horror</a>
            </div>
          </div>

          <div className="link-column">
            <h4>Bantuan</h4>
            <a href="/faq">FAQ</a>
            <a href="/contact">Kontak Kami</a>
            <a href="/privacy">Privasi</a>
            <a href="/terms">Syarat & Ketentuan</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

// MovieCard Component
function MovieCard({ image, title, rating, badge, topBadge, wide }) {
  return (
    <div className={`movie-card ${wide ? 'wide' : 'portrait'}`} role="listitem">
      <img src={image} alt={title || 'Movie poster'} />
      {title && rating && (
        <div className="card-overlay">
          <h4>{title}</h4>
          <span>
            <i className="fa-solid fa-star text-yellow" aria-hidden="true"></i> {rating}
          </span>
        </div>
      )}
      {badge && <div className="badge-new">{badge}</div>}
      {topBadge && <div className="badge-top">Top<br />10</div>}
    </div>
  )
}