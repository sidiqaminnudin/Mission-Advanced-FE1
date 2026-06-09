import { createContext, useContext, useState, useEffect } from 'react';
import useMovies from '../hooks/useMovies';

const MyListContext = createContext(null);

export const useMyList = () => {
  const context = useContext(MyListContext);
  if (!context) {
    throw new Error('useMyList must be used within MyListProvider');
  }
  return context;
};

export const MyListProvider = ({ children }) => {
  // Gunakan custom hook untuk API operations
  const {
    movies: apiMovies,
    loading,
    error,
    fetchMovies,
    addMovie: addMovieAPI,
    updateMovie: updateMovieAPI, // Gunakan PUT (full update) karena MockAPI tidak support PATCH
    deleteMovie: deleteMovieAPI,
  } = useMovies(true); // autoFetch = true

  // State untuk available movies (katalog lengkap)
  const [availableMovies, setAvailableMovies] = useState([]);
  
  // State untuk myListMovies (daftar user)
  const [myListMovies, setMyListMovies] = useState([]);

  // Sinkronisasi data dari API ke state lokal
  useEffect(() => {
    if (apiMovies && apiMovies.length > 0) {
      // Pisahkan movies berdasarkan flag inMyList
      const myList = apiMovies.filter(movie => movie.inMyList === true);
      setMyListMovies(myList);
      setAvailableMovies(apiMovies);
    }
  }, [apiMovies]);

  // DELETE: Menghapus movie dari daftar user (set inMyList = false via PUT)
  const handleDelete = async (id) => {
    try {
      const normalizedId = String(id);
      
      // Cari data lengkap movie dari daftar
      const movieToUpdate = availableMovies.find(m => String(m.id) === normalizedId);
      
      if (!movieToUpdate) {
        alert('Film tidak ditemukan');
        return;
      }
      
      // Gunakan PUT dengan data lengkap + inMyList: false
      // MockAPI tidak mendukung PATCH, harus PUT dengan full data
      await updateMovieAPI(normalizedId, { ...movieToUpdate, inMyList: false });
      
      // Refresh data dari API
      await fetchMovies();
    } catch (err) {
      console.error('Error removing movie from list:', err);
      alert('Gagal menghapus film dari daftar. Silakan coba lagi.');
    }
  };

  // ADD: Menambahkan movie ke daftar user (set inMyList = true via PUT)
  // Returns true jika berhasil, false jika gagal
  const handleAdd = async (movieId) => {
    try {
      const normalizedId = String(movieId);
      
      // Cek apakah sudah ada di daftar user
      if (myListMovies.some(m => String(m.id) === normalizedId)) {
        alert('Film sudah ada di Daftar Saya');
        return false;
      }

      // Cari data lengkap movie dari katalog
      const movieToAdd = availableMovies.find(movie => String(movie.id) === normalizedId);
      
      if (!movieToAdd) {
        console.error('Movie not found in available movies:', movieId);
        alert('Film tidak ditemukan di katalog');
        return false;
      }
      
      // Gunakan PUT dengan data lengkap + inMyList: true
      // MockAPI tidak mendukung PATCH, harus PUT dengan full data
      await updateMovieAPI(normalizedId, { ...movieToAdd, inMyList: true });
      
      // Refresh data dari API
      await fetchMovies();
      return true;
    } catch (err) {
      console.error('Error adding movie:', err);
      alert('Gagal menambahkan film. Silakan coba lagi.');
      return false;
    }
  };

  // UPDATE: Update data movie (untuk keperluan lain)
  const handleUpdate = async (id, updatedData) => {
    try {
      const normalizedId = String(id);
      const currentMovie = availableMovies.find(m => String(m.id) === normalizedId);
      
      if (!currentMovie) {
        throw new Error('Movie tidak ditemukan');
      }
      
      await updateMovieAPI(normalizedId, { ...currentMovie, ...updatedData });
      await fetchMovies();
    } catch (err) {
      console.error('Error updating movie:', err);
      alert('Gagal mengupdate film. Silakan coba lagi.');
    }
  };

  // Check if movie is already in user's list
  const isInMyList = (movieId) => {
    return myListMovies.some(movie => String(movie.id) === String(movieId));
  };

  const value = {
    myListMovies,
    availableMovies,
    handleDelete,
    handleAdd,
    handleUpdate,
    isInMyList,
    loading,
    error,
    refreshMovies: fetchMovies,
  };

  return (
    <MyListContext.Provider value={value}>
      {children}
    </MyListContext.Provider>
  );
};