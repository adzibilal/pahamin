'use client';

import { useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import { saveStudySession } from '@/lib/database';
import QuestionList from '@/components/QuestionList';
import ProgressTracker from '@/components/ProgressTracker';

export default function QuizPage() {
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('sedang');
  const [count, setCount] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const { userId } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic, difficulty, count }),
      });

      if (response.ok) {
        const data = await response.json();
        setQuestions(data.questions);
        
        // Save to database if user is logged in
        if (userId) {
          await saveStudySession(userId, topic, 'quiz', {
            difficulty,
            count,
            questions: data.questions,
          });
        }
      } else {
        const errorData = await response.json();
        console.error('Error generating quiz:', errorData.error);
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
            📝 Generator Soal
          </h1>
          <p className="text-lg text-text-secondary">
            Buat soal latihan dengan AI untuk menguji pemahamanmu
          </p>
        </div>
        
        {/* Progress Tracker */}
        {userId && questions.length > 0 && (
          <ProgressTracker
            userId={userId}
            topic={topic}
            sessionType="quiz"
            sessionData={{ questions }}
          />
        )}
        
        <div className="bg-surface rounded-2xl shadow-medium p-8 mb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="topic" className="block text-sm font-medium text-text-primary mb-2">
                Topik Soal
              </label>
              <input
                type="text"
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Contoh: OOP, React Hooks, DBMS..."
                className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-surface"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="difficulty" className="block text-sm font-medium text-text-primary mb-2">
                  Tingkat Kesulitan
                </label>
                <select
                  id="difficulty"
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-surface"
                >
                  <option value="mudah">Mudah</option>
                  <option value="sedang">Sedang</option>
                  <option value="sulit">Sulit</option>
                </select>
              </div>

              <div>
                <label htmlFor="count" className="block text-sm font-medium text-text-primary mb-2">
                  Jumlah Soal
                </label>
                <input
                  type="number"
                  id="count"
                  value={count}
                  onChange={(e) => setCount(parseInt(e.target.value))}
                  min="1"
                  max="20"
                  className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-surface"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || !topic.trim()}
              className="w-full bg-gradient-to-r from-primary to-primary-hover text-text-primary py-3 px-6 rounded-xl font-semibold hover:shadow-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isLoading ? 'Membuat Soal...' : 'Buat Soal'}
            </button>
          </form>
        </div>

        {questions.length > 0 && (
          <div className="bg-surface rounded-2xl shadow-medium p-8">
            <QuestionList questions={questions} />
          </div>
        )}
      </div>
    </div>
  );
} 