import { useState, useEffect, useCallback } from 'react';
import { 
  getMovies, 
  addMovie, 
  updateMovie, 
  patchMovie,
  deleteMovie 
} from '../services/api/movieService';

/**
 * Custom Hook untuk Movie Operations
 * Menangani fetching, loading state, dan error handling
 */
export const useMovies = (autoFetch = true) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch semua movies dari API
  const fetchMovies = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getMovies();
      setMovies(data);
      return data;
    } catch (err) {
      setError(err.message || 'Gagal memuat data movies');
      console.error('Error in fetchMovies:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Add movie baru
  const handleAddMovie = useCallback(async (movieData) => {
    setLoading(true);
    setError(null);
    try {
      const newMovie = await addMovie(movieData);
      setMovies(prevMovies => [...prevMovies, newMovie]);
      return newMovie;
    } catch (err) {
      setError(err.message || 'Gagal menambahkan movie');
      console.error('Error in handleAddMovie:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Update movie (PUT - full update)
  const handleUpdateMovie = useCallback(async (id, movieData) => {
    setLoading(true);
    setError(null);
    try {
      const updatedMovie = await updateMovie(id, movieData);
      setMovies(prevMovies => 
        prevMovies.map(movie => movie.id === id ? updatedMovie : movie)
      );
      return updatedMovie;
    } catch (err) {
      setError(err.message || 'Gagal mengupdate movie');
      console.error('Error in handleUpdateMovie:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Patch movie (PATCH - partial update)
  const handlePatchMovie = useCallback(async (id, movieData) => {
    setLoading(true);
    setError(null);
    try {
      const patchedMovie = await patchMovie(id, movieData);
      setMovies(prevMovies => 
        prevMovies.map(movie => movie.id === id ? patchedMovie : movie)
      );
      return patchedMovie;
    } catch (err) {
      setError(err.message || 'Gagal mengupdate movie');
      console.error('Error in handlePatchMovie:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Delete movie
  const handleDeleteMovie = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      await deleteMovie(id);
      setMovies(prevMovies => prevMovies.filter(movie => movie.id !== id));
      return true;
    } catch (err) {
      setError(err.message || 'Gagal menghapus movie');
      console.error('Error in handleDeleteMovie:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Auto-fetch on mount jika autoFetch = true
  useEffect(() => {
    if (autoFetch) {
      fetchMovies();
    }
  }, [autoFetch, fetchMovies]);

  return {
    movies,
    loading,
    error,
    fetchMovies,
    addMovie: handleAddMovie,
    updateMovie: handleUpdateMovie,
    patchMovie: handlePatchMovie,
    deleteMovie: handleDeleteMovie,
  };
};

export default useMovies;