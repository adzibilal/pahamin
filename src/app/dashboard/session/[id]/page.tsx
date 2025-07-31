import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getStudySessionById } from "@/lib/database";
import Link from "next/link";
import SessionContent from "@/components/SessionContent";
import PrintButton from "@/components/PrintButton";
import TopicProgress from "@/components/TopicProgress";

export default async function SessionDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  const session = await getStudySessionById(params.id, userId);

  if (!session) {
    redirect("/dashboard");
  }

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

  return (
    <div className="min-h-screen bg-background-secondary p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Link
              href="/dashboard"
              className="text-text-secondary hover:text-primary transition-colors"
            >
              ← Kembali ke Dashboard
            </Link>
          </div>
          
          <div className="flex items-center gap-4 mb-4">
            <span className="text-4xl">{getSessionIcon(session.type)}</span>
            <div>
              <h1 className="text-3xl font-bold text-text-primary">
                {session.topic}
              </h1>
              <p className="text-text-secondary">
                {getSessionTypeName(session.type)}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-6 text-sm text-text-tertiary">
            <span>Dibuat: {formatDate(session.created_at)}</span>
            {session.updated_at !== session.created_at && (
              <span>Diperbarui: {formatDate(session.updated_at)}</span>
            )}
          </div>
        </div>

        {/* Session Info */}
        <div className="bg-surface rounded-2xl p-6 shadow-medium mb-8">
          <h2 className="text-xl font-semibold text-text-primary mb-4">
            Informasi Sesi
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <span className="text-text-secondary">Topik:</span>
              <p className="font-medium text-text-primary">{session.topic}</p>
            </div>
            <div>
              <span className="text-text-secondary">Tipe:</span>
              <p className="font-medium text-text-primary">{getSessionTypeName(session.type)}</p>
            </div>
            <div>
              <span className="text-text-secondary">Dibuat:</span>
              <p className="font-medium text-text-primary">{formatDate(session.created_at)}</p>
            </div>
            <div>
              <span className="text-text-secondary">ID Sesi:</span>
              <p className="font-medium text-text-primary font-mono text-sm">{session.id}</p>
            </div>
          </div>
        </div>

        {/* Topic Progress */}
        <div className="mb-8">
          <TopicProgress userId={userId} topic={session.topic} />
        </div>

        {/* Content */}
        <SessionContent session={session} />

        {/* Actions */}
        <div className="mt-8 flex gap-4 no-print">
          <Link
            href="/dashboard"
            className="px-6 py-3 border border-border text-text-secondary rounded-xl hover:bg-surface transition-colors"
          >
            Kembali ke Dashboard
          </Link>
          <PrintButton />
        </div>
      </div>
    </div>
  );
} 