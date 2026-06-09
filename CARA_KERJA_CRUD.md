# 🔄 Cara Kerja CRUD - Penjelasan Logika

## 🎯 Konsep Utama

Aplikasi ini menggunakan **soft delete** dengan flag `inMyList`, bukan hard delete. Artinya:
- Data movie **TIDAK DIHAPUS** dari database
- Hanya **FLAG `inMyList` YANG BERUBAH** antara `true` dan `false`
- Tidak ada duplikasi data

---

## 📊 Struktur Data

Semua movie disimpan dalam **1 tabel/collection di MockAPI** dengan struktur:

```json
{
  "id": "1",
  "title": "Spider-Man",
  "image": "/images/poster6.png",
  "alt": "Spider-Man",
  "hasNewEpisode": false,
  "isTop10": false,
  "inMyList": true    // ← FLAG PENTING!
}
```

### Arti Flag `inMyList`:
- **`inMyList: true`** = Movie ada di "Daftar Saya" user
- **`inMyList: false`** = Movie hanya ada di katalog/available movies

---

## 🔄 Operasi CRUD

### 1. **READ (GET)** - Membaca Data

**Endpoint:** `GET /movies`

**Cara Kerja:**
1. Fetch semua data dari API
2. Filter data berdasarkan `inMyList`:
   - `inMyList: true` → Masuk ke `myListMovies` (ditampilkan di Daftar Saya)
   - Semua data → Masuk ke `availableMovies` (katalog lengkap)

**Kode:**
```javascript
const myList = apiMovies.filter(movie => movie.inMyList);
const available = apiMovies;
```

---

### 2. **CREATE (POST)** - Menambah ke Daftar

**⚠️ PENTING:** Operasi ini **BUKAN** POST, tetapi **PATCH**!

**Endpoint:** `PATCH /movies/:id`

**Cara Kerja:**
1. User klik "Tambah Film" dari katalog
2. Aplikasi mencari movie dengan ID tersebut
3. **PATCH** flag `inMyList` menjadi `true`
4. Movie sekarang muncul di "Daftar Saya"

**Kode:**
```javascript
const handleAdd = async (movieId) => {
  // Ubah flag inMyList menjadi true
  await patchMovieAPI(movieId, { inMyList: true });
};
```

**Perubahan di Database:**
```json
// SEBELUM (di katalog saja)
{
  "id": "5",
  "title": "Ted Lasso",
  "inMyList": false  // ← false
}

// SESUDAH (masuk ke Daftar Saya)
{
  "id": "5",
  "title": "Ted Lasso",
  "inMyList": true   // ← true
}
```

---

### 3. **UPDATE (PATCH)** - Edit Data

**Endpoint:** `PATCH /movies/:id`

**Cara Kerja:**
1. Kirim data yang ingin diupdate
2. MockAPI akan merge dengan data existing
3. Field yang tidak disebutkan tetap unchanged

**Contoh:**
```javascript
// Update hanya hasNewEpisode
await patchMovieAPI('1', { hasNewEpisode: true });

// Update multiple fields
await patchMovieAPI('1', { 
  hasNewEpisode: true,
  isTop10: true 
});
```

---

### 4. **DELETE** - Hapus dari Daftar

**⚠️ PENTING:** Operasi ini **BUKAN** DELETE, tetapi **PATCH**!

**Endpoint:** `PATCH /movies/:id`

**Cara Kerja:**
1. User klik tombol "×" untuk hapus dari "Daftar Saya"
2. Aplikasi **PATCH** flag `inMyList` menjadi `false`
3. Movie **TIDAK DIHAPUS** dari database
4. Movie hanya tidak muncul di "Daftar Saya"
5. Movie tetap ada di katalog dan bisa ditambahkan lagi

**Kode:**
```javascript
const handleDelete = async (id) => {
  // Ubah flag inMyList menjadi false
  await patchMovieAPI(id, { inMyList: false });
};
```

**Perubahan di Database:**
```json
// SEBELUM (ada di Daftar Saya)
{
  "id": "5",
  "title": "Ted Lasso",
  "inMyList": true   // ← true
}

// SESUDAH (dihapus dari Daftar Saya)
{
  "id": "5",
  "title": "Ted Lasso",
  "inMyList": false  // ← false
}
```

**Data TIDAK HILANG dari database!** Hanya flag-nya yang berubah.

---

## 🎬 Flow Lengkap dengan Contoh

### Skenario: User ingin menambah "Spider-Man" ke Daftar Saya

**Initial State (di MockAPI):**
```json
{
  "id": "9",
  "title": "Spider-Man",
  "image": "/images/poster6.png",
  "alt": "Spider-Man",
  "hasNewEpisode": false,
  "isTop10": false,
  "inMyList": false  // ← Belum di Daftar Saya
}
```

