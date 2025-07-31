'use client';

import { useState } from 'react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface QuestionListProps {
  questions: Question[];
}

export default function QuestionList({ questions }: QuestionListProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showAnswers, setShowAnswers] = useState(false);

  const handleAnswerSelect = (questionId: number, optionIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const getScore = () => {
    let correct = 0;
    questions.forEach(question => {
      if (selectedAnswers[question.id] === question.correctAnswer) {
        correct++;
      }
    });
    return { correct, total: questions.length };
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-text-primary">
          Soal Latihan ({questions.length} soal)
        </h3>
        <button
          onClick={() => setShowAnswers(!showAnswers)}
          className="px-4 py-2 bg-primary text-text-primary rounded-xl hover:bg-primary-hover transition-colors"
        >
          {showAnswers ? 'Sembunyikan Jawaban' : 'Tampilkan Jawaban'}
        </button>
      </div>

      {questions.map((question, index) => (
        <div key={question.id} className="bg-surface rounded-xl p-6 shadow-soft">
          <h4 className="text-lg font-medium text-text-primary mb-4">
            {index + 1}. {question.question}
          </h4>
          
          <div className="space-y-2 mb-4">
            {question.options.map((option, optionIndex) => (
              <label
                key={optionIndex}
                className={`flex items-center p-3 rounded-xl border cursor-pointer transition-colors ${
                  selectedAnswers[question.id] === optionIndex
                    ? 'border-primary bg-primary/10'
                    : 'border-border hover:border-border-strong'
                } ${
                  showAnswers && optionIndex === question.correctAnswer
                    ? 'border-green-500 bg-green-50'
                    : ''
                } ${
                  showAnswers && selectedAnswers[question.id] === optionIndex && optionIndex !== question.correctAnswer
                    ? 'border-red-500 bg-red-50'
                    : ''
                }`}
              >
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={optionIndex}
                  checked={selectedAnswers[question.id] === optionIndex}
                  onChange={() => handleAnswerSelect(question.id, optionIndex)}
                  className="mr-3"
                />
                <span className="text-text-secondary">{option}</span>
              </label>
            ))}
          </div>

          {showAnswers && (
            <div className="mt-4 p-4 bg-background-secondary rounded-xl">
              <h5 className="font-medium text-text-primary mb-2">Pembahasan:</h5>
              <p className="text-text-secondary">{question.explanation}</p>
            </div>
          )}
        </div>
      ))}

      {Object.keys(selectedAnswers).length > 0 && (
        <div className="bg-surface rounded-xl p-6 shadow-soft">
          <h4 className="text-lg font-semibold text-text-primary mb-2">Hasil:</h4>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">
              {getScore().correct}/{getScore().total}
            </div>
            <div className="text-text-secondary">
              Skor: {Math.round((getScore().correct / getScore().total) * 100)}%
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 