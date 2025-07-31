import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getStudySessions } from "@/lib/database";
import Link from "next/link";
import SessionStats from "@/components/SessionStats";
import SessionList from "@/components/SessionList";

export default async function AllSessionsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; type?: string; topic?: string }>;
}) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  const params = await searchParams;
  const page = parseInt(params.page || "1");
  const type = params.type;
  const topic = params.topic;
  const limit = 10;
  const offset = (page - 1) * limit;

  // Fetch sessions with filters
  const sessions = await getStudySessions(userId, type);

  // Filter by topic if provided
  const filteredSessions = topic 
    ? sessions.filter(session => 
        session.topic.toLowerCase().includes(topic.toLowerCase())
      )
    : sessions;

  // Pagination
  const totalSessions = filteredSessions.length;
  const totalPages = Math.ceil(totalSessions / limit);
  const paginatedSessions = filteredSessions.slice(offset, offset + limit);



  return (
    <div className="min-h-screen bg-background-secondary p-8">
      <div className="max-w-6xl mx-auto">
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
          
          <h1 className="text-4xl font-bold text-text-primary mb-2">
            Semua Sesi Belajar
          </h1>
          <p className="text-text-secondary">
            Lihat dan kelola semua sesi belajar Anda
          </p>
        </div>

        {/* Stats */}
        <div className="mb-8">
          <SessionStats sessions={sessions} />
        </div>

        {/* Sessions List */}
        <div className="bg-surface rounded-2xl shadow-medium">
          <div className="p-6 border-b border-border">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-text-primary">
                Daftar Sesi ({paginatedSessions.length} dari {totalSessions})
              </h2>
              <div className="flex gap-2">
                <Link
                  href="/dashboard/sessions"
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    !type 
                      ? 'bg-primary text-text-primary' 
                      : 'bg-surface-secondary text-text-secondary hover:bg-surface'
                  }`}
                >
                  Semua
                </Link>
                <Link
                  href="/dashboard/sessions?type=explain"
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    type === 'explain' 
                      ? 'bg-primary text-text-primary' 
                      : 'bg-surface-secondary text-text-secondary hover:bg-surface'
                  }`}
                >
                  Penjelasan
                </Link>
                <Link
                  href="/dashboard/sessions?type=quiz"
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    type === 'quiz' 
                      ? 'bg-primary text-text-primary' 
                      : 'bg-surface-secondary text-text-secondary hover:bg-surface'
                  }`}
                >
                  Soal
                </Link>
                <Link
                  href="/dashboard/sessions?type=flashcard"
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    type === 'flashcard' 
                      ? 'bg-primary text-text-primary' 
                      : 'bg-surface-secondary text-text-secondary hover:bg-surface'
                  }`}
                >
                  Flashcard
                </Link>
              </div>
            </div>
          </div>

          <div className="p-6">
            <SessionList sessions={paginatedSessions} />
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center">
            <div className="flex gap-2">
              {page > 1 && (
                <Link
                  href={`/dashboard/sessions?page=${page - 1}${type ? `&type=${type}` : ''}`}
                  className="px-4 py-2 border border-border rounded-lg text-text-secondary hover:bg-surface transition-colors"
                >
                  ← Sebelumnya
                </Link>
              )}
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <Link
                  key={pageNum}
                  href={`/dashboard/sessions?page=${pageNum}${type ? `&type=${type}` : ''}`}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    pageNum === page
                      ? 'bg-primary text-text-primary'
                      : 'border border-border text-text-secondary hover:bg-surface'
                  }`}
                >
                  {pageNum}
                </Link>
              ))}
              
              {page < totalPages && (
                <Link
                  href={`/dashboard/sessions?page=${page + 1}${type ? `&type=${type}` : ''}`}
                  className="px-4 py-2 border border-border rounded-lg text-text-secondary hover:bg-surface transition-colors"
                >
                  Selanjutnya →
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 