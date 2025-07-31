# Setup Database untuk Fitur Progress

## Masalah
Error: `Could not find the 'study_time' column of 'user_progress' in the schema cache`

## Penyebab
Database schema belum memiliki kolom `study_time` yang diperlukan untuk fitur progress tracking.

## Solusi

### Langkah 1: Jalankan Migrasi Database

1. Buka [Supabase Dashboard](https://supabase.com/dashboard)
2. Pilih project Anda
3. Buka **SQL Editor**
4. Copy dan paste script berikut:

```sql
-- Complete Database Migration Script
-- Run this in Supabase SQL Editor

-- 1. Add study_time column to user_progress table
ALTER TABLE user_progress 
ADD COLUMN IF NOT EXISTS study_time INTEGER DEFAULT 0;

-- 2. Update existing records to have study_time = 0 if NULL
UPDATE user_progress 
SET study_time = 0 
WHERE study_time IS NULL;

-- 3. Ensure all required columns exist with proper defaults
ALTER TABLE user_progress 
ALTER COLUMN quiz_score SET DEFAULT 0,
ALTER COLUMN flashcards_completed SET DEFAULT 0,
ALTER COLUMN study_time SET DEFAULT 0;

-- 4. Update any NULL values to 0
UPDATE user_progress 
SET 
  quiz_score = COALESCE(quiz_score, 0),
  flashcards_completed = COALESCE(flashcards_completed, 0),
  study_time = COALESCE(study_time, 0)
WHERE 
  quiz_score IS NULL 
  OR flashcards_completed IS NULL 
  OR study_time IS NULL;

-- 5. Verify the table structure
SELECT 
  column_name, 
  data_type, 
  is_nullable, 
  column_default
FROM information_schema.columns 
WHERE table_name = 'user_progress'
ORDER BY ordinal_position;
```

5. Klik **Run** untuk menjalankan script

### Langkah 2: Verifikasi Migrasi

Setelah menjalankan script, verifikasi dengan query:

```sql
-- Check if study_time column exists
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'user_progress' AND column_name = 'study_time';
```

### Langkah 3: Test Fitur Progress

1. Restart aplikasi Next.js
2. Login ke aplikasi
3. Buat sesi belajar baru
4. Cek halaman progress di `/dashboard/progress`

## Struktur Database yang Diperlukan

### Tabel `user_progress`
```sql
CREATE TABLE user_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  topic TEXT NOT NULL,
  quiz_score INTEGER DEFAULT 0,
  flashcards_completed INTEGER DEFAULT 0,
  study_time INTEGER DEFAULT 0,  -- NEW COLUMN
  last_studied TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, topic)
);
```

## Fitur Progress yang Tersedia

Setelah migrasi berhasil, fitur berikut akan tersedia:

1. **Auto-tracking waktu belajar** untuk semua sesi
2. **Progress per topik** dengan statistik detail
3. **Halaman progress** di `/dashboard/progress`
4. **Progress card** di dashboard utama
5. **Topic progress** di halaman detail sesi

## Troubleshooting

### Jika masih error:
1. Pastikan script SQL berhasil dijalankan
2. Cek apakah kolom `study_time` sudah ada dengan query verifikasi
3. Restart aplikasi Next.js
4. Clear browser cache

### Jika ada data yang hilang:
- Script ini aman dan tidak akan menghapus data yang sudah ada
- Semua record akan diupdate dengan nilai default yang sesuai

## Catatan Penting

- Script menggunakan `IF NOT EXISTS` sehingga aman dijalankan berulang kali
- Semua field akan memiliki default value `0`
- Data yang sudah ada tidak akan terpengaruh
- Fitur progress akan mulai bekerja setelah migrasi berhasil 