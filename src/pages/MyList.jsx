import { useState } from 'react';
import Navbar from '../components/Navbar';
import { useMyList } from '../contexts/MyListContext';
import '../styles/MyList.css';

function MyList() {
  const { myListMovies, availableMovies, handleDelete, handleAdd, isInMyList, loading, error } = useMyList();
  const [showMovieCatalog, setShowMovieCatalog] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const genres = [
    'Aksi', 'Drama', 'Komedi', 'Sains & Alam',
    'Anak-anak', 'Fantasi Ilmiah & Fantasi', 'Petualangan', 'Thriller',
    'Anime', 'Kejahatan', 'Perang', '',
    'Britania', 'KDrama', 'Romantis', ''
  ];

  const handleAddMovie = async (movieId) => {
    const success = await handleAdd(movieId);
    if (success) {
      alert('Film berhasil ditambahkan ke Daftar Saya!');
    }
  };

  // Filter movies that are not yet in user's list
  const moviesNotInList = availableMovies.filter(movie => !isInMyList(movie.id));

  // Filter movies based on search query
  const filteredMovies = moviesNotInList.filter(movie =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="mylist-page">
      <Navbar />

      <main className="page-content">
        {/* Loading State */}
        {loading && (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            color: '#999'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>⏳</div>
            <h3>Memuat data...</h3>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div style={{
            background: 'rgba(183, 31, 29, 0.1)',
            border: '1px solid #b71f1d',
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '20px',
            color: '#ff6b6b'
          }}>
            <h3 style={{ margin: '0 0 10px 0' }}>⚠️ Terjadi Kesalahan</h3>
            <p style={{ margin: 0 }}>{error}</p>
          </div>
        )}

        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '44px'
        }}>
          <h1 className="page-title" style={{ margin: 0 }}>Daftar Saya</h1>
          <button
            onClick={() => setShowMovieCatalog(!showMovieCatalog)}
            style={{
              background: '#0f1e93',
              color: '#fff',
              padding: '12px 24px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <span style={{ fontSize: '20px' }}>+</span>
            Tambah Film
          </button>
        </div>

        {/* Movie Catalog Selection */}
        {showMovieCatalog && (
          <div style={{
            background: 'rgba(255,255,255,0.05)',
            padding: '30px',
            borderRadius: '12px',
            marginBottom: '40px'
          }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <h3 style={{ margin: 0, fontSize: '1.3rem' }}>
                Pilih Film untuk Ditambahkan
              </h3>
              <button
                onClick={() => {
                  setShowMovieCatalog(false);
                  setSearchQuery('');
                }}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#999',
                  cursor: 'pointer',
                  fontSize: '24px',
                  padding: '0',
                  lineHeight: '1'
                }}
              >
                ×
              </button>
            </div>

            {/* Search Input */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{ 
                color: '#999', 
                fontSize: '14px',
                display: 'block',
                marginBottom: '8px'
              }}>
                Cari Film atau Series
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Ketik nama film atau series..."
                  style={{
                    width: '100%',
                    padding: '12px 40px 12px 12px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '16px',
                    outline: 'none'
                  }}
                />
                <span style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#999',
                  fontSize: '18px',
                  pointerEvents: 'none'
                }}>
                  🔍
                </span>
              </div>
              {searchQuery && (
                <p style={{ 
                  color: '#999', 
                  fontSize: '13px', 
                  marginTop: '8px',
                  marginBottom: 0
                }}>
                  Ditemukan {filteredMovies.length} film
                </p>
              )}
            </div>

            {moviesNotInList.length === 0 ? (
              <p style={{ color: '#999', textAlign: 'center', padding: '40px 0' }}>
                Semua film sudah ada di daftar Anda!
              </p>
            ) : filteredMovies.length === 0 ? (
              <p style={{ color: '#999', textAlign: 'center', padding: '40px 0' }}>
                Tidak ada film yang cocok dengan pencarian "{searchQuery}"
              </p>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                gap: '20px'
              }}>
                {filteredMovies.map((movie) => (
                  <div 
                    key={movie.id}
                    onClick={() => handleAddMovie(movie.id)}
                    style={{
                      position: 'relative',
                      borderRadius: '10px',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.05)';
                      e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = 'none';
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
                        padding: '6px 10px',
                        fontSize: '10px',
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
                        padding: '6px 8px 4px',
                        fontSize: '10px',
                        fontWeight: '700',
                        lineHeight: '1.1',
                        textAlign: 'center',
                        borderRadius: '0 0 0 10px'
                      }}>
                        Top<br />10
                      </span>
                    )}
                    <div style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)',
                      padding: '30px 10px 10px',
                      color: '#fff',
                      fontSize: '12px',
                      fontWeight: '600',
                      textAlign: 'center'
                    }}>
                      {movie.title}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* User's Movie List */}
        {myListMovies.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            color: '#999'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>📽️</div>
            <h3 style={{ marginBottom: '10px' }}>Daftar Anda Masih Kosong</h3>
            <p>Klik tombol "Tambah Film" untuk menambahkan film ke daftar Anda</p>
          </div>
        ) : (
          <section className="poster-grid">
            {myListMovies.map((movie) => (
              <article key={movie.id} className="poster-card">
                <img src={movie.image} alt={movie.alt} />
                {movie.hasNewEpisode && <span className="badge-new">Episode Baru</span>}
                {movie.isTop10 && (
                  <span className="badge-top">
                    Top<br />10
                  </span>
                )}
                <button 
                  className="delete-btn"
                  onClick={() => handleDelete(movie.id)}
                  aria-label={`Remove ${movie.alt} from list`}
                >
                  ×
                </button>
              </article>
            ))}
          </section>
        )}
      </main>

      <footer className="main-footer">
        <div className="footer-left">
          <img src="/logo.png" alt="Logo Chill" className="logo-img" />
          <p className="copyright">@2023 Chill All Rights Reserved.</p>
        </div>

        <div className="footer-right">
          <div className="footer-section">
            <div className="footer-title">Genre</div>
            <div className="genre-grid">
              {genres.map((genre, index) => (
                genre ? <a href="#" key={index}>{genre}</a> : <span key={index}></span>
              ))}
            </div>
          </div>

          <div className="footer-section">
            <div className="footer-title">Bantuan</div>
            <div className="help-links">
              <a href="#">FAQ</a>
              <a href="#">Kontak Kami</a>
              <a href="#">Privasi</a>
              <a href="#">Syarat & Ketentuan</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default MyList;