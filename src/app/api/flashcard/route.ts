import { NextRequest, NextResponse } from 'next/server';
import { createGeminiAPI } from '@/lib/gemini';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { topic, count } = body;

    if (!topic) {
      return NextResponse.json(
        { error: 'Topic diperlukan' },
        { status: 400 }
      );
    }

    // Validasi count
    const flashcardCount = count || 5;
    if (flashcardCount < 1 || flashcardCount > 20) {
      return NextResponse.json(
        { error: 'Jumlah flashcard harus antara 1-20' },
        { status: 400 }
      );
    }

    const geminiAPI = createGeminiAPI();
    const result = await geminiAPI.generateFlashcards(topic, flashcardCount);

    return NextResponse.json({ flashcards: result });
  } catch (error) {
    console.error('Error in flashcard API:', error);
    
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