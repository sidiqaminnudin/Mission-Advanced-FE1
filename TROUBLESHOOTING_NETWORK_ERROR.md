# 🔧 Troubleshooting: Network Error

## ⚠️ Error: "Network Error"

Error ini muncul ketika aplikasi **tidak bisa terhubung** ke MockAPI. Ada beberapa penyebab umum:

---

## 📋 Checklist Troubleshooting

### 1. ✅ Cek File `.env`

**Buka file `.env` di root project dan pastikan sudah dikonfigurasi:**

```env
VITE_API_BASE_URL=https://your-actual-mockapi-id.mockapi.io/api/v1
```

❌ **SALAH** (masih placeholder):
```env
VITE_API_BASE_URL=https://your-mockapi-id.mockapi.io/api/v1
```

✅ **BENAR** (sudah diisi dengan ID MockAPI Anda):
```env
VITE_API_BASE_URL=https://6789abcd123456.mockapi.io/api/v1
```

**Cara mendapatkan URL MockAPI:**
1. Login ke https://mockapi.io/
2. Buka project Anda
3. Klik resource `movies`
4. Copy URL endpoint (biasanya tampil di atas)

---

### 2. ✅ Restart Development Server

Setelah mengubah file `.env`, **WAJIB restart server**:

```bash
# Stop server (Ctrl + C)
# Lalu jalankan lagi:
npm run dev
```

**PENTING:** Vite tidak auto-reload environment variables!

---

### 3. ✅ Verifikasi MockAPI Sudah Setup

**Pastikan MockAPI sudah dikonfigurasi dengan benar:**

1. Login ke https://mockapi.io/
2. Pastikan ada project
3. Pastikan ada resource dengan nama `movies`
4. Pastikan sudah ada data (minimal 5-10 movies)

**Test langsung di browser:**
```
https://[YOUR-ID].mockapi.io/api/v1/movies
```

Ganti `[YOUR-ID]` dengan ID MockAPI Anda.

**Expected Response:** JSON array berisi movies
```json
[
  {
    "id": "1",
    "title": "Movie 1",
    "inMyList": true,
    ...
  }
]
```

---

### 4. ✅ Cek Console Browser

**Buka DevTools → Console:**

1. Jalankan aplikasi
2. Buka halaman "Daftar Saya"
3. Lihat console untuk error messages

**Axios Interceptor akan log request:**
```
🚀 Request: GET /movies
❌ Response Error: Network Error
```

**Cek URL yang digunakan:**
```javascript
// Di Console, jalankan:
console.log(import.meta.env.VITE_API_BASE_URL)
```

**Expected output:**
```
https://6789abcd123456.mockapi.io/api/v1
```

**Jika output-nya `undefined`:**
- File `.env` belum dikonfigurasi
- Atau server belum di-restart setelah update `.env`

---

### 5. ✅ Test Koneksi Manual

**Buka Console Browser dan test koneksi manual:**

```javascript
// Paste di Console:
fetch('https://YOUR-ID.mockapi.io/api/v1/movies')
  .then(res => res.json())
  .then(data => console.log('Success:', data))
  .catch(err => console.error('Failed:', err))
```

Ganti `YOUR-ID` dengan ID MockAPI Anda.

**Jika berhasil:** Akan tampil array movies
**Jika gagal:** 
- Cek URL apakah benar
- Cek internet connection
- Cek apakah MockAPI service sedang down

---

### 6. ✅ Cek Internet Connection

Network Error juga bisa disebabkan oleh:
- Tidak ada internet
- Firewall memblokir request
- VPN/Proxy issues

**Test internet:**
```bash
ping mockapi.io
```

---

## 🔄 Langkah-langkah Perbaikan

### Langkah 1: Setup MockAPI (Jika Belum)

1. Buka https://mockapi.io/
2. Sign up / Login
3. Klik "New Project"
4. Nama project: `ChillStreamingAPI`
5. Klik "New Resource"
6. Nama resource: `movies` (lowercase!)
7. Tambahkan fields sesuai `MOCKAPI_SETUP_GUIDE.md`
8. Input data sample (15 movies)

### Langkah 2: Konfigurasi .env

1. Copy endpoint URL dari MockAPI
2. Buka file `.env` di root project
3. Ganti `VITE_API_BASE_URL` dengan URL MockAPI Anda
4. Save file

Contoh:
```env
VITE_API_BASE_URL=https://6789abcd123456.mockapi.io/api/v1
```

