# 📚 Panduan Integrasi REST API - ReactJS CRUD Application

## 🎯 Ringkasan Perubahan

Aplikasi ini telah berhasil di-upgrade dari menggunakan data statis (Array) menjadi terintegrasi dengan REST API (MockAPI). Semua requirements wajib telah dipenuhi:

✅ Menggunakan library Axios untuk konsumsi API  
✅ Logika API terpisah di folder `services/api`  
✅ Base URL disimpan di file `.env`  
✅ Axios Interceptor untuk logging dan error handling  
✅ Custom Hooks untuk memisahkan logika fetching  
✅ State management menggunakan React Context API  

---

## 📁 Struktur Folder Baru

```
src/
├── services/
│   └── api/
│       ├── axiosConfig.js      # Konfigurasi Axios dengan Interceptors
│       └── movieService.js     # Fungsi CRUD API (GET, POST, PUT, DELETE)
├── hooks/
│   └── useMovies.js            # Custom Hook untuk data fetching
├── contexts/
│   └── MyListContext.jsx       # State management (Updated dengan API)
└── pages/
    └── MyList.jsx              # UI Component (Updated dengan loading states)
```

---

## 🔧 Setup dan Konfigurasi

### 1. Install Dependencies

Dependencies sudah terinstall otomatis, namun untuk referensi:

```bash
npm install axios
```

### 2. Konfigurasi MockAPI

#### Langkah-langkah Setup MockAPI:

