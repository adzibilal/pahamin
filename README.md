# 🧠 Pahamin – AI Study Buddy

**Pahamin** adalah aplikasi web edukatif berbasis AI yang dirancang untuk membantu siswa, mahasiswa, atau siapa saja memahami materi pelajaran dengan lebih mudah dan interaktif. Menggunakan teknologi **Next.js + TypeScript** dan **Gemini API (Google Generative AI)**, pengguna dapat mempelajari topik tertentu melalui penjelasan AI, latihan soal, dan flashcard untuk pengulangan.

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

---

## 🛠️ Teknologi yang Digunakan

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Bahasa**: TypeScript
- **Styling**: Tailwind CSS
- **AI Model**: [Gemini API (Google Generative AI)](https://ai.google.dev/)
- **State Management**: Zustand (atau Context API)
- **(Optional)** Storage: LocalStorage / Supabase

---

## 📦 Instalasi Lokal

```bash
git clone https://github.com/yourusername/pahamin.git
cd pahamin
npm install
```

Buat file `.env.local` dan tambahkan:

```env
GEMINI_API_KEY=your_google_generative_ai_key
```

Jalankan project:

```bash
npm run dev
```

Akses di [http://localhost:3000](http://localhost:3000)

---

## 📁 Struktur Folder

```
/app
  /explain
  /quiz
  /flashcard
/components
  ExplainForm.tsx
  Flashcard.tsx
  QuestionList.tsx
/lib
  gemini.ts       # Wrapper untuk pemanggilan Gemini API
/api
  explain.ts      # API route untuk penjelasan materi
  quiz.ts         # API route untuk soal
public/
.env.local
```

---

## 📌 Contoh Prompt ke Gemini API

```text
Jelaskan topik "Object-Oriented Programming" secara ringkas dan mudah dipahami oleh pelajar SMA.
```

---

## 💡 Rencana Pengembangan Selanjutnya

- [ ] Sistem login dan penyimpanan progress belajar
- [ ] Export materi dan soal ke PDF
- [ ] Mode kuis dengan penilaian otomatis
- [ ] Fitur belajar acak dan trending topics

---

## 📃 Lisensi

MIT License

---

## 👨‍💻 Dibuat oleh

**Adzi Bilal** – Fullstack Developer & AI Enthusiast  
> Showcase project untuk portofolio pribadi  
