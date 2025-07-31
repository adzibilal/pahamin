'use client';

import { useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import { saveStudySession } from '@/lib/database';
import ExplainProgress from './ExplainProgress';

export default function ExplainForm() {
  const [topic, setTopic] = useState('');
  const [style, setStyle] = useState('singkat');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const { userId } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/explain', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic, style }),
      });

      if (response.ok) {
        const data = await response.json();
        setResult(data);
        
        // Save to database if user is logged in
        if (userId) {
          await saveStudySession(userId, topic, 'explain', {
            style,
            explanation: data.explanation,
            summary: data.summary,
            keyPoints: data.keyPoints,
          });
        }
      } else {
        console.error('Error generating explanation');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="topic" className="block text-sm font-medium text-text-primary mb-2">
            Topik yang ingin dipelajari
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

        <div>
          <label htmlFor="style" className="block text-sm font-medium text-text-primary mb-2">
            Gaya Penjelasan
          </label>
          <select
            id="style"
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-surface"
          >
            <option value="singkat">Singkat & Jelas</option>
            <option value="lengkap">Lengkap & Detail</option>
            <option value="pemula">Untuk Pemula</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={isLoading || !topic.trim()}
          className="w-full bg-gradient-to-r from-primary to-primary-hover text-text-primary py-3 px-6 rounded-xl font-semibold hover:shadow-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {isLoading ? 'Memproses...' : 'Dapatkan Penjelasan'}
        </button>
      </form>

      {result && (
        <div className="mt-8 bg-surface rounded-2xl p-6 shadow-medium">
          {/* Progress Tracker */}
          {userId && (
            <ExplainProgress
              userId={userId}
              topic={topic}
              explanation={result.explanation}
            />
          )}
          
          <h3 className="text-xl font-semibold text-text-primary mb-4">
            Penjelasan: {topic}
          </h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-text-primary mb-2">Penjelasan:</h4>
              <p className="text-text-secondary leading-relaxed">
                {result.explanation}
              </p>
            </div>
            
            <div>
              <h4 className="font-medium text-text-primary mb-2">Ringkasan:</h4>
              <p className="text-text-secondary">
                {result.summary}
              </p>
            </div>
            
            <div>
              <h4 className="font-medium text-text-primary mb-2">Poin Penting:</h4>
              <ul className="list-disc list-inside space-y-1 text-text-secondary">
                {result.keyPoints.map((point: string, index: number) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 