1. **Buka** [MockAPI.io](https://mockapi.io/)
2. **Buat akun** atau login
3. **Buat Project Baru**
4. **Buat Resource** dengan nama `movies`
5. **Tambahkan Field** berikut:

| Field Name     | Type    | Description                    |
|----------------|---------|--------------------------------|
| id             | string  | Auto-generated                 |
| title          | string  | Nama film                      |
| image          | string  | URL gambar poster              |
| alt            | string  | Alt text untuk gambar          |
| hasNewEpisode  | boolean | Apakah ada episode baru        |
| isTop10        | boolean | Apakah termasuk Top 10         |
| inMyList       | boolean | Apakah ada di daftar user      |

6. **Generate Data** atau input data manual

#### Contoh Data JSON untuk MockAPI:

```json
{
  "title": "All of Us Are Dead",
  "image": "/images/poster4.png",
  "alt": "All of Us Are Dead",
  "hasNewEpisode": true,
  "isTop10": true,
  "inMyList": true
}
```

7. **Copy Endpoint URL** yang diberikan MockAPI (contoh: `https://6789abcd123456.mockapi.io/api/v1`)

### 3. Konfigurasi File .env

Buka file `.env` di root project dan update dengan URL MockAPI Anda:

```env
# API Configuration
VITE_API_BASE_URL=https://your-mockapi-id.mockapi.io/api/v1

# Optional
VITE_ENV=development
```

**⚠️ PENTING:** 
- Ganti `your-mockapi-id` dengan ID MockAPI Anda yang sebenarnya
- Pastikan URL diakhiri dengan `/api/v1` (atau sesuai endpoint MockAPI Anda)
- Untuk Vite, environment variable harus diawali dengan `VITE_`

---

## 🏗️ Arsitektur & Penjelasan Kode

### 1. Axios Configuration (`src/services/api/axiosConfig.js`)

File ini berisi konfigurasi Axios instance dengan interceptors:

**Fitur:**
- ✅ Base URL dari environment variable
- ✅ Timeout 10 detik
- ✅ Content-Type JSON header
- ✅ Request Interceptor untuk logging
- ✅ Response Interceptor untuk error handling
- ✅ Centralized error handling (401, 404, 500)

**Contoh Penggunaan:**
```javascript
import axiosInstance from './axiosConfig';

// axiosInstance sudah siap digunakan dengan semua konfigurasi
const response = await axiosInstance.get('/movies');
```

### 2. Movie Service (`src/services/api/movieService.js`)

File ini berisi semua fungsi CRUD untuk Movies:

#### Fungsi yang Tersedia:

**GET - Mendapatkan Semua Movies**
```javascript
import { getMovies } from '../services/api/movieService';

const movies = await getMovies();
```

**GET - Mendapatkan Single Movie by ID**
```javascript
import { getMovieById } from '../services/api/movieService';

const movie = await getMovieById('1');
```

**POST - Menambahkan Movie Baru**
```javascript
import { addMovie } from '../services/api/movieService';

const newMovie = await addMovie({
  title: 'Spider-Man',
  image: '/images/poster.png',
  alt: 'Spider-Man',
  hasNewEpisode: false,
  isTop10: true,
  inMyList: true
});
```

**PUT - Update Movie (Full Update)**
```javascript
import { updateMovie } from '../services/api/movieService';

const updated = await updateMovie('1', {
  title: 'Spider-Man Updated',
  image: '/images/poster-new.png',
  alt: 'Spider-Man',
  hasNewEpisode: true,
  isTop10: true,
  inMyList: true
});
```

**PATCH - Update Movie (Partial Update)**
```javascript
import { patchMovie } from '../services/api/movieService';

const patched = await patchMovie('1', {
  hasNewEpisode: true,
  isTop10: true
});
```

**DELETE - Hapus Movie**
```javascript
import { deleteMovie } from '../services/api/movieService';

await deleteMovie('1');
```

### 3. Custom Hook (`src/hooks/useMovies.js`)

Custom hook ini memisahkan logika data fetching dari UI component:

**Fitur:**
- ✅ Auto-fetch data saat component mount
- ✅ Loading state management
- ✅ Error state management
- ✅ Fungsi CRUD yang sudah wrapped dengan error handling

**Cara Penggunaan:**
```javascript
import useMovies from '../hooks/useMovies';

function MyComponent() {
  const {
    movies,        // Array of movies
    loading,       // Boolean loading state
    error,         // Error message (if any)
    fetchMovies,   // Function to manually refetch
    addMovie,      // Function to add movie
    updateMovie,   // Function to update movie
    patchMovie,    // Function to patch movie
    deleteMovie    // Function to delete movie
  } = useMovies(true); // autoFetch = true

  // Gunakan dalam component
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div>
      {movies.map(movie => (
        <div key={movie.id}>{movie.title}</div>
      ))}
    </div>
  );
}
```

### 4. Context Provider (`src/contexts/MyListContext.jsx`)

Context yang telah diupdate untuk menggunakan API:

**Perubahan Utama:**
- ✅ Menggunakan `useMovies` custom hook
- ✅ State management tetap menggunakan Context API
- ✅ Semua operasi CRUD sekarang async dan memanggil API
- ✅ Error handling terintegrasi

**API yang Di-expose:**
```javascript
const {
  myListMovies,      // Array film di daftar user
  availableMovies,   // Array semua film tersedia
  handleDelete,      // Async function untuk delete
  handleAdd,         // Async function untuk add
  handleUpdate,      // Async function untuk update
  isInMyList,        // Function cek apakah film di list
  loading,           // Boolean loading state
  error,             // Error message
  refreshMovies      // Function untuk manual refresh
} = useMyList();
```

### 5. UI Component (`src/pages/MyList.jsx`)

Component UI yang telah diupdate dengan:

**Fitur Baru:**
- ✅ Loading indicator saat fetch data
- ✅ Error message display
- ✅ Async handling untuk operasi CRUD
- ✅ User feedback yang lebih baik

---

## 🧪 Testing CRUD Operations

### 1. Testing GET (Read)

1. Jalankan aplikasi:
   ```bash
   npm run dev
   ```

2. Buka halaman "Daftar Saya"
3. Data akan otomatis di-fetch dari API
4. Cek Console Browser untuk melihat log dari Interceptor

### 2. Testing POST (Create/Add)

1. Di halaman "Daftar Saya", klik tombol **"+ Tambah Film"**
2. Pilih film yang belum ada di daftar Anda
3. Film akan ditambahkan ke API via POST request
4. Cek Console untuk melihat request/response log
5. Verifikasi di MockAPI dashboard bahwa data tersimpan

### 3. Testing DELETE (Delete)

1. Di daftar film Anda, klik tombol **"×"** pada film
2. Film akan dihapus via DELETE request
3. Film akan hilang dari tampilan
4. Verifikasi di MockAPI dashboard bahwa data terhapus

### 4. Testing PUT/PATCH (Update)

Untuk testing update, Anda perlu menambahkan UI untuk edit. Namun fungsi sudah tersedia:

```javascript
// Contoh update dari Console Browser:
const { handleUpdate } = useMyList();
await handleUpdate('1', { 
  title: 'New Title',
  hasNewEpisode: true 
});
```

---

## 🐛 Troubleshooting

### Error: "Network Error" atau "CORS Error"

**Solusi:**
- Pastikan MockAPI URL di `.env` sudah benar
- Cek internet connection
- MockAPI secara default sudah handle CORS

### Error: "Cannot read property of undefined"

**Solusi:**
- Pastikan struktur data di MockAPI sesuai dengan yang diharapkan
- Cek field names: `title`, `image`, `alt`, `hasNewEpisode`, `isTop10`, `inMyList`

### Data Tidak Muncul

**Solusi:**
1. Cek Console Browser untuk error messages
2. Verifikasi `.env` file sudah diisi dengan benar
3. Restart development server setelah mengubah `.env`
4. Pastikan MockAPI endpoint `/movies` ada dan berisi data

### Loading Terus-Menerus

**Solusi:**
- Cek Network tab di DevTools
- Lihat apakah request berhasil atau timeout
- Verifikasi MockAPI service sedang online

---

## 📝 Best Practices

### 1. Environment Variables

- ✅ Jangan commit file `.env` ke Git
- ✅ Buat `.env.example` untuk template
- ✅ Dokumentasikan semua environment variables

### 2. Error Handling

- ✅ Selalu wrap async operations dalam try-catch
- ✅ Berikan user feedback yang jelas
- ✅ Log errors untuk debugging

### 3. Loading States

- ✅ Tampilkan loading indicator saat fetch data
- ✅ Disable button saat processing
- ✅ Berikan feedback visual untuk setiap action

### 4. API Calls

- ✅ Gunakan custom hooks untuk reusability
- ✅ Centralize API calls di service layer
- ✅ Implement retry logic jika diperlukan

---

## 🚀 Next Steps & Improvements

### Potential Enhancements:

1. **Pagination**
   - Implementasi pagination untuk large datasets
   - Lazy loading untuk performance

2. **Search & Filter**
   - Implementasi search di API level (jika MockAPI support)
   - Advanced filtering options

3. **Caching**
   - Implement React Query atau SWR untuk caching
   - Reduce unnecessary API calls

4. **Optimistic Updates**
   - Update UI sebelum API response
   - Revert jika API call gagal

5. **Authentication**
   - Tambahkan token management
   - Protected routes

6. **Unit Testing**
   - Test service functions
   - Test custom hooks
   - Test components

---

## 📚 Resources & References

- [Axios Documentation](https://axios-http.com/)
- [MockAPI Documentation](https://mockapi.io/docs)
- [React Context API](https://react.dev/reference/react/useContext)
- [React Custom Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)

---

## ✅ Checklist Completion

- [x] Install Axios
- [x] Buat folder `services/api`
- [x] Konfigurasi Axios dengan Interceptors
- [x] Buat file `.env` untuk Base URL
- [x] Implementasi fungsi GET, POST, PUT/PATCH, DELETE
- [x] Buat Custom Hook `useMovies`
- [x] Refactor Context untuk gunakan API
- [x] Update UI dengan loading & error states
- [x] Dokumentasi lengkap

---

**🎉 Selamat! Aplikasi Anda sekarang sudah terintegrasi dengan REST API.**

Untuk pertanyaan atau masalah, silakan refer ke dokumentasi ini atau check Console Browser untuk error details.