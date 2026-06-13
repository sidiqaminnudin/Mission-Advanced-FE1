# 🎬 Chill — Movie Streaming App (ReactJS + REST API)

## 📋 Deskripsi Project

Aplikasi **Chill** adalah platform streaming berbasis ReactJS yang memungkinkan pengguna mengelola daftar film pribadi mereka secara dinamis. Project ini merupakan hasil upgrade dari data statis (Array) menjadi integrasi penuh dengan **REST API menggunakan MockAPI.io**, memenuhi seluruh operasi **CRUD (Create, Read, Update, Delete)** secara dinamis.

---

## ✅ Implementasi CRUD dengan Dynamic API

Seluruh operasi CRUD telah diimplementasikan secara dinamis menggunakan **Axios** sebagai HTTP client, terhubung ke **MockAPI** sebagai backend, dan terstruktur mengikuti pola arsitektur *Service Layer + Custom Hook + Context*.

---

### 📖 GET — Read Data (Mengambil Data dari API)

Operasi **GET** diimplementasikan pada halaman **"Daftar Saya"** (`src/pages/MyList.jsx`).

Saat halaman pertama kali dimuat, aplikasi secara otomatis memanggil REST API untuk mengambil seluruh data film yang tersimpan di server. Data ditampilkan dalam bentuk grid poster film yang responsif, lengkap dengan indikator *loading state* (⏳) dan *error state* (⚠️) untuk memberikan feedback kepada pengguna.

- **Service function:** `getMovies()` → `GET /movies` — di `src/services/api/movieService.js`
- **Custom Hook:** `useMovies()` — di `src/hooks/useMovies.js`
- **Context:** `useMyList()` → `myListMovies`, `availableMovies` — di `src/contexts/MyListContext.jsx`

---

### ➕ POST (ADD) — Create Data (Menambah Data ke API)

Operasi **POST** diimplementasikan melalui fitur **"Tambah Film"** pada halaman `src/pages/MyList.jsx`.

Pengguna dapat membuka katalog film, mencari judul melalui fitur *real-time search*, lalu mengklik poster film untuk menambahkannya ke "Daftar Saya". Saat diklik, aplikasi mengirim request `POST` ke API untuk menyimpan data film secara persisten di server.

- **Service function:** `addMovie(movieData)` → `POST /movies` — di `src/services/api/movieService.js`
- **Context handler:** `handleAdd(movieId)` — di `src/contexts/MyListContext.jsx`
- **UI trigger:** Klik poster film di panel katalog — `src/pages/MyList.jsx` baris 197

---

### ✏️ PUT/PATCH (UPDATE) — Update Data (Memperbarui Data di API)

Operasi **PUT** (full update) dan **PATCH** (partial update) diimplementasikan pada layer service untuk memperbarui data film yang sudah ada di server.

- **Service function PUT:** `updateMovie(id, movieData)` → `PUT /movies/:id` — di `src/services/api/movieService.js`
- **Service function PATCH:** `patchMovie(id, movieData)` → `PATCH /movies/:id` — di `src/services/api/movieService.js`
- **Context:** Tersedia di `src/contexts/MyListContext.jsx` untuk digunakan komponen manapun

---

### 🗑️ DELETE — Delete Data (Menghapus Data dari API)

Operasi **DELETE** diimplementasikan melalui tombol **"×"** yang muncul pada setiap poster film di "Daftar Saya" (`src/pages/MyList.jsx`).

Saat pengguna mengklik tombol tersebut, aplikasi mengirim request `DELETE` ke API dengan ID film yang sesuai. Data dihapus secara permanen dari server, dan UI diperbarui secara otomatis tanpa reload halaman.

- **Service function:** `deleteMovie(id)` → `DELETE /movies/:id` — di `src/services/api/movieService.js`
- **Context handler:** `handleDelete(movie.id)` — di `src/contexts/MyListContext.jsx`
- **UI trigger:** Tombol `×` pada setiap poster — `src/pages/MyList.jsx` baris 302

---

## 🏗️ Arsitektur & Struktur Kode

```
src/
├── services/
│   └── api/
│       ├── axiosConfig.js      # Axios instance + Interceptor (request/response logging)
│       └── movieService.js     # Fungsi CRUD: getMovies, addMovie, updateMovie, deleteMovie
├── hooks/
│   └── useMovies.js            # Custom Hook: manajemen state loading, error, dan data
├── contexts/
│   └── MyListContext.jsx       # Global state management via React Context
└── pages/
    └── MyList.jsx              # Halaman utama UI dengan integrasi semua fungsi CRUD
```

---

## ⚙️ Teknologi & Konfigurasi

| Aspek | Implementasi |
|-------|-------------|
| HTTP Client | **Axios** (`npm install axios`) |
| API Service | `src/services/api/movieService.js` (terpisah dari UI) |
| Base URL | Disimpan di file **`.env`** → `VITE_API_BASE_URL` (tidak hardcode) |
| Interceptor | **Axios Interceptor** untuk logging request/response terpusat |
| State Management | **React Context API** (`useMyList`) + **Custom Hook** (`useMovies`) |
| Backend/API | **MockAPI.io** — REST API dinamis |

---

## 🔧 Cara Menjalankan

```bash
# 1. Install dependencies
npm install

# 2. Pastikan file .env sudah berisi API URL
# VITE_API_BASE_URL=https://your-id.mockapi.io/api/v1/

# 3. Jalankan development server
npm run dev
```

---

## 🔗 Live Demo & Repository

- **GitHub:** https://github.com/sidiqaminnudin/Mission-Advanced-FE1
- **Vercel:** *(link deployment Vercel)*