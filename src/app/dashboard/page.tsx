import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getStudySessions, getUserProgress, getTopicsByUser } from "@/lib/database";
import Link from "next/link";
import SessionList from "@/components/SessionList";

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  // Fetch user data
  const [studySessions, userProgress, topics] = await Promise.all([
    getStudySessions(userId),
    getUserProgress(userId),
    getTopicsByUser(userId),
  ]);

  const recentSessions = studySessions.slice(0, 5);
  const totalSessions = studySessions.length;
  const totalTopics = topics.length;

  return (
    <div className="min-h-screen bg-background-secondary p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-text-primary mb-2">
            Dashboard Belajar
          </h1>
          <p className="text-text-secondary">
            Pantau progress belajar dan riwayat sesi belajar Anda
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-surface rounded-2xl p-6 shadow-medium">
            <div className="text-3xl mb-2">📚</div>
            <h3 className="text-xl font-semibold text-text-primary mb-1">
              Total Sesi
            </h3>
            <p className="text-3xl font-bold text-primary">{totalSessions}</p>
          </div>

          <div className="bg-surface rounded-2xl p-6 shadow-medium">
            <div className="text-3xl mb-2">🎯</div>
            <h3 className="text-xl font-semibold text-text-primary mb-1">
              Topik Dipelajari
            </h3>
            <p className="text-3xl font-bold text-secondary">{totalTopics}</p>
          </div>

          <div className="bg-surface rounded-2xl p-6 shadow-medium">
            <div className="text-3xl mb-2">📈</div>
            <h3 className="text-xl font-semibold text-text-primary mb-1">
              Progress
            </h3>
            <p className="text-3xl font-bold text-primary">
              {userProgress.length > 0 ? userProgress.length : 0}
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-surface rounded-2xl p-6 shadow-medium mb-8">
          <h2 className="text-2xl font-semibold text-text-primary mb-4">
            Mulai Belajar
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <Link
              href="/explain"
              className="bg-gradient-to-r from-primary to-primary-hover text-text-primary p-4 rounded-xl text-center font-semibold hover:shadow-medium transition-all"
            >
              📘 Penjelasan Materi
            </Link>
            <Link
              href="/quiz"
              className="bg-gradient-to-r from-secondary to-primary text-text-inverse p-4 rounded-xl text-center font-semibold hover:shadow-medium transition-all"
            >
              📝 Generator Soal
            </Link>
            <Link
              href="/flashcard"
              className="border-2 border-primary text-primary p-4 rounded-xl text-center font-semibold hover:bg-primary hover:text-text-primary transition-all"
            >
              🔁 Flashcard Mode
            </Link>
          </div>
        </div>

        {/* Progress Overview */}
        <div className="bg-surface rounded-2xl p-6 shadow-medium mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-text-primary">
              Progress Belajar
            </h2>
            <Link
              href="/dashboard/progress"
              className="text-primary hover:text-primary-hover transition-colors text-sm font-medium"
            >
              Lihat Detail →
            </Link>
          </div>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{totalSessions}</div>
              <div className="text-sm text-text-secondary">Total Sesi</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary">{totalTopics}</div>
              <div className="text-sm text-text-secondary">Topik Dipelajari</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {userProgress.length > 0 ? userProgress.length : 0}
              </div>
              <div className="text-sm text-text-secondary">Progress</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary">
                {recentSessions.length > 0 ? recentSessions.length : 0}
              </div>
              <div className="text-sm text-text-secondary">Sesi Terbaru</div>
            </div>
          </div>
        </div>

        {/* Recent Sessions */}
        <div className="bg-surface rounded-2xl p-6 shadow-medium mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-text-primary">
              Sesi Terbaru
            </h2>
            <Link
              href="/dashboard/sessions"
              className="text-primary hover:text-primary-hover transition-colors text-sm font-medium"
            >
              Lihat Semua →
            </Link>
          </div>
          <SessionList sessions={recentSessions} maxItems={5} />
        </div>

        {/* Topics Studied */}
        {topics.length > 0 && (
          <div className="bg-surface rounded-2xl p-6 shadow-medium">
            <h2 className="text-2xl font-semibold text-text-primary mb-4">
              Topik yang Dipelajari
            </h2>
            <div className="flex flex-wrap gap-2">
              {topics.map((topic, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-background-secondary text-text-secondary rounded-full text-sm"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 