'use client';

import { useState } from 'react';

interface FlashcardData {
  id: number;
  question: string;
  answer: string;
}

interface FlashcardProps {
  cards: FlashcardData[];
}

export default function Flashcard({ cards }: FlashcardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showProgress, setShowProgress] = useState(false);

  const currentCard = cards[currentIndex];

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  if (!cards.length) {
    return (
      <div className="text-center text-text-tertiary py-12">
        <p className="text-lg">Belum ada flashcard tersedia</p>
        <p className="text-sm mt-2">Buat flashcard dari penjelasan materi atau soal yang sudah dibuat</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-text-secondary">
            {currentIndex + 1} dari {cards.length}
          </span>
          <button
            onClick={() => setShowProgress(!showProgress)}
            className="text-sm text-secondary hover:text-primary transition-colors"
          >
            {showProgress ? 'Sembunyikan' : 'Tampilkan'} Progress
          </button>
        </div>
        
        {showProgress && (
          <div className="w-full bg-border rounded-full h-2">
            <div
              className="bg-secondary h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / cards.length) * 100}%` }}
            ></div>
          </div>
        )}
      </div>

      {/* Flashcard */}
      <div className="relative">
        <div
          className={`w-full h-64 bg-surface rounded-2xl shadow-medium cursor-pointer transform transition-all duration-500 ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
          onClick={handleFlip}
        >
          <div className="absolute inset-0 flex items-center justify-center p-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-text-primary mb-4">
                {isFlipped ? 'Jawaban' : 'Pertanyaan'}
              </div>
              <div className="text-lg text-text-secondary leading-relaxed">
                {isFlipped ? currentCard.answer : currentCard.question}
              </div>
            </div>
          </div>
        </div>

        {/* Flip indicator */}
        <div className="absolute top-4 right-4">
          <div className="bg-secondary text-text-inverse px-3 py-1 rounded-full text-sm">
            {isFlipped ? '👁️ Lihat Pertanyaan' : '🔄 Lihat Jawaban'}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center mt-8">
        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className="px-6 py-3 bg-gray-600 text-text-inverse rounded-xl hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          ← Sebelumnya
        </button>

        <button
          onClick={handleRestart}
          className="px-6 py-3 bg-primary text-text-primary rounded-xl hover:bg-primary-hover transition-colors"
        >
          🔄 Mulai Ulang
        </button>

        <button
          onClick={handleNext}
          disabled={currentIndex === cards.length - 1}
          className="px-6 py-3 bg-secondary text-text-inverse rounded-xl hover:bg-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Selanjutnya →
        </button>
      </div>

      {/* Instructions */}
      <div className="mt-6 text-center text-sm text-text-tertiary">
        <p>Klik kartu untuk melihat pertanyaan/jawaban</p>
        <p className="mt-1">Gunakan tombol navigasi untuk berpindah antar kartu</p>
      </div>
    </div>
  );
} 