**Step 1: User membuka halaman "Daftar Saya"**
- API fetch semua movies
- Spider-Man tidak muncul di "Daftar Saya" (karena `inMyList: false`)
- Spider-Man muncul di katalog "Available Movies"

**Step 2: User klik "+ Tambah Film"**
- Muncul katalog movies
- User pilih Spider-Man

**Step 3: Aplikasi eksekusi `handleAdd("9")`**
```javascript
// Request ke API
PATCH /movies/9
Body: { "inMyList": true }
```

**Step 4: MockAPI update data**
```json
{
  "id": "9",
  "title": "Spider-Man",
  "image": "/images/poster6.png",
  "alt": "Spider-Man",
  "hasNewEpisode": false,
  "isTop10": false,
  "inMyList": true  // ← BERUBAH menjadi true
}
```

**Step 5: UI otomatis refresh**
- Spider-Man sekarang muncul di "Daftar Saya"
- Alert muncul: "Film berhasil ditambahkan ke Daftar Saya!"

---

### Skenario: User ingin menghapus "Spider-Man" dari Daftar Saya

**Current State (di MockAPI):**
```json
{
  "id": "9",
  "title": "Spider-Man",
  "inMyList": true  // ← Ada di Daftar Saya
}
```

**Step 1: User klik tombol "×" di movie Spider-Man**

**Step 2: Aplikasi eksekusi `handleDelete("9")`**
```javascript
// Request ke API
PATCH /movies/9
Body: { "inMyList": false }
```

**Step 3: MockAPI update data**
```json
{
  "id": "9",
  "title": "Spider-Man",
  "inMyList": false  // ← BERUBAH menjadi false
}
```

**Step 4: UI otomatis refresh**
- Spider-Man hilang dari "Daftar Saya"
- Spider-Man **TETAP ADA** di katalog "Available Movies"
- Data **TIDAK DIHAPUS** dari database

---

## ✅ Keuntungan Pendekatan Ini

### 1. **Tidak Ada Duplikasi Data**
- Setiap movie hanya ada 1x di database
- Efficient storage dan query

### 2. **Reversible Action**
- User bisa add/remove movie berkali-kali
- Tidak perlu input data ulang

### 3. **Simple Logic**
- Hanya perlu toggle boolean flag
- Tidak perlu create/delete object

### 4. **Fast Performance**
- PATCH lebih cepat dari DELETE + POST
- Minimal data transfer

---

## 🚨 Hal yang Perlu Diperhatikan

### Setup Awal MockAPI

**SEMUA DATA MOVIE HARUS SUDAH ADA** di MockAPI dari awal!

```json
// Setup awal: Input 15 movies dengan berbagai status inMyList
[
  { "id": "1", "title": "Movie 1", "inMyList": true },   // Di Daftar Saya
  { "id": "2", "title": "Movie 2", "inMyList": true },   // Di Daftar Saya
  { "id": "3", "title": "Movie 3", "inMyList": false },  // Hanya di katalog
  { "id": "4", "title": "Movie 4", "inMyList": false },  // Hanya di katalog
  // ... dst
]
```

### Tidak Ada True DELETE

Aplikasi ini **TIDAK menggunakan** `DELETE /movies/:id`.

Jika Anda ingin benar-benar menghapus movie dari database:
1. Login ke MockAPI dashboard
2. Hapus manual dari web interface

Atau bisa tambahkan fungsi admin untuk hard delete (opsional).

---

## 🔧 Debugging Tips

### Cek Console Browser

Axios Interceptor akan log semua request:
```
🚀 Request: PATCH /movies/5 { inMyList: true }
✅ Response: { id: "5", title: "Ted Lasso", inMyList: true }
```

### Cek MockAPI Dashboard

1. Login ke mockapi.io
2. Lihat data di dashboard
3. Verifikasi field `inMyList` berubah

### Test Manual di MockAPI

Gunakan "Try It" feature:
```
PATCH /movies/1
Body: { "inMyList": true }
```

---

## 📝 Summary

| Operasi UI | HTTP Method | Endpoint | Body | Hasil |
|------------|-------------|----------|------|-------|
| View List | GET | /movies | - | Fetch semua data |
| Add to List | PATCH | /movies/:id | `{ inMyList: true }` | Flag jadi true |
| Remove from List | PATCH | /movies/:id | `{ inMyList: false }` | Flag jadi false |
| Update Movie | PATCH | /movies/:id | `{ field: value }` | Update field |

**Key Point:** Semua operasi add/remove menggunakan **PATCH**, bukan POST/DELETE!

---

Dengan pendekatan ini, aplikasi Anda:
- ✅ Efficient dan fast
- ✅ Tidak ada data duplikat
- ✅ User friendly (reversible actions)
- ✅ Easy to maintain