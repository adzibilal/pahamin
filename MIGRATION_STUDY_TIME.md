# Migrasi Database: Menambahkan Kolom study_time

## Masalah
Error: `Could not find the 'study_time' column of 'user_progress' in the schema cache`

## Solusi
Jalankan script SQL berikut di Supabase SQL Editor:

```sql
-- Add study_time column to existing user_progress table
ALTER TABLE user_progress 
ADD COLUMN IF NOT EXISTS study_time INTEGER DEFAULT 0;

-- Update existing records to have study_time = 0 if NULL
UPDATE user_progress 
SET study_time = 0 
WHERE study_time IS NULL;
```

## Langkah-langkah:

1. Buka [Supabase Dashboard](https://supabase.com/dashboard)
2. Pilih project Anda
3. Buka **SQL Editor**
4. Copy dan paste script SQL di atas
5. Klik **Run** untuk menjalankan script

## Verifikasi
Setelah menjalankan script, Anda bisa memverifikasi dengan query:

```sql
-- Check if study_time column exists
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'user_progress' AND column_name = 'study_time';
```

## Catatan
- Script ini aman untuk dijalankan karena menggunakan `IF NOT EXISTS`
- Semua record yang sudah ada akan diupdate dengan `study_time = 0`
- Field baru akan memiliki default value `0` 