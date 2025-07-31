# 🧠 Pahamin – AI Study Buddy

**Pahamin** adalah aplikasi web edukatif berbasis AI yang dirancang untuk membantu siswa, mahasiswa, atau siapa saja memahami materi pelajaran dengan lebih mudah dan interaktif. Menggunakan teknologi **Next.js + TypeScript**, **Clerk Authentication**, **Supabase Database**, dan **Gemini API (Google Generative AI)**, pengguna dapat mempelajari topik tertentu melalui penjelasan AI, latihan soal, dan flashcard untuk pengulangan.

---

## 🚀 Fitur Utama

### 📘 1. Penjelasan Materi
- Input topik seperti "OOP", "React Hooks", atau "DBMS".
- AI akan memberikan penjelasan terstruktur dalam gaya yang bisa dipilih (singkat, lengkap, atau untuk pemula).
- Output ditampilkan dengan tampilan bersih dan bisa disalin atau disimpan.

### 📝 2. Generator Soal + Jawaban
- Pengguna memasukkan topik dan tingkat kesulitan.
- AI menghasilkan soal pilihan ganda lengkap dengan kunci jawaban dan pembahasan.
- Cocok untuk latihan atau bahan kuis mandiri.

### 🔁 3. Flashcard Mode
- Belajar cepat dengan format tanya-jawab.
- Flip card interaktif.
- Disusun berdasarkan penjelasan atau soal yang sudah dibuat sebelumnya.

### 👤 4. User Authentication & Progress Tracking
- Login/Register dengan Clerk
- Dashboard untuk melihat progress belajar
- Penyimpanan riwayat sesi belajar di Supabase
- Tracking progress per topik

---

## 🛠️ Teknologi yang Digunakan

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Bahasa**: TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: [Clerk](https://clerk.com/)
- **Database**: [Supabase](https://supabase.com/)
- **AI Model**: [Gemini API (Google Generative AI)](https://ai.google.dev/)

---

## 📦 Instalasi Lokal

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/pahamin.git
cd pahamin
npm install
```

### 2. Setup Environment Variables
Buat file `.env.local` dan tambahkan:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_publishable_key
CLERK_SECRET_KEY=sk_test_your_clerk_secret_key

# Supabase Database
NEXT_PUBLIC_SUPABASE_PROJECT_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_API_KEY=your_supabase_anon_key

# Gemini AI
GEMINI_API_KEY=your_google_generative_ai_key
```

### 3. Setup Clerk
1. Daftar di [Clerk Dashboard](https://dashboard.clerk.com/)
2. Buat aplikasi baru
3. Copy `Publishable Key` dan `Secret Key` ke `.env.local`
4. Tambahkan domain `localhost:3000` ke allowed origins

### 4. Setup Supabase
1. Daftar di [Supabase Dashboard](https://supabase.com/)
2. Buat project baru
3. Copy `Project URL` dan `Anon Key` ke `.env.local`
4. Buka SQL Editor di Supabase Dashboard
5. Jalankan SQL script dari file `supabase-schema-simple.sql` (untuk testing) atau `supabase-schema.sql` (dengan RLS)
6. **Note**: Jika menggunakan RLS, pastikan JWT settings sudah dikonfigurasi dengan benar

### 5. Jalankan Project
```bash
npm run dev
```

Akses di [http://localhost:3000](http://localhost:3000)

---

## 📁 Struktur Folder

```
/app
  /dashboard          # Dashboard user (protected)
  /explain           # Halaman penjelasan materi
  /quiz              # Halaman generator soal
  /flashcard         # Halaman flashcard mode
/components
  SignInButton.tsx   # Komponen login
  SignUpButton.tsx   # Komponen register
  UserButton.tsx     # Komponen user profile
  ExplainForm.tsx    # Form penjelasan materi
  Flashcard.tsx      # Komponen flashcard
  QuestionList.tsx   # Daftar soal
/lib
  supabase.ts        # Konfigurasi Supabase client
  database.ts        # Fungsi database operations
  gemini.ts          # Wrapper untuk Gemini API
/api
  explain.ts         # API route untuk penjelasan materi
  quiz.ts            # API route untuk soal
middleware.ts        # Clerk middleware
supabase-schema.sql  # Database schema
.env.local
```

---

## 🗄️ Database Schema

### study_sessions
- `id`: UUID (Primary Key)
- `user_id`: TEXT (Clerk User ID)
- `topic`: TEXT (Topik yang dipelajari)
- `type`: TEXT (explain/quiz/flashcard)
- `content`: JSONB (Data hasil AI)
- `created_at`: TIMESTAMP
- `updated_at`: TIMESTAMP

### user_progress
- `id`: UUID (Primary Key)
- `user_id`: TEXT (Clerk User ID)
- `topic`: TEXT (Topik yang dipelajari)
- `quiz_score`: INTEGER (Skor quiz)
- `flashcards_completed`: INTEGER (Jumlah flashcard selesai)
- `last_studied`: TIMESTAMP
- `created_at`: TIMESTAMP
- `updated_at`: TIMESTAMP

---

## 📌 Contoh Prompt ke Gemini API

```text
Jelaskan topik "Object-Oriented Programming" secara ringkas dan mudah dipahami oleh pelajar SMA.
```

---

## 💡 Rencana Pengembangan Selanjutnya

- [x] Sistem login dan penyimpanan progress belajar
- [ ] Export materi dan soal ke PDF
- [ ] Mode kuis dengan penilaian otomatis
- [ ] Fitur belajar acak dan trending topics
- [ ] Notifikasi dan reminder belajar
- [ ] Social features (share progress, leaderboard)

---

## 📃 Lisensi

MIT License

---

## 👨‍💻 Dibuat oleh

**Adzi Bilal** – Fullstack Developer & AI Enthusiast  
> Showcase project untuk portofolio pribadi
