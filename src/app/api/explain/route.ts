import { NextRequest, NextResponse } from 'next/server';
import { createGeminiAPI } from '@/lib/gemini';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { topic, style } = body;

    if (!topic || !style) {
      return NextResponse.json(
        { error: 'Topic dan style diperlukan' },
        { status: 400 }
      );
    }

    // Validasi style
    if (!['singkat', 'lengkap', 'pemula'].includes(style)) {
      return NextResponse.json(
        { error: 'Style harus salah satu dari: singkat, lengkap, pemula' },
        { status: 400 }
      );
    }

    const geminiAPI = createGeminiAPI();
    const result = await geminiAPI.explainTopic({ topic, style });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in explain API:', error);
    
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