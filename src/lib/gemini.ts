import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export interface ExplainRequest {
  topic: string;
  style: 'singkat' | 'lengkap' | 'pemula';
}

export interface QuizRequest {
  topic: string;
  difficulty: 'mudah' | 'sedang' | 'sulit';
  count: number;
}

export interface ExplainResponse {
  explanation: string;
  summary: string;
  keyPoints: string[];
}

export interface QuizResponse {
  questions: Array<{
    id: number;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  }>;
}

export class GeminiAPI {
  private model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  async explainTopic(request: ExplainRequest): Promise<ExplainResponse> {
    const { topic, style } = request;
    
    const styleMap = {
      singkat: 'ringkas dan mudah dipahami',
      lengkap: 'lengkap dan detail dengan contoh',
      pemula: 'sangat sederhana untuk pemula'
    };

    const prompt = `Jelaskan topik "${topic}" dalam gaya ${styleMap[style]} untuk pelajar Indonesia. 
    
    Berikan respons dalam format JSON berikut:
    {
      "explanation": "Penjelasan lengkap tentang topik",
      "summary": "Ringkasan singkat dalam 1-2 kalimat",
      "keyPoints": ["Poin penting 1", "Poin penting 2", "Poin penting 3"]
    }
    
    Pastikan penjelasan mudah dipahami dan sesuai dengan gaya ${styleMap[style]}.`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Parse JSON response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return {
          explanation: parsed.explanation || text,
          summary: parsed.summary || 'Ringkasan tidak tersedia',
          keyPoints: parsed.keyPoints || ['Poin penting tidak tersedia']
        };
      }
      
      // Fallback jika JSON parsing gagal
      return {
        explanation: text,
        summary: 'Ringkasan tidak tersedia',
        keyPoints: ['Poin penting tidak tersedia']
      };
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      throw new Error('Gagal mendapatkan penjelasan dari AI');
    }
  }

  async generateQuiz(request: QuizRequest): Promise<QuizResponse> {
    const { topic, difficulty, count } = request;
    
    const difficultyMap = {
      mudah: 'mudah untuk pemula',
      sedang: 'menengah untuk yang sudah memahami dasar',
      sulit: 'sulit untuk yang sudah mahir'
    };

    const prompt = `Buat ${count} soal pilihan ganda tentang "${topic}" dengan tingkat kesulitan ${difficultyMap[difficulty]}.
    
    Berikan respons dalam format JSON berikut:
    {
      "questions": [
        {
          "id": 1,
          "question": "Pertanyaan soal",
          "options": ["A. Opsi A", "B. Opsi B", "C. Opsi C", "D. Opsi D"],
          "correctAnswer": 0,
          "explanation": "Penjelasan mengapa jawaban ini benar"
        }
      ]
    }
    
    Pastikan:
    - Soal berkualitas dan relevan dengan topik
    - Tingkat kesulitan sesuai dengan ${difficultyMap[difficulty]}
    - Setiap soal memiliki 4 opsi jawaban (A, B, C, D)
    - correctAnswer adalah index (0-3) dari jawaban yang benar
    - Explanation menjelaskan mengapa jawaban tersebut benar`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Parse JSON response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return {
          questions: parsed.questions || []
        };
      }
      
      // Fallback jika JSON parsing gagal
      return {
        questions: [{
          id: 1,
          question: `Contoh soal tentang ${topic}?`,
          options: ['Jawaban A', 'Jawaban B', 'Jawaban C', 'Jawaban D'],
          correctAnswer: 0,
          explanation: 'Penjelasan mengapa jawaban ini benar'
        }]
      };
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      throw new Error('Gagal membuat soal dari AI');
    }
  }

  async generateFlashcards(topic: string, count: number = 5): Promise<Array<{
    id: number;
    question: string;
    answer: string;
  }>> {
    const prompt = `Buat ${count} flashcard tentang "${topic}" untuk belajar cepat.
    
    Berikan respons dalam format JSON berikut:
    {
      "flashcards": [
        {
          "id": 1,
          "question": "Pertanyaan flashcard",
          "answer": "Jawaban flashcard"
        }
      ]
    }
    
    Pastikan:
    - Pertanyaan singkat dan jelas
    - Jawaban mudah dipahami
    - Cocok untuk belajar cepat
    - Topik berkaitan dengan "${topic}"`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Parse JSON response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return parsed.flashcards || [];
      }
      
      // Fallback jika JSON parsing gagal
      return Array.from({ length: count }, (_, i) => ({
        id: i + 1,
        question: `Pertanyaan ${i + 1} tentang ${topic}?`,
        answer: `Jawaban untuk pertanyaan ${i + 1} tentang ${topic}`
      }));
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      throw new Error('Gagal membuat flashcard dari AI');
    }
  }
}

// Helper function untuk membuat instance GeminiAPI
export function createGeminiAPI(): GeminiAPI {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY tidak ditemukan di environment variables');
  }
  return new GeminiAPI();
} 