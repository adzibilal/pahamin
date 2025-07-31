import ExplainForm from '@/components/ExplainForm';

export default function ExplainPage() {
  return (
    <div className="min-h-screen bg-background-secondary p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-text-primary mb-4">
            📘 Penjelasan Materi
          </h1>
          <p className="text-lg text-text-secondary">
            Pelajari topik apapun dengan penjelasan AI yang mudah dipahami
          </p>
        </div>
        
        <div className="bg-surface rounded-2xl shadow-medium p-8">
          <ExplainForm />
        </div>
      </div>
    </div>
  );
} 