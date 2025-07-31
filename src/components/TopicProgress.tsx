import { getTopicProgress } from '@/lib/database';

interface TopicProgressProps {
  userId: string;
  topic: string;
}

export default async function TopicProgress({ userId, topic }: TopicProgressProps) {
  const progress = await getTopicProgress(userId, topic);

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}j ${mins}m`;
    }
    return `${mins}m`;
  };

  return (
    <div className="bg-surface-secondary rounded-xl p-6">
      <h3 className="text-lg font-semibold text-text-primary mb-4">
        Progress: {topic}
      </h3>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">
            {progress.quizScore}%
          </div>
          <div className="text-sm text-text-secondary">Skor Quiz</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-secondary">
            {progress.flashcardsCompleted}
          </div>
          <div className="text-sm text-text-secondary">Flashcard</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">
            {formatTime(progress.studyTime)}
          </div>
          <div className="text-sm text-text-secondary">Waktu Belajar</div>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex justify-between text-sm text-text-secondary">
          <span>Total Sesi: {progress.sessionCount}</span>
          <span>Terakhir: {progress.lastStudied ? new Date(progress.lastStudied).toLocaleDateString('id-ID') : 'Belum ada'}</span>
        </div>
      </div>
    </div>
  );
} 