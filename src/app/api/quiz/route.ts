import { NextRequest, NextResponse } from 'next/server';
import { createGeminiAPI } from '@/lib/gemini';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { topic, difficulty, count } = body;

    if (!topic || !difficulty || !count) {
      return NextResponse.json(
        { error: 'Topic, difficulty, dan count diperlukan' },
        { status: 400 }
      );
    }

    // Validasi difficulty
    if (!['mudah', 'sedang', 'sulit'].includes(difficulty)) {
      return NextResponse.json(
        { error: 'Difficulty harus salah satu dari: mudah, sedang, sulit' },
        { status: 400 }
      );
    }

    // Validasi count
    if (count < 1 || count > 20) {
      return NextResponse.json(
        { error: 'Jumlah soal harus antara 1-20' },
        { status: 400 }
      );
    }

    const geminiAPI = createGeminiAPI();
    const result = await geminiAPI.generateQuiz({ topic, difficulty, count });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in quiz API:', error);
    
    if (error instanceof Error && error.message.includes('GEMINI_API_KEY')) {
      return NextResponse.json(
        { error: 'Gemini API key tidak ditemukan. Pastikan GEMINI_API_KEY sudah diset di environment variables.' },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat memproses permintaan' },
      { status: 500 }
    );
  }
} 