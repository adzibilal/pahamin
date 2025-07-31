import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getProgressStats, getUserProgress } from "@/lib/database";
import Link from "next/link";
import ProgressCard from "@/components/ProgressCard";

export default async function ProgressPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  // Fetch progress data
  const [stats, progress] = await Promise.all([
    getProgressStats(userId),
    getUserProgress(userId),
  ]);

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}j ${mins}m`;
    }
    return `${mins}m`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

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
            Progress Belajar
          </h1>
          <p className="text-text-secondary">
            Pantau kemajuan belajar dan statistik Anda
          </p>
        </div>

        {/* Overall Stats */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <ProgressCard
            title="Total Topik"
            value={stats.totalTopics}
            icon="📚"
            color="primary"
            description="Topik yang dipelajari"
          />
          
          <ProgressCard
            title="Waktu Belajar"
            value={stats.totalStudyTime}
            unit="menit"
            icon="⏱️"
            color="secondary"
            description="Total waktu belajar"
          />
          
          <ProgressCard
            title="Flashcard Selesai"
            value={stats.totalFlashcards}
            icon="🔁"
            color="success"
            description="Flashcard yang diselesaikan"
          />
          
          <ProgressCard
            title="Rata-rata Skor Quiz"
            value={stats.averageQuizScore}
            maxValue={100}
            unit="%"
            icon="📝"
            color="warning"
            description="Skor rata-rata quiz"
          />
        </div>

        {/* Weekly Activity */}
        <div className="bg-surface rounded-2xl p-6 shadow-medium mb-8">
          <h2 className="text-2xl font-semibold text-text-primary mb-4">
            Aktivitas Minggu Ini
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <ProgressCard
              title="Sesi Belajar"
              value={stats.weeklySessions}
              icon="📈"
              color="primary"
              description="Sesi dalam 7 hari terakhir"
            />
            
            <ProgressCard
              title="Total Sesi"
              value={stats.totalSessions}
              icon="📊"
              color="secondary"
              description="Semua sesi belajar"
            />
          </div>
        </div>

        {/* Topic Progress */}
        <div className="bg-surface rounded-2xl shadow-medium">
          <div className="p-6 border-b border-border">
            <h2 className="text-2xl font-semibold text-text-primary">
              Progress per Topik
            </h2>
          </div>
          
          <div className="p-6">
            {progress.length > 0 ? (
              <div className="space-y-4">
                {progress.map((topicProgress) => (
                  <div
                    key={topicProgress.id}
                    className="border border-border rounded-xl p-6 hover:border-border-strong transition-colors"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-text-primary mb-1">
                          {topicProgress.topic}
                        </h3>
                        <p className="text-text-secondary text-sm">
                          Terakhir belajar: {formatDate(topicProgress.last_studied)}
                        </p>
                      </div>
                      <Link
                        href={`/dashboard/sessions?topic=${encodeURIComponent(topicProgress.topic)}`}
                        className="text-primary hover:text-primary-hover transition-colors text-sm font-medium"
                      >
                        Lihat Sesi →
                      </Link>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">
                          {topicProgress.quiz_score || 0}%
                        </div>
                        <div className="text-sm text-text-secondary">Skor Quiz</div>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-2xl font-bold text-secondary">
                          {topicProgress.flashcards_completed || 0}
                        </div>
                        <div className="text-sm text-text-secondary">Flashcard</div>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">
                          {formatTime(topicProgress.study_time || 0)}
                        </div>
                        <div className="text-sm text-text-secondary">Waktu Belajar</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📚</div>
                <h3 className="text-xl font-semibold text-text-primary mb-2">
                  Belum ada progress
                </h3>
                <p className="text-text-secondary mb-6">
                  Mulai belajar untuk melihat progress Anda di sini
                </p>
                <Link
                  href="/explain"
                  className="inline-block bg-primary text-text-primary px-6 py-3 rounded-xl font-semibold hover:bg-primary-hover transition-colors"
                >
                  Mulai Belajar
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Study Streak */}
        <div className="mt-8 bg-gradient-to-r from-primary to-secondary rounded-2xl p-6 text-text-inverse">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-4xl">🔥</span>
            <div>
              <h3 className="text-2xl font-bold">Streak Belajar</h3>
              <p className="text-text-inverse/80">
                Pertahankan konsistensi belajar Anda
              </p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold">7</div>
              <div className="text-sm opacity-80">Hari Berturut-turut</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{stats.weeklySessions}</div>
              <div className="text-sm opacity-80">Sesi Minggu Ini</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{stats.totalTopics}</div>
              <div className="text-sm opacity-80">Topik Dipelajari</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 