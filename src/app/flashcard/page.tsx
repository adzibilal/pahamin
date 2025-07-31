'use client';

import { useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import { saveStudySession } from '@/lib/database';
import Flashcard from '@/components/Flashcard';
import ProgressTracker from '@/components/ProgressTracker';

export default function FlashcardPage() {
  const [topic, setTopic] = useState('');
  const [count, setCount] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const [cards, setCards] = useState<Array<{id: number; question: string; answer: string}>>([]);
  const { userId } = useAuth();

  const handleGenerateCards = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/flashcard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic, count }),
      });

      if (response.ok) {
        const data = await response.json();
        setCards(data.flashcards);
        
        // Save to database if user is logged in
        if (userId) {
          await saveStudySession(userId, topic, 'flashcard', {
            count,
            flashcards: data.flashcards,
          });
        }
      } else {
        const errorData = await response.json();
        console.error('Error generating flashcards:', errorData.error);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background-secondary p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-text-primary mb-4">
            🔁 Flashcard Mode
          </h1>
          <p className="text-lg text-text-secondary">
            Belajar cepat dengan format tanya-jawab interaktif
          </p>
        </div>
        
        {/* Progress Tracker */}
        {userId && cards.length > 0 && (
          <ProgressTracker
            userId={userId}
            topic={topic}
            sessionType="flashcard"
            sessionData={{ flashcards: cards }}
          />
        )}
        
        {cards.length === 0 ? (
          <div className="bg-surface rounded-2xl shadow-medium p-8">
            <form onSubmit={handleGenerateCards} className="space-y-6">
              <div>
                <label htmlFor="topic" className="block text-sm font-medium text-text-primary mb-2">
                  Topik Flashcard
                </label>
                <input
                  type="text"
                  id="topic"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Contoh: OOP, React Hooks, DBMS..."
                  className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-secondary focus:border-transparent bg-surface"
                  required
                />
              </div>

              <div>
                <label htmlFor="count" className="block text-sm font-medium text-text-primary mb-2">
                  Jumlah Flashcard
                </label>
                <input
                  type="number"
                  id="count"
                  value={count}
                  onChange={(e) => setCount(parseInt(e.target.value))}
                  min="3"
                  max="20"
                  className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-secondary focus:border-transparent bg-surface"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading || !topic.trim()}
                className="w-full bg-gradient-to-r from-secondary to-primary text-text-inverse py-3 px-6 rounded-xl font-semibold hover:shadow-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isLoading ? 'Membuat Flashcard...' : 'Buat Flashcard'}
              </button>
            </form>
          </div>
        ) : (
          <div className="bg-surface rounded-2xl shadow-medium p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-text-primary">
                Flashcard: {topic}
              </h2>
              <button
                onClick={() => setCards([])}
                className="px-4 py-2 bg-gray-600 text-text-inverse rounded-xl hover:bg-gray-700 transition-colors"
              >
                Buat Baru
              </button>
            </div>
            <Flashcard cards={cards} />
          </div>
        )}
      </div>
    </div>
  );
} 