# 🤖 Gemini API Setup Guide

## Langkah-langkah Setup Gemini API untuk Pahamin

### 1. Dapatkan API Key
1. Kunjungi [Google AI Studio](https://aistudio.google.com/)
2. Login dengan Google account
3. Klik "Get API key" atau "Create API key"
4. Copy API key yang diberikan

### 2. Setup Environment Variables
Tambahkan ke file `.env.local`:
```env
GEMINI_API_KEY=your_gemini_api_key_here
```

### 3. Test API Connection
1. Jalankan aplikasi: `npm run dev`
2. Buka browser ke `http://localhost:3000`
3. Coba fitur "Penjelasan Materi"
4. Masukkan topik seperti "React Hooks" atau "OOP"
5. Pilih gaya penjelasan dan klik "Dapatkan Penjelasan"

### 4. Fitur yang Tersedia

#### 📘 Penjelasan Materi
- **Input**: Topik + Gaya (singkat/lengkap/pemula)
- **Output**: Penjelasan + Ringkasan + Poin Penting
- **Model**: gemini-1.5-flash

#### 📝 Generator Soal
- **Input**: Topik + Difficulty + Jumlah soal
- **Output**: Soal pilihan ganda + Kunci jawaban + Pembahasan
- **Model**: gemini-1.5-flash

#### 🔁 Flashcard Mode
- **Input**: Topik + Jumlah flashcard
- **Output**: Pertanyaan + Jawaban untuk belajar cepat
- **Model**: gemini-1.5-flash

### 5. Troubleshooting

#### Error: "GEMINI_API_KEY tidak ditemukan"
- **Solusi**: Pastikan environment variable sudah diset dengan benar
- **Restart**: Restart development server setelah mengubah .env.local

#### Error: "Gagal mendapatkan penjelasan dari AI"
- **Solusi**: 
  1. Cek API key valid
  2. Cek koneksi internet
  3. Cek quota API (gratis 15 requests/minute)

#### Error: "JSON parsing failed"
- **Solusi**: AI akan memberikan fallback response
- **Note**: Ini normal, AI kadang tidak mengikuti format JSON

### 6. API Limits & Pricing

#### Free Tier (Gemini 1.5 Flash)
- **Requests**: 15 requests/minute
- **Characters**: 1M characters/minute
- **Cost**: Gratis untuk penggunaan normal

#### Pro Tier (Gemini 1.5 Pro)
- **Requests**: 1000 requests/minute
- **Characters**: 10M characters/minute
- **Cost**: $0.0025 per 1M characters

### 7. Model Configuration

#### Current Model: gemini-1.5-flash
- **Speed**: Sangat cepat
- **Quality**: Baik untuk edukasi
- **Cost**: Gratis
- **Context**: 1M tokens

#### Alternative Models
```typescript
// Untuk kualitas lebih tinggi (tapi lebih lambat)
model: "gemini-1.5-pro"

// Untuk kecepatan maksimal
model: "gemini-1.5-flash"
```

### 8. Prompt Engineering

#### Penjelasan Materi
```typescript
const prompt = `Jelaskan topik "${topic}" dalam gaya ${style} untuk pelajar Indonesia.
Berikan respons dalam format JSON:
{
  "explanation": "Penjelasan lengkap",
  "summary": "Ringkasan singkat",
  "keyPoints": ["Poin 1", "Poin 2", "Poin 3"]
}`;
```

#### Generator Soal
```typescript
const prompt = `Buat ${count} soal pilihan ganda tentang "${topic}" dengan tingkat kesulitan ${difficulty}.
Berikan respons dalam format JSON:
{
  "questions": [
    {
      "id": 1,
      "question": "Pertanyaan",
      "options": ["A. Opsi A", "B. Opsi B", "C. Opsi C", "D. Opsi D"],
      "correctAnswer": 0,
      "explanation": "Penjelasan"
    }
  ]
}`;
```

### 9. Error Handling

#### Graceful Fallback
- Jika JSON parsing gagal, gunakan text response
- Jika API error, tampilkan pesan user-friendly
- Log error untuk debugging

#### Rate Limiting
- Implementasi delay jika diperlukan
- Cache response untuk mengurangi API calls
- Monitor usage di Google AI Studio

### 10. Production Considerations

#### Environment Variables
```env
# Development
GEMINI_API_KEY=your_dev_key

# Production  
GEMINI_API_KEY=your_prod_key
```

#### Monitoring
- Monitor API usage di Google AI Studio
- Set up alerts untuk quota limits
- Log API calls untuk analytics

---

**Need Help?**
- [Google AI Studio](https://aistudio.google.com/)
- [Gemini API Documentation](https://ai.google.dev/docs)
- [Next.js + Gemini Integration](https://ai.google.dev/tutorials) 