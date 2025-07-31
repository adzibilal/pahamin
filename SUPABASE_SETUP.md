# 🗄️ Supabase Setup Guide

## Langkah-langkah Setup Supabase untuk Pahamin

### 1. Buat Project Supabase
1. Kunjungi [Supabase Dashboard](https://supabase.com/)
2. Klik "New Project"
3. Pilih organization atau buat baru
4. Isi nama project: `pahamin`
5. Buat database password yang kuat
6. Pilih region terdekat (Asia Southeast)
7. Klik "Create new project"

### 2. Ambil Credentials
1. Setelah project dibuat, buka **Settings** → **API**
2. Copy **Project URL** (format: `https://xxxxx.supabase.co`)
3. Copy **anon public** key
4. Paste ke file `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_PROJECT_URL=https://xxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_API_KEY=your_anon_key_here
   ```

### 3. Setup Database Schema

#### Opsi A: Simple Setup (Recommended untuk testing)
1. Buka **SQL Editor** di Supabase Dashboard
2. Copy isi file `supabase-schema-simple.sql`
3. Paste dan jalankan di SQL Editor
4. ✅ Selesai! Database siap digunakan

#### Opsi B: Full Setup dengan RLS
1. Buka **Settings** → **API** → **JWT Settings**
2. Copy **JWT Secret** dan simpan
3. Buka **SQL Editor**
4. Copy isi file `supabase-schema.sql`
5. Paste dan jalankan di SQL Editor
6. ✅ RLS policies sudah aktif

### 4. Test Connection
1. Jalankan aplikasi: `npm run dev`
2. Buka browser ke `http://localhost:3000`
3. Login dengan Clerk
4. Coba buat penjelasan materi
5. Cek di Supabase Dashboard → **Table Editor** → **study_sessions**

### 5. Troubleshooting

#### Error: "permission denied to set parameter"
- **Solusi**: Gunakan `supabase-schema-simple.sql` tanpa RLS
- **Atau**: Skip baris `ALTER DATABASE postgres SET "app.jwt_secret"`

#### Error: "RLS policies not working"
- **Solusi**: Pastikan JWT secret sudah dikonfigurasi dengan benar
- **Atau**: Gunakan simple setup tanpa RLS untuk testing

#### Error: "Cannot connect to Supabase"
- **Solusi**: 
  1. Cek environment variables sudah benar
  2. Restart development server
  3. Cek network connection

### 6. Production Setup
Untuk production, pastikan:
1. ✅ RLS policies aktif
2. ✅ JWT secret dikonfigurasi
3. ✅ Environment variables di production server
4. ✅ Domain di allowlist Supabase

### 7. Database Tables

#### study_sessions
- Menyimpan hasil penjelasan AI, quiz, dan flashcard
- `user_id`: ID dari Clerk
- `content`: JSON data hasil AI

#### user_progress  
- Tracking progress belajar per user
- `quiz_score`: Skor quiz (0-100)
- `flashcards_completed`: Jumlah flashcard selesai

### 8. Security Notes
- ✅ RLS memastikan user hanya bisa akses data sendiri
- ✅ JWT authentication dengan Clerk
- ✅ Environment variables untuk credentials
- ✅ HTTPS di production

---

**Need Help?** 
- [Supabase Documentation](https://supabase.com/docs)
- [Clerk + Supabase Integration](https://clerk.com/docs/integrations/databases/supabase)
- [Next.js + Supabase](https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs) 