### Langkah 3: Restart Server

```bash
# Terminal: Stop server (Ctrl + C)
npm run dev
```

### Langkah 4: Test Aplikasi

1. Buka http://localhost:5173 (atau port yang muncul)
2. Klik menu "Daftar Saya"
3. Data should load dari API

**Jika berhasil:** Movies akan muncul
**Jika masih error:** Lanjut ke langkah berikutnya

---

## 🐛 Debug Mode

### Aktifkan Debug Log

Di file `src/services/api/axiosConfig.js`, Axios Interceptor sudah log semua request:

```javascript
// Request log
🚀 Request: GET https://xxx.mockapi.io/api/v1/movies

// Response log (jika berhasil)
✅ Response: { status: 200, data: [...] }

// Error log (jika gagal)
❌ Response Error: Network Error
```

---

## 📝 Common Issues & Solutions

### Issue 1: "undefined" saat console.log env variable

**Problem:** Environment variable tidak terbaca

**Solution:**
1. Pastikan variabel diawali dengan `VITE_` (required by Vite)
2. Restart dev server setelah ubah `.env`
3. Jangan gunakan quotes di nilai variable:

❌ SALAH:
```env
VITE_API_BASE_URL="https://xxx.mockapi.io/api/v1"
```

✅ BENAR:
```env
VITE_API_BASE_URL=https://xxx.mockapi.io/api/v1
```

---

### Issue 2: "404 Not Found"

**Problem:** Endpoint tidak ditemukan

**Solution:**
- Pastikan resource di MockAPI bernama `movies` (plural, lowercase)
- Pastikan URL di .env include `/api/v1` di akhir
- Cek apakah ada typo di URL

---

### Issue 3: "CORS Error"

**Problem:** Browser block request karena CORS

**Solution:**
- MockAPI automatically handle CORS, tidak perlu konfigurasi
- Jika masih error, coba clear browser cache
- Atau test di Incognito/Private mode

---

### Issue 4: Data Tidak Muncul (Tapi Tidak Error)

**Problem:** Request berhasil tapi tidak ada data

**Solution:**
1. Cek MockAPI dashboard → pastikan ada data
2. Cek struktur data sesuai dengan requirement:
   ```json
   {
     "id": "1",
     "title": "Movie Title",
     "image": "/images/poster.png",
     "alt": "Alt text",
     "hasNewEpisode": true,
     "isTop10": false,
     "inMyList": true
   }
   ```
3. Pastikan field `inMyList` ada (boolean)

---

## 🎯 Quick Fix Checklist

- [ ] File `.env` sudah dikonfigurasi dengan URL MockAPI yang benar
- [ ] Development server sudah di-restart setelah update `.env`
- [ ] MockAPI project dan resource `movies` sudah dibuat
- [ ] MockAPI sudah berisi data sample (min 10 movies)
- [ ] Internet connection aktif dan stabil
- [ ] Console browser tidak menunjukkan error CORS
- [ ] URL di `.env` diakhiri dengan `/api/v1`
- [ ] Browser sudah di-refresh (Ctrl+F5 / Cmd+Shift+R)

---

## 🆘 Masih Belum Berhasil?

### Langkah Terakhir:

1. **Verify MockAPI URL manual di browser:**
   ```
   https://YOUR-ID.mockapi.io/api/v1/movies
   ```
   Harus tampil JSON array movies

2. **Cek file .env dengan command:**
   ```bash
   cat .env
   ```
   Atau buka manual dan verify isinya

3. **Hard refresh browser:**
   - Windows: Ctrl + F5
   - Mac: Cmd + Shift + R

4. **Clear browser cache dan cookies**

5. **Test di browser lain** (Chrome, Firefox, Edge)

---

## 📞 Need More Help?

Jika masih bermasalah, cek hal berikut untuk diagnosis:

1. Screenshot Console Browser (termasuk Network tab)
2. Isi file `.env` (tanpa share sensitive data)
3. Screenshot MockAPI dashboard
4. Error message lengkap

Dengan informasi ini, lebih mudah untuk identify masalah spesifik.

---

**Quick Command Reference:**

```bash
# Restart dev server
npm run dev

# Check .env content
cat .env

# Test MockAPI URL (di Console Browser)
fetch('https://YOUR-ID.mockapi.io/api/v1/movies').then(r=>r.json()).then(console.log)
```

Semoga berhasil! 🚀