import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../styles/Series.css';

function Series() {
  const [genreMenuOpen, setGenreMenuOpen] = useState(false);
  const [mobileGenreOpen, setMobileGenreOpen] = useState(false);

  const genres = [
    'Aksi', 'KDrama', 'Anak-anak', 'Komedi', 'Anime', 'Petualangan',
    'Britania', 'Perang', 'Drama', 'Romantis', 'Fantasi Ilmiah & Fantasi',
    'Sains & Alam', 'Kejahatan', 'Thriller'
  ];

  return (
    <div className="series-page">
      <Navbar />

      <header className="hero-section series-page">
        <div className="hero-inner">
          <div className="genre-dropdown-wrap">
            <button 
              className="genre-btn" 
              type="button"
              onClick={() => setGenreMenuOpen(!genreMenuOpen)}
            >
              Genre <i className="fas fa-chevron-down"></i>
            </button>
            <div className={`genre-menu ${genreMenuOpen ? '' : 'hidden'}`}>
              {genres.map((genre, index) => (
                <a href="#" key={index}>{genre}</a>
              ))}
            </div>
          </div>

          <div className="hero-content">
            <h1 className="hero-title">Happiness</h1>
            <p className="hero-desc">
              Mengisahkan tentang kelompok orang yang berjuang untuk bertahan hidup di dalam sebuah gedung apartemen yang penuh dengan zombie. Sayangnya, virus zombie hanya terdapat di dalam area apartemen tersebut dan tidak menyebar ke luar kawasan apartemen.
            </p>
            <div className="hero-buttons">
              <button className="btn-primary">Mulai</button>
              <button className="btn-secondary">
                <i className="fa-solid fa-circle-info"></i> Selengkapnya
              </button>
              <span className="age-tag">18+</span>
              <div className="mute-button">
                <i className="fa-solid fa-volume-xmark"></i>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="content-wrapper">
        <section className="movie-section">
          <h3 className="section-title">
            <span className="desktop-label">Melanjutkan Tonton Series</span>
            <span className="mobile-label">Melanjutkan Tonton Film</span>
          </h3>
          <div className="carousel-wrapper">
            <button className="carousel-btn prev" aria-label="Sebelumnya">
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            <div className="movie-scroll-container">
              <div className="movie-card wide">
                <img src="/images/movie1.png" alt="Alice in Borderland" />
                <div className="badge-new">Episode Baru</div>
                <div className="card-overlay">
                  <h4>Alice In Borderland</h4>
                  <span><i className="fa-solid fa-star text-yellow"></i> 4.5/5</span>
                </div>
              </div>
              <div className="movie-card wide">
                <img src="/images/movie2.png" alt="My Perfect Stranger" />
                <div className="badge-new">Episode Baru</div>
                <div className="card-overlay">
                  <h4>My Perfect Stranger</h4>
                  <span><i className="fa-solid fa-star text-yellow"></i> 4.6/5</span>
                </div>
              </div>
              <div className="movie-card wide">
                <img src="/images/movie2.png" alt="All Of Us Are Dead" />
                <div className="badge-new">Episode Baru</div>
                <div className="card-overlay">
                  <h4>All Of Us Are Dead</h4>
                  <span><i className="fa-solid fa-star text-yellow"></i> 4.2/5</span>
                </div>
              </div>
              <div className="movie-card wide">
                <img src="/images/movie4.png" alt="Ted Lasso" />
                <div className="badge-new">Episode Baru</div>
                <div className="card-overlay">
                  <h4>Ted Lasso</h4>
                  <span><i className="fa-solid fa-star text-yellow"></i> 4.4/5</span>
                </div>
              </div>
            </div>
            <button className="carousel-btn next" aria-label="Berikutnya">
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        </section>

        <section className="movie-section">
          <h3 className="section-title">
            <span className="desktop-label">Series Persembahan Chill</span>
            <span className="mobile-label">Series Persembahan Chill</span>
          </h3>
          <div className="carousel-wrapper">
            <button className="carousel-btn prev" aria-label="Sebelumnya">
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            <div className="movie-scroll-container">
              <div className="movie-card portrait">
                <img src="/images/poster10.png" alt="Little Mermaid" />
                <div className="badge-premium">Premium</div>
              </div>
              <div className="movie-card portrait">
                <img src="/images/poster12.png" alt="Duty After School" />
                <div className="badge-premium">Premium</div>
                <div className="badge-top">Top<br/>10</div>
              </div>
              <div className="movie-card portrait">
                <img src="/images/poster5.png" alt="Big Hero 6" />
                <div className="badge-premium">Premium</div>
              </div>
              <div className="movie-card portrait">
                <img src="/images/poster4.png" alt="All Of Us Are Dead" />
                <div className="badge-premium">Premium</div>
              </div>
              <div className="movie-card portrait">
                <img src="/images/poster11.png" alt="Missing" />
                <div className="badge-premium">Premium</div>
              </div>
            </div>
            <button className="carousel-btn next" aria-label="Berikutnya">
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        </section>

        <section className="movie-section">
          <h3 className="section-title">
            <span className="desktop-label">Top Rating Series Hari ini</span>
            <span className="mobile-label">Top Rating Film dan Series Hari ini</span>
          </h3>
          <div className="carousel-wrapper">
            <button className="carousel-btn prev" aria-label="Sebelumnya">
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            <div className="movie-scroll-container">
              <div className="movie-card portrait">
                <img src="/images/poster1.png" alt="Suzume" />
                <div className="badge-new">Episode Baru</div>
              </div>
              <div className="movie-card portrait">
                <img src="/images/poster2.png" alt="Jurassic World" />
              </div>
              <div className="movie-card portrait">
                <img src="/images/poster3.png" alt="Sonic 2" />
              </div>
              <div className="movie-card portrait">
                <img src="/images/poster4.png" alt="All Of Us Are Dead" />
                <div className="badge-new">Episode Baru</div>
              </div>
              <div className="movie-card portrait">
                <img src="/images/poster5.png" alt="Big Hero 6" />
                <div className="badge-top">Top<br/>10</div>
              </div>
            </div>
            <button className="carousel-btn next" aria-label="Berikutnya">
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        </section>

        <section className="movie-section">
          <h3 className="section-title">
            <span className="desktop-label">Series Trending</span>
            <span className="mobile-label">Film Trending</span>
          </h3>
          <div className="carousel-wrapper">
            <button className="carousel-btn prev" aria-label="Sebelumnya">
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            <div className="movie-scroll-container">
              <div className="movie-card portrait">
                <img src="/images/poster6.png" alt="The Tomorrow War" />
                <div className="badge-top">Top<br/>10</div>
              </div>
              <div className="movie-card portrait">
                <img src="/images/poster7.png" alt="Quantumania" />
                <div className="badge-top">Top<br/>10</div>
              </div>
              <div className="movie-card portrait">
                <img src="/images/poster8.png" alt="Guardians of The Galaxy" />
                <div className="badge-top">Top<br/>10</div>
              </div>
              <div className="movie-card portrait">
                <img src="/images/poster9.png" alt="A Man Called Otto" />
                <div className="badge-top">Top<br/>10</div>
              </div>
              <div className="movie-card portrait">
                <img src="/images/poster10.png" alt="Little Mermaid" />
                <div className="badge-top">Top<br/>10</div>
              </div>
            </div>
            <button className="carousel-btn next" aria-label="Berikutnya">
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        </section>

        <section className="movie-section">
          <h3 className="section-title">Rilis Baru</h3>
          <div className="carousel-wrapper">
            <button className="carousel-btn prev" aria-label="Sebelumnya">
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            <div className="movie-scroll-container">
              <div className="movie-card portrait">
                <img src="/images/poster10.png" alt="Little Mermaid" />
                <div className="badge-top">Top<br/>10</div>
              </div>
              <div className="movie-card portrait">
                <img src="/images/poster12.png" alt="Duty After School" />
                <div className="badge-new">Episode Baru</div>
              </div>
              <div className="movie-card portrait">
                <img src="/images/poster5.png" alt="Big Hero 6" />
                <div className="badge-top">Top<br/>10</div>
              </div>
              <div className="movie-card portrait">
                <img src="/images/poster4.png" alt="All Of Us Are Dead" />
                <div className="badge-new">Episode Baru</div>
              </div>
              <div className="movie-card portrait">
                <img src="/images/poster11.png" alt="Missing" />
                <div className="badge-top">Top<br/>10</div>
              </div>
            </div>
            <button className="carousel-btn next" aria-label="Berikutnya">
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        </section>
      </main>

      <footer className="main-footer">
        <div className="footer-desktop">
          <div className="footer-header">
            <div className="logo-container">
              <img src="/logo.png" alt="Logo" className="logo-img" />
            </div>
            <p className="copyright">@2023 Chill All Rights Reserved.</p>
          </div>
          <div className="footer-links">
            <div className="link-column">
              <h4>Genre</h4>
              <div className="genre-grid">
                {genres.map((genre, index) => (
                  <a href="#" key={index}>{genre}</a>
                ))}
              </div>
            </div>
          </div>
          <div className="footer-links">
            <div className="link-column">
              <h4>Bantuan</h4>
              <div className="footer-content">
                <a href="#">FAQ</a>
                <a href="#">Kontak Kami</a>
                <a href="#">Privasi</a>
                <a href="#">Syarat & Ketentuan</a>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-mobile">
          <div className="logo-container">
            <img src="/logo.png" alt="Logo" className="logo-img" />
          </div>
          <p className="copyright">@2023 Chill All Rights Reserved</p>
        </div>
      </footer>
    </div>
  );
}

export default Series;