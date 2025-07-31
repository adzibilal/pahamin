import { StudySession } from '@/lib/supabase';

interface SessionStatsProps {
  sessions: StudySession[];
}

export default function SessionStats({ sessions }: SessionStatsProps) {
  const totalSessions = sessions.length;
  const explainSessions = sessions.filter(s => s.type === 'explain').length;
  const quizSessions = sessions.filter(s => s.type === 'quiz').length;
  const flashcardSessions = sessions.filter(s => s.type === 'flashcard').length;
  
  // Get unique topics
  const uniqueTopics = [...new Set(sessions.map(s => s.topic))];
  
  // Get recent activity (last 7 days)
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const recentSessions = sessions.filter(s => 
    new Date(s.created_at) > sevenDaysAgo
  ).length;

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-surface rounded-2xl p-6 shadow-medium">
        <div className="text-3xl mb-2">📚</div>
        <h3 className="text-lg font-semibold text-text-primary mb-1">
          Total Sesi
        </h3>
        <p className="text-2xl font-bold text-primary">{totalSessions}</p>
      </div>

      <div className="bg-surface rounded-2xl p-6 shadow-medium">
        <div className="text-3xl mb-2">📘</div>
        <h3 className="text-lg font-semibold text-text-primary mb-1">
          Penjelasan
        </h3>
        <p className="text-2xl font-bold text-primary">{explainSessions}</p>
      </div>

      <div className="bg-surface rounded-2xl p-6 shadow-medium">
        <div className="text-3xl mb-2">📝</div>
        <h3 className="text-lg font-semibold text-text-primary mb-1">
          Soal & Flashcard
        </h3>
        <p className="text-2xl font-bold text-secondary">{quizSessions + flashcardSessions}</p>
      </div>

      <div className="bg-surface rounded-2xl p-6 shadow-medium">
        <div className="text-3xl mb-2">🎯</div>
        <h3 className="text-lg font-semibold text-text-primary mb-1">
          Topik Dipelajari
        </h3>
        <p className="text-2xl font-bold text-primary">{uniqueTopics.length}</p>
      </div>
    </div>
  );
} 