import Link from "next/link";
import { StudySession } from "@/lib/supabase";

interface SessionListProps {
  sessions: StudySession[];
  showType?: boolean;
  showDate?: boolean;
  maxItems?: number;
}

export default function SessionList({ 
  sessions, 
  showType = true, 
  showDate = true, 
  maxItems 
}: SessionListProps) {
  const displaySessions = maxItems ? sessions.slice(0, maxItems) : sessions;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getSessionIcon = (type: string) => {
    switch (type) {
      case 'explain':
        return '📘';
      case 'quiz':
        return '📝';
      case 'flashcard':
        return '🔁';
      default:
        return '📚';
    }
  };

  const getSessionTypeName = (type: string) => {
    switch (type) {
      case 'explain':
        return 'Penjelasan Materi';
      case 'quiz':
        return 'Generator Soal';
      case 'flashcard':
        return 'Flashcard Mode';
      default:
        return 'Sesi Belajar';
    }
  };

  if (displaySessions.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📚</div>
        <h3 className="text-xl font-semibold text-text-primary mb-2">
          Belum ada sesi belajar
        </h3>
        <p className="text-text-secondary mb-6">
          Mulai belajar untuk melihat sesi Anda di sini
        </p>
        <Link
          href="/explain"
          className="inline-block bg-primary text-text-primary px-6 py-3 rounded-xl font-semibold hover:bg-primary-hover transition-colors"
        >
          Mulai Belajar
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {displaySessions.map((session) => (
        <Link
          key={session.id}
          href={`/dashboard/session/${session.id}`}
          className="block border border-border rounded-xl p-6 hover:border-border-strong hover:bg-surface-secondary transition-all"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <span className="text-2xl">{getSessionIcon(session.type)}</span>
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-1">
                  {session.topic}
                </h3>
                {showType && (
                  <p className="text-text-secondary text-sm mb-2">
                    {getSessionTypeName(session.type)}
                  </p>
                )}
                {showDate && (
                  <p className="text-text-tertiary text-sm">
                    Dibuat: {formatDate(session.created_at)}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {showType && (
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                  {session.type}
                </span>
              )}
              <span className="text-text-tertiary">→</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
} 