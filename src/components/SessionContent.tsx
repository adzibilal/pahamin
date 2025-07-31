import { StudySession } from "@/lib/supabase";

interface SessionContentProps {
  session: StudySession;
}

export default function SessionContent({ session }: SessionContentProps) {
  const renderContent = () => {
    const content = session.content as {
      explanation?: string;
      content?: string;
      questions?: Array<{
        question: string;
        options: string[];
        correct_answer: string;
        explanation?: string;
      }>;
      flashcards?: Array<{
        question: string;
        answer: string;
      }>;
    };

    switch (session.type) {
      case 'explain':
        return (
          <div className="space-y-6">
            <div className="bg-surface-secondary rounded-xl p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-4">
                Penjelasan {session.topic}
              </h3>
              <div className="prose prose-sm max-w-none">
                <div className="whitespace-pre-wrap text-text-secondary leading-relaxed">
                  {content.explanation || content.content || 'Penjelasan tidak tersedia'}
                </div>
              </div>
            </div>
          </div>
        );

      case 'quiz':
        return (
          <div className="space-y-6">
            <div className="bg-surface-secondary rounded-xl p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-4">
                Soal Latihan: {session.topic}
              </h3>
              <div className="space-y-4">
                {content.questions?.map((question, index: number) => (
                  <div key={index} className="border border-border rounded-xl p-4">
                    <h4 className="font-semibold text-text-primary mb-3">
                      Soal {index + 1}
                    </h4>
                    <p className="text-text-secondary mb-4">{question.question}</p>
                    
                    <div className="space-y-2 mb-4">
                      {question.options?.map((option: string, optIndex: number) => (
                        <div
                          key={optIndex}
                          className={`p-3 rounded-lg border ${
                            option === question.correct_answer
                              ? 'border-green-500 bg-green-50 text-green-700'
                              : 'border-border bg-surface'
                          }`}
                        >
                          <span className="font-medium mr-2">
                            {String.fromCharCode(65 + optIndex)}.
                          </span>
                          {option}
                          {option === question.correct_answer && (
                            <span className="ml-2 text-green-600">✓ Jawaban Benar</span>
                          )}
                        </div>
                      ))}
                    </div>
                    
                    {question.explanation && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <p className="text-sm text-blue-700">
                          <strong>Pembahasan:</strong> {question.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'flashcard':
        return (
          <div className="space-y-6">
            <div className="bg-surface-secondary rounded-xl p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-4">
                Flashcard: {session.topic}
              </h3>
              <div className="space-y-4">
                {content.flashcards?.map((card, index: number) => (
                  <div key={index} className="border border-border rounded-xl p-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                        <h4 className="font-semibold text-primary mb-2">Pertanyaan {index + 1}</h4>
                        <p className="text-text-secondary">{card.question}</p>
                      </div>
                      <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-4">
                        <h4 className="font-semibold text-secondary mb-2">Jawaban {index + 1}</h4>
                        <p className="text-text-secondary">{card.answer}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="bg-surface-secondary rounded-xl p-6">
            <p className="text-text-secondary">Konten tidak tersedia</p>
          </div>
        );
    }
  };

  return (
    <div className="bg-surface rounded-2xl shadow-medium">
      <div className="p-6 border-b border-border">
        <h2 className="text-xl font-semibold text-text-primary">
          Konten Sesi
        </h2>
      </div>
      <div className="p-6">
        {renderContent()}
      </div>
    </div>
  );
} 