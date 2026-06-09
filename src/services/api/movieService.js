import axiosInstance from './axiosConfig';

// Base endpoint untuk movies
const MOVIES_ENDPOINT = '/movies';

/**
 * MovieService - Service untuk operasi CRUD Movies
 * Semua fungsi bersifat async dan return Promise
 */

// GET - Mendapatkan semua movies
export const getMovies = async () => {
  try {
    const response = await axiosInstance.get(MOVIES_ENDPOINT);
    return response.data;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};

// GET - Mendapatkan single movie by ID
export const getMovieById = async (id) => {
  try {
    const response = await axiosInstance.get(`${MOVIES_ENDPOINT}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching movie ${id}:`, error);
    throw error;
  }
};

// POST - Menambahkan movie baru
export const addMovie = async (movieData) => {
  try {
    const response = await axiosInstance.post(MOVIES_ENDPOINT, movieData);
    return response.data;
  } catch (error) {
    console.error('Error adding movie:', error);
    throw error;
  }
};

// PUT - Update movie (full update)
export const updateMovie = async (id, movieData) => {
  try {
    const response = await axiosInstance.put(`${MOVIES_ENDPOINT}/${id}`, movieData);
    return response.data;
  } catch (error) {
    console.error(`Error updating movie ${id}:`, error);
    throw error;
  }
};

// PATCH - Update movie (partial update)
export const patchMovie = async (id, movieData) => {
  try {
    const response = await axiosInstance.patch(`${MOVIES_ENDPOINT}/${id}`, movieData);
    return response.data;
  } catch (error) {
    console.error(`Error patching movie ${id}:`, error);
    throw error;
  }
};

// DELETE - Menghapus movie
export const deleteMovie = async (id) => {
  try {
    const response = await axiosInstance.delete(`${MOVIES_ENDPOINT}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting movie ${id}:`, error);
    throw error;
  }
};

// Export semua service sebagai object (alternative import style)
const movieService = {
  getMovies,
  getMovieById,
  addMovie,
  updateMovie,
  patchMovie,
  deleteMovie,
};

export default movieService;